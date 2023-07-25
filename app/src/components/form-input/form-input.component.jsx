const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className='d-grid px-2 mb-2'>
            <input className='py-2 px-3 rounded login-input-field' {...otherProps}></input>
            { label && <label htmlFor={`${label}`}><strong>{label}</strong></label>}
        </div>
    );
};

export default FormInput;