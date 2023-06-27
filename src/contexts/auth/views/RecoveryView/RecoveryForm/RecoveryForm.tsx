// react
import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useRecoveryForm } from './useRecoveryForm.hook';
// layouts
import { PanelLayout } from '@/shared/layouts';
// components
import { Button, Icon, InputField } from '@/shared/components';
// assets
import { mdiArrowLeft } from '@mdi/js';

const RecoveryForm = memo(() => {
    const { handleRecovery, recoveryFormFields, recoveryAction, translate } = useRecoveryForm();

    return (
        <form className="w-full max-w-sm" onSubmit={handleRecovery}>
            <PanelLayout>
                <div className="flex flex-col items-center text-center font-semibold">
                    <Link
                        to="../sign-in"
                        replace
                        className="text-secondary-500 underline font-medium flex flex-row gap-2 items-center self-start mb-1">
                        <Icon path={mdiArrowLeft} className="text-xl" />

                        <span>{translate('auth.recovery.sign-in-nav')}</span>
                    </Link>

                    <h1 className="text-2xl">{translate('app.title')}</h1>

                    <h2 className="text-lg">{translate('auth.recovery.title')}</h2>
                </div>

                <fieldset className="flex flex-col gap-4">
                    {recoveryFormFields.map((field, index) => (
                        <Fragment key={index}>
                            <InputField {...field} />
                        </Fragment>
                    ))}
                </fieldset>

                <Button {...recoveryAction} />
            </PanelLayout>
        </form>
    );
});

export default RecoveryForm;
