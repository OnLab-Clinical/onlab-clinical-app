// react
import { memo } from 'react';
// props
import { IconProps } from './Icon.props';

const Icon = memo(({ path }: IconProps) => {
    return (
        <svg viewBox="0 0 24 24" className="w-[1em] h-[1em]">
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
