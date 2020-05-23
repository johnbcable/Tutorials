/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class AuthStateEmitter extends EventEmitter {
    static ON_TOKEN_RESPONSE: string;
}
export declare class AuthFlow {
    private notifier;
    private authorizationHandler;
    private tokenHandler;
    readonly authStateEmitter: AuthStateEmitter;
    private challengePair;
    private configuration;
    private refreshToken;
    private accessTokenResponse;
    constructor();
    fetchServiceConfiguration(): Promise<void>;
    makeAuthorizationRequest(username?: string): void;
    private makeRefreshTokenRequest;
    loggedIn(): boolean;
    signOut(): void;
    performWithFreshTokens(): Promise<string>;
}
