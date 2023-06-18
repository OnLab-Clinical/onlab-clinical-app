export type NotificationKind = 'info' | 'success' | 'warning' | 'danger';

export type StandardNotification = {
    ID?: string;
    kind?: NotificationKind;
    message: string;
    timeout?: number;
};
