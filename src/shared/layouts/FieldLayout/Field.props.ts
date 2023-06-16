import { Slot } from '@/shared/types';

export interface FieldSlotProps {
    hasError?: boolean;
}

export interface FieldLayoutProps {
    className?: {
        wrapper?: string | ((props: FieldSlotProps) => string);
        content?: string | ((props: FieldSlotProps) => string);
    };
    hasError?: boolean;
    title?: Slot<FieldSlotProps>;
    before?: Slot<FieldSlotProps>;
    input?: Slot<FieldSlotProps>;
    after?: Slot<FieldSlotProps>;
    hint?: Slot<FieldSlotProps>;
}
