import { useContactStore } from "@/store/contactStore";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Step3Escrow = () => {
  const { updateContractInfo } = useContactStore();
  const [formData, setFormData] = useState({
    company: "",
    accountNumber: "",
    depositAmount: 0,
    depositDate: "",
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    updateContractInfo("escrow", {
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>에스크로 업체 선택</Label>
        <Select onValueChange={(value) => handleChange("company", value)}>
          <SelectTrigger>
            <SelectValue placeholder="에스크로 업체를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="First American Title">
              First American Title
            </SelectItem>
            <SelectItem value="Chicago Title">Chicago Title</SelectItem>
            <SelectItem value="Fidelity National Title">
              Fidelity National Title
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>계좌 번호</Label>
        <Input
          type="text"
          onChange={(e) => handleChange("accountNumber", e.target.value)}
          placeholder="에스크로 계좌번호를 입력하세요"
        />
      </div>
      <div>
        <Label>입금액</Label>
        <Input
          type="number"
          onChange={(e) =>
            handleChange("depositAmount", Number(e.target.value))
          }
          placeholder="입금액을 입력하세요"
        />
      </div>
      <div>
        <Label>입금일</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("depositDate", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step3Escrow;
