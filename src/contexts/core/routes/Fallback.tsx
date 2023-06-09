// react
import { memo } from 'react';
// components
import { Loader } from '../loader';

const Fallback = memo(() => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <span className="w-24 max-w-full max-h-full text-primary-600">
                <Loader />
            </span>
        </div>
    );
});

export default Fallback;
