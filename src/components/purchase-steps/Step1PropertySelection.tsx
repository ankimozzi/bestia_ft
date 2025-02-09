import { useContactStore } from "@/store/contactStore";
import { usePropertyStore } from "@/store/propertyStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Step1PropertySelection = () => {
  const { selectedProperty } = usePropertyStore();
  const { updateContractInfo } = useContactStore();
  const [formData, setFormData] = useState({
    offerPrice: selectedProperty.price,
    deposit: 20, // 기본값 20%
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));

    // 실시간으로 store 업데이트
    updateContractInfo("property", {
      ...selectedProperty,
      offerPrice: name === "offerPrice" ? Number(value) : formData.offerPrice,
      deposit: name === "deposit" ? Number(value) : formData.deposit,
    });
    console.log(selectedProperty);
    console.log(formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">매물 정보</h3>
        <div className="space-y-3">
          <p className="text-gray-600">매매가: {selectedProperty?.price}원</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">오퍼 제시</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="offerPrice">제시 금액</Label>
            <Input
              id="offerPrice"
              name="offerPrice"
              type="number"
              value={formData.offerPrice}
              onChange={handleChange}
              placeholder="오퍼 금액을 입력하세요"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="deposit">계약금 (%)</Label>
            <Input
              id="deposit"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="계약금 비율을 입력하세요"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1PropertySelection;
