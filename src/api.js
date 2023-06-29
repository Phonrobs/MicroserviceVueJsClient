import user from "./user"

export default {
    async getApi(endpoint) {
        let token = await user.getToken();
        if (!token) return null

        const headers = new Headers();
        const bearer = `Bearer ${token.accessToken}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        const result = await fetch(endpoint, options)
            .then(response => response.json())
            .catch(error => console.log(error));

        return result;
    },
    async postApi(endpoint, data) {
        let token = await user.getToken();
        if (!token) return null

        const headers = new Headers();
        const bearer = `Bearer ${token.accessToken}`;

        headers.append("Authorization", bearer);
        headers.append("Content-Type", "application/json")

        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        };

        const result = await fetch(endpoint, options)
            .then(response => response.json())
            .catch(error => console.log(error));

        return result;
    },
}