import React, { useState } from "react";
import './styles.css'
import appFirebase from "../../credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


export const Login: React.FC<{}> = () =>{
    const[register, setRegister] = useState(false);

    const functAutentication = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    

        const formData = new FormData(e.currentTarget);
        const correo = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        if (register) {
          try {
            await createUserWithEmailAndPassword(getAuth(appFirebase), correo, password);
          } catch (error) {
            console.error('Error registering user:', error);
          }
        } else {

          try {
            await signInWithEmailAndPassword(getAuth(appFirebase), correo, password);

          } catch (error) {
            console.error('Error login user', error);
          }
        }
      };

    return(
        <div className="bg-image">
            <div className="container">
                <div className="col-md-5">
                    <div className="main-class">
                        <div className="card card-body shadow-lg">
                        <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="User Profile" className="user-image" />
                            <form onSubmit={functAutentication}>
                                <input type="text" placeholder="Input Email" className="text-box" id="email"/>
                                <input type="password" placeholder="Input password" className="text-box" id="passwod"/>
                                <button className="button-form">{register? "Register" : "Login"}</button>
                            </form>
                            <h4 className="h4-text">{register? "If you have account" : "If not have account"}<button className="button-switch" onClick={()=>setRegister(!register)}>{register? "Login" : "Register"}</button></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

