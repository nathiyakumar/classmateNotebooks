import React from "react";
import './PaperkraftPenLandingPageDesktop.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import $ from 'jquery';
import AOS from 'aos';
import Slider from "react-slick/lib";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fab from "@material-ui/core/Fab";
import CloseIcon from '@material-ui/icons/Close';
import {AddToCart} from "../../Actions/non_customiser_action";
import {connect} from "react-redux";
import CreateCheckoutLineAddMutation from "../../mutations/CreateCheckoutLineAddMutation";
import cogoToast from "cogo-toast";
import CreateAddToCartMutation from "../../mutations/CreateAddToCartMutation";
import Badge from '@material-ui/core/Badge';
import CartContext from "../CartProvider/cart-context";
import ReactSlidingPane from "../SlidingPanel/SlidingPanel";
import ShoppingCart from "../shoppingCart/shoppingCart";
import CreateCheckoutLineUpdateMutation from "../../mutations/CreateCheckoutLineUpdateMutation";
import Fullpage, {FullPageSections, FullpageSection} from '@ap.cx/react-fullpage';


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
        //main's sites variant Id
        // variantId: "UHJvZHVjdFZhcmlhbnRUeXBlOjQ4",
        product_name: "PAPERKRAFT SCEPTER CERAMIC PEN",
        product_image: "https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Pens/scepter-pen2.png",
        product_price: "1600",
        quantity: 1,
        //main sites variant Id
        // sku: "04030087",
        //staging sites variant Id
        sku: ""
    }];

class PaperkraftPenLandingPageDesktop extends React.Component {

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

        if (document.querySelector(".section1")) {
            $('.page-header').css("display", "none")
        } else {
            $('.page-header').css("display", "block")
        }
        const body = document.body;
        $('.page-header').css("display", "none");
        const scrollUp = "scroll-up";
        const scrollDown = "scroll-down";
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll === 0) {
                body.classList.remove(scrollUp);
                $('.page-header').css("display", "none");
                return;
            }

            if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
                $('.page-header').css("display", "block");

                $('#moveimage').addClass('movedown');
                $('#moveimage').removeClass('moveup')
            } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
                // $('.page-header').css("display", "none")
                $('#moveimage').addClass('moveup');
                $('#moveimage').removeClass('movedown')
            }
            lastScroll = currentScroll;
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

                scope.sendAddToCartProductDetailstoGA(response.checkoutLineAdd.checkout.lines,index);
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
                scope.sendAddToCartProductDetailstoGA(response.checkoutCreate.checkout.lines,Index);
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

    playPause() {
        var myVideo = document.getElementById("myVideo");
        if (myVideo.paused) {

            myVideo.play();
            this.setState({
                isPlayed: true
            })
        } else {
            myVideo.pause();
            this.setState({
                isPlayed: false
            })
        }

    }

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
    sendAddToCartProductDetailstoGA = (checkout_lines,selected_product_index) => {
        let added_products = {};
        checkout_lines.map((line_item)=>{
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

    render() {

        const settings = {
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
            <>
                <header className="page-header">
                    <nav>
                        <div className="trigger-menu-wrapper" data-aos="fade-down">
                            <span className="headerItems">
                                <span>
                                      <img src={paperkraftLogo} alt="paperkraftLogo"/>
                                    {/*<h3 style={{margin: '0px 10px'}}>Paperkraft Gifting Kit</h3>*/}
                                </span>
                                <span className="pricePaperkraftPen">
                                 {/*<span className="staticPrice">Rs.{this.state.header_cost_price}</span> &nbsp;&nbsp;*/}
                                    <span className="OfferPrice"
                                          style={{color: "#000", fontSize: '20px'}}> Starting at <span
                                        style={{fontSize: '24px'}}>Rs.1400/&#42;&nbsp;&nbsp;</span></span>
                                    <Button className="landingBuyNoHeaderPaperkraftPen"
                                            onClick={() => this.handleOpen("BuyNowHeaderPGB")}>BUY NOW<i
                                        className="ri-arrow-right-line"
                                        style={{marginLeft: '25px'}}/></Button>
                                </span>
                            </span>
                        </div>

                    </nav>
                </header>
                <Fab color="primary" aria-label="add"
                     className="paperkraftCartFabButtonpaperkraftPen CartFabButtondesktop"
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
                <Fullpage>
                    <FullPageSections>
                        <div className="PaperkaraftPenLandingPage">

                            <main className="paperkraft_pen_page-main">
                                <FullpageSection className='section1' style={{height: '100vh'}}>
                                    <div>

                                        <div className="landingfirstscreenPaperkraftPen">
                                            <img src={paperkraftLogo} style={{width: "12%"}} alt="logo"/>
                                            <p className="PaperkraftPenLandingHeader">Best Gift For Your Loved Ones!</p>
                                            <p className="sub_text" style={{color: "#fff"}}>Experience Elite penmanship
                                                with Paperkraft Premium Pens</p>
                                            <span className="pricePaperkraftPen">
                                            {/*<span*/}
                                                {/*    className="staticPrice">Starting from <span className="">Rs 1400/-</span></span> &nbsp;&nbsp;*/}
                                                <span className="OfferPrice"> Starting at <span
                                                    className="">Rs 1400/&#42;</span></span>

                                            </span>

                                            <Button className="landingBuyNow"
                                                    onClick={() => this.handleOpen("BuyNowPGB")}>BUY NOW</Button>
                                            <span style={{display: 'flex', justifyContent: 'center'}}/>
                                            <img style={{width: '60%'}}
                                                 src="https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Pens/paperkraft-pen-image.png" alt="penImage"/>
                                        </div>

                                    </div>
                                </FullpageSection>
                                <FullpageSection id="section3" className="desktopPenSection3"   data-aos="fade-up"
                                                 data-aos-duration="1000">
                                    <div className="slider-page-section3 ">
                                        <Slider {...settings} >
                                            <div className='slideBgImagePen slideBgImageCallistaPen1' data-aos="fade-up" data-aos-duration="1000"/>
                                            <div className='slideBgImagePen slideBgImageCallistaPen2' data-aos="fade-up" data-aos-duration="1000"/>
                                            <div className='slideBgImagePen slideBgImageCallistaPen3' data-aos="fade-up" data-aos-duration="1000" />
                                            <div className='slideBgImagePen slideBgImageCallistaPen4' data-aos="fade-up" data-aos-duration="1000" />
                                            <div className='slideBgImagePen slideBgImageCallistaPen5' data-aos="fade-up" data-aos-duration="1000" />
                                            {/*<div className='slideBgImagePen slideBgImageCallistaPen6' data-aos="fade-up" data-aos-duration="1000" />*/}
                                        </Slider>
                                    </div>

                                </FullpageSection>
                                <FullpageSection className='landingPenSecondScreen section2' id='section2'
                                                 data-aos="fade-up"
                                                 data-aos-duration="1000"
                                >
                                    <div>
                                        <Slider {...settings} >
                                            <div className='slideBgImagePen slideBgImageScepterPen1' data-aos="fade-up" data-aos-duration="1000"/>
                                            <div className='slideBgImagePen slideBgImageScepterPen2' data-aos="fade-up" data-aos-duration="1000"/>
                                            <div className='slideBgImagePen slideBgImageScepterPen3' data-aos="fade-up" data-aos-duration="1000" />
                                            <div className='slideBgImagePen slideBgImageScepterPen4' data-aos="fade-up" data-aos-duration="1000" />
                                            <div className='slideBgImagePen slideBgImageScepterPen5' data-aos="fade-up" data-aos-duration="1000" />
                                            <div className='slideBgImagePen slideBgImageScepterPen6' data-aos="fade-up" data-aos-duration="1000" />
                                        </Slider>
                                    </div>
                                </FullpageSection>
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

                                    <div className='ProductPaper'>
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
                                                                <img className="modalImage"
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
                                                            <p className="gift_price">Rs.{productItem.product_price}/&#42;</p>
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
                    </FullPageSections>
                </Fullpage>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaperkraftPenLandingPageDesktop);
