"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var authorization_request_1 = require("@openid/appauth/built/authorization_request");
var authorization_request_handler_1 = require("@openid/appauth/built/authorization_request_handler");
var authorization_service_configuration_1 = require("@openid/appauth/built/authorization_service_configuration");
var node_request_handler_1 = require("@openid/appauth/built/node_support/node_request_handler");
var node_requestor_1 = require("@openid/appauth/built/node_support/node_requestor");
var token_request_1 = require("@openid/appauth/built/token_request");
var token_request_handler_1 = require("@openid/appauth/built/token_request_handler");
var logger_1 = require("./logger");
var pkce_1 = require("./pkce");
var events_1 = require("events");
var AuthStateEmitter = /** @class */ (function (_super) {
    __extends(AuthStateEmitter, _super);
    function AuthStateEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthStateEmitter.ON_TOKEN_RESPONSE = 'on_token_response';
    return AuthStateEmitter;
}(events_1.EventEmitter));
exports.AuthStateEmitter = AuthStateEmitter;
/* the Node.js based HTTP client. */
var requestor = new node_requestor_1.NodeRequestor();
/* your Okta org URL */
var openIdConnectUrl = 'https://dev-669532.oktapreview.com/oauth2/default';
/* your Okta client configuration */
var clientId = '0oag8pxhaf8ufuymG0h7';
var redirectUri = 'http://localhost:8000';
var scope = 'openid profile offline_access';
var AuthFlow = /** @class */ (function () {
    function AuthFlow() {
        var _this = this;
        this.notifier = new authorization_request_handler_1.AuthorizationNotifier();
        this.authStateEmitter = new AuthStateEmitter();
        this.authorizationHandler = new node_request_handler_1.NodeBasedHandler();
        this.tokenHandler = new token_request_handler_1.BaseTokenRequestHandler(requestor);
        // set notifier to deliver responses
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);
        // set a listener to listen for authorization responses
        // make refresh and access token requests.
        this.notifier.setAuthorizationListener(function (request, response, error) {
            logger_1.log('Authorization request complete ', request, response, error);
            if (response) {
                _this.makeRefreshTokenRequest(response.code)
                    .then(function (result) { return _this.performWithFreshTokens(); })
                    .then(function () {
                    _this.authStateEmitter.emit(AuthStateEmitter.ON_TOKEN_RESPONSE);
                    logger_1.log('All Done.');
                });
            }
        });
        this.challengePair = pkce_1.AuthService.getPKCEChallengePair();
    }
    AuthFlow.prototype.fetchServiceConfiguration = function () {
        var _this = this;
        return authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl, requestor).then(function (response) {
            logger_1.log('Fetched service configuration', response);
            _this.configuration = response;
        });
    };
    AuthFlow.prototype.makeAuthorizationRequest = function (username) {
        if (!this.configuration) {
            logger_1.log('Unknown service configuration');
            return;
        }
        var extras = { prompt: 'consent', access_type: 'offline' };
        if (username) {
            extras['login_hint'] = username;
        }
        // PKCE
        extras['code_challenge'] = this.challengePair.challenge;
        extras['code_challenge_method'] = 'S256';
        // create a request
        var request = new authorization_request_1.AuthorizationRequest(clientId, redirectUri, scope, authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE, undefined /* state */, extras);
        logger_1.log('Making authorization request ', this.configuration, request);
        this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
    };
    AuthFlow.prototype.makeRefreshTokenRequest = function (code) {
        var _this = this;
        if (!this.configuration) {
            logger_1.log('Unknown service configuration');
            return Promise.resolve();
        }
        var tokenRequestExtras = { code_verifier: this.challengePair.verifier };
        // use the code to make the token request.
        var request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_AUTHORIZATION_CODE, code, undefined, tokenRequestExtras);
        return this.tokenHandler
            .performTokenRequest(this.configuration, request)
            .then(function (response) {
            logger_1.log("Refresh Token is " + response.refreshToken);
            _this.refreshToken = response.refreshToken;
            _this.accessTokenResponse = response;
            return response;
        })
            .then(function () { });
    };
    AuthFlow.prototype.loggedIn = function () {
        return !!this.accessTokenResponse && this.accessTokenResponse.isValid();
    };
    AuthFlow.prototype.signOut = function () {
        // forget all cached token state
        this.accessTokenResponse = undefined;
    };
    AuthFlow.prototype.performWithFreshTokens = function () {
        var _this = this;
        if (!this.configuration) {
            logger_1.log('Unknown service configuration');
            return Promise.reject('Unknown service configuration');
        }
        if (!this.refreshToken) {
            logger_1.log('Missing refreshToken.');
            return Promise.resolve('Missing refreshToken.');
        }
        if (this.accessTokenResponse && this.accessTokenResponse.isValid()) {
            // do nothing
            return Promise.resolve(this.accessTokenResponse.accessToken);
        }
        var request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_REFRESH_TOKEN, undefined, this.refreshToken);
        return this.tokenHandler
            .performTokenRequest(this.configuration, request)
            .then(function (response) {
            _this.accessTokenResponse = response;
            return response.accessToken;
        });
    };
    return AuthFlow;
}());
exports.AuthFlow = AuthFlow;
//# sourceMappingURL=flow.js.map