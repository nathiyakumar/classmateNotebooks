import React from 'react';
import './DesignContestSuccessScreen.css';
import Media from "react-media";
import {small_screen} from "../../../variables";
import MobileDesignContestHeader from "../DesignContestHeader/MobileDesignContestHeader";
import DesignContestHeaders from "../DesignContestHeader/DesignContestHeader";

const fingerCrossed = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/finger-crossed.png';

class DesignContestSuccessScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(): void {
        let imageFile = this.props.location.state.image
        var output = document.getElementById('uploadImage');
        output.src = URL.createObjectURL(imageFile);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }

    }

    render() {
        return (
            <div>
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileDesignContestHeader />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <DesignContestHeaders/>
                    )}
                />
                <div className="design_contest_success_page">
                    <img id="uploadImage"  style={{width:'200px'}}/>
                    <img src={fingerCrossed} className='crossFingerImg'/>

                    <h2 style={{color:'#5F4DFF',marginBottom:'0px'}}>Fingers Crossed</h2>
                    <p>Your designs has been successfully submitted</p>
                    <button className="buyButton">BUY YOUR DESIGN</button>
                    <br />
                    <button className="backButton" onClick={()=>{
                        this.props.history.push('design-contest-home')
                    }}>BACK TO HOME</button>
                </div>
            </div>
        );
    }
}

export default DesignContestSuccessScreen
