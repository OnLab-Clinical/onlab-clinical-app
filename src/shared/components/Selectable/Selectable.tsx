// react
import { HTMLInputTypeAttribute, forwardRef } from 'react';
// props
import { SelectableProps, SelectableStrategy } from './Selectable.props';
// utils
import { content } from '@/shared/utils';

const Selectable = forwardRef<HTMLInputElement, SelectableProps>(
    ({ className, children, strategy, ...props }, ref) => {
        const type: Record<SelectableStrategy, HTMLInputTypeAttribute> = {
            multiple: 'checkbox',
            single: 'radio',
        };

        return (
            <label className={className}>
                {content(children, undefined)}

                <input
                    className="h-0 w-0 appearance-none"
                    ref={ref}
                    type={type[strategy]}
                    {...props}
                />
            </label>
        );
    }
);

export default Selectable;
