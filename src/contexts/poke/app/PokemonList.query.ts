// domain
import { DomainError, DomainResponse, domainError } from '@/shared/types/domain';
import { PokemonEntity, PokemonError, PokemonRepository, PokemonRepositoryError } from '../domain';
// app
import { QueryUseCase } from '@/shared/types/app';

export type PokemonListRequest = {
    limit: number;
    offset: number;
};

export type PokemonListError =
    | PokemonError
    | PokemonRepositoryError
    | `pokemonList.${`limit.${`min`}` | `offset.${`notValid`}`}`;

type PokemonListResponse = DomainResponse<PokemonEntity[], DomainError<PokemonListError>>;

export class PokemonListQuery implements QueryUseCase<PokemonListRequest, PokemonListResponse> {
    constructor(private pokemonRepo: PokemonRepository) {}

    async query({ limit, offset }: PokemonListRequest): Promise<PokemonListResponse> {
        if (limit == null || limit < 10) return [[], domainError('pokemonList.limit.min')];

        if (offset == null || offset < 0) return [[], domainError('pokemonList.offset.notValid')];

        const [pokemonList, pokemonListError] = await this.pokemonRepo.readAll({
            limit,
            offset,
        });

        if (pokemonListError != null) return [[], pokemonListError];

        return [pokemonList, null];
    }
}
