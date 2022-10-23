import { apiV2 } from './taskApi';
import { LoginModel, ServerResponseType, UserData } from './type';


export const apiV3 = apiV2.injectEndpoints({
    endpoints:(build)=> ({
        signIn:build.mutation<ServerResponseType,LoginModel>({
            query:(arg)=> ({
                url:"signin",
                method:"POST",
                credentials:"include",
                body: {
                    email:arg.email,
                    password:arg.password,
                    client:"browser",
                }
            }),
        }),
        signOut:build.mutation<ServerResponseType,undefined>({
            query:()=>({
                url:"signout",
                method:"POST",
                credentials:"include",
            })
        }),
        authenticate:build.mutation<UserData,undefined>({
            query:(arg)=>({
                url:"authenticate",
                method:"POST",
                credentials:"include",
            })
        })
    }),
    overrideExisting:false,
})