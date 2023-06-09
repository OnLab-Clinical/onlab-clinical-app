export interface QueryUseCase<Request, Response> {
    query(req: Request | null): Promise<Response>;
}
