export type NotificationKind = 'info' | 'success' | 'warning' | 'danger';

export type StandardNotification = {
    ID?: string;
    title?: string;
    kind?: NotificationKind;
    message: string;
    time?: number;
    timeout?: number;
};
