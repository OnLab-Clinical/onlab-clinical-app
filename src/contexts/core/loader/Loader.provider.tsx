// react
import { memo } from 'react';
import { createPortal } from 'react-dom';
// hooks
import { useLoader } from './useLoader.hook';
// components
import Loader from './Loader';

const LoaderProvider = memo(() => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return createPortal(
        <div className="fixed inset-0 p-4 z-[200] flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute inset-0 bg-dark-900 bg-opacity-75" />

            <span className="absolute flex flex-col justify-center items-center w-24 overflow-hidden text-primary-500">
                <Loader />
            </span>
        </div>,
        document.getElementById('loader') as HTMLElement
    );
});

export default LoaderProvider;
