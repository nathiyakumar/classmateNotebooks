import React from "react";
import './Popup.css';
import LoginForm from "../LoginForm/LoginForm";
import Fab from '@material-ui/core/Fab';


import SignupForm from "../SignupForm/SignupForm";


import AuthContext from "../AuthProvider/auth-context";

const CloseIcon = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Icon-Close-Outlined.svg';



class Popup extends React.Component {
    state = {
        activeForm:'login'
    }


    handleFormChange = (form) => {
        this.setState({
            activeForm:form
        })
    }

    render() {

        return (

            <AuthContext.Consumer>
                {AuthProviderData => (
                    <>
                        <div className='popup'  style={{ zIndex: '1500'}}   >
                            <div className='popup_inner' >
                                <div className="popup_close_btn">
                                    <Fab  onClick={this.props.closeLoginForm} className="fab_close_btn">
                                        <img src={CloseIcon} alt="closeicon"/>
                                    </Fab>
                                </div>
                                {
                                    this.state.activeForm === 'login'?
                                        <LoginForm
                                            closeLoginForm={this.props.closeLoginForm}
                                            handleFormChange={this.handleFormChange}
                                            AddUserDataToProvider = {AuthProviderData.addUserData}
                                            completeLogin={this.props.completeLogin}
                                            goToMyorders={this.props.goToMyorders?this.props.goToMyorders:""}
                                        />:
                                        <SignupForm
                                            closeLoginForm={this.props.closeLoginForm}
                                            handleFormChange={this.handleFormChange}
                                            AddUserDataToProvider = {AuthProviderData.addUserData}
                                            completeLogin={this.props.completeLogin}
                                        />
                                }


                            </div>
                        </div>
                    </>
                )}
            </AuthContext.Consumer>
        );
    }
}

export default Popup;
