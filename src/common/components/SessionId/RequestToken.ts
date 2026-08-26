import {baseApi} from "@/app/baseApi.ts";
import {sessionResponseSchema} from "@/common/components/zodValidation/validation.ts";
type Response = {
    session_id: string;
    success: boolean;
}

type Params = {
    request_token: string;
}
export const MoviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getSessionId: build.mutation<Response, Params>({
            transformResponse: (response: unknown) => sessionResponseSchema.parse(response),
            query: (request_token) => {
                return {
                    method: 'post',
                    url: `authentication/session/new`,
                    body: {
                        request_token: request_token
                    }
                }

            },
        }),
    }),

})

export const {useGetSessionIdMutation} = MoviesApi
