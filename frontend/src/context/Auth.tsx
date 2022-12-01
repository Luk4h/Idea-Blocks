import { useState, createContext, useContext } from "react";

const AuthContext = createContext<any>({})

// Sistema de verificação se o usuário esta logado no painel.

const AuthProvider = ({ children }: any) => {

    const [token, setToken] = useState<string | undefined>(() => {
        const isToken = sessionStorage.getItem('@idea-blocks:token')
        return isToken ? isToken : undefined;
    })
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = sessionStorage.getItem('@idea-blocks:token');
        console.log((isLogged) ? true : false)
        return (isLogged) ? true : false
    })

     const signIn = async (username : string, password : string) => {
        let options = {
             method: 'post',
             body: JSON.stringify({"username": username, "password": password}),
             headers: {'Content-Type': 'application/json'}
           };

         const response = await fetch('http://192.168.1.7:8181' + '/signin', options)

         if (response.status == 200 ) {
            var data:{"accessToken":string} = await response.json();
            sessionStorage.setItem('@idea-blocks:token', data.accessToken);
            setLogged( true );
            setToken( token)
             return true
         } else {
             return false
         }
     }

     const signUp = async (fullname:string, username : string, password : string) => {
        let options = {
            method: 'post',
            body: JSON.stringify({"fullName": fullname, "username": username, "password": password}),
            headers: {'Content-Type': 'application/json'}
        };

        const response = await fetch('http://192.168.1.7:8181' + '/signup', options)
        if (response.status == 200 ) {
            return signIn(username, password);
        } else {
            return false
        }
     }
    const signOut = async () => {
        sessionStorage.removeItem('@idea-blocks:token');
        setLogged(state => state = false);

    }

    return (
        <AuthContext.Provider value={{ token, logged, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}
export { AuthContext, AuthProvider, useAuth }
