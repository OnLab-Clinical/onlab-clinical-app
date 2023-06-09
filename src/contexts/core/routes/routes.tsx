// react
import { createBrowserRouter } from 'react-router-dom';
// views
import { PokemonListView } from '@/contexts/poke/infra/views';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <h1>PWA Template</h1>,
    },
    {
        path: '/pokemons',
        element: <PokemonListView />,
    },
]);
