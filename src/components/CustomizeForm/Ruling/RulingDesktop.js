import React from "react";
import './RulingDesktop.css';
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { addNotebookRuling} from '../../../Actions/index'
import VerticalLinearStepper from "../../VerticalLinearStepper/VerticalLinearStepper";
import {Box, Button, Container, Grid} from "@material-ui/core";

import Icon from "@material-ui/core/Icon";
import Header from "../../Header/Header";
import cogoToast from 'cogo-toast';

const ruled_icon  = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/ruled-icon.svg";
const unruled_icon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/unruled-icon.svg";



class RulingDesktopComponent extends React.Component{

    state = {
        ruling: 'Ruled'
    };

    componentDidMount() {
        // get the values from the redux store and save in the state
        this.setState({
            ruling:this.props.ruling
        })
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
            ruling:response.payload.notebook_ruling
        });
    }

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-size');
    }

    render() {
        return(
            <div>
                <header className="desktop_header_component">
                    <Header />
                </header>
                <div className="ruling_question_form_desktop">
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Box component="div" style={{textAlign: 'center',height:'100%'}}>
                                <img src={
                                    this.state.ruling === "Single Line" ?
                                        'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/notebook_ruled.png' :
                                        'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/unruled_notebook.png'
                                } alt="Notebook_Ruling" className="notebook_ruling_image"/>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box component="div">
                                <h4 className="form_title_desktop">
                                    DESIGN YOUR NOTEBOOK IN A FEW CLICKS
                                </h4>
                                <p className="question_desktop">3) Select Notebook Ruling</p>
                                <section className="ruling_section">
                                    <div>
                                        <input type="radio" id="Ruled" name="ruling" value="Single Line"
                                               checked={this.state.ruling === "Single Line"}
                                               onChange={this.handleChange}
                                               className="ruling_radio_inputs"
                                        />
                                        <label htmlFor="Ruled" className="ruling_label">
                                            <div className="ruling_option_image">
                                                <img src={ruled_icon} alt="page"/>
                                            </div>
                                            <p>Ruled</p>
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" id="UnRuled" name="ruling" value="Unruled"
                                               checked={this.state.ruling === "Unruled"}
                                               onChange={this.handleChange}
                                               className="ruling_radio_inputs"
                                        />
                                        <label htmlFor="UnRuled" className="ruling_label">
                                            <div className="ruling_option_image">
                                                <img src={unruled_icon} alt="page"/>
                                            </div>
                                            <p>No Ruled</p>
                                        </label>
                                    </div>
                                </section>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <VerticalLinearStepper current_active_step="2"/>
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
)(RulingDesktopComponent);

