import { Button, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { isValidEmail } from "@/lib/validate";

const ForgotPasswordForm: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Enter your email or phone number to continue.");
      return;
    }
    // Accept either an email or anything roughly phone-shaped; the backend
    // will do strict validation on its side.
    if (trimmed.includes("@") && !isValidEmail(trimmed)) {
      setError("That email address looks malformed.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-center font-semibold text-3xl">Forgot Password?</h2>
        <div className="my-4">
          <form className="w-[500px] mt-5" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="emailOrPhone" className="block mb-2">
                Email or Phone Number
              </label>
              <input
                id="emailOrPhone"
                name="emailOrPhone"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="border border-[#A46E05] rounded h-12 px-3 w-full focus:outline-none focus:border-[#A46E05]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 mb-3" role="alert">
                {error}
              </p>
            )}
            {submitted && !error && (
              <p className="text-sm text-green-600 mb-3" role="status">
                If an account exists, we&apos;ve sent a reset link.
              </p>
            )}

            <Button
              type="submit"
              className="bg-[#A46E05] text-white rounded h-12 w-full"
            >
              Proceed
            </Button>
          </form>
        </div>

        <Spacer y={2} />

        <div className="text-center my-4">
          <p>or</p>
        </div>

        <Spacer y={2} />

        <div className="text-center mt-5">
          <p>
            Have an account?{" "}
            <Link href={ROUTES.signIn} className="text-[#38B419]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
