import {Alert} from "../../shared/components/Alert.jsx";
import {Spinner} from "../../shared/components/Spinner.jsx";
import {useRouteParamApiRequest} from "@/shared/hooks/useRouteParamApiRequest.js";
import {getUser} from "./api.js";
import {ProfileCard} from "./components/ProfileCard/index.jsx";

export function User() {

    const {apiProgress,data:user,error} = useRouteParamApiRequest('id',getUser)

    return (
        <>
            {apiProgress && (
                <Alert styleType="secondary" center>
                    <Spinner></Spinner>
                </Alert>

            )}

            {user && (
               <ProfileCard user={user}/>
            )}

            {error && (
                <Alert styleType="danger">{error}</Alert>
            )}
        </>
    );
}