// react
import { memo, useEffect } from 'react';
// hooks
import { usePoke } from '../../hooks';
// components
import { LanguageSwitcher } from '@/contexts/core/language';
import { ThemeSwitcher } from '@/contexts/core/theme';

const PokemonListView = memo(() => {
    const { pokemonList, requestPokemonList } = usePoke();

    useEffect(() => {
        requestPokemonList({ limit: 20, offset: 0 });
    }, [requestPokemonList]);

    return (
        <main className="flex flex-col gap-2 p-2">
            <LanguageSwitcher className="mr-auto" />

            <ThemeSwitcher className="mr-auto" />

            {pokemonList.map((value, index) => (
                <div key={index}>
                    <span>{value.name}</span>

                    <ul className="flex gap-2">
                        {value.sprites.map((imgURL, imgIndex) => (
                            <li key={`${index}_${imgIndex}`}>
                                <img src={imgURL} alt={`${value.name}_${imgIndex}`} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </main>
    );
});

export default PokemonListView;
