import { usePropertyStore } from "@/store/propertyStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Step1PropertySelection = () => {
  const { selectedProperty } = usePropertyStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-4">매물 정보</h3>
        <div className="space-y-3">
          <p className="text-gray-600">
            위치: {selectedProperty?.city}, {selectedProperty?.state}
          </p>
          <p className="text-gray-600">
            매매가: ${selectedProperty?.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">오퍼 제시</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="offerPrice">제시 금액</Label>
            <Input
              id="offerPrice"
              type="number"
              placeholder="오퍼 금액을 입력하세요"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="deposit">계약금 (%)</Label>
            <Input
              id="deposit"
              type="number"
              placeholder="계약금 비율을 입력하세요"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1PropertySelection;
