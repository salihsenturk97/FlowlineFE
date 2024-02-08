import http from "../../lib/http.js";
 export function getUser(id) {
    return http.get(`/api/v1/users/${id}`)
}