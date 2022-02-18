export default class Token {
    tokenHeaders() {
        return {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.token
        };
    }
    tokenHeadersFormData() {
        return {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.token
        };
    }
}