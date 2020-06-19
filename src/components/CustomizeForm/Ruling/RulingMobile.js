import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';
import '../Page/PageMobile.css';
import {addNotebookRuling} from "../../../Actions";
import {compose} from "redux";
import {connect} from "react-redux";
import MobileHorizontalProgressBar from "../../MobileHorizontalProgressBar/MobileHorizontalProgressBar";
import cogoToast from 'cogo-toast';

const ruled  = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/ruled-icon.svg";
const unRuled = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/unruled-icon.svg";



class RulingMobile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ruling:'',
            step: 0,
            completed:2
        }
    }
    componentDidMount() {
        // get the values from the redux store and save in the state
        if(this.props.ruling !== ""){
            this.setState({
                ruling:this.props.ruling,
                step:3
            })
        } else {
            this.setState({
                step:2
            })
        }

        if(this.props.page === "" || this.props.size === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }

    saveAndContinue = e => {
        e.preventDefault();
        if(this.state.ruling === null ||  this.state.ruling === undefined || this.state.ruling === ""){
            // alert('Please choose the Notebook ruling');
            cogoToast.error("Please choose the Notebook ruling",{ position: 'top-center'});

        } else {
            this.props.history.push('/classmate-customised-notebooks/select-binding');
        }
    };

    handleChange = (e) => {
        let response =  this.props.sendRulingToStore(e.target.value);
        this.setState({
            ruling:response.payload.notebook_ruling,
            step:3
        });
    }

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-size');
    }

    render(){

        return(
            <div className="mobile_spec_field_component">
                <h3>DESIGN YOUR NOTEBOOK IN A FEW CLICKS</h3>
                <p>3) Page Ruling</p>
                <section className="sectionArea spec_field_section">
                    <div>
                        <input type="radio" id="ruled" name="ruling" value="Single Line"
                               checked={this.state.ruling === "Single Line"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label htmlFor="ruled"  className="label">
                            <div className="option_image">
                                <img src={ruled} alt="ruling"/>
                            </div>
                            <p>Ruled</p>
                        </label>
                    </div>
                    <div>
                        <input type="radio" id="unRuled" name="ruling" value="Unruled"
                               checked={this.state.ruling === "Unruled"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label htmlFor="unRuled"  className="label">
                            <div className="option_image">
                                <img src={unRuled} alt="ruling"/>
                            </div>
                            <p>Unruled</p>
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
    ruling: state.specifications.notebook_ruling,
    size: state.specifications.notebook_size,
    page:state.specifications.notebook_page
})

const mapDispatchToProps = dispatch => ({
    sendRulingToStore: selected_ruling => dispatch(addNotebookRuling(selected_ruling))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(RulingMobile);


