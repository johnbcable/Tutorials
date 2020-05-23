/// <reference types="node" />
export declare class AuthService {
    static getPKCEChallengePair(): {
        verifier: string;
        challenge: string;
    };
    static base64URLEncode(str: Buffer): string;
    static sha256(buffer: string): Buffer;
}
