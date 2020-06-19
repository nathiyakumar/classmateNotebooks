import React from "react";
import './CustomiseForm.css';
import PageDesktopComponent from "./Page/PageDesktop";
import SizeDesktopComponent from "./Size/SizeDesktop";
import RulingDesktopComponent from "./Ruling/RulingDesktop";
import BindingDesktopComponent from "./Binding/BindingDesktop";
import QuantityDesktopComponent from "./Quantity/QuantityDesktop";
import DesignsDesktopComponent from "./Designs/Desktop/DesignsDesktop";
import {Container} from "@material-ui/core";
import Media from 'react-media';
import { small_screen } from '../../variables';

import MobileNavbar from "../NavBar/MobileNavbar";

import PageMobile from "./Page/PageMobile";
import SizeMobile from "./Size/SizeMobile";
import RulingMobile from "./Ruling/RulingMobile";
import BindingMobile from "./Binding/BindingMobile";
import QuantityMobile from "./Quantity/QuantityMobile";
import DesignUpload from "./Designs/Mobile/DesignUpload";

import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from 'react-ga';



class CustomiseForm extends React.Component{

    state = {
        title:'',
        description:''
    };




    componentWillMount(){

        let title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
        let description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";

        if (this.props.match.params.page === "select-pages"){
            title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
            description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";
        } else if (this.props.match.params.page === "select-size"){
            title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
            description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";
        }else if (this.props.match.params.page === "select-ruling"){
            title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
            description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";
        }else if (this.props.match.params.page === "select-binding"){
            title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
            description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";
        }else if (this.props.match.params.page === "select-quantity"){
            title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
            description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";
        }else if (this.props.match.params.page === "select-design"){
            title = "Classmate Customised Notebooks | Photo Printing on Notebooks";
            description = "Personalized photo printing on notebooks & customised Classmate notebooks in wholesale price. Choose Page size, Ruling, Binding, Quantity, and Design as per your requirements.";
        }

        this.setState({
            title:title,
            description:description
        })

        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Classmate Customised Notebooks | Photo Printing on Notebooks"
        // });
        //
        // ReactGA.pageview(window.location.pathname);

    }


    render() {
        const {title,description} = this.state;
        return(
            <>
                <MetaWrapper
                    meta={{
                        description: description,
                        title: title,
                    }}
                >

                <Media query={{maxWidth:small_screen}} render={() =>
                    (

                        <div className="mobileDesignField">
                            <MobileNavbar />
                            <Container maxWidth={"xs"}>
                                {this.props.match.params.page === "select-pages" && <PageMobile />}
                                {this.props.match.params.page === "select-size" && <SizeMobile />}
                                {this.props.match.params.page === "select-ruling" && <RulingMobile />}
                                {this.props.match.params.page === "select-binding" && <BindingMobile />}
                                {this.props.match.params.page === "select-quantity" && <QuantityMobile />}
                                {this.props.match.params.page === "select-design" && <DesignUpload />}
                            </Container>
                        </div>
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <div>
                            <Container maxWidth={"xl"} className="App">
                                {this.props.match.params.page === "select-pages" && <PageDesktopComponent />}
                                {this.props.match.params.page === "select-size" && <SizeDesktopComponent />}
                                {this.props.match.params.page === "select-ruling" && <RulingDesktopComponent />}
                                {this.props.match.params.page === "select-binding" && <BindingDesktopComponent />}
                                {this.props.match.params.page === "select-quantity" && <QuantityDesktopComponent />}
                                {this.props.match.params.page === "select-design" && <DesignsDesktopComponent />}
                            </Container>
                        </div>
                    )}
                />
                </MetaWrapper>

            </>
        );
    }
}

export default CustomiseForm;
