import React from "react";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom';
import './QuantityMobile.css';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../../Environment'
import {addNotebookMrp, addNotebookQuantity, addNotebookSku, ClearAllDesigns} from "../../../Actions";
import {compose} from "redux";
import {connect} from "react-redux";
import cogoToast from 'cogo-toast';
import MobileHorizontalProgressBar from "../../MobileHorizontalProgressBar/MobileHorizontalProgressBar";
import {fetchQuery} from 'relay-runtime';

const Information_Icon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/infermation_icon.svg";


const GetPriceBySpecification = graphql`
        query QuantityMobileQuery($size:String , $bindingType:String , $pages:String , $rulingType:String ) {
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


class QuantityMobile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            step: 0,
            completed: 4,
            skuData:{}

        }
    }

    componentDidMount() {
        // get the values from the redux store and save in the state
        if (this.props.quantity !== "") {
            this.setState({
                quantity: this.props.quantity,
                step: 5
            })
        } else {
            this.setState({
                step: 4
            })
        }


        if(this.props.page === "" || this.props.size === "" || this.props.ruling === "" || this.props.binding === ""){
            this.props.history.push("/classmate-customised-notebooks/select-pages");
        }

        const variables = {
            size: this.props.size,
            bindingType: this.props.binding,
            pages: this.props.page,
            rulingType: this.props.ruling
        };

        fetchQuery(environment, GetPriceBySpecification, variables,{force:false})
            .then(data => {
                if(data.notebookSku.length > 0){
                    this.setState({
                        skuData:data
                    },()=>{
                        this.sendImpressionToGA(data.notebookSku[0]);
                    })
                }
            });
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
                            "list": "LEP List"
                        },
                        "products": cliked_product
                    }
                }
            });
        }


    };



    saveAndContinue = e => {
        e.preventDefault();
        if (this.state.quantity === null || this.state.quantity === undefined || this.state.quantity === "") {
            // alert('Please choose the Notebook quantity');
            cogoToast.error("Please choose the Notebook quantity",{ position: 'bottom-center'});

        } else {
            this.visitProduct();
            this.props.history.push('/classmate-customised-notebooks/select-design');
        }
    };

    handleChange = (e) => {
        let response = this.props.sendQuantityToStore(e.target.value);
        // this.props.sendSkuToStore();
        // this.props.sendMrpToStore();
        this.props.clearAllDesignsFromStore('clear');
        this.setState({
            quantity: response.payload.notebook_quantity,
            step: 5
        });
    }

    back = (e) => {
        e.preventDefault();
        this.props.history.push('/classmate-customised-notebooks/select-binding');
    }

    getPrice = (price_per_one_book, discound_per_one_pack) => {
        let price = price_per_one_book;
        let discound = discound_per_one_pack / 100;
        let totalValue = price - (price * discound)
        return totalValue.toFixed(0);
    }

    render() {

        const { skuData } =this.state;

        return (
            <div className="mobile_spec_field_component">
                <h3>DESIGN YOUR NOTEBOOK IN A FEW CLICKS</h3>
                <p>5) Select the Notebook Quantity</p>
                        <div>
                            {
                                Object.keys(skuData).length > 0 && (
                                    <div style={{height:'50vh'}}>
                                        <section className="mobile_quantity_section">
                                            <div>
                                                <input type="radio" id="packof6" name="binding" value="6"
                                                       checked={this.state.quantity === "6"}
                                                       onChange={this.handleChange}
                                                       className="mobile_radio_inputs"
                                                />
                                                <label htmlFor="packof6" className="label" style={{marginBottom: '0px'}}>
                                                    <div className="option_image_qty">
                                                        {/*<img src={centerStable} alt="binding"/>*/}
                                                        <div style={{padding: '8px 0px 9px 0px'}}>
                                                            <p>Pack of 6</p>
                                                            <span className="qty-price">
                                                    <p variant="h5" component="h2" className="pagetitle2">
                                                        ₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 6, 0)}
                                                    </p>
                                                                {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                                {/*  <strike>₹{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 6}</strike>*/}
                                                                {/*</p>*/}
                                                </span>
                                                            {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                            {/*    (0%)*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <input type="radio" id="packof12" name="binding" value="12"
                                                       checked={this.state.quantity === "12"}
                                                       onChange={this.handleChange}
                                                       className="mobile_radio_inputs"
                                                />
                                                <label htmlFor="packof12" className="label" style={{marginBottom: '0px'}}>
                                                    <div className="option_image_qty">
                                                        <div style={{padding: '8px 0px 9px 0px'}}>
                                                            <p>Pack of 12</p>
                                                            <span className="qty-price">
                                                    <p variant="h5" component="h2" className="pagetitle2">
                                                       ₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 12, 0)}
                                                    </p>
                                                                {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                                {/*  <strike>₹{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 12}</strike>*/}
                                                                {/*</p>*/}
                                                </span>
                                                            {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                            {/*    (5%)*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <input type="radio" id="packof18" name="binding" value="18"
                                                       checked={this.state.quantity === "18"}
                                                       onChange={this.handleChange}
                                                       className="mobile_radio_inputs"
                                                />
                                                <label htmlFor="packof18" className="label" style={{marginBottom: '0px'}}>
                                                    <div className="option_image_qty">
                                                        <div style={{padding: '8px 0px 9px 0px'}}>
                                                            <p>Pack of 18</p>
                                                            <span className="qty-price">
                                                    <p variant="h5" component="h2" className="pagetitle2">
                                                        ₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 18, 0)}
                                                    </p>
                                                                {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                                {/*   <strike>₹{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 18}</strike>*/}
                                                                {/*</p>*/}
                                                </span>
                                                            {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                            {/*    (10%)*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </section>
                                        <section className="mobile_quantity_section">
                                            <div>
                                                <input type="radio" id="packof24" name="binding" value="24"
                                                       checked={this.state.quantity === "24"}
                                                       onChange={this.handleChange}
                                                       className="mobile_radio_inputs"
                                                />
                                                <label htmlFor="packof24" className="label" style={{marginBottom: '0px'}}>
                                                    <div className="option_image_qty">
                                                        <div style={{padding: '8px 0px 9px 0px'}}>
                                                            <p>Pack of 24</p>
                                                            <span className="qty-price">
                                                    <p variant="h5" component="h2" className="pagetitle2">
                                                        ₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 24, 0)}
                                                    </p>
                                                                {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                                {/*   <strike>₹{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 24}</strike>*/}
                                                                {/*</p>*/}
                                                </span>
                                                            {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                            {/*    (15%)*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <input type="radio" id="packof30" name="binding" value="30"
                                                       checked={this.state.quantity === "30"}
                                                       onChange={this.handleChange}
                                                       className="mobile_radio_inputs"
                                                />
                                                <label htmlFor="packof30" className="label" style={{marginBottom: '0px'}}>
                                                    <div className="option_image_qty">
                                                        <div style={{padding: '8px 0px 9px 0px'}}>
                                                            <p>Pack of 30</p>
                                                            <span className="qty-price">
                                                    <p variant="h5" component="h2" className="pagetitle2">
                                                        ₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 30, 0)}
                                                    </p>
                                                                {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                                {/*   <strike>₹{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 30}</strike>*/}
                                                                {/*</p>*/}
                                                </span>
                                                            {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                            {/*    (20%)*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <input type="radio" id="packof36" name="binding" value="36"
                                                       checked={this.state.quantity === "36"}
                                                       onChange={this.handleChange}
                                                       className="mobile_radio_inputs"
                                                />
                                                <label htmlFor="packof36" className="label" style={{marginBottom: '0px'}}>
                                                    <div className="option_image_qty">
                                                        <div style={{padding: '8px 0px 9px 0px'}}>
                                                            <p>Pack of 36</p>
                                                            <span className="qty-price">
                                                    <p variant="h5" component="h2" className="pagetitle2">
                                                       ₹{this.getPrice(parseInt(skuData.notebookSku[0] ? skuData.notebookSku[0].MRP : 0) * 36, 0)}
                                                    </p>

                                                                {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                                {/*  <strike>₹{parseInt(props.notebookSku[0] ? props.notebookSku[0].MRP : 0) * 36}</strike>*/}
                                                                {/*</p>*/}

                                                </span>
                                                            {/*<p variant="h5" component="h2" className="pagetitle3">*/}
                                                            {/*    (25%)*/}
                                                            {/*</p>*/}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>


                                        </section>

                                        <div className="quantity_info_class">
                                            <p><img src={Information_Icon} alt="Information_Icon"/></p>
                                            <p>Minimum Pack Size is 6</p>
                                        </div>
                                    </div>

                                )
                            }





                                <Button onClick={this.back} style={{padding:' 12px 8px'}}>Back</Button>
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

            </div>
        );
    }
}


const mapStateToProps = state => ({
    quantity: state.specifications.notebook_quantity,
    page: state.specifications.notebook_page,
    size: state.specifications.notebook_size,
    ruling: state.specifications.notebook_ruling,
    binding: state.specifications.notebook_binding
})

const mapDispatchToProps = dispatch => ({
    sendQuantityToStore: selected_quantity => dispatch(addNotebookQuantity(selected_quantity)),
    sendSkuToStore: selected_sku => dispatch(addNotebookSku(selected_sku)),
    sendMrpToStore: selected_mrp => dispatch(addNotebookMrp(selected_mrp)),
    clearAllDesignsFromStore: text => dispatch(ClearAllDesigns(text)),


})


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(QuantityMobile);
