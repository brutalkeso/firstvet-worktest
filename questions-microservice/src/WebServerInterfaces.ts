export interface ServerRequest {
    headers: { [key: string]: string }
    body: any
}

export interface ServerResponse {
    status(code: number): ServerResponse
    send(value?: any): ServerResponse
}