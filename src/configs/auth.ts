import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiAuthService } from "@/services/apiAuth.ts";
import { IDummyAuth } from "@/common/interfaces/dummy.interfaces.ts";

export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    required: true,
                },
                password: {
                    label: "password",
                    type: "password",
                    required: true,
                },
                expiresInMins: {
                    label: "expiresInMins",
                    type: "number",
                    required: true,
                },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password || !credentials?.expiresInMins) return null;

                try {
                    const response = await apiAuthService.login(credentials as unknown as IDummyAuth);

                    // Проверка, что данные пользователя корректны
                    if (!response.data || !response.data.id) {
                        throw new Error("Invalid login response");
                    }

                    return { ...response.data, id: response.data.id.toString() } as unknown as User;
                } catch (error) {
                    console.error("Error in authorize function: ", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin", // Укажите путь к вашей форме авторизации
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
};



