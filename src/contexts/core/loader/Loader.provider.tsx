// react
import { memo } from 'react';
// hooks
import { useLoader } from './useLoader.hook';
// components
import Loader from './Loader';

const LoaderProvider = memo(() => {
    const { isLoading } = useLoader();

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 p-4 z-[200] flex flex-col justify-center items-center overflow-hidden">
                    <div className="absolute inset-0 bg-dark-900 bg-opacity-75" />

                    <span className="absolute flex flex-col justify-center items-center w-24 overflow-hidden text-primary-500">
                        <Loader />
                    </span>
                </div>
            )}
        </>
    );
});

export default LoaderProvider;
