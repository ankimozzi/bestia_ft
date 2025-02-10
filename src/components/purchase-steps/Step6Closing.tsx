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

  const documents = [
    "Purchase Agreement",
    "Loan Documents",
    "Escrow Documents",
    "Insurance Certificate",
  ];

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
        <Label>Closing Date</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("closingDate", e.target.value)}
        />
      </div>
      <div>
        <Label>Title Company</Label>
        <Input
          type="text"
          onChange={(e) => handleChange("titleCompany", e.target.value)}
        />
      </div>
      <div>
        <Label className="mb-3">Final Document Check</Label>
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
