import axios from "axios";

const apiVersion = "v1";
const accessVersion = "v1";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000,
})

export const Api = {
    //Api
    addUser: async (userParams) => await api.post(`/api/${apiVersion}/user`, userParams),
    updateUser: async (userParams, token, id) => await api.put(`/api/${apiVersion}/user?token=${token}&id=${id}`, userParams),

    //Access
    login: async (loginParams) => await api.post(`/access/${accessVersion}/login`, loginParams),
    activeAccount: async (email, link) => await api.post(`/access/${accessVersion}/active-account`, { email, link }),
    changePassword: async (email, link) => await api.post(`/access/${accessVersion}/change-password`, { email, link }),
    ping: async (token) => await api.get(`/access/${accessVersion}/ping?token=${token}`),
}