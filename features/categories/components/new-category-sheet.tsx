import {z} from 'zod';
import { insertCategorySchema } from '@/db/schema';
import { useNewCategory } from '../hooks/use-new-category';
import { useCreateCategory } from '../api/use-create-category';
import { CategoryForm } from '@/features/categories/components/category-form';
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

export const NewCategorySheet = () => {
    const {isOpen,onClose} = useNewCategory();

    const mutation = useCreateCategory();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        }
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>
                        Create a new category to manage your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: '',
                }}/>
            </SheetContent>
        </Sheet>
    );
};