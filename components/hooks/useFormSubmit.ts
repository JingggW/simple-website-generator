import { useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

export function useFormSubmit(clientId: string = "growing-money-minds") {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Rymee-Client-ID": clientId,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setStatus("success");
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus("error");
    }
  };

  return { status, setStatus, handleSubmit };
}
