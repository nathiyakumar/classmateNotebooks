import React from "react";
import './BindingDesktop.css';
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { addNotebookBinding } from '../../../Actions/index'
import {Box, Button, Container, Grid} from "@material-ui/core";

import Icon from "@material-ui/core/Icon";
import VerticalLinearStepper from "../../VerticalLinearStepper/VerticalLinearStepper";
import Header from "../../Header/Header";
import cogoToast from 'cogo-toast';


const center_stabled_icon  = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/center_stabled_icon.svg";
const wiro_icon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/wiro-icon.svg";

class BindingDesktopComponent extends React.Component{

    state = {
        binding: 'Center Stabled'
    };

    componentDidMount() {


        // get the values from the redux store and save in the state
        this.setState({
            binding:this.props.binding
        });
        if(this.props.page === "" || this.props.size === "" || this.props.ruling === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }

    saveAndContinue = e => {
        e.preventDefault();
        if(this.state.binding === null ||  this.state.binding === undefined || this.state.binding === ""){
            cogoToast.error("Please choose the Notebook binding",{ position: 'top-center'});
        } else {
            this.props.history.push('/classmate-customised-notebooks/select-quantity');
        }
    };

    handleChange = (e) => {
        let response =  this.props.sendBindingToStore(e.target.value);
        this.setState({
            binding:response.payload.notebook_binding
        });
    };

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-ruling');
    };

    render() {
        return(
            <div>
                <header className="desktop_header_component">
                    <Header />
                </header>
                <div className="binding_question_form_desktop">
                    <Grid container spacing={0}>
                        <Grid item xs={4} style={{margin:'auto 0'}}>
                            <Box component="div" style={{display:'table',margin:'0 auto',height:'100%'}}>
                                <div>
                                    <div className={ this.state.binding === "BPCS" ? "center_stabled_notebooks" : "wiro_notebooks"}>
                                        <div className="notebook_center_part"></div>
                                    </div>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box component="div">
                                <h4 className="form_title_desktop">
                                    DESIGN YOUR NOTEBOOK IN A FEW CLICKS
                                </h4>
                                <p className="question_desktop">4) Select Notebook Binding</p>
                                <section className="binding_section">
                                    <div>
                                        <input type="radio" id="center_stabled" name="binding" value="BPCS"
                                               checked={this.state.binding === "BPCS"}
                                               onChange={this.handleChange}
                                               className="binding_radio_inputs"
                                        />
                                        <label htmlFor="center_stabled" className="binding_label">
                                            <div className="binding_option_image">
                                                <img src={center_stabled_icon} alt="page"/>
                                            </div>
                                            <p>Center Stapled</p>
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" id="wiro_binding" name="binding" value="Wiro"
                                               checked={this.state.binding === "Wiro"}
                                               onChange={this.handleChange}
                                               className="binding_radio_inputs"
                                        />
                                        <label htmlFor="wiro_binding" className="binding_label">
                                            <div className="binding_option_image">
                                                <img src={wiro_icon} alt="page"/>
                                            </div>
                                            <p>Spiral</p>
                                        </label>
                                    </div>
                                </section>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <VerticalLinearStepper current_active_step="3"/>
                        </Grid>
                    </Grid>
                </div>
                <Container maxWidth={"xl"} className="button_section_desktop">
                    <Box component="div" className="btn_section">
                        <Button onClick={this.back} > <Icon className="fa fa-arrow-left "
                                                            style={{fontSize: 16, margin: "0 15px"}}/> Back</Button>
                        <Button onClick={this.saveAndContinue} className="continue_btn_desktop">Continue <Icon
                            className="fa fa-arrow-right " style={{fontSize: 16, margin: "0 15px"}}/> </Button>
                    </Box>
                </Container>
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
)(BindingDesktopComponent);

