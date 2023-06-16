// react
import { memo } from 'react';
// props
import { FieldLayoutProps } from './Field.props';
// utils
import { classNames, content, contentString } from '@/shared/utils';

const FieldLayout = memo(({ className, hasError, title, before, input, after, hint }: FieldLayoutProps) => {
    return (
        <p className={classNames('flex flex-col', contentString(className?.wrapper, { hasError }))}>
            {content(title, { hasError })}

            <span
                className={classNames(
                    'flex flex-row items-center',
                    contentString(className?.content, { hasError })
                )}>
                {content(before, { hasError })}

                {content(input, { hasError })}

                {content(after, { hasError })}
            </span>

            {content(hint, { hasError })}
        </p>
    );
});

export default FieldLayout;
