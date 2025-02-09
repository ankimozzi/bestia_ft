import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useContactStore } from "@/store/contactStore";

const ContractSummaryPage = () => {
  const navigate = useNavigate();
  const { contractInfo } = useContactStore();
  const { property, agreement, escrow, inspection, mortgage, closing } =
    contractInfo;

  return (
    <div className="min-h-screen bg-background p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">계약 내용 요약</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            돌아가기
          </Button>
        </div>

        <div className="space-y-12">
          {/* 부동산 정보 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">매물 정보</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* <div>
                <p className="text-sm text-muted-foreground">주소</p>
                <p className="text-lg">{property.address}</p>
              </div> */}
              <div>
                <p className="text-sm text-muted-foreground">매매가</p>
                <p className="text-lg">{formatCurrency(property.price)}</p>
              </div>
            </div>
          </section>

          {/* 계약 조건 */}
          {agreement && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">계약 조건</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">계약금</p>
                  <p className="text-lg">{formatCurrency(agreement.deposit)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">잔금 지급일</p>
                  <p className="text-lg">
                    {formatDate(agreement.finalPaymentDate)}
                  </p>
                </div>
              </div>
              {agreement.specialConditions.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">특수 조건</p>
                  <ul className="list-disc list-inside space-y-1">
                    {agreement.specialConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* 에스크로 정보 */}
          {escrow && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">에스크로 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">에스크로 업체</p>
                  <p className="text-lg">{escrow.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">입금액</p>
                  <p className="text-lg">
                    {formatCurrency(escrow.depositAmount)}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 검사 결과 */}
          {inspection && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">검사 결과</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">검사일</p>
                    <p className="text-lg">
                      {formatDate(inspection.inspectionDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      예상 수리비용
                    </p>
                    <p className="text-lg">
                      {formatCurrency(inspection.estimatedCost)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    수리 필요 항목
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {inspection.repairItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* 대출 정보 */}
          {mortgage && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">대출 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">대출 기관</p>
                  <p className="text-lg">{mortgage.lender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">대출 금액</p>
                  <p className="text-lg">{formatCurrency(mortgage.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">이자율</p>
                  <p className="text-lg">{mortgage.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">대출 기간</p>
                  <p className="text-lg">{mortgage.term}년</p>
                </div>
              </div>
            </section>
          )}

          {/* 클로징 정보 */}
          {closing && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">클로징 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">클로징 일자</p>
                  <p className="text-lg">{formatDate(closing.closingDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">타이틀 회사</p>
                  <p className="text-lg">{closing.titleCompany}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">최종 서류</p>
                <ul className="list-disc list-inside space-y-1">
                  {closing.finalDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractSummaryPage;
