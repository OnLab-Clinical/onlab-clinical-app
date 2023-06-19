// react
import { memo } from 'react';
// props
import { PanelLayoutProps } from './Panel.props';
// utils
import { classNames, content } from '@/shared/utils';

const PanelLayout = memo(({ className, children }: PanelLayoutProps) => {
    return (
        <div
            className={classNames(
                'flex flex-col p-4 gap-4 bg-light-200 theme-dark:bg-dark-600 rounded-sm shadow-md',
                className
            )}>
            {content(children, undefined)}
        </div>
    );
});

export default PanelLayout;
