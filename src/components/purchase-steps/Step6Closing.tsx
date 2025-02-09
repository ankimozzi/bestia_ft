const Step6Closing = () => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          클로징 일정
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          최종 서류 확인
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>매매계약서</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>대출 서류</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>에스크로 서류</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>보험 증서</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6Closing;
