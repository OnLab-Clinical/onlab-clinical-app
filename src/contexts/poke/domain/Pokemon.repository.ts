// domain
import { DomainError, DomainResponse } from '@/shared/types/domain';
import { PokemonEntity } from './Pokemon.entity';

export type PokemonRepositoryError = `pokemonRepository.${``}`;

export type PokemonRepositoryReadAllProps = {
    limit: number;
    offset: number;
};

export interface PokemonRepository {
    readAll(
        props: PokemonRepositoryReadAllProps
    ): Promise<DomainResponse<PokemonEntity[], DomainError<PokemonRepositoryError>>>;
    readById(
        pokemonID: number
    ): Promise<DomainResponse<PokemonEntity, DomainError<PokemonRepositoryError>>>;
}
