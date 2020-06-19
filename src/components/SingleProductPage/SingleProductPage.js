import React from "react";
import Grid from "@material-ui/core/Grid";
import './SingleProductPage.css'
import Control from "./Control";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Navbar from "../NavBar/Navbar";


import {getGraphqlIdFromDBId} from '../../Core/util';

// import { QueryRenderer } from 'react-relay';
import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';

import {fetchQuery} from 'relay-runtime';
import CreateCheckoutLineAddMutation from "../../mutations/CreateCheckoutLineAddMutation";
import {toast} from "react-toastify";
import CreateAddToCartMutation from "../../mutations/CreateAddToCartMutation";
// import { ToastContainer } from 'react-toastify';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ProductItem from "../ProductsPage/ProductItem";
import CartContext from "../CartProvider/cart-context";
import {AddToCart} from "../../Actions/non_customiser_action";
import {connect} from "react-redux";
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import DesktopFooter from "../Footer/footer";

import cogoToast from 'cogo-toast';
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from 'react-ga';



const singleProductImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/single_product1.png';
const shippingvan = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/shippingVan.png';
const orderImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/orderImg.png';
const PlaceholderImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook canvas placeholder.svg';




const getProductById = graphql`
    query SingleProductPageQuery($id:ID!){
    
         productVariant(id:$id){
             id               
             sku
             name
             price
             costPrice
             priceOverride
             images{
               url
             }
             attributes 
             product{
              seoTitle
              seoDescription
              description
              category{
                id
                name        
              }
              productType{
                productAttributes(first:10){
                  edges{
                    node{
                      id
                      name
                      values(first:10){
                        edges{
                          node{
                            id
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }           
            }
        }    
    }
`


const checkPincode = graphql`
        query SingleProductPageCheckPincodeQuery($pincode:Int){
            checkPincodeAvailability(pincode:$pincode){
                pincode,isAvailable
            }
        }
`



class SingleProductPage extends React.Component{

    static contextType = CartContext;

    constructor(props) {
        super(props);

        this.state = {
            images: [{src:singleProductImg},{src:singleProductImg},{src:singleProductImg},{src:singleProductImg}],
            translateValue:0,
            currentIndex: 0,
            expanded_panel1:true,
            expanded_panel2:true,
            product_id:'',
            productVariant:{},
            product_attributes:{},
            product_type_attributes:[],
            available_for_pincode:false,
            pincode:'',
            availability_msg:'',

        }
        this.SelectSize = this.SelectSize.bind(this);
        this.SelectRuling = this.SelectRuling.bind(this);
        this.SelectBinding = this.SelectBinding.bind(this)
    }

    componentDidMount(){



        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: this.state.productVariant.product && this.state.productVariant.product.seoTitle?this.state.productVariant.product.seoTitle:''
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }


    componentWillMount() {



        let product_id = getGraphqlIdFromDBId(this.props.match.params['product_id'], "ProductVariantType");

        this.setState({
            product_id:product_id,
        });

        // console.log(this.state);

        let variables = {
            id:product_id
        };

        fetchQuery(environment, getProductById, variables,{force:false})
            .then(data => {

                this.setState({
                    productVariant:data.productVariant?data.productVariant:{},
                    product_attributes:data.productVariant?JSON.parse(data.productVariant.attributes):{},
                    product_type_attributes:data.productVariant?data.productVariant.product.productType.productAttributes.edges:[]
                },()=>{
                    this.sendSingleProductViewtoGA();
                })

            },err => {
                // console.log(err);
            });


    }
    sendSingleProductViewtoGA = () => {
        let product = this.state.productVariant;
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "Single Product View",
                "ecommerce": {
                    "currencyCode": "INR",
                    "detail": {
                        "products": [{
                            "id": product.sku,
                            "name": product.name,
                            "price": product.price,
                            "category": product.product && product.product.category.name ? product.product.category.name : "classmate",
                        }]
                    }
                }
            });
        }
        // ReactGA.plugin.execute(
        //     'ec',
        //     'addProduct',
        //      data
        // );
        //
        // ReactGA.plugin.execute(
        //     'ec',
        //     'setAction',
        //     'detail'
        // );


    };
    sendAddToCarttoGA = () => {
        let product = this.state.productVariant;
        if(window.dataLayer){
            window.dataLayer.push({
                "event": "addToCart",
                "ecommerce": {
                    "currencyCode": "INR",
                    "add": {
                        "products": [{
                            "id": product.sku,
                            "name": product.name,
                            "price": product.price,
                            "category": product.product.category.name?product.product.category.name:"classmate",
                            "quantity": 1
                        }]
                    }
                }
            });
        }

        // ReactGA.plugin.execute(
        //     'ec',
        //     'addProduct',
        //     data
        // );
        //
        // ReactGA.plugin.execute(
        //     'ec',
        //     'setAction',
        //     'add'
        // );


    };
    SelectSize(e , size){
        var elems = document.querySelectorAll(".selecteSize");
        [].forEach.call(elems, function (el) {
            el.classList.remove("selecteSize");
        });
        e.currentTarget.classList.add("selecteSize");

    }
    SelectRuling(e , rule){
        var elems = document.querySelectorAll(".selecteRule");
        [].forEach.call(elems, function (el) {
            el.classList.remove("selecteRule");
        });
        e.currentTarget.classList.add("selecteRule");

    }
    SelectBinding(e , bind){
        var elems = document.querySelectorAll(".selecteBind");
        [].forEach.call(elems, function (el) {
            el.classList.remove("selecteBind");
        });
        e.currentTarget.classList.add("selecteBind");
    }

    goToNextSlide = () => {
        if (this.state.currentIndex === this.state.productVariant.images.length - 1) {
            this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }
        else{
            this.setState(prevState => ({
                currentIndex: prevState.currentIndex + 1,
                translateValue: prevState.translateValue + -(this.slideWidth())
            }))
        }


    };
    goToPrevSlide = () => {
        if (this.state.currentIndex ===0){
            return
        }
        else{
            this.setState(prevState => ({
                currentIndex: prevState.currentIndex - 1,
                translateValue: prevState.translateValue + this.slideWidth()
            }))
        }

    };
    slideWidth = () => {
        return document.querySelector('.singleProduct-slide').clientWidth
    };

    handleChange = (panel)  => {
        this.setState({
            [panel]:!this.state[panel]
        })
    };

    checkAvailablePincode = () => {


        let pincode = {
            pincode:this.state.pincode
        }
        fetchQuery(environment, checkPincode, pincode,{force:false})
            .then(data => {


                let availability_msg = data.checkPincodeAvailability.isAvailable === true?'Delivery Available for this pincode':'Delivery not Available for this pincode';

                this.setState({
                    available_for_pincode:data.checkPincodeAvailability.isAvailable,
                    availability_msg:availability_msg
                })
            },err => {
                // console.log(err);

                this.setState({
                    available_for_pincode:false,
                    availability_msg:'Delivery not Available for this pincode'
                })
            });

    }

    addProductToCart = () => {


        let data = {
                'variantId':this.state.productVariant.id,
                'quantity':1
            }



        let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';
        if(checkout_id !== "" &&  checkout_id !== null && checkout_id !== undefined){
            this.lineAddToCheckout(data);
        } else {
            this.createCheckout(data);
        }

    }

    lineAddToCheckout = (data) => {
        let scope = this;
        let checkout_id = this.props.cart_data.checkout_id?this.props.cart_data.checkout_id:'';

        CreateCheckoutLineAddMutation(data,checkout_id, function(response)  {

            if(response.checkoutLineAdd !== null){

                let StoreCartDataFormate = {
                    lines:response.checkoutLineAdd.checkout.lines,
                    checkout_id:response.checkoutLineAdd.checkout.id,
                    subtotalPrice:response.checkoutLineAdd.checkout.subtotalPrice,
                    totalPrice:response.checkoutLineAdd.checkout.totalPrice,
                    checkoutQuantity:response.checkoutLineAdd.checkout.checkoutQuantity
                }

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                )
                cogoToast.success("Cart Updated successfully", { position: 'top-center'});
                scope.sendAddToCarttoGA();

                // toast.success("Cart Updated successfully", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else {
                cogoToast.error("Cart not Updated", { position: 'top-center'});

                // toast.error("Cart not Updated", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        }, function(err) {
            // alert(err);
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'top-center'});
            } else {
                cogoToast.error(err, { position: 'top-center'});
            }

        })
    }

    createCheckout = (data) => {
        let scope = this;
        CreateAddToCartMutation(data, function(response)  {

            if(response.checkoutCreate !== null){
                let StoreCartDataFormate = {
                    lines:response.checkoutCreate.checkout.lines,
                    checkout_id:response.checkoutCreate.checkout.id,
                    subtotalPrice:response.checkoutCreate.checkout.subtotalPrice,
                    totalPrice:response.checkoutCreate.checkout.totalPrice,
                    checkoutQuantity:response.checkoutCreate.checkout.checkoutQuantity
                }
                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                )

                cogoToast.success("Product Added to cart", { position: 'top-center'});

                scope.sendAddToCarttoGA();

                // toast.success("Product Added to cart", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else if(response.checkoutCreate.created === false){
                cogoToast.error("Product not Added to cart", { position: 'top-center'});

                // toast.error("Product not Added to cart", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        }, function(err) {
            // alert(err)
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'top-center'});
            } else {
                cogoToast.error(err, { position: 'top-center'});
            }

        })
    }

    render() {

        const {images} = this.state;
        return(

            <MetaWrapper
                meta={{
                    description: this.state.productVariant.product && this.state.productVariant.product.seoDescription?this.state.productVariant.product.seoDescription:'',
                    title: this.state.productVariant.product && this.state.productVariant.product.seoTitle?this.state.productVariant.product.seoTitle:'',
                }}
            >

            <CartContext.Consumer>

                {
                    CartProvider => {

                        return(
                            <>
                                <div className="DesktopSingleProductPage">
                                    <Navbar />
                                    <Grid container spacing={0}  style={{marginTop:'2px'}}>
                                        <Grid item xs={6} className="grid" style={{padding:'0px',paddingBottom:'5%'}}>
                                            <div className="productLeft">
                                                <div className="singleProductslider">
                                                    <div className="singleProduct-slider-wrapper"
                                                         style={{
                                                             transform: `translateX(${this.state.translateValue}px)`,
                                                             transition: 'transform ease-out 0.45s'
                                                         }}>


                                                        {
                                                            this.state.productVariant.images && this.state.productVariant.images.length>0?
                                                                <div>
                                                                    {
                                                                        this.state.productVariant.images.map((image, index) => {
                                                                            return (
                                                                                <div className="singleProduct-slide" key={index}>
                                                                                    <img src={image.url}  className="singleImg" />
                                                                                </div>
                                                                            );
                                                                        })
                                                                    }
                                                                </div>

                                                                :(
                                                                    <div className="singleProduct-slide">
                                                                        <img src={PlaceholderImg}  className="singleImg" />
                                                                    </div>)
                                                        }

                                                    </div>

                                                    {
                                                        this.state.productVariant.images && this.state.productVariant.images.length > 1 ?
                                                            (<div>
                                                                <Control itemsnumber={this.state.productVariant.images.length} index={this.state.currentIndex}
                                                                         handleChangeIndex={this.handleChangeIndex}/>
                                                                <LeftArrow
                                                                    goToPrevSlide={this.goToPrevSlide}
                                                                />
                                                                <RightArrow
                                                                    goToNextSlide={this.goToNextSlide}
                                                                />
                                                            </div>) : null
                                                    }



                                                </div>

                                                <span>
                                                    <Button className="AddToCartBtn" onClick={this.addProductToCart} >ADD TO CART</Button>
                                                                                {/*<Button className="duplicateBtn">DUPLICATE THIS DESIGN</Button>*/}
                                                </span>
                                            </div>

                                        </Grid>

                                        <Grid item xs={6} className="grid" style={{backgroundColor:'#FF67330A',paddingBottom:'5%'}}>
                                            <div className="singleProductLeft">
                                                <Typography className="text1">{this.state.productVariant.product && this.state.productVariant.product.category?this.state.productVariant.product.category.name:null}</Typography>
                                                <Typography variant="h6" className="Title">{this.state.productVariant.name}</Typography>
                                                <Typography style={{color:"#A3A3A3", fontSize:"14px",fontWeight: '400',marginTop:'10px'}}>SKU#: {this.state.productVariant.sku}</Typography>
                                                <div style={{display: 'flex'}}>
                                                    {

                                                            this.state.productVariant && parseInt(this.state.productVariant.priceOverride) > 0 ? (
                                                                <Typography variant="h4" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px'}}><strike>Rs {this.state.productVariant?this.state.productVariant.costPrice:''}</strike> Rs {this.state.productVariant?this.state.productVariant.priceOverride:''}  </Typography>
                                                            ):(
                                                                <Typography variant="h4" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px'}}>Rs {this.state.productVariant?this.state.productVariant.costPrice:''} </Typography>
                                                            )

                                                    }
                                                    {/*<Typography variant="h4" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px'}}>₹{this.state.productVariant.costPrice}</Typography>*/}
                                                    {/* <Typography variant="h6" className="strikethrough" >₹{this.state.productVariant.costPrice}</Typography> */}
                                                </div>
                                                {/*<p>Choose Varient</p>*/}

                                                {/*{ this.state.product_type_attributes.map(({ node: item },product_type_attr_index) => (*/}

                                                {/*    <div  className="varient_btn_group">*/}
                                                {/*        <label>{item.name} :  </label>*/}
                                                {/*        <ButtonGroup  size="large" aria-label="small outlined button group">*/}
                                                {/*            {*/}

                                                {/*                item.values.edges.map(({ node: attr_value },attr_value_index) => (*/}
                                                {/*                    <Button value= {attr_value.id}  onClick={(event) => {*/}
                                                {/*                        this.SelectSize(event, attr_value.id)*/}
                                                {/*                    }}>{attr_value.name}</Button>*/}
                                                {/*                ))*/}

                                                {/*            }*/}
                                                {/*        </ButtonGroup>*/}
                                                {/*    </div>*/}

                                                {/*))}*/}



                                                {/*this.state.product_attributes*/}

                                                {/*{*/}
                                                {/*    Object.keys(this.state.product_attributes).map((keyName, i) => (*/}

                                                {/*        <div className="varient_btn_group">*/}
                                                {/*            <label>{keyName} :  </label>*/}
                                                {/*            <ButtonGroup  size="large" aria-label="small outlined button group">*/}
                                                {/*                <Button>{this.state.product_attributes[keyName]}</Button>*/}
                                                {/*            </ButtonGroup>*/}
                                                {/*        </div>*/}

                                                {/*    ))*/}
                                                {/*}*/}





                                                {/*<div className="varient_btn_group">*/}
                                                {/*    <label>Binding :  </label>*/}
                                                {/*    <ButtonGroup  size="large" aria-label="small outlined button group">*/}
                                                {/*        <Button onClick={(event) => {*/}
                                                {/*            this.SelectBinding(event, "Center Stabled")*/}
                                                {/*        }}  >Center Stabled</Button>*/}
                                                {/*        <Button  onClick={(event) => {*/}
                                                {/*            this.SelectBinding(event, "Wiro")*/}
                                                {/*        }}>Wiro</Button>*/}
                                                {/*    </ButtonGroup>*/}
                                                {/*</div>*/}
                                                <div>
                                                    <span  className="pinSpan">
                                                       <p>Enter your pincode</p>
                                                       <div className="pincode_check_field">
                                                       <input className="PincodeField" type="number" name="pincode"
                                                               placeholder="Enter Pincode" maxLength={6} value={this.state.pincode} onChange={(e) => {
                                                            this.setState({
                                                                pincode:e.target.value
                                                            })
                                                        }}/>
                                                     <button name="submit" className="check" type="button" onClick={this.checkAvailablePincode}>CHECK</button>
                                                       </div>

                                                    </span>
                                                    <p style={{color:'green',fontSize:'11px'}}>{
                                                        this.state.availability_msg
                                                    }</p>
                                                    <div className="shipping_charge_desc">
                                                        <div>
                                                            <img src={shippingvan}/>
                                                            <p>₹80 Shipping Charge on Orders below ₹500</p>
                                                        </div>

                                                        <div>
                                                            <img src={orderImg}/>
                                                            <p>Estimated Delivery 10 to 15 days</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="DesktopexpansionPanel">
                                                    <ExpansionPanel expanded={this.state.expanded_panel1} onChange={() => this.handleChange('expanded_panel1')}>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography >Product Description</Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <Typography>
                                                                {this.state.productVariant.product && this.state.productVariant.product.description?this.state.productVariant.product.description:'None'}
                                                            </Typography>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                    {/*<ExpansionPanel expanded={this.state.expanded_panel2} onChange={() => this.handleChange('expanded_panel2')}>*/}
                                                    {/*    <ExpansionPanelSummary*/}
                                                    {/*        expandIcon={<ExpandMoreIcon />}*/}
                                                    {/*        aria-controls="panel1a-content"*/}
                                                    {/*        id="panel1a-header"*/}
                                                    {/*    >*/}
                                                    {/*        <Typography >Product Details</Typography>*/}
                                                    {/*    </ExpansionPanelSummary>*/}
                                                    {/*    <ExpansionPanelDetails>*/}
                                                    {/*        {*/}
                                                    {/*           Object.keys(this.state.product_attributes).length > 0? Object.keys(this.state.product_attributes).map((keyName, i) => (*/}

                                                    {/*                <Typography>{keyName}  : {this.state.product_attributes[keyName]}</Typography>*/}

                                                    {/*            )):<Typography>None</Typography>*/}
                                                    {/*        }*/}
                                                    {/*    </ExpansionPanelDetails>*/}
                                                    {/*</ExpansionPanel>*/}

                                                </div>
                                            </div>

                                        </Grid>
                                    </Grid>
                                    {/* <ToastContainer autoClose={3000} /> */}
                                </div>
                                <DesktopFooter />
                            </>
                        )
                    }
                }

            </CartContext.Consumer>
            </MetaWrapper>


        )
    }
}

const LeftArrow = (props) => {
    return (
        <div className="singleProduct-backArrow singleProduct-arrow" onClick={props.goToPrevSlide}>
            <i className="ri-arrow-left-s-line"></i>
        </div>
    );
}


const RightArrow = (props) => {
    return (
        <div className="singleProduct-nextArrow singleProduct-arrow" onClick={props.goToNextSlide}>
            <i className="ri-arrow-right-s-line"></i>
        </div>
    );
}



const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
})


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
})




export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(SingleProductPage);
