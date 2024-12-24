import {toast} from "sonner"
import { InferRequestType, InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?:string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
        >({
            mutationFn: async (json) => {
                const response = await client.api.categories[":id"]["$delete"]({
                    param: {id}
                });
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Category deleted successfully");
                queryClient.invalidateQueries({queryKey: ["category", {id}]});
                queryClient.invalidateQueries({queryKey: ["categories"]});
                queryClient.invalidateQueries({queryKey: ["transactions"]});
                //TODO: Invalidate summary and transactions queries
            },
            onError:() => {
                toast.error("Category delete failed");
            }})
    return mutation;
}