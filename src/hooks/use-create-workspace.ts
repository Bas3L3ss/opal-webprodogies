import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "./use-mutation-data";
import useZodForm from "./use-zod-form";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";
import { useRouter } from "next/navigation";

export const useCreateWorkspace = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => createWorkspace(data.name),
    "user-workspaces",
    () => {
      router.refresh();
    }
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate
  );
  return { errors, onFormSubmit, register, isPending };
};
