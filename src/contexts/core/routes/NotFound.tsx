// react
import { memo } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useLanguage } from '../language';
// layouts
import { PanelLayout } from '@/shared/layouts';

const NotFound = memo(() => {
    const { translate } = useLanguage();

    return (
        <main className="flex-grow flex flex-col justify-center items-center p-4">
            <PanelLayout className="items-center w-full max-w-sm">
                <h1 className="text-xl font-medium">{translate('app.title')}</h1>

                <span className="font-medium">{translate('app.not-found')}</span>

                <Link to="/" replace className="text-secondary-600 underline">
                    {translate('app.start')}
                </Link>
            </PanelLayout>
        </main>
    );
});

export default NotFound;
