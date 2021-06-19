import React from 'react';
import loginClasses from './login.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/formsControl/FormsControl";
import {requiredField} from "../../utils/validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            
            <div className={loginClasses.login}>
                <Field component={Input} validate={[requiredField]} name='login' placeholder='login' />
            </div>
            
            <div className={loginClasses.password}>
                <Field component={Input} validate={[requiredField]} name='password' placeholder='password' />
            </div>
            
            <div className={loginClasses.checkbox}>
                <Field component={Input} name='rememberMe' type='checkbox' id='check'/>
                <label htmlFor="check">Remember me</label>
            </div>

            <div className={loginClasses.button}>
                <button>Submit</button>
            </div>
            
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
}) (LoginForm)

const Login = () => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div className={loginClasses.wrapper}>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
