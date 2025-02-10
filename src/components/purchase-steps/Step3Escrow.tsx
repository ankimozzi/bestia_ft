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
        <Label>Select Escrow Company</Label>
        <Select onValueChange={(value) => handleChange("company", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an escrow company" />
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
        <Label>Account Number</Label>
        <Input
          type="text"
          onChange={(e) => handleChange("accountNumber", e.target.value)}
          placeholder="Enter escrow account number"
        />
      </div>
      <div>
        <Label>Deposit Amount</Label>
        <Input
          type="number"
          onChange={(e) =>
            handleChange("depositAmount", Number(e.target.value))
          }
          placeholder="Enter deposit amount"
        />
      </div>
      <div>
        <Label>Deposit Date</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("depositDate", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step3Escrow;
