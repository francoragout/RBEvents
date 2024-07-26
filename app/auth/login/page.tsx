import LoginForm from "@/components/auth/login-form";

const LoginPage = ({
  searchParams,
}: {
  searchParams: { verified: string; error: string };
}) => {
  const isVerified = searchParams.verified === "true";

  return <LoginForm isVerified={isVerified} />;
};
export default LoginPage;
