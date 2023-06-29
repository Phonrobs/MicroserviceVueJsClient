import msal from "@azure/msal-browser";
import authConfig from "./authConfig";

const msalObj = new msal.PublicClientApplication(authConfig.msalConfig);

let username = "";

export default {
    getUsername: () => username,
    signIn(success, error) {
        msalObj.loginPopup(authConfig.loginRequest)
            .then(response => {
                username = response.account.username;
                success(username);
            })
            .catch(err => {
                error(err);
            });
    },
    signOut() {
        const logoutRequest = {
            account: msalObj.getAccountByUsername(username),
            postLogoutRedirectUri: authConfig.msalConfig.auth.redirectUri,
            mainWindowRedirectUri: authConfig.msalConfig.auth.redirectUri
        };

        msalObj.logoutPopup(logoutRequest);
    },
    getToken() {
        let request = authConfig.tokenRequest;
        request.account = msalObj.getAccountByUsername(username);

        return msalObj.acquireTokenSilent(request)
            .catch(error => {
                if (error instanceof msal.InteractionRequiredAuthError) {
                    return msalObj.acquireTokenPopup(request)
                        .then(tokenResponse => {
                            console.log(tokenResponse);
                            return tokenResponse;
                        }).catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log(error);
                }
            });
    }
}