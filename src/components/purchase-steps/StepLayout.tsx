interface StepLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const StepLayout = ({ title, description, children }: StepLayoutProps) => {
  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="py-6">{children}</div>
    </div>
  );
};

export default StepLayout;
