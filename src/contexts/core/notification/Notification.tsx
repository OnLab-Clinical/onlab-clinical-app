// react
import { memo } from 'react';
// types
import { NotificationKind, StandardNotification } from './notification.type';
// utils
import { format, isDate } from 'date-fns';
import { classNames } from '@/shared/utils';
// hooks
import { useNotification } from './useNotification.hook';
import { useLanguage } from '../language';
// components
import { Icon } from '@/shared/components';
// assets
import {
    mdiAlertCircle,
    mdiCheckCircle,
    mdiCloseBox,
    mdiCloseCircle,
    mdiInformation,
} from '@mdi/js';

const Notification = memo(({ ID, kind, title, message, time }: StandardNotification) => {
    const { removeNotification } = useNotification();
    const { translate } = useLanguage();

    const styles: Record<NotificationKind, string> = {
        info: 'bg-info-600',
        success: 'bg-success-600',
        warning: 'bg-warning-600',
        danger: 'bg-danger-600',
    };

    const icon: Record<NotificationKind, string> = {
        info: mdiInformation,
        success: mdiCheckCircle,
        warning: mdiAlertCircle,
        danger: mdiCloseCircle,
    };

    const timestamp =
        isDate(new Date(time as number)) && format(time as number, 'do MMM yyyy - hh:mm aaa');

    return (
        <div
            className={classNames(
                'flex flex-row gap-2 p-2 items-center w-96 max-w-full text-light-300 rounded-sm',
                styles[kind ?? 'info']
            )}>
            <span className="text-5xl">
                <Icon path={icon[kind ?? 'info']} />
            </span>

            <div className="flex flex-col gap-2 flex-grow">
                <div className="flex flex-row gap-2 items-center">
                    {title && (
                        <h3 className="font-semibold" title={title}>
                            {title}
                        </h3>
                    )}

                    <button
                        className="ml-auto text-xl p-1 transition-all hover:scale-105 active:scale-95"
                        type="button"
                        onClick={() => removeNotification(ID as string)}
                        title={translate('actions.close')}>
                        <span>
                            <Icon path={mdiCloseBox} />
                        </span>
                    </button>
                </div>

                <p>{message}</p>

                {timestamp && (
                    <span className="text-sm text-right" title={timestamp}>
                        {timestamp}
                    </span>
                )}
            </div>
        </div>
    );
});

export default Notification;
