import { apiV2 } from './taskApi';
import { LoginModel, ServerResponseType, UserData, SignUpModel } from './type';


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
                },
            }),
        }),
        signOut:build.mutation<ServerResponseType,undefined>({
            query:()=>({
                url:"signout",
                method:"POST",
                credentials:"include",
            }),
            invalidatesTags:[{type:"Users",id:"sign-in"}]
        }),
        authenticate:build.query<UserData,string>({
            query:(arg)=>({
                url:"authenticate",
                credentials:"include",
            }),
            keepUnusedDataFor:60,
            providesTags: [{type:"Users",id:"sign-in"}]
        }),
        signUp:build.mutation<ServerResponseType,SignUpModel>({
            query:(arg)=> ({
                url:"sign-up",
                method:"POST",
                credentials:"include",
                body: {
                    email:arg.email,
                    userName:arg.userName,
                    password:arg.password,
                    client:"browser",
                },
            }),
            invalidatesTags:[{type:"Users",id:"sign-in"}]
        })

    }),
    overrideExisting:false,
})