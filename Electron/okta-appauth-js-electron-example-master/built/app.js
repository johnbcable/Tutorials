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
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var flow_1 = require("./flow");
var logger_1 = require("./logger");
var SIGN_IN = 'Sign-In';
var SIGN_OUT = 'Sign-Out';
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.authFlow = new flow_1.AuthFlow();
        this.userInfo = null;
        this.handleSignIn = document.querySelector('#handle-sign-in');
        this.fetchUserInfo = document.querySelector('#handle-user-info');
        this.userCard = document.querySelector('#user-info');
        this.userProfileImage = document.querySelector('#user-profile-image');
        this.userName = document.querySelector('#user-name');
        this.snackbarContainer = document.querySelector('#appauth-snackbar');
        this.initializeUi();
        this.handleSignIn.addEventListener('click', function (event) {
            if (_this.handleSignIn.textContent === SIGN_IN) {
                _this.signIn();
            }
            else if (_this.handleSignIn.textContent === SIGN_OUT) {
                _this.signOut();
            }
            event.preventDefault();
        });
        this.fetchUserInfo.addEventListener('click', function () {
            _this.authFlow.performWithFreshTokens().then(function (accessToken) {
                var request = new Request('https://dev-669532.oktapreview.com/oauth2/default/v1/userinfo', {
                    headers: new Headers({ 'Authorization': "Bearer " + accessToken }),
                    method: 'GET',
                    cache: 'no-cache'
                });
                fetch(request)
                    .then(function (result) { return result.json(); })
                    .then(function (user) {
                    logger_1.log('User Info ', user);
                    _this.userInfo = user;
                    _this.updateUi();
                })
                    .catch(function (error) {
                    logger_1.log('Something bad happened ', error);
                });
            });
        });
        this.authFlow.authStateEmitter.on(flow_1.AuthStateEmitter.ON_TOKEN_RESPONSE, function () {
            _this.updateUi();
            //  request app focus
            electron_1.ipcRenderer.send('app-focus');
        });
    }
    App.prototype.signIn = function (username) {
        var _this = this;
        if (!this.authFlow.loggedIn()) {
            return this.authFlow.fetchServiceConfiguration().then(function () { return _this.authFlow.makeAuthorizationRequest(username); });
        }
        else {
            return Promise.resolve();
        }
    };
    App.prototype.initializeUi = function () {
        this.handleSignIn.textContent = SIGN_IN;
        this.fetchUserInfo.style.display = 'none';
        this.userCard.style.display = 'none';
    };
    // update ui post logging in.
    App.prototype.updateUi = function () {
        this.handleSignIn.textContent = SIGN_OUT;
        this.fetchUserInfo.style.display = '';
        if (this.userInfo) {
            this.userProfileImage.src = "" + this.userInfo.picture;
            this.userName.textContent = this.userInfo.name;
            this.showSnackBar({ message: "Welcome " + this.userInfo.name, timeout: 4000 });
            this.userCard.style.display = '';
        }
    };
    App.prototype.showSnackBar = function (data) {
        this.snackbarContainer.MaterialSnackbar.showSnackbar(data);
    };
    App.prototype.signOut = function () {
        this.authFlow.signOut();
        this.userInfo = null;
        this.initializeUi();
    };
    return App;
}());
exports.App = App;
logger_1.log('Init complete');
var app = new App();
//# sourceMappingURL=app.js.map