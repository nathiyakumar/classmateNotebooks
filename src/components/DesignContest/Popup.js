import React from "react";
import './Popup.css';
import DesignContestLoginForm from "./DesignContestLogin/DesignContestLoginForm";
import Fab from '@material-ui/core/Fab';


import DesignContestSignup from "./DesignContestLogin/DesignContestSignup";


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
                        <div className='popup_design_content'  style={{ zIndex: '1500'}}   >
                            <div className='popup_inner_design_contest' >
                                <div className="popup_close_btn">
                                    <div  onClick={this.props.closeLoginForm} className="fab_close_btn_design_contest">
                                        <img src={CloseIcon} alt="closeicon"/>
                                    </div>
                                </div>
                                {
                                    this.state.activeForm === 'login'?
                                        <DesignContestLoginForm
                                            closeLoginForm={this.props.closeLoginForm}
                                            handleFormChange={this.handleFormChange}
                                            AddUserDataToProvider = {AuthProviderData.addUserData}
                                            completeLogin={this.props.completeLogin}
                                            goToMyorders={this.props.goToMyorders?this.props.goToMyorders:""}
                                        />:
                                        <DesignContestSignup
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
