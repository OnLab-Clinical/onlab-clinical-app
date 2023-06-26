// react
import { memo, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
// hooks
import { useNotification } from '../notification';
import { useLanguage } from '../language';
// components
import { Button, Icon } from '@/shared/components';
// assets
import { mdiCloseCircle, mdiRefreshCircle } from '@mdi/js';

const PWAProvider = memo(() => {
    // states
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered:', r);
        },
        onRegisterError(error) {
            console.log('SW registration error:', error);
        },
    });

    const { addNotification } = useNotification();
    const { translate } = useLanguage();

    // actions
    const closeNeedRefresh = () => {
        setNeedRefresh(false);
    };

    const refreshPage = () => {
        updateServiceWorker(true);
    };

    // reactivity
    useEffect(() => {
        if (!offlineReady) return;

        addNotification({
            kind: 'info',
            title: 'Offline',
            message: 'Ready to work offline',
        });

        setOfflineReady(false);
    }, [addNotification, offlineReady, setOfflineReady]);

    return (
        <>
            {needRefresh && (
                <div className="fixed bottom-0 left-0 m-4 bg-dark-600 p-2 text-light-300 rounded-sm flex flex-col gap-2">
                    <p className="font-medium text-center">{translate('app.refresh')}</p>

                    <div className="grid grid-cols-2 gap-2 ml-auto">
                        <Button
                            type="button"
                            className="flex flex-row gap-2 justify-center items-center px-2"
                            onClick={closeNeedRefresh}
                            title={translate('actions.close')}>
                            <span className="text-xl">
                                <Icon path={mdiCloseCircle} />
                            </span>

                            <span>{translate('actions.close')}</span>
                        </Button>

                        <Button
                            type="button"
                            styleStrategy="warning"
                            className="flex flex-row gap-2 justify-center items-center px-2"
                            onClick={refreshPage}
                            title={translate('actions.reload')}>
                            <span className="text-xl">
                                <Icon path={mdiRefreshCircle} />
                            </span>

                            <span>{translate('actions.reload')}</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
});

export default PWAProvider;
