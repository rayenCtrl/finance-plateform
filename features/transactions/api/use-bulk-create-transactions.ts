import {toast} from "sonner"
import { InferRequestType, InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
        >({
            mutationFn: async (json) => {
                const response = await client.api.transactions["bulk-create"]["$post"]({json});
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Transaction created successfully");
                queryClient.invalidateQueries({queryKey: ["transaction"]});
                queryClient.invalidateQueries({queryKey: ["summary"]});
            },
            onError:() => {
                toast.error("Transaction creation failed");
            }})
    return mutation;
}