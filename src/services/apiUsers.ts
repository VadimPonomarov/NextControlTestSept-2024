import {IUser, IUserCartResponse, IUsersResponse} from "@/common/interfaces/users.interfaces.ts";
import {baseUrl} from "@/common/constants/constants.ts";
import {getAxios} from "@/services/axios/getAxios.ts";

const api = getAxios(baseUrl + "/users");
export const apiUsers = {
    usersAll: async (): Promise<IUsersResponse> => {
        try {
            const response = await api.get("", {
                params: {limit:"0"}
            });
            return await response.data;
        } catch (e) {
            console.error(e);
        }
    },
    users: async (params: Record<string, string>): Promise<IUsersResponse> => {
        try {
            const qParams = new URLSearchParams(params as Record<string, string>);
            const response = await api.get("", {
                params: qParams
            });
            return await response.data;
        } catch (e) {
            console.error(e);
        }
    },
    userById: async (userId: string): Promise<IUser> => {
        try {
            const response = await api.get(`/${userId}`);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    userByIdCarts: async (userId: string): Promise<IUserCartResponse> => {
        try {
            const response = await api.get(`/${userId}/carts`);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
};
