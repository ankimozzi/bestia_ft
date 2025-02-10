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
        <Label>Lending Institution</Label>
        <Select onValueChange={(value) => handleChange("lender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a lending institution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Shinhan Bank">Shinhan Bank</SelectItem>
            <SelectItem value="KB Bank">KB Bank</SelectItem>
            <SelectItem value="Woori Bank">Woori Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Loan Amount</Label>
        <Input
          type="number"
          onChange={(e) => handleChange("amount", Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Interest Rate (%)</Label>
        <Input
          type="number"
          step="0.1"
          onChange={(e) => handleChange("interestRate", Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Loan Term (years)</Label>
        <Input
          type="number"
          value={formData.term}
          onChange={(e) => handleChange("term", Number(e.target.value))}
        />
      </div>
      <div>
        <Label>Approval Date</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("approvalDate", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step5MortgageApproval;
