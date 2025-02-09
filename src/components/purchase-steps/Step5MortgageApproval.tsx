const Step5MortgageApproval = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대출 기관
        </label>
        <select className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
          <option>대출 기관을 선택하세요</option>
          <option>Bank of America</option>
          <option>Wells Fargo</option>
          <option>Chase</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대출 승인서 업로드
        </label>
        <input
          type="file"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대출 금액
        </label>
        <input
          type="number"
          placeholder="승인된 대출 금액을 입력하세요"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Step5MortgageApproval;
