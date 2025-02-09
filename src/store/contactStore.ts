import { Property } from "@/types/property";
import { create } from "zustand";

interface ContractInfo {
  // 1단계: 부동산 선택
  property: {
    city: string;
    state: string;
    price: number;
    address: string;
  } | null;

  // 2단계: 매매계약
  agreement: {
    deposit: number;
    depositDate: string;
    finalPaymentDate: string;
    specialConditions: string[];
  } | null;

  // 3단계: 에스크로
  escrow: {
    company: string;
    accountNumber: string;
    depositAmount: number;
    depositDate: string;
  } | null;

  // 4단계: 검사
  inspection: {
    inspector: string;
    inspectionDate: string;
    repairItems: string[];
    estimatedCost: number;
  } | null;

  // 5단계: 대출
  mortgage: {
    lender: string;
    amount: number;
    interestRate: number;
    term: number;
    approvalDate: string;
  } | null;

  // 6단계: 클로징
  closing: {
    closingDate: string;
    titleCompany: string;
    finalDocuments: string[];
  } | null;
}

interface ContactStore {
  contractInfo: ContractInfo;
  updateContractInfo: (step: keyof ContractInfo, data: any) => void;
  resetContractInfo: () => void;
}

const initialContractInfo: ContractInfo = {
  property: null,
  agreement: null,
  escrow: null,
  inspection: null,
  mortgage: null,
  closing: null,
};

export const useContactStore = create<ContactStore>((set) => ({
  contractInfo: initialContractInfo,
  updateContractInfo: (step, data) =>
    set((state) => ({
      contractInfo: {
        ...state.contractInfo,
        [step]: data,
      },
    })),
  resetContractInfo: () => set({ contractInfo: initialContractInfo }),
}));
