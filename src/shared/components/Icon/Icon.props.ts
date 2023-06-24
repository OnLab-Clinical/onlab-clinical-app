import { SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'path'> {
    path: string | string[];
}
