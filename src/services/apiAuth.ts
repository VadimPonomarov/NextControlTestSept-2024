import {getAxios} from "@/services/axios/getAxios.ts";
import {
    IDummyAuth,
    IDummyAuthLoginResponse,
    IDummyAuthMeResponse,
    IDummyAuthRefreshBody,
    IDummyAuthRefreshResponse
} from "@/common/interfaces/dummy.interfaces.ts";
import {baseUrl} from "@/common/constants/constants.ts";

const apiAuth = getAxios(baseUrl)
export const apiAuthService = {
    login: async (credentials: IDummyAuth): Promise<IDummyAuthLoginResponse> => {
        try {
            const response = await apiAuth.post<IDummyAuthLoginResponse>(
                "/auth/login",
                credentials,
                {withCredentials: true, withXSRFToken: true}
            );
            return response.data
        } catch (e) {
            console.log(e);
        }
    },
    refresh: async (body: IDummyAuthRefreshBody): Promise<IDummyAuthRefreshResponse> => {
        try {
            const response = await apiAuth.post<IDummyAuthRefreshResponse>(
                "refresh",
                body,
            );
            return response.data
        } catch (e) {
            console.log(e);
        }
    },
    me: async (): Promise<IDummyAuthMeResponse> => {
        try {
            const response = await apiAuth.get<IDummyAuthMeResponse>("me");
            return response.data
        } catch (e) {
            console.log(e);
        }
    },
};
