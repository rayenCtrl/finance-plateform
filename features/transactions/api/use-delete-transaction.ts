import {toast} from "sonner"
import { InferRequestType, InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?:string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
        >({
            mutationFn: async (json) => {
                const response = await client.api.transactions[":id"]["$delete"]({
                    param: {id}
                });
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Transaction deleted successfully");
                queryClient.invalidateQueries({queryKey: ["transaction", {id}]});
                queryClient.invalidateQueries({queryKey: ["transactions"]});
                //TODO: Invalidate summary and transactions queries
            },
            onError:() => {
                toast.error("Transaction delete failed");
            }})
    return mutation;
}