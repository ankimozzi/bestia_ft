const Step4Inspection = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          검사 업체 선택
        </label>
        <select className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
          <option>검사 업체를 선택하세요</option>
          <option>AmeriSpec</option>
          <option>HomeTeam</option>
          <option>Pillar To Post</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          검사 보고서 업로드
        </label>
        <input
          type="file"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          수리 요청 사항
        </label>
        <textarea
          rows={4}
          placeholder="수리가 필요한 사항을 입력하세요"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Step4Inspection;
