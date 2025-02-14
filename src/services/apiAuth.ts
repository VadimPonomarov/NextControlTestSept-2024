import {getAxios} from "@/services/axios/getAxios.ts";
import {
    IDummyAuth,
    IDummyAuthLoginResponse,
    IDummyAuthMeResponse,
    IDummyAuthRefreshBody,
    IDummyAuthRefreshResponse
} from "@/common/interfaces/dummy.interfaces.ts";
import {AxiosResponse} from "axios";
import {baseUrl} from "@/common/constants/constants.ts";

const apiAuth = getAxios(baseUrl)
export const apiAuthService = {
    login: async (credentials: IDummyAuth): Promise<AxiosResponse<IDummyAuthLoginResponse>> => {
        try {
            const response = await apiAuth.post<AxiosResponse<IDummyAuthLoginResponse>>(
                "/auth/login",
                credentials,
                {withCredentials: true, withXSRFToken: true}
            );
            return await response.data
        } catch (e) {
            console.log(e);
        }
    },
    refresh: async (body: IDummyAuthRefreshBody): Promise<AxiosResponse<IDummyAuthRefreshResponse>> => {
        try {
            const response = await apiAuth.post<AxiosResponse<IDummyAuthRefreshResponse>>(
                "refresh",
                body,
            );
            return await response.data
        } catch (e) {
            console.log(e);
        }
    },
    me: async (): Promise<AxiosResponse<IDummyAuthMeResponse>> => {
        try {
            const response = await apiAuth.get<AxiosResponse<IDummyAuthMeResponse>>("me");
            return response.data
        } catch (e) {
            console.log(e);
        }
    },
};
