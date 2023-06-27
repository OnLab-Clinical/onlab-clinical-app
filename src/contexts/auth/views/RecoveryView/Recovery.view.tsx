// react
import { memo } from 'react';
// context
import { RecoveryContext } from './Recovery.context';
// hooks
import { useRecovery } from './useRecovery.hook';
// components
import { RecoveryForm } from './RecoveryForm';

const RecoveryView = memo(() => {
    const { context } = useRecovery();

    return (
        <RecoveryContext.Provider value={context}>
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <RecoveryForm />
            </main>
        </RecoveryContext.Provider>
    );
});

export default RecoveryView;
