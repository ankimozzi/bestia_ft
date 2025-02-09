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
              구매 절차 완료
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              모든 구매 절차가 완료되었습니다.
              <br />
              계약 내용을 확인하시겠습니까?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex sm:justify-center gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
          <Button onClick={() => navigate("/contract-summary")}>
            계약 내용 확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionModal;
