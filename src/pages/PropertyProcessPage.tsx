import { useState } from "react";
import { useParams } from "react-router-dom";

interface PurchaseStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  component: React.ReactNode;
}

const PropertyProcessPage = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<PurchaseStep[]>([
    {
      id: 1,
      title: "부동산 선택 및 가격 협상",
      description: "매물 확인 및 가격 협상 진행",
      isCompleted: false,
      component: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">가격 협상</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="제안 가격 입력"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => {
                // 가격 제안 로직
                setSteps((prev) =>
                  prev.map((step) =>
                    step.id === 1 ? { ...step, isCompleted: true } : step
                  )
                );
                setCurrentStep(2);
              }}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              가격 제안하기
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "매매계약서 작성",
      description: "계약서 검토 및 서명",
      isCompleted: false,
      component: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">계약서 작성</h3>
          <div className="space-y-2">
            {/* 계약서 관련 폼 */}
            <button
              onClick={() => {
                setSteps((prev) =>
                  prev.map((step) =>
                    step.id === 2 ? { ...step, isCompleted: true } : step
                  )
                );
                setCurrentStep(3);
              }}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              계약서 서명하기
            </button>
          </div>
        </div>
      ),
    },
    // ... 나머지 단계들도 비슷한 형식으로 구현
  ]);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* 왼쪽 사이드바 - 진행 단계 */}
        <div className="w-1/4 min-h-screen bg-gray-50 p-6">
          <h2 className="text-2xl font-bold mb-6">구매 절차</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg transition-colors ${
                  currentStep === step.id
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : step.isCompleted
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {step.isCompleted && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 메인 컨텐츠 - 현재 단계 컴포넌트 */}
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            {steps.find((step) => step.id === currentStep)?.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyProcessPage;
