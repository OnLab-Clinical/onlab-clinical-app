// react
import { memo } from 'react';
import { createPortal } from 'react-dom';
// props
import { ModalLayoutProps } from './Modal.props';
// utils
import { content } from '@/shared/utils';

const ModalLayout = memo(({ isOpen, children }: ModalLayoutProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 p-4 z-[100] flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute inset-0 bg-dark-900 bg-opacity-75" />

            <span className="absolute flex flex-col justify-center items-center overflow-hidden">
                {content(children, undefined)}
            </span>
        </div>,
        document.getElementById('modal') as HTMLElement
    );
});

export default ModalLayout;
