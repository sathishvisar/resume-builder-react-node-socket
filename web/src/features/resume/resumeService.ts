import { api } from "@/config/axios.config";

const List = async function () {
    const { data } = await api.get<any>('/resume/list')
    return data
}

const Create = async function () {
    const { data } = await api.get<any>('/resume/create')
    return data
}

const Read = async function (id: string) {
    const { data } = await api.get<any>(`/resume/read/${id}`)
    return data
}


const Update = async function (id: string) {
    const { data } = await api.get<any>(`/resume/update/${id}`)
    return data
}


export const resumeService = { List, Create, Read, Update };