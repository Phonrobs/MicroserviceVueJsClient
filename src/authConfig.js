import msal from "@azure/msal-browser"

export default {
    msalConfig: {
        auth: {
            clientId: "91f59099-4671-4721-be47-845f836757a7",
            authority: "https://login.microsoftonline.com/d7cbbb08-47a3-4bd7-8347-5018f2744cfb",
            redirectUri: "https://localhost:5001",
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false,
        },
        system: {
            loggerOptions: {
                loggerCallback: (level, message, containsPii) => {
                    if (containsPii) {
                        return;
                    }
                    switch (level) {
                        case msal.LogLevel.Error:
                            console.error(message);
                            return;
                        case msal.LogLevel.Info:
                            console.info(message);
                            return;
                        case msal.LogLevel.Verbose:
                            console.debug(message);
                            return;
                        case msal.LogLevel.Warning:
                            console.warn(message);
                            return;
                    }
                }
            }
        }
    },

    loginRequest: {
        scopes: ["User.Read"]
    },

    tokenRequest: {
        scopes: ["api://9aaca41c-6d86-4b18-96f0-05c7787d9b34/access_as_user"],
        forceRefresh: false
    }
}