import { UseFormReturn } from 'react-hook-form';

export interface RecoveryFormData {
    email: string;
}

export interface RecoveryContextProps {
    // values
    form: UseFormReturn<RecoveryFormData>;
    // actions
    handleRecovery: () => void;
}
