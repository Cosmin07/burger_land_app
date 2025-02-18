import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { FormInstance } from "antd";
import { vi } from "vitest";
import ClientInfoForm from "./ClientInfoForm";

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, 
  }),
}));

// Mock Zustand store
vi.mock("../../store/ticketStore", () => ({
  useTicketStore: () => ({
    clientInfo: { name: "", phone: "", email: "", date: null },
  }),
}));

describe("ClientInfoForm Component", () => {
  it("renders without errors", () => {
    // Create a form ref
    const formRef = { current: null } as unknown as React.RefObject<FormInstance>;

    // Render component
    const { container } = render(<ClientInfoForm formRef={formRef} />);

    // Check if component rendered without crashing
    expect(container).toBeInTheDocument();
  });

  it("renders all form fields with correct labels", () => {
    const formRef = { current: null };

    render(<ClientInfoForm formRef={formRef} />);

    // Check for all labels
    expect(screen.getByLabelText("fullName")).toBeInTheDocument();
    expect(screen.getByLabelText("phone")).toBeInTheDocument(); 
    expect(screen.getByLabelText("email")).toBeInTheDocument(); 
    expect(screen.getByLabelText("Select Date")).toBeInTheDocument(); 
  });
});
