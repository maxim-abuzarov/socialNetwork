import React from 'react';
import loginClasses from './login.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/formsControl/FormsControl";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/reducers/authReducer";
import {Redirect} from "react-router-dom";
import formControlClasses from './../common/formsControl/formscontol.module.css';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            
            <div className={loginClasses.login}>
                <Field component={Input} validate={[requiredField]} name='email' placeholder='email' type='email' />
            </div>
            
            <div className={loginClasses.password}>
                <Field component={Input} validate={[requiredField]} name='password' placeholder='password' type='password' />
            </div>
            
            <div className={loginClasses.checkbox}>
                <Field component={Input} name='rememberMe' type='checkbox' id='check'/>
                <label htmlFor="check">Remember me</label>
            </div>

            {props.error
                && <div className={formControlClasses.formSummaryError}> {props.error} </div>
            }

            <div className={loginClasses.button}>
                <button>Submit</button>
            </div>
            
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
}) (LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div className={loginClasses.wrapper}>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login, logout})(Login);
