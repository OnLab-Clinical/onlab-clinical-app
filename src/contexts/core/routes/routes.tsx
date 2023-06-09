// react
import { createBrowserRouter } from 'react-router-dom';
// components
import { LanguageSwitcher } from '../language';
import { ThemeSwitcher } from '../theme';
// views

export const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <main className="flex flex-col m-4 gap-4">
                <h1>OnLab-Clinical WEB Application</h1>

                <LanguageSwitcher className="mr-auto" />

                <ThemeSwitcher className="mr-auto" />
            </main>
        ),
    },
]);
