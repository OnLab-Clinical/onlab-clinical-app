// react
import { memo } from 'react';
// providers
import { LanguageProvider } from './contexts/core/language';
import { StoreProvider } from './contexts/core/store';
import { ThemeProvider } from './contexts/core/theme';
import { RoutesProvider } from './contexts/core/routes';
import { LoaderProvider } from './contexts/core/loader';
import { NotificationProvider } from './contexts/core/notification';
import { PWAProvider } from './contexts/core/pwa';

const App = memo(() => {
    return (
        <LanguageProvider>
            <StoreProvider>
                <ThemeProvider>
                    <RoutesProvider />

                    <LoaderProvider />

                    <NotificationProvider />

                    <PWAProvider />
                </ThemeProvider>
            </StoreProvider>
        </LanguageProvider>
    );
});

export default App;
