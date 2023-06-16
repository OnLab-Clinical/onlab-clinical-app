// react
import { memo } from 'react';
// props
import { IconProps } from './Icon.props';
// utils
import { classNames } from '@/shared/utils';

const Icon = memo(({ className, path }: IconProps) => {
    return (
        <svg viewBox="0 0 24 24" className={classNames('w-[1em] h-[1em]', className)}>
            {typeof path === 'string' && <path fill="currentColor" d={path} />}

            {Array.isArray(path) && (
                <g>
                    {path.map((line, index) => (
                        <path key={index} fill="currentColor" d={line} />
                    ))}
                </g>
            )}
        </svg>
    );
});

export default Icon;
