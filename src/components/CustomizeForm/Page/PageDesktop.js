import React from "react";
import './PageDesktop.css';

import {Button, Container, Box, Grid} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import { withRouter  } from 'react-router-dom';

import { connect } from 'react-redux'
import { compose } from 'redux';
import {addNotebookPage} from '../../../Actions/index'
import cogoToast from 'cogo-toast';
import VerticalLinearStepper from "../../VerticalLinearStepper/VerticalLinearStepper";
import Header from "../../Header/Header";


const Page140 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pages-140.svg';
const Page172 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pages-172.svg';


class PageDesktopComponent extends React.Component {

    state = {
        page: ''
    };

    componentDidMount() {
        // get the values from the redux store and save in the state
        this.setState({
            page:this.props.page
        })
    }

    saveAndContinue = e => {

        cogoToast.info("Orders for personalized notebooks will be resumed soon.", { position: 'top-center'});
        
        // e.preventDefault();
        // if(this.state.page === null ||  this.state.page === undefined || this.state.page === ""){
        //     cogoToast.error("Please choose the Notebook pages",{ position: 'top-center'});

        // } else {
        //     this.props.history.push('/classmate-customised-notebooks/select-size');
        // }
    };

    handleChange = e => {
        let response =  this.props.sendPageToStore(e.target.value);
        this.setState({
            page:response.payload.notebook_page,
        });
    }


    render() {
        return (
            <div>
                <header className="desktop_header_component">
                    <Header />
                </header>
                <div className="page_question_form_desktop">
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Box component="div" style={{textAlign: 'center',height:'100%'}}>
                                <img src={
                                    this.state.page === "140" ? 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/page-140.png' : 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/page-172.png'
                                } alt="Notebook_Page" className="notebook_page_image"/>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box component="div">
                                <h4 className="form_title_desktop">
                                    DESIGN YOUR NOTEBOOK IN A FEW CLICKS
                                </h4>
                                <p className="question_desktop">1) Select Number of Pages</p>
                                <section className="page_section">
                                    <div>
                                        <input type="radio" id="page_140" name="pages" value="140"
                                               checked={this.state.page === "140"}
                                               onChange={this.handleChange}
                                               className="page_radio_inputs"
                                        />
                                        <label htmlFor="page_140" className="page_label">
                                            <div className="page_option_image">
                                                <img src={Page140} alt="page"/>
                                            </div>
                                            <p>140 Pages</p>
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" id="page_172" name="pages" value="172"
                                               checked={this.state.page === "172"}
                                               onChange={this.handleChange}
                                               className="page_radio_inputs"
                                        />
                                        <label htmlFor="page_172" className="page_label">
                                            <div className="page_option_image">
                                                <img src={Page172} alt="page"/>
                                            </div>
                                            <p>172 Pages</p>
                                        </label>
                                    </div>
                                </section>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <VerticalLinearStepper current_active_step="0"/>
                        </Grid>
                    </Grid>
                </div>
                <Container maxWidth={"xl"} className="button_section_desktop">
                    <Box component="div" className="btn_section">
                        <Button
                        //  onMouseEnter={this.saveAndContinue}
                         onClick={this.saveAndContinue} className="continue_btn_desktop">Continue <Icon
                            className="fa fa-arrow-right " style={{fontSize: 16, margin: "0 15px"}}/> </Button>
                    </Box>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    page: state.specifications.notebook_page
})

const mapDispatchToProps = dispatch => ({
    sendPageToStore: selected_page => dispatch(addNotebookPage(selected_page))
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(PageDesktopComponent);

