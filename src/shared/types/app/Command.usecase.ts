export interface CommandUseCase<Request, Error> {
    command(req: Request | null): Promise<Error | null>;
}
