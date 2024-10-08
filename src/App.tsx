import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import appFirebase from "./credentials";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { setUserInfo } from "./common/userInfo";
import { TranslationProvider } from 'react-google-multi-lang';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        setUserInfo(usuarioFirebase); // Mueve esta línea aquí
      } else {
        setUsuario(null);
        setUserInfo(null); // Limpia la información del usuario
      }
    });

    // Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <div className="MyPage">     
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
