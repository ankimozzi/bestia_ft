import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContactStore } from "@/store/contactStore";

const Step4Inspection = () => {
  const { updateContractInfo } = useContactStore();
  const [formData, setFormData] = useState({
    inspector: "",
    inspectionDate: "",
    repairItems: "",
    estimatedCost: 0,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    updateContractInfo("inspection", {
      ...formData,
      [name]: value,
      repairItems:
        name === "repairItems"
          ? value.toString().split("\n").filter(Boolean)
          : formData.repairItems.split("\n").filter(Boolean),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>검사 업체 선택</Label>
        <Select onValueChange={(value) => handleChange("inspector", value)}>
          <SelectTrigger>
            <SelectValue placeholder="검사 업체를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AmeriSpec">AmeriSpec</SelectItem>
            <SelectItem value="HomeTeam">HomeTeam</SelectItem>
            <SelectItem value="Pillar To Post">Pillar To Post</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>검사일</Label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          onChange={(e) => handleChange("inspectionDate", e.target.value)}
        />
      </div>
      <div>
        <Label>예상 수리비용</Label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            handleChange("estimatedCost", Number(e.target.value))
          }
        />
      </div>
      <div>
        <Label>수리 필요 항목 (줄바꿈으로 구분)</Label>
        <Textarea
          value={formData.repairItems}
          onChange={(e) => handleChange("repairItems", e.target.value)}
          className="h-32"
          placeholder="수리가 필요한 사항을 입력하세요"
        />
      </div>
    </div>
  );
};

export default Step4Inspection;
