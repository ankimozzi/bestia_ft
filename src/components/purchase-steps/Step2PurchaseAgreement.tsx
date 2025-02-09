const Step2PurchaseAgreement = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          계약 조건
        </label>
        <textarea
          rows={4}
          placeholder="특별 계약 조건을 입력하세요"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          계약 기간
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Step2PurchaseAgreement;
