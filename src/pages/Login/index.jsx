import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Input} from "@/shared/components/Input.jsx";
import {Alert} from "@/shared/components/Alert.jsx";
import {Button} from "@/shared/components/Button.jsx";
import {login} from "@/pages/Login/api.js";
import {useAuthDispatch} from "@/shared/state/context.jsx";
import {useNavigate} from "react-router-dom";

export function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [apiProgress, setApiProgress] = useState()
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState()
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();

    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                email: undefined
            }
        })
    }, [email])
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                password: undefined
            }
        })
    }, [password])
    const onSubmit = async (event) => {
        event.preventDefault();
        setGeneralError();
        setApiProgress(true)
        try {
          const response =   await login({email, password})
            dispatch({type: 'login-success',data:response.data.user})
            navigate("/")
        } catch (axiosError) {
            if (axiosError.response?.data) {
                if (axiosError.response.data.status === 400) {
                    setErrors(axiosError.response.data.validationErrors);
                } else {
                    setGeneralError(axiosError.response.data.message)
                }
            } else {
                setGeneralError(t('genericError'));
            }

        } finally {
            setApiProgress(false)
        }
    }

    return (
        <div>
            {/*style={{backgroundImage: "url('https://wallpapers.com/images/hd/920x1080-hd-winter-desktop-aunjplgwsf5lxmqf.jpg')", backgroundSize: 'cover', height: '100vh'}}*/}

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <form className="card p-4" onSubmit={onSubmit}
                              style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
                            <div className="text-center card-header">
                                <h1>{t('login')}</h1>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <Input
                                        id="email"
                                        label={t('email')}
                                        error={errors.email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Input
                                        type="password"
                                        id="password"
                                        label={t('password')}
                                        error={errors.password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                {generalError && (
                                    <Alert styleType="danger">{generalError}</Alert>
                                )}

                                <div className="text-center">
                                    <Button disabled={!email || !password}
                                            apiProgress={apiProgress}>{t('login')}</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}
