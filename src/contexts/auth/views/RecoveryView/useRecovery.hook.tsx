// react
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// props
import { RecoveryContextProps, RecoveryFormData } from './Recovery.props';
// hooks
import { useLoader } from '@/contexts/core/loader';
import { useNotification } from '@/contexts/core/notification';
import { useLanguage } from '@/contexts/core/language';
// utils
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailValidation } from '../../validations';
// repositories
import { recoveryRepository } from '../../repositories';

const recoveryValidation = yup.object({
    email: emailValidation,
});

export const useRecovery = () => {
    // states
    const form = useForm<RecoveryFormData>({
        mode: 'all',
        resolver: yupResolver(recoveryValidation),
    });

    const { showLoader, hideLoader } = useLoader();

    const { addNotification } = useNotification();

    const { translate } = useLanguage();

    const navigate = useNavigate();

    // actions
    const handleRecovery = form.handleSubmit(async data => {
        showLoader();

        const response = await recoveryRepository(data);

        if (!response.success) {
            addNotification({
                message: response.message,
                kind: response.kind,
            });

            return hideLoader();
        }

        addNotification({
            message: translate('auth.recovery.success'),
            kind: response.kind,
            timeout: 14 * 1000,
        });

        navigate('../sign-in', { replace: true });

        hideLoader();
    });

    // context
    const context: RecoveryContextProps = useMemo(
        () => ({
            // values
            form,
            // actions
            handleRecovery,
        }),
        [form, handleRecovery]
    );

    return { context };
};
