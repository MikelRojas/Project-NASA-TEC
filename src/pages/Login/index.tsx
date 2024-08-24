import React, { useState } from "react";
import './styles.css';
import appFirebase from "../../credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { setUserInfo } from "../../common/userInfo";
import { useNavigate } from "react-router-dom";
import { PopupMessage } from "../../components/PopupMessage";

export const Login: React.FC = () => {
  const [register, setRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const functAutentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('name') as string;
    const correo = formData.get('email') as string;
    const password = formData.get('password') as string;

    const auth = getAuth(appFirebase);
    const firestore = getFirestore(appFirebase);

    if (password.length < 6) {
      setErrorMessage("The password must be at least 6 characters.");
      setShowPopup(true);
      return;
    }

    if (register) {
      try {
        const userDoc = await getDoc(doc(firestore, "users", correo)); // Usar UID si es necesario
        if (userDoc.exists()) {
          setErrorMessage("An account already exists with this email.");
          setShowPopup(true);
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
          if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: nombre });
            await setDoc(doc(firestore, "users", userCredential.user.uid), {
              name: nombre,
              email: correo,
              selectedEvents: []
            });
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrorMessage("There was an error registering the user.");
        setShowPopup(true);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, correo, password);
        if (userCredential.user) {
          // Introduce un breve retraso si es necesario
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (!userCredential.user) {
            setErrorMessage("The account does not exist in Firestore. Register to continue.");
            setRegister(true); // Cambia a registro
            setShowPopup(true);
          } else {
            setUserInfo(userCredential.user);
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error signing in user:', error);
        if (error instanceof Error && error.message === 'auth/user-not-found') {
          setErrorMessage("User not found. Please register.");
          setRegister(true); // Cambia a registro
        } else {
          setErrorMessage("Failed to log in. Verify your credentials.");
        }
        setShowPopup(true);
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
      {showPopup && errorMessage && (
        <PopupMessage
          title="Error"
          message={errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
