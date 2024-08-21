import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupAPI({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "User successfully created!!!. Please verify his email address"
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return { signup, isPending };
}
