import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

interface CompletionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompletionModal = ({ isOpen, onOpenChange }: CompletionModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-green-50 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-center">
            <DialogTitle className="text-xl font-semibold mb-2">
              Purchase Process Complete
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              All purchase procedures have been completed.
              <br />
              Would you like to review the contract details?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex sm:justify-center gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => navigate("/contract-summary")}>
            Review Contract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionModal;
