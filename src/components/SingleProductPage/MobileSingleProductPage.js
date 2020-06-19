import React from "react";
import './MobileSingleProductPage.css'
import {Typography} from "@material-ui/core";
import Slider from "react-slick";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MobileNavbar from "../NavBar/MobileNavbar";
import graphql from "babel-plugin-relay/macro";
import CartContext from "../CartProvider/cart-context";
import {getGraphqlIdFromDBId} from "../../Core/util";
import {fetchQuery} from "relay-runtime";
import environment from "../../Environment";
import CreateCheckoutLineAddMutation from "../../mutations/CreateCheckoutLineAddMutation";
// import {toast} from "react-toastify";
import CreateAddToCartMutation from "../../mutations/CreateAddToCartMutation";
import {AddToCart} from "../../Actions/non_customiser_action";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import cogoToast from 'cogo-toast';
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from "react-ga";


const singleProduct = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/MblSingleProd.png";
const shippingvan = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/shippingVan.png';
const orderImg = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/orderImg.png';
const PlaceholderImg = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook canvas placeholder.svg";




const getProductById = graphql`
    query MobileSingleProductPageQuery($id:ID!){
    
         productVariant(id:$id){
             id               
             sku
             name
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
        query MobileSingleProductPageCheckPincodeQuery($pincode:Int){
            checkPincodeAvailability(pincode:$pincode){
                pincode,isAvailable
            }
        }
`


class MobileSingleProductPage  extends React.Component{
    static contextType = CartContext;
    constructor(props) {
        super(props);
        this.state = {
            images: [{src:singleProduct},{src:singleProduct},{src:singleProduct},{src:singleProduct}],
            currentIndex: 0,
            product_id:'',
            productVariant:{},
            product_attributes:{},
            product_type_attributes:[],
            available_for_pincode:false,
            pincode:'',
            availability_msg:'',
            expanded_panel1:true,
            expanded_panel2:true,
        }
    }

    componentDidMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title:  this.state.productVariant.product && this.state.productVariant.product.seoTitle?this.state.productVariant.product.seoTitle:''
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }

    componentWillMount() {

        let product_id = getGraphqlIdFromDBId(this.props.match.params['product_id'], "ProductVariantType");

        this.setState({
            product_id:product_id,
        })

        // console.log(this.state);

        let variables = {
            id:product_id
        }

        fetchQuery(environment, getProductById, variables,{force:false})
            .then(data => {

                this.setState({
                    productVariant:data.productVariant,
                    product_attributes:JSON.parse(data.productVariant.attributes),
                    product_type_attributes:data.productVariant.product.productType.productAttributes.edges
                },()=>{
                    this.sendSingleProductViewtoGA();
                })
            },err => {
                // console.log(err);
            });


    }

    sendSingleProductViewtoGA = () => {
        let product = this.state.productVariant;
        if(window.dataLayer){
            window.dataLayer.push({
                "event": "Single Product View",
                "ecommerce": {
                    "currencyCode": "INR",
                    "detail": {
                        "products": [{
                            "id": product.sku,
                            "name": product.name,
                            "price": product.price,
                            "category": product.product && product.product.category.name?product.product.category.name:"classmate",
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
        //     'detail'
        // );


    }
    sendAddToCarttoGA = () => {
        let product = this.state.productVariant;
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "addToCart",
                "ecommerce": {
                    "currencyCode": "INR",
                    "add": {
                        "products": [{
                            "id": product.sku,
                            "name": product.name,
                            "price": product.price,
                            "category": product.product.category.name ? product.product.category.name : "classmate",
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


    }
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
                cogoToast.success("Cart Updated successfully", { position: 'bottom-center'});

                scope.sendAddToCarttoGA();
                // toast.success("Cart Updated successfully", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else {
                cogoToast.error("Cart not Updated", { position: 'bottom-center'});

                // toast.error("Cart not Updated", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        }, function(err) {
            // alert(err);
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'bottom-center'});
            } else {
                cogoToast.error(err, { position: 'bottom-center'});
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

                cogoToast.success("Product Added to cart", { position: 'bottom-center'});
                scope.sendAddToCarttoGA();

                // toast.success("Product Added to cart", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });

            } else if(response.checkoutCreate.created === false){
                cogoToast.error("Product not Added to cart", { position: 'bottom-center'});

                // toast.error("Product not Added to cart", { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true });
            }

        }, function(err) {
            if(err === "Insufficient Stock"){
                cogoToast.error("SOLD OUT", { position: 'bottom-center'});
            } else {
                cogoToast.error(err, { position: 'bottom-center'});
            }
        })
    }

    handleChange = (panel)  => {
        this.setState({
            [panel]:!this.state[panel]
        })
    };

    render() {

        const {images} = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,

        };
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
                            <div className="mobile_single_product_component">
                                <MobileNavbar />
                                <div className="MblSinglePage">
                                    <Typography className="text1">{this.state.productVariant.product && this.state.productVariant.product.category?this.state.productVariant.product.category.name:null}</Typography>
                                    <Typography className="MblSinglePageTitle" variant="h6">{this.state.productVariant.name}</Typography>
                                    <Typography style={{color:"#A3A3A3", fontSize:"14px",fontWeight: '400',marginTop:'10px'}}>SKU#: {this.state.productVariant.sku}</Typography>

                                    <span style={{display: 'flex'}}>
                                         {

                                             this.state.productVariant && parseInt(this.state.productVariant.priceOverride) > 0 ? (
                                                 <Typography variant="h5" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px',fontWeight:' 600'}}><strike>Rs {this.state.productVariant?this.state.productVariant.costPrice:''}</strike> Rs {this.state.productVariant?this.state.productVariant.priceOverride:''}  </Typography>
                                             ):(
                                                 <Typography variant="h5" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px',fontWeight:' 600'}}>Rs {this.state.productVariant?this.state.productVariant.costPrice:''} </Typography>
                                             )

                                         }
                                        {/*<Typography variant="h5" style={{textAlign: 'left', color:' #ff6733',margin: '10px 0px',fontWeight:' 600'}}>₹{this.state.productVariant.costPrice}</Typography>*/}
                                        {/* <Typography variant="h6" className="Mblstrikethrough" >₹{this.state.productVariant.costPrice}</Typography> */}
                                    </span>
                                    <div>

                                            {
                                                this.state.productVariant.images && this.state.productVariant.images.length>0?
                                                    <div>
                                                        {
                                                            <Slider {...settings}>
                                                                {
                                                                    this.state.productVariant.images.map((image, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <img src={image.url}  id="productImg1" style={{width:'100%'}} />
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </Slider>
                                                        }
                                                    </div>

                                                    :(
                                                        <Slider {...settings}>
                                                            <div align={"center"}>
                                                                <img src={PlaceholderImg} id="productImg1" style={{width:'60%'}} />
                                                            </div>
                                                        </Slider>
                                                     )
                                            }

                                    </div>
                                    {/*<Typography className="selectVariant">Choose Varient</Typography>*/}
                                    <div className="MblBottom">
                                        <span className="mblPinSpan">
                                            <p style={{    fontSize: '14px'}}>Deliver to</p>
                                            <span style={{display: 'flex', justifyContent:' flex-end',alignItems: 'center'}}>
                                            {/*<input className="PincodeField" type="number" name="pincode" placeholder="Enter Pincode" maxLength="6"  />*/}
                                                {/*<button name="submit" className="check" type="button">CHECK</button>*/}
                                                <input  className="PincodeField" type="number" name="pincode" placeholder="Enter Pincode" maxLength={6} onChange={(e) => {
                                                    this.setState({
                                                        pincode:e.target.value
                                                    })
                                                }}/>
                                             <button type="button" className="check" onClick={this.checkAvailablePincode}>CHECK</button>
                                            </span>
                                        </span>
                                        <p style={{color:'green',fontSize:'11px',margin:'0 15px'}}>{
                                            this.state.availability_msg
                                        }</p>

                                        <div className="MblShiping_Text">
                                            <div><img src={shippingvan} />
                                                <p>₹80 Shipping Charge on Orders below ₹500</p>
                                            </div>
                                            <div><img src={orderImg} />
                                                <p>Estimated Delivery 10 to 15 days</p></div>
                                        </div>
                                        <div className="mobile_expansion_panel_section">
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
                                            {/*          Object.keys(this.state.product_attributes).length > 0? Object.keys(this.state.product_attributes).map((keyName, i) => (*/}

                                            {/*                <Typography>{keyName}  : {this.state.product_attributes[keyName]}</Typography>*/}

                                            {/*            )):<Typography>None</Typography>*/}
                                            {/*        }*/}
                                            {/*    </ExpansionPanelDetails>*/}
                                            {/*</ExpansionPanel>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="FixedBtn">
                                    <button className="addPackBtn" onClick={this.addProductToCart}>
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        )
                    }
                }
            </CartContext.Consumer>
            </MetaWrapper>
        )
    }
}



const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
})


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
})




export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(MobileSingleProductPage);
