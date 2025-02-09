import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyStore } from "@/store/propertyStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Step1PropertySelection from "@/components/purchase-steps/Step1PropertySelection";
import Step2PurchaseAgreement from "@/components/purchase-steps/Step2PurchaseAgreement";
import Step3Escrow from "@/components/purchase-steps/Step3Escrow";
import Step4Inspection from "@/components/purchase-steps/Step4Inspection";
import Step5MortgageApproval from "@/components/purchase-steps/Step5MortgageApproval";
import Step6Closing from "@/components/purchase-steps/Step6Closing";
import { motion, AnimatePresence } from "framer-motion";
import StepLayout from "@/components/purchase-steps/StepLayout";
import CompletionModal from "@/components/modals/CompletionModal";

type PurchaseStep = 1 | 2 | 3 | 4 | 5 | 6;

interface StepStatus {
  title: string;
  description: string;
  isCompleted: boolean;
}

const PropertyProcessPage = () => {
  const navigate = useNavigate();
  const { selectedProperty } = usePropertyStore();
  const [currentStep, setCurrentStep] = useState<PurchaseStep>(1);
  const [stepStatuses, setStepStatuses] = useState<
    Record<PurchaseStep, StepStatus>
  >({
    1: {
      title: "부동산 선택 및 가격 협상",
      description: "매물 확인 및 오퍼 제시",
      isCompleted: false,
    },
    2: {
      title: "매매계약서 작성",
      description: "계약 조건 협의 및 서명",
      isCompleted: false,
    },
    3: {
      title: "에스크로 계좌 개설",
      description: "계약금 입금 및 에스크로 업체 선정",
      isCompleted: false,
    },
    4: {
      title: "주택 검사",
      description: "전문가 검사 및 수리 협상",
      isCompleted: false,
    },
    5: {
      title: "대출 승인",
      description: "은행 심사 및 대출 확정",
      isCompleted: false,
    },
    6: {
      title: "클로징",
      description: "최종 서류 작성 및 소유권 이전",
      isCompleted: false,
    },
  });
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    if (!selectedProperty) {
      navigate("/");
    }
  }, [selectedProperty, navigate]);

  const handleStepClick = (step: PurchaseStep) => {
    if (step <= currentStep || stepStatuses[step].isCompleted) {
      setCurrentStep(step);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as PurchaseStep);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setStepStatuses((prev) => ({
        ...prev,
        [currentStep]: { ...prev[currentStep], isCompleted: true },
      }));
      setCurrentStep((prev) => (prev + 1) as PurchaseStep);
    } else {
      setShowCompletionModal(true);
    }
  };

  if (!selectedProperty) return null;

  return (
    <>
      <CompletionModal
        isOpen={showCompletionModal}
        onOpenChange={setShowCompletionModal}
      />
      <div className=" bg-background">
        <div className="flex">
          {/* 왼쪽 사이드바 */}
          <div className="w-96 min-h-screen p-8 fixed left-0 bg-card">
            <h2 className="text-xl font-semibold mb-12">구매 진행 단계</h2>
            <div className="space-y-8">
              {Object.entries(stepStatuses).map(([step, status], index) => {
                const stepNumber = Number(step) as PurchaseStep;
                const isClickable =
                  stepNumber <= currentStep || status.isCompleted;

                return (
                  <div key={step} className="relative">
                    {/* 연결선 */}
                    {index !== Object.keys(stepStatuses).length - 1 && (
                      <div
                        className={cn(
                          "absolute left-7 top-14 w-0.5 h-24 -z-10 transition-colors duration-300",
                          stepNumber < currentStep || status.isCompleted
                            ? "bg-primary"
                            : "bg-muted"
                        )}
                      />
                    )}

                    {/* 단계 항목 */}
                    <button
                      onClick={() => isClickable && handleStepClick(stepNumber)}
                      className={cn(
                        "w-full flex items-start gap-6 py-2 group",
                        isClickable
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      )}
                    >
                      {/* 원형 숫자 */}
                      <div
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold shrink-0",
                          "shadow-sm transition-all duration-300",
                          stepNumber === currentStep &&
                            "ring-4 ring-primary/20 scale-110",
                          stepNumber <= currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {status.isCompleted ? (
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          step
                        )}
                      </div>

                      {/* 단계 설명 */}
                      <div className="text-left">
                        <h3
                          className={cn(
                            "font-semibold text-lg mb-1 transition-colors duration-300",
                            stepNumber === currentStep
                              ? "text-primary"
                              : "text-foreground"
                          )}
                        >
                          {status.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {status.description}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 오른쪽 메인 컨텐츠 */}
          <div className="ml-96 flex-1 pt-12">
            <div className="max-w-4xl mx-auto">
              {/* 컨텐츠 영역 */}
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[calc(100vh-24rem)]"
                  >
                    <StepLayout
                      title={stepStatuses[currentStep].title}
                      description={stepStatuses[currentStep].description}
                    >
                      <StepContent step={currentStep} />
                    </StepLayout>
                  </motion.div>
                </AnimatePresence>

                {/* 네비게이션 버튼 */}
                <div className="flex justify-end gap-3 mt-8">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="gap-2 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      이전 단계
                    </Button>
                  )}
                  {currentStep < 6 ? (
                    <Button
                      onClick={handleNextStep}
                      className="gap-2 cursor-pointer"
                    >
                      다음 단계
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextStep}
                      className="gap-2 cursor-pointer"
                    >
                      완료
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StepContent = ({ step }: { step: PurchaseStep }) => {
  switch (step) {
    case 1:
      return <Step1PropertySelection />;
    case 2:
      return <Step2PurchaseAgreement />;
    case 3:
      return <Step3Escrow />;
    case 4:
      return <Step4Inspection />;
    case 5:
      return <Step5MortgageApproval />;
    case 6:
      return <Step6Closing />;
    default:
      return <p>준비 중입니다...</p>;
  }
};

export default PropertyProcessPage;
