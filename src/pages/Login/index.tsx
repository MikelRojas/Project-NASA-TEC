import React, { useState } from "react";
import './styles.css';
import appFirebase from "../../credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { setUserInfo } from "../../common/userInfo";

export const Login: React.FC = () => {
  const [register, setRegister] = useState(false);

  const functAutentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('name') as string;
    const correo = formData.get('email') as string;
    const password = formData.get('password') as string;

    const auth = getAuth(appFirebase);
    const firestore = getFirestore(appFirebase);

    if (register) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: nombre
          });
          // Inicializar perfil de usuario en Firestore
          await setDoc(doc(firestore, "users", userCredential.user.uid), {
            name: nombre,
            email: correo,
            selectedEvents: [] // Array vacío inicial
          });
          console.log("User registered successfully");
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, correo, password);
        if (userCredential.user) {
          // Obtener datos del usuario desde Firestore
          const userDoc = await getDoc(doc(firestore, "users", userCredential.user.uid));
          if (userDoc.exists()) {
            console.log("User data:", userDoc.data());
          } else {
            console.log("No such document!");
          }
          console.log("User signed in successfully");
          setUserInfo(userCredential.user);
        }
      } catch (error) {
        console.error('Error signing in user:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="col-md-5">
        <div className="main-class">
          <div className="card card-body shadow-lg">
            <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="User Profile" className="user-image" />
            <form onSubmit={functAutentication}>
              {register && (
                <input type="text" name="name" placeholder="Input Name" className="text-box" />
              )}
              <input type="email" name="email" placeholder="Input Email" className="text-box" />
              <input type="password" name="password" placeholder="Input Password" className="text-box" />
              <button type="submit" className="button-form">{register ? "Register" : "Login"}</button>
            </form>
            <h4 className="h4-text">
              {register ? "If you have an account" : "If you don't have an account"}
              <button className="button-switch" onClick={() => setRegister(!register)}>
                {register ? "Login" : "Register"}
              </button>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
