import React from "react";
import { withRouter } from 'react-router-dom';
import './PageMobile.css';

import {compose} from "redux";
import {connect} from "react-redux";
import MobileHorizontalProgressBar from "../../MobileHorizontalProgressBar/MobileHorizontalProgressBar";
import {addNotebookPage} from "../../../Actions";
import cogoToast from 'cogo-toast';

const Page140 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pages-140.svg';
const Page172 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pages-172.svg';

class PageMobile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            page:'',
            step:0,
            completed:0
        }
    }

    componentDidMount(){
        // get the values from the redux store and save in the state
        if(this.props.page !== ""){
            this.setState({
                page:this.props.page,
                step:1
            })
        } else {
            this.setState({
                step:0
            })
        }
    }

    saveAndContinue = e => {
        cogoToast.info("Orders for personalized notebooks will be resumed soon.", { position: 'top-center'});

        // e.preventDefault();
        // if(this.state.page === null ||  this.state.page === undefined || this.state.page === ""){
        //     cogoToast.error("Please choose the Notebook pages",{ position: 'bottom-center'});

        // } else {
        //     this.props.history.push('/classmate-customised-notebooks/select-size');
        // }
    };

    handleChange = e => {
        let response =  this.props.sendPageToStore(e.target.value);
        this.setState({
            page:response.payload.notebook_page,
            step:1
        });
    }


    render(){



        return(
            <div className="mobile_spec_field_component">
                {/*<Container maxwidth={"xl"}>*/}
                <h3>DESIGN YOUR NOTEBOOK IN A FEW CLICKS</h3>
                <p>1) Number of Pages</p>
                <section className="sectionArea spec_field_section">
                    <div>
                        <input type="radio" id="page_140" name="pages" value="140"
                               checked={this.state.page === "140"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label className="label" htmlFor="page_140">
                            <div className="option_image">
                                <img src={Page140} alt="page"/>
                            </div>
                            <p>140 Pages</p>
                        </label>
                    </div>
                    <div>
                        <input type="radio" id="page_172" name="pages" value="172"
                               checked={this.state.page === "172"}
                               onChange={this.handleChange}
                               className="mobile_radio_inputs"
                        />
                        <label className="label" htmlFor="page_172">
                            <div className="option_image">
                                <img src={Page172} alt="page"/>
                            </div>
                            <p>172 Pages</p>
                        </label>
                    </div>
                </section>
                <span className='span-ctn'  style={{marginBottom: '15px',}}>
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
    page: state.specifications.notebook_page,
})

const mapDispatchToProps = dispatch => ({
    sendPageToStore: selected_page => dispatch(addNotebookPage(selected_page))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(PageMobile);
