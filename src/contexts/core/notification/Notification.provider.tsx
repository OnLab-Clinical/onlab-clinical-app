// react
import { memo } from 'react';
import { createPortal } from 'react-dom';
// hooks
import { useNotification } from './useNotification.hook';
// layouts
import { ScrollLayout } from '@/shared/layouts';
// components
import Notification from './Notification';

const NotificationProvider = memo(() => {
    const { notificationList } = useNotification();

    if (notificationList.length === 0) return null;

    return createPortal(
        <ScrollLayout
            className="fixed top-0 right-0 z-[300] max-h-full max-w-full p-4 pointer-events-none"
            classNameContent="pointer-events-auto"
            direction="top-bottom">
            <ul className="flex flex-col gap-2">
                {notificationList.map((notification, index) => (
                    <li key={index}>
                        <Notification {...notification} />
                    </li>
                ))}
            </ul>
        </ScrollLayout>,
        document.getElementById('notify') as HTMLElement
    );
});

export default NotificationProvider;
