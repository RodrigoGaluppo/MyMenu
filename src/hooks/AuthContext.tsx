import React,{createContext, useCallback,useState,useContext} from "react"
import api from "../services/apiClient"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import Router from "next/router"

export interface Iuser{
    id:string
    name:string,
    email:string,
    menuName:string,
    bgColor:string,
    fontColor:string,
    frontColor:string
}

interface IAuthContext{
    token:string
    user:Iuser
    signIn(credentials:Idata): Promise<void>
    signOut():void
    updateUser(Newuser:Iuser):void
}

interface Idata{
    email:string
    password:string
}

interface IAuthState{
    user:Iuser
    token:string
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({children}: {children:React.ReactNode})=>{


    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [data,setData] = useState<IAuthState>( ()=>{
        const cookies = parseCookies()

        const token = cookies["@paraisoMenu:token"]
        const user = cookies["@paraisoMenu:user"]
        
        if (token && user){
            return { token , user:JSON.parse(user)}
        }else{
            return {} as IAuthState
        }
    })


    const signIn = async ({email,password}:Idata)=>{

        const res = await api.post("login",{
            email,password
        })
        const {token,user} = res.data
        
        setCookie(undefined, "@paraisoMenu:token", token,
        {
            maxAge: 60 * 60 * 1 // 1 hour
        }
        )
        setCookie(undefined, "@paraisoMenu:user", JSON.stringify(user),
        {
            maxAge: 60 * 60 * 1 // 1 hour
        }
        )

        const cookies = parseCookies()
        api.interceptors.request.use((config) => {

            if(!!cookies["@paraisoMenu:token"])
            {
                const token = cookies["@paraisoMenu:token"]
                if(!!config.headers)
                {
                    config.headers.Authorization = `Bearer ${token}`
                }
            }
            
            return config;
        })                                                                                                                                
        setData({token,user:user})
        /* eslint-disable react-hooks/exhaustive-deps */    
    }

    const signOut = useCallback(()=>{

        Router.push("/")

        destroyCookie(undefined, "@paraisoMenu:token")
        destroyCookie(undefined, "@paraisoMenu:user")

        setData({} as IAuthState)
        /* eslint-disable react-hooks/exhaustive-deps */       
    },[])

    const updateUser = (Newuser:Iuser)=>{

        destroyCookie(undefined, "@paraisoMenu:user")

        setCookie(undefined, "@paraisoMenu:user", JSON.stringify(data.user))
        
        setData({user:Newuser,token:data.token})
        
        /* eslint-disable react-hooks/exhaustive-deps */       
    }


    return(
        <AuthContext.Provider value={{user:data.user,token:data.token,signIn,signOut,updateUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
