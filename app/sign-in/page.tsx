import type { Metadata } from "next";
import AuthForm from "../_components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in — Video Speed Reader",
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
