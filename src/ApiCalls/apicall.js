import axios from "axios"; 
import { backend_url } from "../utils/urls";

export const loginUser = (user) => {
    return axios.post(`${backend_url}/api/login`, user).then((res) => {
        return res
    })
} 

export const signupUser = (user) => {
    return axios.post(`${backend_url}/api/signup`, user).then((res) => {
        return res
    })
} 

export const GetAreas = () => {
    return axios.get(`${backend_url}/api/get_areas`).then((res) => {
        return res
    })
} 

export const checkWithToken = (data) => {
    return axios.post(`${backend_url}/api/verify_token`, data).then((res) => {
        return res
    })
}