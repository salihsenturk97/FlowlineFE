import logo from "@/assets/flowline.png";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useAuthDispatch, useAuthState} from "@/shared/state/context.jsx";

export function NavBar() {
    const {t} = useTranslation()
    const authState = useAuthState();
    const dispatch = useAuthDispatch();


    const onClickLogout = ()=>{
        dispatch({type: 'logout-success'})
    }
    return (
        <nav className="navbar navbar-dark shadow-sm navbar-expand-lg bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60" alt="Flowline Logo"/>
                    Flowline
                </Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {authState.id === 0 &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        {t('login')}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        {t('signUp')}
                                    </Link>
                                </li>
                            </>

                        }
                        {authState.id > 0 && (
                            <>
                                <li className="nav-item">
                                <Link className="nav-link" to={`/user/${authState.id}`}>
                                    {t('myProfile')}
                                </Link>

                            </li>

                                <li className="nav-item">
                                <span className="nav-link" role="button" onClick={onClickLogout}>
                                   {t('logout')}
                                </span>
                                </li>
                            </>


                        )}
                    </ul>
                </div>
            </div>
        </nav>

    )
}