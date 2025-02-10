import { useContactStore } from "@/store/contactStore";
import { usePropertyStore } from "@/store/propertyStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// 타입 정의 추가
interface PlaidExchangeResponse {
  access_token: string;
  item_id: string;
  request_id: string;
}

interface MortgageAnalysisResponse {
  approval_status: "Approved" | "Denied";
  monthly_payment: number;
  DTI_ratio: number;
  LTV_ratio: number;
  approval_details: {
    "Credit Score": string;
    "DTI Ratio": string;
    "LTV Ratio": string;
    "Down Payment": string;
  };
}

const Step1PropertySelection = () => {
  const { selectedProperty } = usePropertyStore();
  const { updateContractInfo, contractInfo } = useContactStore();

  // 문자열 가격을 숫자로 변환하는 헬퍼 함수
  const parsePrice = (price: string | number | null | undefined): number => {
    if (!price) return 0;
    if (typeof price === "number") return price;
    return Number(price.replace(/[^0-9.-]+/g, ""));
  };

  console.log("Initial values:", {
    contractPrice: contractInfo.property?.offerPrice,
    selectedPrice: selectedProperty?.price,
  });

  const [formData, setFormData] = useState({
    offerPrice: parsePrice(
      contractInfo.property?.offerPrice || selectedProperty?.price
    ),
    deposit: Number(contractInfo.property?.deposit || 20),
    accountId: contractInfo.property?.bankAccount?.accountId || "",
    bankName: contractInfo.property?.bankAccount?.bankName || "",
  });
  const [linkToken, setLinkToken] = useState("");
  const [mortgageAnalysis, setMortgageAnalysis] =
    useState<MortgageAnalysisResponse | null>(null);
  const [accessToken, setAccessToken] = useState<string>(
    contractInfo.property?.bankAccount?.accessToken || ""
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{
      role: "user" | "assistant";
      content: string;
    }>
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedProperty?.price) {
      setFormData((prev) => ({
        ...prev,
        offerPrice: parsePrice(selectedProperty.price),
      }));
    }
  }, [selectedProperty]);

  // Plaid Link 토큰 가져오기
  const getLinkToken = useCallback(async () => {
    try {
      console.log("getLinkToken 호출됨");
      const { data } = await axios.post(
        "http://localhost:8000/api/api/create_link_token",
        {}
      );
      console.log("API 응답:", data);
      setLinkToken(data.link_token);
    } catch (error) {
      console.error("Link 토큰 생성 실패:", error);
    }
  }, []);

  // 컴포넌트 마운트 시 Link 토큰 가져오기
  useEffect(() => {
    getLinkToken();
  }, [getLinkToken]);

  // Plaid Link 설정
  const config = {
    token: linkToken,
    onSuccess: async (public_token: string, metadata: any) => {
      try {
        // 1. Plaid 토큰 교환
        const { data } = await axios.post<PlaidExchangeResponse>(
          "http://localhost:8000/api/exchange_token",
          {
            public_token,
            account_id: metadata.accounts[0].id,
          }
        );

        setAccessToken(data.access_token);

        // store에 계좌 정보 저장
        updateContractInfo("property", {
          ...selectedProperty,
          offerPrice: formData.offerPrice,
          deposit: formData.deposit,
          bankAccount: {
            accountId: metadata.accounts[0].id,
            bankName: metadata.institution.name,
            accessToken: data.access_token,
            itemId: data.item_id,
            requestId: data.request_id,
          },
        });

        // 자동으로 모기지 분석 실행
        await requestMortgageAnalysis(data.access_token);
      } catch (error) {
        console.error("계좌 연동 실패:", error);
      }
    },
    onExit: (err?: any) => {
      console.log("Plaid Link 종료", err);
    },
  };

  const { open, ready } = usePlaidLink(config);

  // 버튼 클릭 핸들러
  const handlePlaidClick = useCallback(() => {
    console.log("버튼 클릭됨", { linkToken, ready, open });
    if (linkToken && open) {
      open();
    } else {
      getLinkToken();
    }
  }, [linkToken, open, getLinkToken]);

  // 값이 변경될 때마다 store 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    if (!isNaN(numValue)) {
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));

      // store 업데이트
      updateContractInfo("property", {
        ...selectedProperty,
        offerPrice: name === "offerPrice" ? numValue : formData.offerPrice,
        deposit: name === "deposit" ? numValue : formData.deposit,
      });
    }
  };

  // 모기지 분석 함수 수정
  const requestMortgageAnalysis = async (token: string) => {
    try {
      const offerPrice = Number(formData.offerPrice);
      const deposit = Number(formData.deposit);

      console.log("Input values:", { offerPrice, deposit });

      if (isNaN(offerPrice) || isNaN(deposit)) {
        throw new Error("Invalid input values");
      }

      const loanAmount = Math.round(offerPrice * (1 - deposit / 100));
      const downPayment = Math.round(offerPrice * (deposit / 100));

      // 1. 모기지 분석 요청
      const { data: mortgageAnalysis } =
        await axios.post<MortgageAnalysisResponse>(
          "http://localhost:8000/mortgage-analysis",
          {
            home_value: offerPrice,
            loan_amount: loanAmount,
            down_payment: downPayment,
            annual_income: 120000,
            total_debt: 15000,
            credit_score: 720,
          }
        );

      setMortgageAnalysis(mortgageAnalysis);

      // 2. 채팅 API 요청
      await sendChatMessage("모기지 분석 결과를 검토해주세요");
    } catch (error) {
      console.error("모기지 분석 또는 채팅 요청 실패:", error);
    }
  };

  // 모기지 분석 재시도 버튼
  const handleRetryAnalysis = () => {
    if (accessToken) {
      requestMortgageAnalysis(accessToken);
    }
  };

  // AI 채팅 요청 함수 추가
  const sendChatMessage = async (content: string) => {
    if (isSubmitting || !content.trim()) return;

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/chat/with-history",
        {
          content,
          mortgage_data: mortgageAnalysis,
        }
      );

      setChatMessages((prev) => [
        ...prev,
        { role: "user", content },
        { role: "assistant", content: data.content },
      ]);
    } catch (error) {
      console.error("AI 채팅 요청 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAIChatRequest = async () => {
    if (!mortgageAnalysis) return;
    setIsChatOpen(true);
    await sendChatMessage("모기지 분석 결과를 검토해주세요");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendChatMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Property Information</h3>
        <div className="space-y-3">
          <p className="text-gray-600">Price: {selectedProperty?.price}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Link Bank Account</h3>
        <div className="space-y-4">
          {formData.accountId ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{formData.bankName}</p>
              <p className="text-sm text-gray-600">
                Account linked successfully
              </p>
            </div>
          ) : (
            <Button
              onClick={handlePlaidClick}
              className="w-full hover:bg-primary/90 cursor-pointer"
              type="button"
              variant="default"
            >
              Connect Bank Account
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Make an Offer</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="offerPrice">Offer Amount</Label>
            <Input
              id="offerPrice"
              name="offerPrice"
              type="number"
              value={formData.offerPrice}
              onChange={handleChange}
              placeholder="Enter offer amount"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="deposit">Down Payment (%)</Label>
            <Input
              id="deposit"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="Enter down payment percentage"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* 모기지 분석 섹션 */}
      {accessToken && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Mortgage Analysis Results</h3>
            <Button onClick={handleRetryAnalysis} variant="outline" size="sm">
              Retry Analysis
            </Button>
          </div>

          {mortgageAnalysis ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Result:</span>
                  <span
                    className={`font-bold ${
                      mortgageAnalysis.approval_status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {mortgageAnalysis.approval_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="font-semibold">
                      ${mortgageAnalysis.monthly_payment.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">DTI Ratio</p>
                    <p className="font-semibold">
                      {mortgageAnalysis.DTI_ratio}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">LTV Ratio</p>
                    <p className="font-semibold">
                      {mortgageAnalysis.LTV_ratio}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Detailed Analysis</h4>
                  <div className="grid gap-2">
                    {Object.entries(mortgageAnalysis.approval_details).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span className="text-sm text-gray-600">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleAIChatRequest}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  Consult with AI
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p>Loading mortgage analysis results...</p>
            </div>
          )}
        </div>
      )}

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogTitle className="text-lg font-semibold">
            AI Mortgage Consultation
          </DialogTitle>

          <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-4 bg-white">
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-gray-100"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isSubmitting}
                />
                <Button onClick={handleSendMessage} disabled={isSubmitting}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Step1PropertySelection;
