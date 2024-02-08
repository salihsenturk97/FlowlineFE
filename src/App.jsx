import {Outlet} from "react-router-dom";
import {LanguageSelector} from "./shared/components/LanguageSelector.jsx";
import {NavBar} from "./shared/components/NavBar.jsx";
import {AuthenticationContext} from "@/shared/state/context.jsx";

function App() {
    return (
        <AuthenticationContext>
            <NavBar/>
            <div className="container mt-3">
                {/*<Login onLoginSuccess={onLoginSuccess}></Login>*/}
                <Outlet/>
                <LanguageSelector/>
            </div>
        </AuthenticationContext>
    )
}
export default App
