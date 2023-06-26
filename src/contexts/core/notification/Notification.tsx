// react
import { memo } from 'react';
// types
import { NotificationKind, StandardNotification } from '@/shared/types';
// utils
import { classNames } from '@/shared/utils';
// hooks
import { useNotification } from './useNotification.hook';
import { useLanguage } from '../language';
// components
import { Icon } from '@/shared/components';
// assets
import { mdiAlertCircle, mdiCheckCircle, mdiClose, mdiCloseCircle, mdiInformation } from '@mdi/js';

const Notification = memo(({ ID, kind, message }: StandardNotification) => {
    const { removeNotification } = useNotification();
    const { translate } = useLanguage();

    const styles: Record<NotificationKind, string> = {
        info: 'bg-info-500 border-l-info-700',
        success: 'bg-success-500 border-l-success-700',
        warning: 'bg-warning-600 border-l-warning-800',
        danger: 'bg-danger-500 border-l-danger-700',
    };

    const icon: Record<NotificationKind, string> = {
        info: mdiInformation,
        success: mdiCheckCircle,
        warning: mdiAlertCircle,
        danger: mdiCloseCircle,
    };

    return (
        <div
            className={classNames(
                'flex flex-row gap-2 p-2 items-center w-96 max-w-full text-light-300 font-medium rounded-sm border-l-4',
                styles[kind ?? 'info']
            )}>
            <span className="text-5xl">
                <Icon path={icon[kind ?? 'info']} />
            </span>

            <p className="flex-grow">{message}</p>

            <button
                className="self-start text-xl p-1 transition-all hover:scale-105 active:scale-95"
                type="button"
                onClick={() => removeNotification(ID as string)}
                title={translate('actions.close')}>
                <span>
                    <Icon path={mdiClose} />
                </span>
            </button>
        </div>
    );
});

export default Notification;
