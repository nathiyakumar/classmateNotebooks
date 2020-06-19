import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';

import '../Page/PageMobile.css';
import {addNotebookBinding} from "../../../Actions";
import {compose} from "redux";
import {connect} from "react-redux";
import MobileHorizontalProgressBar from "../../MobileHorizontalProgressBar/MobileHorizontalProgressBar";
import cogoToast from 'cogo-toast';


const centerStable = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/center_stabled_icon.svg";
const Spiro = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/wiro-icon.svg";


class BindingMobile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            binding:'',
            step: 0,
            completed:3
        }
    }

    componentDidMount() {
        // get the values from the redux store and save in the state
        if(this.props.binding !== ""){
            this.setState({
                binding:this.props.binding,
                step:4
            })
        } else {
            this.setState({
                step:3
            })
        }

        if(this.props.page === "" || this.props.size === "" || this.props.ruling === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }



    saveAndContinue = e => {
        e.preventDefault();
        if(this.state.binding === null ||  this.state.binding === undefined || this.state.binding === ""){
            // alert('Please choose the Notebook binding');
            cogoToast.error("Please choose the Notebook binding",{ position: 'bottom-center'});

        } else {
            this.props.history.push('/classmate-customised-notebooks/select-quantity');
        }
    };

    handleChange = (e) => {
        let response =  this.props.sendBindingToStore(e.target.value);
        this.setState({
            binding:response.payload.notebook_binding,
            step:4
        });
    };

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-ruling');
    };


    render(){

        return(
            <div className="mobile_spec_field_component">
                <h3>DESIGN YOUR NOTEBOOK IN A FEW CLICKS</h3>
                <p>4) Notebook Binding</p>
                <section className="sectionArea spec_field_section">
                    <div>
                        <input type="radio" id="centerStable" name="binding" value="BPCS"
                               checked={this.state.binding === "BPCS"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label className="label"  htmlFor="centerStable">
                            <div className="option_image">
                                <img src={centerStable} alt="binding"/>
                            </div>
                            <p>Center Stapled</p>
                        </label>
                    </div>
                    <div>
                        <input type="radio" id="spiro" name="binding" value="Wiro"
                               checked={this.state.binding === "Wiro"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label className="label" htmlFor="spiro">
                            <div className="option_image">
                                <img src={Spiro} alt="binding"/>
                            </div>
                            <p>Spiral</p>
                        </label>
                    </div>
                </section>
                <Button onClick={this.back} style={{padding:' 12px 8px'}}>Back</Button>
                <span className='span-ctn'>
                <button
                    className="ctnu-btn"
                    type="button" onClick={this.saveAndContinue}>
                    CONTINUE <span style={{marginBottom: '0px',}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{marginBottom: '-7px'}} viewBox="0 0 18 18"><path fill='#ffffff' d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z"/></svg></span>
                </button>
                </span>
                <MobileHorizontalProgressBar step={this.state.step} completed={this.state.completed}/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    binding: state.specifications.notebook_binding,
    ruling: state.specifications.notebook_ruling,
    size: state.specifications.notebook_size,
    page:state.specifications.notebook_page
});

const mapDispatchToProps = dispatch => ({
    sendBindingToStore: selected_binding => dispatch(addNotebookBinding(selected_binding))
});


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(BindingMobile);
