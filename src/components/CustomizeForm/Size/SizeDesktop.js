import React from "react";
import './SizeDesktop.css';
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import {addNotebookSize} from '../../../Actions/index'
import VerticalLinearStepper from "../../VerticalLinearStepper/VerticalLinearStepper";
import {Box, Button, Container, Grid} from "@material-ui/core";

import Icon from "@material-ui/core/Icon";
import Header from "../../Header/Header";
import cogoToast from 'cogo-toast';

const size1_image  = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/size-29.7cmx21cm.svg";
const size2_image = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/size-24cmx18cm.svg";

class SizeDesktopComponent extends React.Component{

    state = {
        size: ''
    };

    componentDidMount() {
        // get the values from the redux store and save in the state
        this.setState({
            size:this.props.size
        })
        if(this.props.page === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }



    saveAndContinue = e => {
        e.preventDefault();
        if(this.state.size === null ||  this.state.size === undefined || this.state.size === ""){
            cogoToast.error("Please choose the Notebook size",{ position: 'top-center'});

            // alert('Please choose the Notebook size');
        } else {
            this.props.history.push('/classmate-customised-notebooks/select-ruling');
        }
    };

    handleChange = (e) => {
        let response =  this.props.sendSizeToStore(e.target.value);
        this.setState({
            size:response.payload.notebook_size
        });
    }

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-pages');
    }

    render() {
        return(
            <div>
                <header className="desktop_header_component">
                    <Header />
                </header>
                <div className="size_question_form_desktop">
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Box component="div" style={{textAlign: 'center',height:'100%'}}>
                                <img src={
                                    this.state.size === "297 x 210" ? 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/notebook_size_image.png' : 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/notebook_size_image.png'
                                } alt="Notebook_Size" className={ this.state.size === "297 x 210"? "notebook_size_image":"notebook_size_image desc_short_notebook"}/>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box component="div">
                                <h4 className="form_title_desktop">
                                    DESIGN YOUR NOTEBOOK IN A FEW CLICKS
                                </h4>
                                <p className="question_desktop">2) Size of the Notebook</p>
                                <section className="size_section">
                                    <div>
                                        <input type="radio" id="size_1" name="sizes" value="297 x 210"
                                               checked={this.state.size === "297 x 210"}
                                               onChange={this.handleChange}
                                               className="size_radio_inputs"
                                        />
                                        <label htmlFor="size_1" className="size_label">
                                            <div className="size_option_image">
                                                <img src={size2_image} alt="page"/>
                                            </div>
                                            <p>Long Notebook</p>
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" id="size_2" name="sizes" value="240 x 180"
                                               checked={this.state.size === "240 x 180"}
                                               onChange={this.handleChange}
                                               className="size_radio_inputs"
                                        />
                                        <label htmlFor="size_2" className="size_label">
                                            <div className="size_option_image">
                                                <img src={size1_image} alt="page"/>
                                            </div>
                                            <p>Short Notebook</p>
                                        </label>
                                    </div>
                                </section>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <VerticalLinearStepper current_active_step="1"/>
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
    size: state.specifications.notebook_size,
    page:state.specifications.notebook_page
})

const mapDispatchToProps = dispatch => ({
    sendSizeToStore: selected_size => dispatch(addNotebookSize(selected_size))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(SizeDesktopComponent);

