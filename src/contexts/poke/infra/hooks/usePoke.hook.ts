// react
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// store
import { pokeActions, pokeState } from '../reducers';
// hooks
import { useLoader } from '@/contexts/core/loader';
import { useNotification } from '@/contexts/core/notification';
// use case
import { ApiPokemonRepository } from '../repos';
import { PokemonListQuery, PokemonListRequest } from '../../app';

export const usePoke = () => {
    // use case
    const pokemonRepository = useMemo(() => new ApiPokemonRepository(), []);
    const pokemonListUseCase = useMemo(
        () => new PokemonListQuery(pokemonRepository),
        [pokemonRepository]
    );

    // states
    const { pokemonList } = useSelector(pokeState);
    const dispatch = useDispatch();

    // utils
    const { showLoader, hideLoader } = useLoader();
    const { addNotification } = useNotification();

    // get pokemon list from api service
    const requestPokemonList = useCallback(
        async (props: PokemonListRequest) => {
            showLoader();

            const [pokeList, pokeListError] = await pokemonListUseCase.query(props);

            if (pokeListError != null) {
                addNotification({
                    message: pokeListError.message,
                    kind: 'danger',
                });

                return hideLoader();
            }

            dispatch(pokeActions.setPokemonList(pokeList));

            hideLoader();

            addNotification({
                message: `Listed ${pokeList.length} pokemons`,
                kind: 'info',
            });
        },
        [addNotification, dispatch, hideLoader, pokemonListUseCase, showLoader]
    );

    return { pokemonList, requestPokemonList };
};
