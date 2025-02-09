const Step3Escrow = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          에스크로 업체 선택
        </label>
        <select className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
          <option>에스크로 업체를 선택하세요</option>
          <option>First American Title</option>
          <option>Chicago Title</option>
          <option>Fidelity National Title</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          계약금 입금 증명
        </label>
        <input
          type="file"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Step3Escrow;
