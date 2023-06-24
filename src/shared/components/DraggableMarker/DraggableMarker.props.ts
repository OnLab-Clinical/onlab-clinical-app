import { Slot } from '@/shared/types';

export type MarkerPosition = {
    latitude: number;
    longitude: number;
};

export type MarkerIcon = {
    className?: string;
    icon?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
};

export interface DraggableMarkerProps extends MarkerIcon {
    position: MarkerPosition;
    onPositionChange: (position: MarkerPosition) => void;
    isDraggable?: boolean;
    isFlyingTo?: boolean;
    isAutoLocate?: boolean;
    children?: Slot;
}
