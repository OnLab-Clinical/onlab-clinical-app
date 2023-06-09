// domain
import { DomainError, DomainResponse, domainError } from '@/shared/types/domain';
import {
    PokemonEntity,
    PokemonRepository,
    PokemonRepositoryError,
    PokemonRepositoryReadAllProps,
} from '../../domain';
// utils
import axios from 'axios';
import { request } from '@/shared/utils';
// constants
import { Env } from '@/constants';

export class ApiPokemonRepository implements PokemonRepository {
    private pokemonProvider = axios.create({
        baseURL: Env.POKE_API,
    });

    async readAll(
        props: PokemonRepositoryReadAllProps
    ): Promise<DomainResponse<PokemonEntity[], DomainError<PokemonRepositoryError>>> {
        return await request({
            instance: this.pokemonProvider,
            path: '/pokemon',
            params: props,
            serializer: async data => {
                const pokemonList: PokemonEntity[] = [];

                for (const value of JSON.parse(data).results) {
                    const parts = value.url.split('/');
                    const pokemonId = parts[parts.length - 2];

                    const [pokemon, pokemonError] = await this.readById(pokemonId);

                    if (pokemonError != null) continue;

                    pokemonList.push(pokemon);
                }

                return [pokemonList, null];
            },
            errorSerializer: async error => {
                return [
                    [] as PokemonEntity[],
                    domainError(error.message as PokemonRepositoryError),
                ];
            },
        });
    }

    async readById(
        pokemonID: number
    ): Promise<DomainResponse<PokemonEntity, DomainError<PokemonRepositoryError>>> {
        return await request({
            instance: this.pokemonProvider,
            path: `/pokemon/${pokemonID}`,
            serializer: async data => {
                const parsed = JSON.parse(data);

                return [
                    {
                        ID: parsed.id,
                        name: parsed.name,
                        height: parsed.height,
                        weight: parsed.weight,
                        sprites: Object.keys(parsed.sprites).reduce((prev, current) => {
                            const currentValue = parsed.sprites[current];

                            if (currentValue == null || typeof currentValue != 'string')
                                return prev;

                            return [...prev, currentValue];
                        }, [] as string[]),
                    },
                    null,
                ];
            },
            errorSerializer: async error => {
                return [{} as PokemonEntity, domainError(error.message as PokemonRepositoryError)];
            },
        });
    }
}
