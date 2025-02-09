import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useContactStore } from "@/store/contactStore";

const Step6Closing = () => {
  const { updateContractInfo } = useContactStore();
  const [formData, setFormData] = useState({
    closingDate: "",
    titleCompany: "",
    finalDocuments: [] as string[],
  });

  const documents = ["매매계약서", "대출 서류", "에스크로 서류", "보험 증서"];

  const handleChange = (name: string, value: any) => {
    let newFormData;
    if (name === "finalDocuments") {
      const newDocs = formData.finalDocuments.includes(value)
        ? formData.finalDocuments.filter((doc) => doc !== value)
        : [...formData.finalDocuments, value];
      newFormData = { ...formData, finalDocuments: newDocs };
    } else {
      newFormData = { ...formData, [name]: value };
    }

    setFormData(newFormData);
    updateContractInfo("closing", newFormData);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>클로징 일정</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("closingDate", e.target.value)}
        />
      </div>
      <div>
        <Label>타이틀 회사</Label>
        <Input
          type="text"
          onChange={(e) => handleChange("titleCompany", e.target.value)}
        />
      </div>
      <div>
        <Label className="mb-3">최종 서류 확인</Label>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc} className="flex items-center space-x-2">
              <Checkbox
                id={doc}
                checked={formData.finalDocuments.includes(doc)}
                onCheckedChange={() => handleChange("finalDocuments", doc)}
              />
              <label htmlFor={doc}>{doc}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step6Closing;
