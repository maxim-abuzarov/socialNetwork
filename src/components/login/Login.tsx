import React, {FC} from 'react'
import loginClasses from './login.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from '../common/formsControl/FormsControl'
import {requiredField} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/reducers/authReducer'
import {Redirect} from 'react-router-dom'
import formControlClasses from './../common/formsControl/formscontol.module.css'
import {AppStateType} from '../../redux/store';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            
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

            {error
                && <div className={formControlClasses.formSummaryError}> {error} </div>
            }

            {captchaUrl && <img src={captchaUrl} alt='Captcha' className={loginClasses.captcha}/>}
            {captchaUrl && <div className={loginClasses.login}><Field component={Input} validate={[requiredField]} name='captcha' placeholder='Enter captcha' /></div>}

            <div className={loginClasses.button}>
                <button>Submit</button>
            </div>
            
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
}) (LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: FC<MapStatePropsType & MapDispatchPropsType> = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div className={loginClasses.wrapper}>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
}

export default connect(mapStateToProps, {login})(Login);
