import {toast} from "sonner"
import { InferRequestType, InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
        >({
            mutationFn: async (json) => {
                const response = await client.api.transactions["bulk-delete"]["$post"]({json});
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Transaction deleted successfully");
                queryClient.invalidateQueries({queryKey: ["transaction"]});
                queryClient.invalidateQueries({queryKey: ["summary"]});
            },
            onError:() => {
                toast.error("Transaction deletion failed");
            }})
    return mutation;
}