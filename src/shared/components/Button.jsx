import {Spinner} from "@/shared/components/Spinner.jsx";

export function Button({apiProgress,disabled,children}){
    return(
        <button
            className="btn btn-primary"
            disabled={apiProgress || disabled}
        >
            {apiProgress && <Spinner sm={true}></Spinner>}
            {children}
        </button>
    )
}