import type { Metadata } from "next";
import AuthForm from "../_components/AuthForm";

export const metadata: Metadata = {
  title: "Sign up — Video Speed Reader",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
