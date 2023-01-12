export default class Api {
    //Get запрос
    getRequest = async (url, method = 'GET') => {
        const fullUrl = 'http://localhost:8080' + url;
        const res = await fetch(fullUrl, {
            method: method,
        });
        return res.json();
    };

    //Post запрос
    sendFormData = async (url, method, body) => {
        const fullUrl = 'http://localhost:8080' + url;
        const res = await fetch(fullUrl, {
            method: method,
            body: body,
        });
        return res.json();
    };

    createPlayer = async (formData) => {
        return await this.sendFormData(`/api/player`, 'POST', formData);
    };

    updatePlayer = async (formData) => {
        return await this.sendFormData(`/api/update-player`, 'POST', formData);
    };

    getPlayersOnDate = async (formData) => {
        return await this.sendFormData(`/api/get-players-on-date`, 'POST', formData);
    };

    getPlayers = async () => {
        return await this.getRequest(`/api/player`);
    };

    deletePlayer = async (id) => {
        return await this.getRequest(`/api/delete-player/${id}`);
    };
}
