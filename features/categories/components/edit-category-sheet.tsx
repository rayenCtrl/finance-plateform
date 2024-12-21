import {z} from 'zod';
import { Loader2 } from 'lucide-react';

import { useConfirm } from '@/hooks/use-confirm';
import { CategoryForm } from './category-form';
import { useOpenCategory } from '../hooks/use-open-category';
import { useGetCategory } from '../api/use-get-category';
import { useEditCategory } from '../api/use-edit-category';
import { useDeleteCategory } from '../api/use-delete-category';
import { insertCategorySchema } from '@/db/schema';
import {
    Sheet,
    SheetHeader,
    SheetTitle,
    SheetContent,
    SheetDescription,
} from '@/components/ui/sheet';

const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
    const {isOpen, onClose, id} = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you Sure?",
        " You are about to delete this category. This action cannot be undone."
    );

    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;

    const isLoading = categoryQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        }
        );
    };

    const onDelete = async() => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    }
    const defaultValues = categoryQuery.data? {
        name: categoryQuery.data.name,
    } : {
        name: '',
    }

    return (
        <>
        <ConfirmDialog />
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>Edit category</SheetTitle>
                    <SheetDescription>
                        Edit the category details
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                ? (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <Loader2 className='size-4 text-muted-foreground animate-spin' />
                    </div>
                ): (
                  <CategoryForm
                    id= {id}
                    onSubmit={onSubmit} 
                    disabled={isPending}
                    defaultValues={defaultValues}
                    onDelete={onDelete}
                  />
                 )
              }
            </SheetContent>
        </Sheet>
        </>
    );
};