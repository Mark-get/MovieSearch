import {baseApi} from "@/app/baseApi.ts";
import {requestTokenResponseSchema} from "@/common/components/zodValidation/validation.ts";
type Response = {
    request_token: string;
    expires_at: string;
    success: boolean;
}
export const MoviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getRequestToken: build.query<Response, void>({
            transformResponse: (response: unknown) => requestTokenResponseSchema.parse(response),
            query: () => {
                return {
                    url: `authentication/token/new`,
                }
            },
        }),
    }),

})

export const {useGetRequestTokenQuery} = MoviesApi
