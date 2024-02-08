export function Input(props) {

    const {id,label,error, onChange,type} = props ;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input type={type} id={id}
                   className={error ? "form-control is-invalid" : "form-control"}
                   onChange={onChange}/>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}