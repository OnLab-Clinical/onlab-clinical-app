// types
import { Direction, Slot } from '@/shared/types';

export interface ScrollLayoutProps {
    className?: string;
    classNameContent?: string;
    direction?: Direction;
    children?: Slot;
}
