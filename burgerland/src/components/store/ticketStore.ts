import { create } from "zustand";

interface TicketDetails {
  ticketType: "standard" | "family" | null;
  numPersons: number | null;
  numFamilyMembers: number | null;
  addOns: boolean;
}

interface TicketState {
  step: number;
  clientInfo: { name: string; phone: string; address: string; date: string | null } ;
  ticketDetails: TicketDetails
  reservationTime: null
  restaurantDetails: { id: string; name: string; } | null;
  paymentInfo: { cardNumber: string; expiry: string; cvv: string } | null;
  setStep: (step: number) => void;
  updateFormData: (data: Partial<TicketState>) => void;
  resetState: () => void;
}


const initialState = {
step: 0,
  clientInfo: { name: '', phone: '', address: '', date: null },
  ticketDetails: {
    ticketType: null,
    numPersons: null,
    numFamilyMembers: 3,
    addOns: false,
  },
  restaurantDetails: null,
  reservationTime:null,
  paymentInfo: null,
  };

export const useTicketStore = create<TicketState>((set) => ({
    ...initialState,
  setStep: (step) => set({ step }),
  updateFormData: (data) => set((state) => ({ ...state, ...data })),
  resetState: () => {set(initialState)}
}));
