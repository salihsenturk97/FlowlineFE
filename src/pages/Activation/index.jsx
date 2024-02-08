import {Alert} from "../../shared/components/Alert.jsx";
import {Spinner} from "../../shared/components/Spinner.jsx";
import {useRouteParamApiRequest} from "@/shared/hooks/useRouteParamApiRequest.js";
import {activateUser} from "./api.js";

export function Activation() {

    const {apiProgress, data, error} = useRouteParamApiRequest('token', activateUser);

    return (
        <>
            {apiProgress && (
                <Alert styleType="secondary" center>
                    <Spinner></Spinner>
                </Alert>

            )}

            {error && (
                <Alert styleType="danger">{error}</Alert>
            )}

            {data?.message && (
                <Alert>{data.message}</Alert>
            )}
        </>
    );

}