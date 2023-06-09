// domain
import { DomainError, DomainResponse, domainError } from '@/shared/types/domain';

export type PokemonError = `pokemon.${
    | `id.${`notValid`}`
    | `name.${`notValid`}`
    | `height.${`notValid`}`
    | `weight.${`notValid`}`
    | `sprites.${`min`}`}`;

export interface PokemonEntity {
    ID: number;
    name: string;
    height: number;
    weight: number;
    sprites: string[];
}

export function createPokemon({
    ID,
    name,
    height,
    weight,
    sprites,
}: PokemonEntity): DomainResponse<PokemonEntity, DomainError<PokemonError>> {
    if (ID == null || ID <= 0) return [{} as PokemonEntity, domainError('pokemon.id.notValid')];

    if (name == null || name.length === 0)
        return [{} as PokemonEntity, domainError('pokemon.name.notValid')];

    if (height == null || height <= 0)
        return [{} as PokemonEntity, domainError('pokemon.height.notValid')];

    if (weight == null || weight <= 0)
        return [{} as PokemonEntity, domainError('pokemon.weight.notValid')];

    if (!Array.isArray(sprites) || sprites.length == 0)
        return [{} as PokemonEntity, domainError('pokemon.sprites.min')];

    return [
        {
            ID,
            name,
            height,
            weight,
            sprites,
        },
        null,
    ];
}
