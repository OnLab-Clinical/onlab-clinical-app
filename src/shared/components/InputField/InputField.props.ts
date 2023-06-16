import { FieldSlotProps } from '@/shared/layouts';
import { Slot, StyleStrategy } from '@/shared/types';

export interface InputFieldProps {
    inputId?: string | ((props: FieldSlotProps) => string);
    title?: string | ((props: FieldSlotProps) => string);
    before?: Slot<FieldSlotProps>;
    input?: Slot<FieldSlotProps>;
    after?: Slot<FieldSlotProps>;
    hint?: string | ((props: FieldSlotProps) => string) | false;
    isHintReserved?: boolean;
    hasError?: boolean;
    styleStrategy?: StyleStrategy;
}