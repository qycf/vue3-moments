import { alovaInstance } from '~/composables/request'
import { useRequest } from 'alova'


export interface USER {
    id: number,
    username: string,
    email: string,
    role: string,
    createTime: string
}

export interface AUTH {
    Authorization: string
    userInfo: USER
}

export const LoginRsp = () => {
    const { data, send, loading } = useRequest(
        (LoginForm) => alovaInstance.Post<AUTH>('/auth/login', LoginForm),
        {
            immediate: false,
        },
    )
    return { data, send, loading }
}