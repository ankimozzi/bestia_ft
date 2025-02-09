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
import { useContactStore } from "@/store/contactStore";

const Step5MortgageApproval = () => {
  const { updateContractInfo } = useContactStore();
  const [formData, setFormData] = useState({
    lender: "",
    amount: 0,
    interestRate: 0,
    term: 30,
    approvalDate: "",
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    updateContractInfo("mortgage", {
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>대출 기관</Label>
        <Select onValueChange={(value) => handleChange("lender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="대출 기관을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="신한은행">신한은행</SelectItem>
            <SelectItem value="국민은행">국민은행</SelectItem>
            <SelectItem value="우리은행">우리은행</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>대출 금액</Label>
        <Input
          type="number"
          onChange={(e) => handleChange("amount", Number(e.target.value))}
        />
      </div>
      <div>
        <Label>이자율 (%)</Label>
        <Input
          type="number"
          step="0.1"
          onChange={(e) => handleChange("interestRate", Number(e.target.value))}
        />
      </div>
      <div>
        <Label>대출 기간 (년)</Label>
        <Input
          type="number"
          value={formData.term}
          onChange={(e) => handleChange("term", Number(e.target.value))}
        />
      </div>
      <div>
        <Label>승인일</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("approvalDate", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step5MortgageApproval;
