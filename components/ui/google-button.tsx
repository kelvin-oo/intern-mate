import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  text?: string;
  onClick: () => void;
}

export function GoogleButton({ text = "Sign in with Google", onClick }: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={onClick}
    >
      <FcGoogle className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
}