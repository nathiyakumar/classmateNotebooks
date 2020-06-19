import React from "react";
import './QuantityDesktop.css';
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { addNotebookQuantity, ClearAllDesigns, addNotebookSku, addNotebookMrp} from '../../../Actions/index'
import VerticalLinearStepper from "../../VerticalLinearStepper/VerticalLinearStepper";
import {Box, Button, Container, Grid} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Header from "../../Header/Header";
import graphql from 'babel-plugin-relay/macro';
import environment from '../../../Environment'
import cogoToast from 'cogo-toast';
import {fetchQuery} from 'relay-runtime';

const Information_Icon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/infermation_icon.svg";



const GetPriceBySpecification = graphql`
        query QuantityDesktopQuery($size:String , $bindingType:String , $pages:String , $rulingType:String ) {
          notebookSku(size: $size, bindingType: $bindingType, pages: $pages, rulingType: $rulingType){
            id
            SKU
            size
            pages
            bindingType
            rulingType
            MRP
          }
        }          
        `




class QuantityDesktopComponent extends React.Component{

    state = {
        quantity: '',
        skuData:{}
    };


    componentDidMount() {


        const variables = {
            size: this.props.size,
            bindingType: this.props.binding,
            pages: this.props.page,
            rulingType: this.props.ruling
        };

        fetchQuery(environment, GetPriceBySpecification, variables,{force:false})
            .then(data => {
                if(data.notebookSku.length > 0 && data.notebookSku !== null){
                    this.setState({
                        skuData:data
                    },()=>{
                        this.sendImpressionToGA(data.notebookSku[0]);
                    })
                }
            });


// get the values from the redux store and save in the state
        this.setState({
            quantity:this.props.quantity
        })

        if(this.props.page === "" || this.props.size === "" || this.props.ruling === "" || this.props.binding === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }
    }

    sendImpressionToGA = (data) => {

        let product_name = "Customizable Notebook /"+data.SKU+" /"+data.size+" /"+data.pages+" /"+data.bindingType+" /"+data.rulingType+" /"+data.MRP;
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "Products View",
                "ecommerce": {
                    "currencyCode": "INR",
                    "impressions": [{
                        "id": data.SKU,
                        "name": product_name,
                        "price": data.MRP,
                        "category": "Customizable Notebook",
                        "position": 0,
                        "list": "Customizable Notebook List"
                    }]
                }
            });
        }
    };
    visitProduct = () => {
        let skuData  = this.state.skuData.notebookSku[0];

        let product_name = "Customizable Notebook /"+skuData.SKU+" /"+skuData.size+" /"+skuData.pages+" /"+skuData.bindingType+" /"+skuData.rulingType+" /"+skuData.MRP;
        let cliked_product = [{
            'id': skuData.SKU,
            'name': product_name,
            "price": skuData.MRP,
            "category": "Customizable Notebook",
            "position": 0,
            "list": "Customizable Notebook List"

        }];
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "Product Click",
                "ecommerce": {
                    "click": {
                        "actionField": {
                            "list": "Customizable Notebook List"
                        },
                        "products": cliked_product
                    }
                }
            });
        }


    };



    saveAndContinue = e => {

        e.preventDefault();
        if(this.state.quantity === null ||  this.state.quantity === undefined || this.state.quantity === ""){
            // alert('Please choose the Notebook quantity');
            cogoToast.error("Please choose the Notebook quantity",{ position: 'top-center'});

        } else {
            this.visitProduct();
            this.props.history.push('/classmate-customised-notebooks/select-design');
        }
    };

    handleChange = (e) => {
        let response =  this.props.sendQuantityToStore(e.target.value);
                        // this.props.sendSkuToStore();
                        // this.props.sendMrpToStore();
                        this.props.clearAllDesignsFromStore('clear');
        this.setState({
            quantity:response.payload.notebook_quantity
        });
    };

    back  = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-binding');
    };

    getPrice = (price_per_one_book,discound_per_one_pack) => {
        let price = price_per_one_book;
        let discound = discound_per_one_pack / 100;
        let totalValue = price - (price * discound)
        return totalValue.toFixed(0);
    };
    render() {
        const { skuData } =this.state;
        return(
            <div>
                <header className="desktop_header_component">
                    <Header />
                </header>
                <div className="quantity_question_form_desktop">
                    <Grid container spacing={0}>
                        <Grid item xs={4} style={{margin:'auto 0'}}>
                            <Box component="div" style={{textAlign: 'center'}}>
                                <img src={
                                    this.state.quantity === "6" ?
                                        'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/packof6.png' :
                                        'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/packof6.png'
                                } alt="Notebook_Ruling" className="notebook_quantity_image"/>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Box component="div">
                                <h4 className="form_title_desktop">
                                    DESIGN YOUR NOTEBOOK IN A FEW CLICKS
                                </h4>
                                <p className="question_desktop">5) Select Notebook Quantity</p>

                                {
                                    Object.keys(skuData).length > 0 && (
                                        <div>
                                            <section className="quantity1_section">
                                                <div>
                                                    <input type="radio" id="pack_of_6" name="quantity" value="6"
                                                           checked={this.state.quantity === "6"}
                                                           onChange={this.handleChange}
                                                           className="quantity_radio_inputs"
                                                    />
                                                    <label htmlFor="pack_of_6" className="quantity_label">
                                                        <div className="quantity_content">
                                                            <p className="pack_details">Pack Of 6</p>
                                                            <p className="pack_price">₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 6, 0)}
                                                                {/*<strike*/}
                                                                {/*    className="striked_pack_price">₹.{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 6}</strike>*/}
                                                            </p>
                                                            {/*<p className="pack_offer_percent">(0%)</p>*/}
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="pack_of_12" name="quantity" value="12"
                                                           checked={this.state.quantity === "12"}
                                                           onChange={this.handleChange}
                                                           className="quantity_radio_inputs"
                                                    />
                                                    <label htmlFor="pack_of_12" className="quantity_label">
                                                        <div className="quantity_content">
                                                            <p className="pack_details">Pack Of 12</p>
                                                            <p className="pack_price">₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 12, 0)}
                                                                {/*<strike*/}
                                                                {/*    className="striked_pack_price">₹.{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 12}</strike>*/}
                                                            </p>
                                                            {/*<p className="pack_offer_percent">(5%)</p>*/}
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="pack_of_18" name="quantity" value="18"
                                                           checked={this.state.quantity === "18"}
                                                           onChange={this.handleChange}
                                                           className="quantity_radio_inputs"
                                                    />
                                                    <label htmlFor="pack_of_18" className="quantity_label">
                                                        <div className="quantity_content">
                                                            <p className="pack_details">Pack Of 18</p>
                                                            <p className="pack_price">₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 18, 0)}
                                                                {/*<strike*/}
                                                                {/*    className="striked_pack_price">₹.{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 18}</strike>*/}
                                                            </p>
                                                            {/*<p className="pack_offer_percent">(10%)</p>*/}
                                                        </div>
                                                    </label>
                                                </div>
                                            </section>
                                            <section className="quantity2_section">
                                                <div>
                                                    <input type="radio" id="pack_of_24" name="quantity" value="24"
                                                           checked={this.state.quantity === "24"}
                                                           onChange={this.handleChange}
                                                           className="quantity_radio_inputs"
                                                    />
                                                    <label htmlFor="pack_of_24" className="quantity_label">
                                                        <div className="quantity_content">
                                                            <p className="pack_details">Pack Of 24</p>
                                                            <p className="pack_price">₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 24, 0)}
                                                                {/*<strike*/}
                                                                {/*    className="striked_pack_price">₹.{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 24}</strike>*/}
                                                            </p>
                                                            {/*<p className="pack_offer_percent">(15%)</p>*/}
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="pack_of_30" name="quantity" value="30"
                                                           checked={this.state.quantity === "30"}
                                                           onChange={this.handleChange}
                                                           className="quantity_radio_inputs"
                                                    />
                                                    <label htmlFor="pack_of_30" className="quantity_label">
                                                        <div className="quantity_content">
                                                            <p className="pack_details">Pack Of 30</p>
                                                            <p className="pack_price">₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 30, 0)}
                                                                {/*<strike*/}
                                                                {/*    className="striked_pack_price">₹.{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 30}</strike>*/}
                                                            </p>
                                                            {/*<p className="pack_offer_percent">(20%)</p>*/}
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="pack_of_36" name="quantity" value="36"
                                                           checked={this.state.quantity === "36"}
                                                           onChange={this.handleChange}
                                                           className="quantity_radio_inputs"
                                                    />
                                                    <label htmlFor="pack_of_36" className="quantity_label">
                                                        <div className="quantity_content">
                                                            <p className="pack_details">Pack Of 36</p>
                                                            <p className="pack_price">₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 36, 0)}
                                                                {/*<strike*/}
                                                                {/*    className="striked_pack_price">₹.{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 36}</strike>*/}
                                                            </p>
                                                            {/*<p className="pack_offer_percent">(25%)</p>*/}
                                                        </div>
                                                    </label>
                                                </div>
                                            </section>
                                            <div className="Desc_quantity_info_class">
                                                <p><img src={Information_Icon} alt="Information_Icon"/></p>
                                                <p>Minimum Pack Size is 6</p>
                                            </div>
                                        </div>
                                    )
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <VerticalLinearStepper current_active_step="4"/>
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
    quantity: state.specifications.notebook_quantity,
    page:state.specifications.notebook_page,
    size:state.specifications.notebook_size,
    ruling:state.specifications.notebook_ruling,
    binding:state.specifications.notebook_binding
})

const mapDispatchToProps = dispatch => ({
    sendQuantityToStore: selected_quantity => dispatch(addNotebookQuantity(selected_quantity)),
    sendSkuToStore: selected_sku => dispatch(addNotebookSku(selected_sku)),
    sendMrpToStore: selected_mrp => dispatch(addNotebookMrp(selected_mrp)),
    clearAllDesignsFromStore: text => dispatch(ClearAllDesigns(text)),


})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(QuantityDesktopComponent);

