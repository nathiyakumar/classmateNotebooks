import React from "react";
import './MusicSeriesPenLandingDesktop.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import $ from 'jquery';
import AOS from 'aos';
import Slider from "react-slick/lib";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fab from "@material-ui/core/Fab";
import CloseIcon from '@material-ui/icons/Close';
import {AddToCart} from "../../../Actions/non_customiser_action";
import {connect} from "react-redux";
import CreateCheckoutLineAddMutation from "../../../mutations/CreateCheckoutLineAddMutation";
import cogoToast from "cogo-toast";
import CreateAddToCartMutation from "../../../mutations/CreateAddToCartMutation";
import Badge from '@material-ui/core/Badge';
import CartContext from "../../CartProvider/cart-context";
import ReactSlidingPane from "../../SlidingPanel/SlidingPanel";
import ShoppingCart from "../../shoppingCart/shoppingCart";
import CreateCheckoutLineUpdateMutation from "../../../mutations/CreateCheckoutLineUpdateMutation";
import InfoIcon from '@material-ui/icons/Info';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const Choppinpen1 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/chopinPen1.png'
const Choppinpen2 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/chopinPen2.png'
const Beethoven1 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/beethoven1.png'
const Beethoven2 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/beethoven2.png'
const MozartPen = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/mozartPen.png'
const ReviewStar1 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/reviewStar1.png'
const ReviewStar2 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/reviewStar2.png'

const paperkraftLogo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraftLandinglogo.svg';
const CartIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cart-icon-black.svg";


const products = [{
    //staging sites variant Id
    variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjExNA==",
    //main's sites variant Id
    // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ5",
    product_name: "Paperkraft Chopin - Black",
    product_image: Choppinpen1,
    product_price: "150",
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
        product_name: "Paperkraft Chopin - Gray",
        product_image: Choppinpen2,
        product_price: "200",
        quantity: 1,
        //main's sites variant Id
        // sku: "04030087",
        //staging sites variant Id
        sku: ""
    },
    {
        //staging sites variant Id
        variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjExNA==",
        //main's sites variant Id
        // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ5",
        product_name: "Paperkraft Beethovan-Gold",
        product_image: Beethoven1,
        product_price: "250",
        quantity: 1,
        //main's sites variant Id
        // sku: "04030088",
        //staging sites variant Id
        sku: ""
    },
    {
        //staging sites variant Id
        variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjExNA==",
        //main's sites variant Id
        // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ5",
        product_name: "Paperkraft Beethovan-Gold",
        product_image: Beethoven2,
        product_price: "300",
        quantity: 1,
        //main's sites variant Id
        // sku: "04030088",
        //staging sites variant Id
        sku: ""
    },

    {
        //staging sites variant Id
        variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjExNA==",
        //main's sites variant Id
        // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ5",
        product_name: "Paperkraft Mozart-Gold",
        product_image: MozartPen,
        product_price: "350",
        quantity: 1,
        //main's sites variant Id
        // sku: "04030088",
        //staging sites variant Id
        sku: ""
    }];

class MusicSeriesPenLandingDesktop extends React.Component {

    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            isPlayed: false,
            openModal: false,
            openSlidingPanel: false,
            paperkraftProducts: [],
            disable_goto_cart_btn: true,
            header_cost_price: 0,
            header_price: 0,
            product_array: products
        }


    }

    componentDidMount() {

        AOS.init({

            // once: true
        });

    }


    handleOpen = (GA_label) => {
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
            product_array: product,
            disable_goto_cart_btn: false
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

                scope.sendAddToCartProductDetailstoGA(response.checkoutLineAdd.checkout.lines, index);
                cogoToast.success("Product Added To Your Bag successfully", {position: 'top-center'});

            } else {
                cogoToast.error("Product Not Added To Your Bag", {position: 'top-center'});

            }

        }, function (err) {
            cogoToast.error("Sold Out", {position: 'top-center'});

            // cogoToast.error(err, {position: 'top-center'});

        })

    };

    createCheckout = (data, Index) => {
        let scope = this;
        CreateAddToCartMutation(data, (response) => {
            if (response.checkoutCreate !== null) {

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
                scope.sendAddToCartProductDetailstoGA(response.checkoutCreate.checkout.lines, Index);
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
            cogoToast.error(err, {position: 'top-center'});


        })
    };


    openCartSlidingPane = () => {

        this.setState({
            openSlidingPanel: true
        })

    };
    closeCartSlidingpane = () => {

        setTimeout(() => {
            this.setState({openSlidingPanel: false});
        }, 10)
    };
    goToCart = () => {
        this.setState({
            openSlidingPanel: true,
            openModal: false
        })
        $("body").removeClass("modal-open");

    };
    sendAddToCartProductDetailstoGA = (checkout_lines, selected_product_index) => {
        let added_products = {};
        checkout_lines.map((line_item) => {
            if (line_item.variant.sku === products[selected_product_index].sku) {
                added_products = {
                    "id": products[selected_product_index].sku,
                    "name": products[selected_product_index].product_name,
                    "price": products[selected_product_index].product_price,
                    "category": "Paperkraft Products",
                    "quantity": products[selected_product_index].quantity,
                };
                if (window.dataLayer) {
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
    showfeature = (product) => {

        document.getElementsByClassName('choppinColorSectionGrid')[0].children[0].setAttribute("id", "overlayBlurChoppin1")
        document.getElementsByClassName('beethovenColorSectionGrid')[0].children[0].setAttribute("id", "overlayBlurBeethoven1")
        document.getElementsByClassName('mozartColorSectionGrid')[0].children[0].setAttribute("id", "overlayBlurMozart1")

        if (product === 'choppin') {
            document.getElementById('overlayBlurChoppin1').classList.add('featureOverlayShowChoppin')
            document.getElementById('overlayBlurChoppin2').classList.add('featureOverlayShowChoppin')
            document.getElementById('choppinFeatures').style.display = 'block'
        }
        else if (product === 'beethoven') {
            document.getElementById('overlayBlurBeethoven1').classList.add('featureOverlayShowChoppin')
            document.getElementById('overlayBlurBeethoven2').classList.add('featureOverlayShowChoppin')
            document.getElementById('beethovenFeatures').style.display = 'block'
        }
        else if (product === 'mozart') {

            document.getElementById('overlayBlurMozart1').classList.add('featureOverlayShowChoppin')
            document.getElementById('overlayBlurMozart2').classList.add('featureOverlayShowChoppin')
            document.getElementById('mozartFeatures').style.display = 'block'
        }
    }
    hidefeature = (product) => {

        if (product === 'choppin') {

            document.getElementById('overlayBlurChoppin1').classList.remove('featureOverlayShowChoppin')
            document.getElementById('overlayBlurChoppin2').classList.remove('featureOverlayShowChoppin')
            document.getElementById('choppinFeatures').style.display = 'none'
        }
        else if (product === 'beethoven') {

            document.getElementById('overlayBlurBeethoven1').classList.remove('featureOverlayShowChoppin')
            document.getElementById('overlayBlurBeethoven2').classList.remove('featureOverlayShowChoppin')
            document.getElementById('beethovenFeatures').style.display = 'none'
        }
        else if (product === 'mozart') {

            document.getElementById('overlayBlurMozart1').classList.remove('featureOverlayShowChoppin')
            document.getElementById('overlayBlurMozart2').classList.remove('featureOverlayShowChoppin')
            document.getElementById('mozartFeatures').style.display = 'none'
        }
    }

    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 2000

        };
        return (
            <>
                {/*<header className="page-header">*/}
                {/*<nav>*/}
                {/*    <div className="trigger-menu-wrapper" data-aos="fade-down">*/}
                {/*        <span className="headerItems">*/}
                {/*            <span>*/}
                {/*                  <img src={paperkraftLogo} alt="paperkraftLogo"/>*/}
                {/*                /!*<h3 style={{margin: '0px 10px'}}>Paperkraft Gifting Kit</h3>*!/*/}
                {/*            </span>*/}
                {/*            <span className="pricePaperkraftPen">*/}
                {/*             /!*<span className="staticPrice">Rs.{this.state.header_cost_price}</span> &nbsp;&nbsp;*!/*/}
                {/*                <span className="OfferPrice"*/}
                {/*                      style={{color: "#000", fontSize: '20px'}}> Starting at <span*/}
                {/*                    style={{fontSize: '24px'}}>Rs.1400/&#42;&nbsp;&nbsp;</span></span>*/}
                {/*                <Button className="landingBuyNoHeaderPaperkraftPen"*/}
                {/*                        onClick={() => this.handleOpen("BuyNowHeaderPGB")}>BUY NOW<i*/}
                {/*                    className="ri-arrow-right-line"*/}
                {/*                    style={{marginLeft: '25px'}}/></Button>*/}
                {/*            </span>*/}
                {/*        </span>*/}
                {/*    </div>*/}

                {/*</nav>*/}
                {/*</header>*/}
                <Fab color="primary" aria-label="add"
                     className="musicSeriesFabButtonpaperkraftPen CartFabButtondesktop"
                     onClick={this.openCartSlidingPane}>
                    <CartContext.Consumer>

                        {
                            CartProvider => {
                                return (
                                    <Badge
                                        badgeContent={CartProvider.cart_data && CartProvider.cart_data.checkoutQuantity ? CartProvider.cart_data.checkoutQuantity : 0}
                                        color="secondary">
                                        <img src={CartIcon} alt="cartIcon"/>
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
                                                    onRequestClose={this.closeCartSlidingpane} width="30rem">
                                                    <ShoppingCart/>
                                                </ReactSlidingPane> : null
                                        }

                                    </>
                                )
                            }
                        }

                    </CartContext.Consumer>
                </Fab>
                {/*<Fullpage>*/}
                {/*    <FullPageSections>*/}
                <div>
                    <div className="musicSeriesPenLandigPageDesc">

                        <main className="paperkraft_pen_page-main">
                            <section className='section1' style={{height: '100vh'}}>
                                <div className="landingfirstScreenMusicSeriesPen">
                                    <div className="landingfirstScreenMusicSeriesPenFlux">
                                        <div style={{textAlign: "start"}}>
                                            <img src={paperkraftLogo} alt="logo"/>
                                            <h2 className="PaperkraftPenLandingHeader" style={{color: "#fff"}}>Capped:
                                                It Impresses,<br/> Uncapped: It Expresses!</h2>
                                            <span className="OfferPrice">
            <span
                className="musicSeriesPenPrice">₹150 </span><span>onwards</span></span>
                                            <div>
                                                <Button className="landingShopBtn"
                                                ><a href="#section2" style={{color: '#000'}}>SHOP THE
                                                    COLLECTIONS</a></Button>
                                                <p style={{color: "#fff", fontSize: '10px'}}>*Products are subjected to
                                                    availability</p>
                                            </div>
                                            <div className="beethovenRotatePen"><img src={Beethoven2} className=""
                                                                                     alt="Choppinpen1"/></div>

                                        </div>
                                        <div>
                                            <img src={Choppinpen1} className="musicSeriesPenImage" alt="Choppinpen1"/>
                                            <img src={Beethoven1} className="musicSeriesPenImage" alt="Beethoven1"/>

                                        </div>
                                    </div>
                                    <span className="nextPageScroll">
	<a id="scrollSection1" href="#section2" style={{color: '#fff'}}>
Learn more	</a>
                                              <KeyboardArrowDownIcon/>

</span>

                                </div>
                            </section>

                            {/*</FullpageSection>*/}
                            <section id="section2" className="desktopMusicSeriesPenSection2">
                                <Grid container spacing={3}>
                                    <Grid item xs={4} className="colorSeriesGrid choppinColorSectionGrid">
                                        <Slider  {...settings} style={{position: 'relative'}}>
                                            <img src={Choppinpen1} className="secondSecImage" alt="Beethoven1"
                                                 style={{width: '25%'}}/>
                                            <img src={Choppinpen2} className="secondSecImage" alt="Beethoven1"
                                                 style={{width: '25%'}}/>
                                        </Slider>
                                        <div id="overlayBlurChoppin2" style={{position: 'relative'}}>
                                                <span className="MusicSeriesPenDetails">
                                                <p>Paperkraft Choppin Pen</p>
                                            <span
                                                className="musicSeriesPenPrice">₹150 </span>

                                            </span>
                                            <div>
                                                <Button className="landingShopBtn"
                                                        onClick={() => this.handleOpen("BuyNowPGB")}>BUY
                                                    CHOPPIN</Button>

                                            </div>
                                            <div>
                                                <Button style={{
                                                    color: '#fff',
                                                    fontWeight: '100',
                                                    fontSize: '10px',
                                                    marginTop: '10px'
                                                }}
                                                        onClick={() => this.showfeature('choppin')}>
                                                    <InfoIcon/>SHOW FEATURES
                                                </Button>

                                            </div>

                                        </div>
                                        <div className="featureChoppinOverlay" id="choppinFeatures">
                                            <div className="overlayFlex">
                                                <h3 className="" style={{color: '#FFF', marginTop: '0px'}}>Features</h3>
                                                <ul className="musicSeriesList">
                                                    <li>Metal body</li>
                                                    <li>Matte finish</li>
                                                    <li>Retractable Twist Mechanism</li>
                                                    <li>0.7mm Stainless Steel Tip</li>
                                                    <li>Smooth Writing Experience</li>
                                                </ul>
                                                <h3 style={{color: '#FFF'}}>Available Colour Variants</h3>
                                                <div className="colorVariantFlex">
                                                    <div id="colorOption1" className="colorOption1  activeColorChopin"
                                                         onClick={(e) => this.changeColorVariant('chopinBlack')}/>
                                                    <div id="colorOption2" className="colorOption2 "
                                                         onClick={(e) => this.changeColorVariant('chopinGray')}/>
                                                </div>
                                                <div>
                                                    <Button className="landingShopBtn"
                                                            onClick={() => this.handleOpen("BuyNowPGB")}>BUY
                                                        CHOPIN</Button>

                                                </div>
                                                <div>
                                                    <Button style={{
                                                        color: '#fff',
                                                        fontWeight: '100',
                                                        fontSize: '10px',
                                                        marginTop: '10px'
                                                    }}
                                                            onClick={() => this.hidefeature('choppin')}>
                                                        <InfoIcon/>hide FEATURES
                                                    </Button>

                                                </div>
                                            </div>



                                        </div>

                                    </Grid>

                                    <Grid item xs={4} className="colorSeriesGrid beethovenColorSectionGrid">
                                        <Slider {...settings}>
                                            <img src={Beethoven1} className="secondSecImage beethovenPenImage" alt="Beethoven1"
                                                 style={{width: '25%'}}/>
                                            <img src={Beethoven2} className="secondSecImage" alt="Beethoven1"
                                                 style={{width: '25%'}}/>
                                        </Slider>
                                        <div id='overlayBlurBeethoven2'>
                                                <span className="MusicSeriesPenDetails">
                                                <p>Paperkraft Beethoven Pen</p>
                                            <span
                                                className="musicSeriesPenPrice">₹250 </span>

                                            </span>
                                            <div>
                                                <Button className="landingShopBtn"
                                                        onClick={() => this.handleOpen("BuyNowPGB")}>BUY
                                                    BEETHOVEN</Button>

                                            </div>
                                            <div>
                                                <Button style={{
                                                    color: '#fff',
                                                    fontWeight: '100',
                                                    fontSize: '10px',
                                                    marginTop: '10px'
                                                }} onClick={() => this.showfeature('beethoven')}>
                                                    <InfoIcon/>SHOW FEATURES
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="featureBeethovenOverlay" id="beethovenFeatures">
                                            <div className="overlayFlex">
                                                <h3 className="" style={{color: '#FFF', marginTop: '0px'}}>Features</h3>
                                                <ul className="musicSeriesList">
                                                    <li>Metal body</li>
                                                    <li>Ceramic Roller Ball Pen</li>
                                                    <li>German Ink Technology</li>
                                                    <li>0.6mm Stainless Steel Tip</li>
                                                    <li>Smooth Writing Experience</li>
                                                </ul>
                                                <h3 style={{color: '#FFF'}}>Available Colour Variants</h3>
                                                <div className="colorVariantFlex">
                                                    <div id="beethovenOption1"
                                                         className="beethovenOption1  activeColorBeethoven"
                                                         onClick={(e) => this.changeColorVariant('beethovenBlack')}/>
                                                    <div id="beethovenOption2" className="beethovenOption2 "
                                                         onClick={(e) => this.changeColorVariant('beethovenGold')}/>
                                                </div>
                                                <div>
                                                    <Button className="landingShopBtn"
                                                            onClick={() => this.handleOpen("BuyNowPGB")}>BUY
                                                        BEETHOVEN</Button>

                                                </div>
                                                <div>
                                                    <Button style={{
                                                        color: '#fff',
                                                        fontWeight: '100',
                                                        fontSize: '10px',
                                                        marginTop: '10px'
                                                    }} onClick={() => this.hidefeature('beethoven')}>
                                                        <InfoIcon/>HIDE FEATURES
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </Grid>

                                    <Grid item xs={4} className="colorSeriesGrid mozartColorSectionGrid">
                                        <Slider {...settings} >
                                            <img src={MozartPen} className="secondSecImage mozartPenImage" alt="Beethoven1"
                                                 style={{width: '25%'}}/>
                                        </Slider>
                                        <div id='overlayBlurMozart2'>
                                                <span className="MusicSeriesPenDetails">
                                                <p>Paperkraft Mozart Pen</p>
                                            <span
                                                className="musicSeriesPenPrice">₹350 </span>

                                                    <div className="MozartPen  activeColorMozart"/>
                                            </span>

                                            <div>
                                                <Button className="landingShopBtn" style={{marginTop:'15px !important'}}
                                                        onClick={() => this.handleOpen("BuyNowPGB")}>BUY MOZART</Button>

                                            </div>
                                            <div>
                                                <Button style={{
                                                    color: '#fff',
                                                    fontWeight: '100',
                                                    fontSize: '10px',
                                                    marginTop: '10px'
                                                }} onClick={() => this.showfeature('mozart')}>
                                                    <InfoIcon/>SHOW FEATURES
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="featureMozartOverlay" id='mozartFeatures'>
                                            <div className="overlayFlex">
                                                <h3 className="" style={{color: '#FFF', marginTop: '0px'}}>Features</h3>
                                                <ul className="musicSeriesList">
                                                    <li>Metal body</li>
                                                    <li>Ceramic Roller Ball Pen</li>
                                                    <li>German Ink Technology</li>
                                                    <li>0.6mm Stainless Steel Tip</li>
                                                    <li>Smooth Writing Experience</li>
                                                </ul>
                                                <h3 style={{color: '#FFF'}}>Available Colour Variants</h3>
                                                <div className="colorVariantFlex">
                                                    <div className="MozartPen  activeColorMozart"/>
                                                </div>
                                                <div>
                                                    <Button className="landingShopBtn"
                                                            onClick={() => this.handleOpen("BuyNowPGB")}>BUY MOZART</Button>

                                                </div>
                                                <div>
                                                    <Button style={{
                                                        color: '#fff',
                                                        fontWeight: '100',
                                                        fontSize: '10px',
                                                        marginTop: '10px'
                                                    }} onClick={() => this.hidefeature('mozart')}>
                                                        <InfoIcon/>HIDE FEATURES
                                                    </Button>
                                                </div>

                                            </div>

                                        </div>
                                    </Grid>

                                </Grid>


                            </section>
                            <section  className="desktopMusicSeriesPenSection3">
                                <div className="musicSeriesReviewSection">
                                    <h2 style={{color:'#fff'}}>Reviews</h2>
                                    <div className="reviewCardAlign">
                                    <Grid container spacing={3}>
                                        {/*<Grid item xs={1} className="" />*/}
                                        <Grid item xs={4} className="">
                                            <div className="musicSeriesReviewCard">
                                                <h3>John Doe</h3>
                                                <p style={{fontSize: '12px'}}>Chennai, TN</p>
                                                <span>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                                <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className="">
                                            <div className="musicSeriesReviewCard">
                                                <h3>John Doe</h3>
                                                <p style={{fontSize: '12px'}}>Chennai, TN</p>
                                                <span>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                                <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className="">
                                            <div className="musicSeriesReviewCard">
                                                <h3>John Doe</h3>
                                                <p style={{fontSize: '12px'}}>Chennai, TN</p>
                                                <span>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                                <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className="">
                                            <div className="musicSeriesReviewCard">
                                                <h3>John Doe</h3>
                                                <p style={{fontSize: '12px'}}>Chennai, TN</p>
                                                <span>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                                <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className="">
                                            <div className="musicSeriesReviewCard">
                                                <h3>John Doe</h3>
                                                <p style={{fontSize: '12px'}}>Chennai, TN</p>
                                                <span>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                                <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} className="">
                                            <div className="musicSeriesReviewCard">
                                                <h3>John Doe</h3>
                                                <p style={{fontSize: '12px'}}>Chennai, TN</p>
                                                <span>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                                <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    </div>
                                </div>

                            </section>

                            <Modal
                                aria-labelledby="spring-modal-title"
                                aria-describedby="spring-modal-description"
                                // className={classes.modal}
                                className='ProductModal'
                                open={this.state.openModal}

                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                // disableScrollLock={false}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                                data-aos="fade-down"

                            >

                                <div className='ProductPaperMusicSeriesPen'>
                                    <CloseIcon onClick={() => this.handleCloseModal()} style={{
                                        float: ' right',
                                        padding: '15px', cursor: 'pointer'
                                    }}/>
                                    <div className="paperGrid">
                                        {this.state.product_array.map((productItem, index) => {

                                            // console.log(productItem)
                                            return (
                                                <Grid container spacing={3} key={index}>
                                                    <Grid item xs={3} className="GiftGrid">
                                                        <div className="paperkraft-product-div">
                                                            <img className="musicSeriesDescImage"
                                                                 src={productItem.product_image} alt="product"/>
                                                        </div>
                                                    </Grid>

                                                    <Grid item xs={3} className="GiftGrid"
                                                          style={{
                                                              flexDirection: 'column',
                                                              alignItems: "flex-start"
                                                          }}>
                                                        <p className="gift_title">{productItem.product_name}</p>
                                                        {/*<p className="gift_subtitle">{productItem.color}</p>*/}
                                                    </Grid>

                                                    <Grid item xs={3} className="GiftGrid">
                                                        <p className="gift_price">₹{productItem.product_price}</p>
                                                    </Grid>

                                                    <Grid item xs={3} className="GiftGrid">
                                                        {/*{*/}
                                                        {/*    productItem.stock_quantity > 0 ?*/}
                                                        {/*        (*/}
                                                        <Button id={'addToCart' + index}
                                                                onClick={() => this.addItems(index)}
                                                                style={{
                                                                    backgroundColor: "#E4BB60",
                                                                    color: "#000",
                                                                    fontWeight: " 600"
                                                                }}
                                                        >Add To Cart</Button>
                                                        <form className="cart_action_form"
                                                              id={'product_quantity' + index}>

                                                            <div>
                                                                <div className="value-button" id="decrease"
                                                                     onClick={() => this.decreaseValue(index)}
                                                                     value="Decrease Value">-
                                                                </div>
                                                                <input type="number" id="number"
                                                                       value={productItem.quantity}
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
                                    <Button className="PaperkraftPenCheckoutBtn" onClick={() => this.goToCart()}
                                            disabled={this.state.disable_goto_cart_btn}>GO TO CART <i
                                        className="ri-arrow-right-line"
                                        style={{marginLeft: '25px'}}/></Button>
                                </div>
                            </Modal>

                        </main>


                    </div>
                </div>
                {/*</FullPageSections>*/}
                {/*</Fullpage>*/}
            </>
        );
    }
}

const mapStateToProps = state => ({
    cart_data: state.CartReducer.cart_data,
});

const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicSeriesPenLandingDesktop);
