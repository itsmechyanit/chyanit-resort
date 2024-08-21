import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSettings() {
  const queryClient = useQueryClient();
  const { mutate: editSettings, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings has been successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { editSettings, isPending };
}
