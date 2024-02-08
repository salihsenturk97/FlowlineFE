import http from "../../lib/http.js";

export function login(credentials){
    return http.post('/api/v1/auth',credentials);
}