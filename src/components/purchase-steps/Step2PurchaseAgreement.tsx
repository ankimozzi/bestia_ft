import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useContactStore } from "@/store/contactStore";

const Step2PurchaseAgreement = () => {
  const { updateContractInfo } = useContactStore();
  const [formData, setFormData] = useState({
    deposit: 0,
    depositDate: "",
    finalPaymentDate: "",
    specialConditions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 실시간으로 store 업데이트
    updateContractInfo("agreement", {
      ...formData,
      [name]: value,
      specialConditions:
        name === "specialConditions"
          ? value.split("\n").filter(Boolean)
          : formData.specialConditions.split("\n").filter(Boolean),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="deposit">계약금 (원)</Label>
          <Input
            id="deposit"
            name="deposit"
            type="number"
            value={formData.deposit}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="depositDate">계약금 지급일</Label>
          <Input
            id="depositDate"
            name="depositDate"
            type="date"
            value={formData.depositDate}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="finalPaymentDate">잔금 지급일</Label>
          <Input
            id="finalPaymentDate"
            name="finalPaymentDate"
            type="date"
            value={formData.finalPaymentDate}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="specialConditions">특수 조건 (줄바꿈으로 구분)</Label>
          <Textarea
            id="specialConditions"
            name="specialConditions"
            value={formData.specialConditions}
            onChange={handleChange}
            className="w-full h-32"
            placeholder="특수 조건을 입력하세요"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2PurchaseAgreement;
