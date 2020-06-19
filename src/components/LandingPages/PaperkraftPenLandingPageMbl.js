import React from "react";
import './PaperkraftPenLandingPageMbl.css'
import Slider from "react-slick/lib";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import $ from "jquery";
import AOS from "aos";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import CartContext from "../CartProvider/cart-context";
import CreateCheckoutLineAddMutation from "../../mutations/CreateCheckoutLineAddMutation";
import cogoToast from "cogo-toast";
import CreateAddToCartMutation from "../../mutations/CreateAddToCartMutation";
import Badge from "@material-ui/core/Badge/Badge";
import ReactSlidingPane from "../SlidingPanel/SlidingPanel";
import ShoppingCart from "../shoppingCart/shoppingCart";
import {AddToCart} from "../../Actions/non_customiser_action";


import {connect} from "react-redux";
import CreateCheckoutLineUpdateMutation from "../../mutations/CreateCheckoutLineUpdateMutation";
import Fullpage, {FullPageSections, FullpageSection} from "@ap.cx/react-fullpage";

const paperkraftLogo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraftLandinglogo.svg';
const CartIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cart-icon-black.svg";


const products = [{
    //staging sites variant Id
    variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjExNA==",
    //main's sites variant Id
    // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ5",
    product_name: "PAPERKRAFT CALLISTA CERAMIC PEN",
    product_image: "https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Pens/callista-pen1.png",
    product_price: "1400",
    quantity: 1,
    //main's sites variant Id
    // sku: "04030088",
    //staging sites variant Id
    sku: ""
},
    {
        //staging sites variant Id
        variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjExNQ==",
        //main sites variant Id
        // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ4",
        product_name: "PAPERKRAFT SCEPTER CERAMIC PEN",
        product_image: "https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Pens/scepter-pen2.png",
        product_price: "1600",
        quantity: 1,
        //main's sites variant Id
        // sku: "04030087",
        //staging sites variant Id
        sku: ""
    }];

class PaperkraftPenLandingPageMbl extends React.Component {

    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            isPlayed: false,
            openModal: false,
            giftBox1_quantity: 0,
            giftBox2_quantity: 0,
            giftBox3_quantity: 0,
            giftBox4_quantity: 0,
            openSlidingPanel: false,
            paperkraftProducts: [],
            header_cost_price: 0,
            header_price: 0,
            product_array: products
        }

    }

    componentDidMount() {

        AOS.init({

            once: true
        });
    }


    handleOpen = () => {
        this.setState({
            openModal: true
        });
        $("body").addClass("modal-open");

    };
    handleCloseModal = () => {

        this.setState({
            openModal: false
        });
        $("body").removeClass("modal-open");


    };


    addItems = (index) => {

        $('#product_quantity' + index).css("display", "block");
        $('#addToCart' + index).css("display", "none");
        let product = this.state.product_array;
        // product[index].quantity = 1;
        let productsValue = {};
        this.setState({
            product_array: product
        });

        let checkout_id = this.props.cart_data.checkout_id ? this.props.cart_data.checkout_id : '';
        let productsItems = this.state.product_array;

        if (productsItems[index].quantity > 0) {

            productsValue = {
                'variantId': productsItems[index].variantId,
                'quantity': productsItems[index].quantity
            };
            if (checkout_id !== "" && checkout_id !== null && checkout_id !== undefined) {

                this.lineAddToCheckout(productsValue, index);
            } else {


                this.createCheckout(productsValue, index);


            }
        }


    };


    increaseValue = (index) => {

        let products = this.state.product_array;
        let value = this.state.product_array[index].quantity;
        value = isNaN(value) ? 0 : value;
        value++;
        products[index].quantity = value;
        this.setState({
            product_array: products
        });
        let productsValue = {
            'variantId': products[index].variantId,
            'quantity': products[index].quantity
        };

        this.updateProductQuantity(productsValue);


    };
    decreaseValue = (index) => {


        let products = this.state.product_array;
        let value = this.state.product_array[index].quantity;
        value = isNaN(value) ? 0 : value;
        if (value < 1) {
            value = 1
        } else {
            value--;
        }


        if (value !== 0) {
            products[index].quantity = value;
            this.setState({
                product_array: products
            });

            let productsValue = {
                'variantId': products[index].variantId,
                'quantity': products[index].quantity
            };
            this.updateProductQuantity(productsValue);
        }


    };

    addToCart = () => {
        let checkout_id = this.props.cart_data.checkout_id ? this.props.cart_data.checkout_id : '';
        let products = [];

        let productsItems = this.state.product_array;

        for (let i = 0; i < productsItems.length; i++) {

            if (productsItems[i].quantity > 0) {

                products.push({
                    'productId': productsItems[i].variantId,
                    'quantity': productsItems[i].quantity
                });
            }
        }

        if (products.length > 0) {


            for (let i = 0; i < products.length; i++) {

                let productItem = {
                    variantId: products[i].productId,
                    quantity: products[i].quantity
                };
                console.log(productItem);
                if (checkout_id !== "" && checkout_id !== null && checkout_id !== undefined) {
                    this.lineAddToCheckout(productItem, i, products.length);

                } else {
                    this.createCheckout(productItem, i, products.length);
                }


            }


        }


    };


    lineAddToCheckout = (data, index) => {

        let scope = this;
        let checkout_id = this.props.cart_data.checkout_id ? this.props.cart_data.checkout_id : '';

        CreateCheckoutLineAddMutation(data, checkout_id, (response) => {

            if (response.checkoutLineAdd !== null) {

                let StoreCartDataFormate = {
                    lines: response.checkoutLineAdd.checkout.lines,
                    checkout_id: response.checkoutLineAdd.checkout.id,
                    subtotalPrice: response.checkoutLineAdd.checkout.subtotalPrice,
                    totalPrice: response.checkoutLineAdd.checkout.totalPrice,
                    checkoutQuantity: response.checkoutLineAdd.checkout.checkoutQuantity
                };

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                );

                scope.sendAddToCartProductDetailstoGA(response.checkoutLineAdd.checkout.lines,index);
                cogoToast.success("Product Added To Your Bag successfully", {position: 'top-center'});

            } else {
                cogoToast.error("Product Not Added To Your Bag", {position: 'top-center'});

            }

        }, function (err) {

            // cogoToast.error(err, {position: 'top-center'});
            cogoToast.error("Sold Out", {position: 'top-center'});

        })

    };

    createCheckout = (data, Index) => {

        let scope = this;
        CreateAddToCartMutation(data, (response) => {

            if (response.checkoutCreate !== null) {

                console.log('checkot', response.checkoutCreate.checkout.id);
                let StoreCartDataFormate = {
                    lines: response.checkoutCreate.checkout.lines,
                    checkout_id: response.checkoutCreate.checkout.id,
                    subtotalPrice: response.checkoutCreate.checkout.subtotalPrice,
                    totalPrice: response.checkoutCreate.checkout.totalPrice,
                    checkoutQuantity: response.checkoutCreate.checkout.checkoutQuantity
                };


                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                );
                scope.sendAddToCartProductDetailstoGA(response.checkoutLineAdd.checkout.lines,Index);
                cogoToast.success("Product Added To Your Bag successfully", {position: 'top-center'});

            } else if (response.checkoutCreate.created === false) {

                cogoToast.error("Product Not Added To Your Bag", {position: 'top-center'});

            }


        }, function (err) {

            // cogoToast.error(err, {position: 'top-center'});
            cogoToast.error("Sold Out", {position: 'top-center'});


        })


    };
    updateProductQuantity = (product) => {

        let scope = this;
        // let data = {
        //     variantId:product.variant.id,
        //     quantity:quantity
        // }
        let checkout_id = this.props.cart_data.checkout_id ? this.props.cart_data.checkout_id : '';

        CreateCheckoutLineUpdateMutation(product, checkout_id, (response) => {

            if (response.checkoutLineUpdate !== null) {

                let StoreCartDataFormate = {
                    lines: response.checkoutLineUpdate.checkout.lines,
                    checkout_id: response.checkoutLineUpdate.checkout.id,
                    subtotalPrice: response.checkoutLineUpdate.checkout.subtotalPrice,
                    totalPrice: response.checkoutLineUpdate.checkout.totalPrice,
                    checkoutQuantity: response.checkoutLineUpdate.checkout.checkoutQuantity
                };

                scope.props.sendCartDatasToStore(
                    StoreCartDataFormate
                );
                scope.context.addCartData(
                    StoreCartDataFormate
                )


            }

        }, function (err) {
            // alert(err);
            cogoToast.error(err, {position: 'top-center'});


        })
    };
    openCartSlidingPane = () => {

        this.setState({
            openSlidingPanel: true
        });

    };
    closeCartSlidingpane = () => {

        setTimeout(() => {
            this.setState({openSlidingPanel: false});
        }, 10)
    };
    sendAddToCartProductDetailstoGA = (checkout_lines,selected_product_index) => {
        let added_products = {};
        checkout_lines.map((line_item) => {
            if(line_item.variant.sku === products[selected_product_index].sku){
                added_products = {
                    "id": products[selected_product_index].sku,
                    "name": products[selected_product_index].product_name,
                    "price": products[selected_product_index].product_price,
                    "category": "Paperkraft Products",
                    "quantity": products[selected_product_index].quantity,
                };
                if(window.dataLayer) {
                    window.dataLayer.push({
                        "event": "addToCart",
                        "ecommerce": {
                            "currencyCode": "INR",
                            "add": {
                                "products": [added_products]
                            }
                        }
                    });
                }

            }
        });
    };

    goToCart = () => {
        this.setState({
            openSlidingPanel: true,
            openModal: false
        });
        $("body").removeClass("modal-open");

    };
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 2000

        };
        const {product_array} = this.state;
        const settings2 = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000

        };

        return (
            <div className="mobilePaperkraftPenLandingPage">
                <header className="mobileLandingHeader">
                    <img src={paperkraftLogo} alt="paperkraftLogo"/>
                </header>
                <Fullpage>
                    <FullPageSections>
                        {/*<section className="LandingFirstSectionMbl">*/}
                        <FullpageSection className="LandingFirstSectionMbl">
                            <Slider {...settings} style={{
                                width: ' 80vw',
                                display: 'block',
                                margin: '0 auto', paddingTop: ' 55px'
                            }}>

                                <Grid spacing={3} container style={{margin: '0px'}}>
                                    <Grid item md={12}
                                          style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                        <img
                                            src="https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Pens/New/callista-mbl-banner.png"
                                            style={{width: '90%', margin: '0 auto'}} alt="Scepter"/>
                                    </Grid>

                                </Grid>
                                <Grid spacing={3} container style={{margin: '0px'}}>
                                    <Grid item md={12}
                                          style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                        <img
                                            src="https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Pens/New/scepter-mbl-banner.png"
                                            style={{width: '90%', margin: '0 auto'}} alt="Callista"/>

                                    </Grid>

                                </Grid>

                            </Slider>
                            <h2 style={{color: '#E3BB5F', marginTop: "0px"}}>Best Gift For Your Loved Ones!</h2>
                            <h5 className="MblPaperkraftSubTitle" style={{color: '#FFF'}}>Experience Elite penmanship
                                with
                                Paperkraft Premium Pens</h5>
                            <span className="pricePaperkraft">
                                <span style={{color: '#FFF', opacity: ' 0.6'}}>Starting at</span> &nbsp;&nbsp;
                                <span className="OfferPrice" style={{color: '#E3BB5F'}}> Rs.1400/&#42;</span>

                            </span>
                            {/*<span className="shippingText">&nbsp;&nbsp;+&nbsp;&nbsp;Free Shipping</span>*/}

                            <span style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>

                    </span>
                            {/*</section>*/}
                        </FullpageSection>
                        <FullpageSection className='LandingThirdSectionMbl' data-aos="fade-up"
                                         data-aos-duration="1000">
                            {/*<section className='LandingThirdSectionMbl' style={{height: " 100vh"}}>*/}
                            <Slider {...settings2} style={{
                                display: 'block',
                                margin: '0 auto',
                            }}>
                                <div className='slideBgImagePen slideBgImageCallistaPenMbl1' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageCallistaPenMbl2' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageCallistaPenMbl3' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageCallistaPenMbl4' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageCallistaPenMbl5' data-aos="fade-up" data-aos-duration="1000"/>

                            </Slider>
                            {/*</section>*/}
                        </FullpageSection>
                        <FullpageSection className='LandingThirdSectionMbl' data-aos="fade-up"
                                         data-aos-duration="1000">
                            {/*<section className='LandingThirdSectionMbl' style={{height: " 100vh"}}>*/}
                            <Slider {...settings2} style={{
                                display: 'block',
                                margin: '0 auto',
                            }}>
                                <div className='slideBgImagePen slideBgImageScepterPenMbl1' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageScepterPenMbl2' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageScepterPenMbl3' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageScepterPenMbl4' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageScepterPenMbl5' data-aos="fade-up" data-aos-duration="1000"/>
                                <div className='slideBgImagePen slideBgImageScepterPenMbl6' data-aos="fade-up" data-aos-duration="1000"/>

                            </Slider>
                            {/*</section>*/}
                        </FullpageSection>
                    </FullPageSections>
                </Fullpage>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    // className={classes.modal}
                    className='MblProductModal'
                    open={this.state.openModal}

                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    // disableScrollLock={false}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    data-aos="fade-up"

                >

                    <div className='MblProductPaper'>
                        <span className="mblModalTitle">
                            <h4>Add Item</h4>
                        <CloseIcon onClick={() => this.handleCloseModal()} style={{
                            float: ' right',
                            padding: '2px', cursor: 'pointer'
                        }}/>
                        </span>
                        <div className="paperPenGrid">

                            {product_array.map((productItem, index) => {

                                // console.log(productItem)
                                return (
                                    <Grid container spacing={3} key={index}>
                                        <Grid item xs={4} className="GiftGrid">
                                            <div className="paperkraft-product-div">
                                                <img className="modalPenLandingImage" src={productItem.product_image} alt="product"/>
                                            </div>
                                        </Grid>

                                        <Grid item xs={4} className="GiftGrid"
                                              style={{flexDirection: 'column', alignItems: "flex-start"}}>
                                            <p className="gift_title">{productItem.product_name}</p>
                                            <p className="gift_price">Rs.{productItem.product_price}/&#42;</p>
                                            {/*<p className="gift_subtitle">{productItem.color}</p>*/}
                                        </Grid>
                                        <Grid item xs={4} className="GiftGrid">

                                            <Button id={'addToCart' + index} onClick={() => this.addItems(index)}
                                                    style={{
                                                        backgroundImage: " linear-gradient(261deg, #E4BA60, #EFB539)",
                                                        color: ' #000', fontWeight: " 600", fontSize: "12px"
                                                    }}
                                            >Add To Cart</Button>

                                            <form className="cart_action_form" id={'product_quantity' + index}>

                                                <div>
                                                    <div className="value-button" id="decrease"
                                                         onClick={() => this.decreaseValue(index)}
                                                         value="Decrease Value">-
                                                    </div>
                                                    <input type="number" id="number" value={productItem.quantity}
                                                           readOnly={true}/>
                                                    <div className="value-button" id="increase"
                                                         onClick={() => this.increaseValue(index)}
                                                         value="Increase Value">+
                                                    </div>
                                                </div>
                                            </form>
                                        </Grid>
                                    </Grid>
                                )
                            })
                            }
                        </div>
                        <Button className="PaperPenCheckoutBtn paperkraftPenAddToCartButton"
                                onClick={() => this.goToCart()}>GO
                            TO CART <i
                                className="ri-arrow-right-line"
                                style={{marginLeft: '25px'}}/></Button>
                    </div>
                </Modal>
                <div className="Paperkraft_landingBg_left">

                    <Button className="buy-Button-mblPaperkraftPen" onClick={() => this.handleOpen()}>
                                 <span style={{display: ' flex', justifyContent: 'space-around'}}>
                                     <span style={{
                                         letterSpacing: ' 2px'
                                     }}> BUY NOW</span>
                                     <i className="ri-arrow-right-line" style={{marginLeft: '25px'}}/>
                                 </span>
                    </Button>
                    <Fab color="primary" aria-label="add" className="CartFabButton" onClick={this.openCartSlidingPane}>
                        <CartContext.Consumer>

                            {
                                CartProvider => {
                                    return (
                                        <Badge
                                            badgeContent={CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity ? CartProvider.cart_data.checkoutQuantity : 0}
                                            color="secondary">
                                            <img src={CartIcon} alt="cart icon"/>
                                        </Badge>
                                    )
                                }
                            }
                        </CartContext.Consumer>

                        <CartContext.Consumer>

                            {
                                CartProvider => {

                                    let cart_count = CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity ? CartProvider.cart_data.checkoutQuantity : 0;
                                    return (
                                        <>
                                            {

                                                this.state.openSlidingPanel === true ?
                                                    <ReactSlidingPane
                                                        isOpen={this.state.openSlidingPanel}
                                                        title={'YOUR CART (' + cart_count + ' Item)'}
                                                        onRequestClose={this.closeCartSlidingpane} width="100%">
                                                        <ShoppingCart/>
                                                    </ReactSlidingPane> : null
                                            }

                                        </>
                                    )
                                }
                            }

                        </CartContext.Consumer>
                    </Fab>
                    <p className="landing-paperkraft-subtitle1_mbl">Pack of 6 starts from Rs.450/&#42;</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
});


const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
});


export default connect(mapStateToProps, mapDispatchToProps)(PaperkraftPenLandingPageMbl)
