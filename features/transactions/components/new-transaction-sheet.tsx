import {z} from 'zod';
import { insertAccountSchema } from '@/db/schema';
import { useNewAccount } from '../hooks/use-new-transaction';
import { AccountForm } from '@/features/accounts/components/account-form';
import { useCreateAccount } from '../api/use-create-transaction';
import {
    Sheet,
    SheetHeader,
    SheetTitle,
    SheetContent,
    SheetDescription,
} from '@/components/ui/sheet';

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
    const {isOpen,onClose} = useNewAccount();

    const mutation = useCreateAccount();

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
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to manage your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: '',
                }}/>
            </SheetContent>
        </Sheet>
    );
};