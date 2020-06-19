import React from "react";
import { withRouter } from 'react-router-dom';
import { Button} from "@material-ui/core";

import '../Page/PageMobile.css';
import MobileHorizontalProgressBar from "../../MobileHorizontalProgressBar/MobileHorizontalProgressBar";
import {addNotebookSize} from "../../../Actions";
import {compose} from "redux";
import {connect} from "react-redux";
import cogoToast from 'cogo-toast';


const small  = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/size-29.7cmx21cm.svg";
const large = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/size-24cmx18cm.svg";


class SizeMobile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            size:'',
            step: 0,
            completed:1
        }
    }
    componentDidMount(){
        // get the values from the redux store and save in the state
        if(this.props.size !== ""){
            this.setState({
                size:this.props.size,
                step:2
            })
        } else {
            this.setState({
                step:1
            })
        }

        if(this.props.page === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }

    saveAndContinue = e => {
        e.preventDefault();
        if(this.state.size === null ||  this.state.size === undefined || this.state.size === ""){
            // alert('Please choose the Notebook size');
            cogoToast.error("Please choose the Notebook size",{ position: 'bottom-center'});

        } else {
            this.props.history.push('/classmate-customised-notebooks/select-ruling');
        }
    };

    handleChange = (e) => {
        let response =  this.props.sendSizeToStore(e.target.value);
        this.setState({
            size:response.payload.notebook_size,
            step:2
        });
    }

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-pages');
    }

    render(){

        return(
            <div className="mobile_spec_field_component">
                {/*<Container maxwidth={"xl"}>*/}
                <h3>DESIGN YOUR NOTEBOOK IN A FEW CLICKS</h3>
                <p>2) Size of Notebook.</p>
                <section className="sectionArea spec_field_section">
                    <div>
                        <input type="radio" id="small" name="sizes" value="240 x 180"
                               checked={this.state.size === "240 x 180"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label htmlFor="small" className="label">
                            <div className="option_image">
                                <img src={small} alt="size"/>
                            </div>
                            <p>Short Notebook</p>
                        </label>
                    </div>
                    <div>
                        <input type="radio" id="large" name="sizes" value="297 x 210"
                               checked={this.state.size === "297 x 210"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label htmlFor="large"  className="label">
                            <div className="option_image">
                                <img src={large} alt="size"/>
                            </div>
                            <p>Long Notebook</p>
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
    size: state.specifications.notebook_size,
    page:state.specifications.notebook_page
})

const mapDispatchToProps = dispatch => ({
    sendSizeToStore: selected_size => dispatch(addNotebookSize(selected_size))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(SizeMobile);
