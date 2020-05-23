"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require('crypto');
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.getPKCEChallengePair = function () {
        var verifier = AuthService.base64URLEncode(crypto.randomBytes(32));
        var challenge = AuthService.base64URLEncode(AuthService.sha256(verifier));
        return { verifier: verifier, challenge: challenge };
    };
    AuthService.base64URLEncode = function (str) {
        return str.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    };
    AuthService.sha256 = function (buffer) {
        return crypto.createHash('sha256').update(buffer).digest();
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=pkce.js.map