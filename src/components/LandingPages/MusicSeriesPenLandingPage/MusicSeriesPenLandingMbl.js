import React from "react";
import './MusicSeriesPenLandingMbl.css'
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import $ from "jquery";
import AOS from "aos";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import CartContext from "../../CartProvider/cart-context";
import CreateCheckoutLineAddMutation from "../../../mutations/CreateCheckoutLineAddMutation";
import cogoToast from "cogo-toast";
import CreateAddToCartMutation from "../../../mutations/CreateAddToCartMutation";
import Badge from "@material-ui/core/Badge/Badge";
import ReactSlidingPane from "../../SlidingPanel/SlidingPanel";
import ShoppingCart from "../../shoppingCart/shoppingCart";
import {AddToCart} from "../../../Actions/non_customiser_action";
import musicSeriesPen from '../../../assets/images/musicSeriesPens.png'

import {connect} from "react-redux";
import CreateCheckoutLineUpdateMutation from "../../../mutations/CreateCheckoutLineUpdateMutation";
import Fullpage, {FullPageSections, FullpageSection} from "@ap.cx/react-fullpage";

import ItemsCarousel from "react-items-carousel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const choppinBlackSlider1 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/chopin_img1.png'
const choppinBlackSlider2 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/chopin_img2.png'
const choppinBlackSlider3 = 'https://cdn.classmateshop.co.in/live/landing_pages/PaperKraft-Bethovan/chopin_img3.png'
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

class MusicSeriesPenLandingMbl extends React.Component {

    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            isPlayed: false,
            openModal: false,
            openCaurosalModal:false,
            giftBox1_quantity: 0,
            giftBox2_quantity: 0,
            giftBox3_quantity: 0,
            giftBox4_quantity: 0,
            openSlidingPanel: false,
            paperkraftProducts: [],
            header_cost_price: 0,
            header_price: 0,
            product_array: products,
            sliderImage:[],
            nav1: null,
            nav2: null,
            activeItemIndex:0,
            currentIndex:0

        }

    }

    componentDidMount() {

        AOS.init({

            once: true
        });
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    changeSlide = (event , slider_index) => {
        const CurrentIndex = slider_index;
        // let slideWidth = this.slideWidth();
        // let value = CurrentIndex * parseInt(slideWidth) * -1;
        let image = event.target.src

        this.setState({
            // translateValue: value,
            currentIndex: CurrentIndex,
            selectedImage:image
            // previewImage: this.state.userSelectedImages[slider_index]['preview_url']
        });
    };
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

                scope.sendAddToCartProductDetailstoGA(response.checkoutLineAdd.checkout.lines, index);
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
                scope.sendAddToCartProductDetailstoGA(response.checkoutLineAdd.checkout.lines, Index);
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

    goToCart = () => {
        this.setState({
            openSlidingPanel: true,
            openModal: false
        });
        $("body").removeClass("modal-open");

    };
    goToCarousalModal = (e) =>{

        let penVariant = e.target.alt
        let sliderImages =[]
        let selected

        if(penVariant === "chopin1"){
            sliderImages =[
                {'img': choppinBlackSlider1},
                {'img': choppinBlackSlider2},
                {'img': choppinBlackSlider3}
            ]
            selected = choppinBlackSlider1
            // sliderImages.push(mageobject)
        }
        else if(penVariant === "chopin2"){
            sliderImages =[
                {'img': choppinBlackSlider1},
                {'img': choppinBlackSlider2},
                {'img': choppinBlackSlider3}
            ]
            selected = choppinBlackSlider1
        }
        else  if(penVariant === "Beethoven1"){
            sliderImages =[
                {'img': choppinBlackSlider1},
                {'img': choppinBlackSlider2},
                {'img': choppinBlackSlider3}
            ]
            selected = choppinBlackSlider1
        }
        else  if(penVariant === "Beethoven2"){
            sliderImages =[
                {'img': choppinBlackSlider1},
                {'img': choppinBlackSlider2},
                {'img': choppinBlackSlider3}
            ]
            selected = choppinBlackSlider1
        }
        else  if(penVariant === "MozartPen"){
            sliderImages =[
                {'img': choppinBlackSlider1},
                {'img': choppinBlackSlider2},
                {'img': choppinBlackSlider3}
            ]
            selected = choppinBlackSlider1
        }
        this.setState({
            openCaurosalModal: true,
            sliderImage:sliderImages,
            selectedImage:selected
        });
        $("body").addClass("modal-open");
    }
    handleCloseCarousalModal =() =>{
        this.setState({
            openCaurosalModal: false,
        })
        $("body").removeClass("modal-open");
    }
    changeColorVariant = (variant) => {
        var chopinPenImg = document.getElementById('ChopinPen');
        var chopinPenImg2 = document.getElementById('BeethovenPen');
        if (variant === 'chopinBlack') {
            chopinPenImg.setAttribute('src', Choppinpen1)
            chopinPenImg.setAttribute('alt', 'Choppinpen1')
            document.getElementById('colorOption1').classList.add('activeColorChopin');
            document.getElementById('colorOption2').classList.remove('activeColorChopin')

        } else if (variant === 'chopinGray') {
            chopinPenImg.setAttribute('src', Choppinpen2)
            chopinPenImg.setAttribute('alt', 'Choppinpen2')
            document.getElementById('colorOption2').classList.add('activeColorChopin')
            document.getElementById('colorOption1').classList.remove('activeColorChopin')


        } else if (variant === 'beethovenBlack') {
            chopinPenImg2.setAttribute('src', Beethoven1)
            chopinPenImg2.setAttribute('alt', 'Beethoven1')
            chopinPenImg2.style.width ='25%'
            document.getElementById('beethovenOption1').classList.add('activeColorBeethoven')
            document.getElementById('beethovenOption2').classList.remove('activeColorBeethoven')


        } else if (variant === 'beethovenGold') {
            chopinPenImg2.setAttribute('src', Beethoven2)
            chopinPenImg2.setAttribute('alt', 'Beethoven2')
            chopinPenImg2.style.width ='35%'
            document.getElementById('beethovenOption2').classList.add('activeColorBeethoven')
            document.getElementById('beethovenOption1').classList.remove('activeColorBeethoven')


        }
    }

    render() {

        const {product_array} = this.state;
       const setting ={
           infinite: true,
           speed: 300,
           slidesToShow: 1,
           adaptiveHeight: true
       }

            return (
            <div className="MobileMusicSeriesPenLandingPage">
                {/*<header className="MobileMusicSeriesLandingHeader">*/}
                {/*    <img src={paperkraftLogo} alt="paperkraftLogo"/>*/}
                {/*</header>*/}
                <Fullpage>
                    <FullPageSections>
                        {/*<section className="LandingFirstSectionMbl">*/}
                        <FullpageSection className="LandingFirstSectionMbl">

                            <div className="paperkraftLogo">
                                <img src={paperkraftLogo} alt="paperkraftLogo"/>
                            </div>
                            <h2 style={{color: '#fff', marginTop: "5px", marginBottom: '0px'}}>Capped: It
                                Impresses,</h2>
                            <h2 style={{color: '#fff', marginTop: "0px"}}> Uncapped: It Expresses!</h2>
                            <h5 className="MblMusicSeriesSubTitle" style={{color: '#FFF'}}>Premium range of metallic
                                pens.</h5>
                            <span className="pricePaperkraft">
                                <span className="OfferPrice" style={{color: '#E3BB5F'}}> ₹150</span> &nbsp;&nbsp;
                                <span style={{color: '#FFF', fontSize: "20px", fontWeight: "700"}}>onwards</span>
                            </span>
                            {/*<span className="shippingText">&nbsp;&nbsp;+&nbsp;&nbsp;Free Shipping</span>*/}

                            <span style={{display: 'flex', justifyContent: 'center', margin: '5px'}}>

                    </span>
                            <img src={musicSeriesPen} alt="music series"/>
                            {/*</section>*/}
                        </FullpageSection>
                        <FullpageSection className='LandingSecondSectionMbl' data-aos="fade-up"
                                         data-aos-duration="1000">
                            <h2 style={{color: '#fff', marginTop: "0px"}}>Paperkraft Chopin</h2>
                            <h5 className="" style={{color: '#FFF', fontSize: '15px', fontWeight: 'normal'}}>Pen that
                                holds up to your active lifestyle!</h5>

                            <div className="musicSeriesFlex">
                                <div style={{width: '50%'}}>
                                    <h3 className="" style={{color: '#FFF', marginTop: '0px'}}>Features</h3>
                                    <ul className="musicSeriesList">
                                        <li>Metal body</li>
                                        <li>Matte finish</li>
                                        <li>Retractable Twist Mechanism</li>
                                        <li>0.7mm Stainless Steel Tip</li>
                                        <li>Smooth Writing Experience</li>
                                    </ul>
                                    <h3 style={{color: '#FFF'}}>Colour Variants</h3>
                                    <div className="colorVariantFlex">
                                        <div id="colorOption1" className="colorOption1  activeColorChopin"
                                             onClick={(e) => this.changeColorVariant('chopinBlack')}/>
                                        <div id="colorOption2" className="colorOption2 "
                                             onClick={(e) => this.changeColorVariant('chopinGray')}/>
                                    </div>
                                    <h1 className="" style={{color: '#E3BB5F'}}> ₹150</h1> &nbsp;&nbsp;

                                </div>
                                <div style={{width: '50%'}}>
                                    <img id="ChopinPen" className="ChopinPen" src={Choppinpen1} alt="chopin1" onClick={(event) => this.goToCarousalModal(event)}/>


                                </div>
                            </div>

                        </FullpageSection>
                        <FullpageSection className='LandingSecondSectionMbl' data-aos="fade-up"
                                         data-aos-duration="1000">
                            <h2 style={{color: '#fff', marginTop: "0px"}}>Paperkraft Beethoven</h2>
                            <h5 className="" style={{color: '#FFF', fontSize: '15px', fontWeight: 'normal'}}>Pen for
                                quality writing experience!</h5>

                            <div className="musicSeriesFlex">
                                <div style={{width: '50%'}}>
                                    <h3 className="" style={{color: '#FFF', marginTop: '0px'}}>Features</h3>
                                    <ul className="musicSeriesList">
                                        <li>Metal body</li>
                                        <li>Ceramic Roller Ball Pen</li>
                                        <li>German Ink Technology</li>
                                        <li>0.6mm Stainless Steel Tip</li>
                                        <li>Smooth Writing Experience</li>
                                    </ul>
                                    <h3 style={{color: '#FFF'}}>Colour Variants</h3>
                                    <div className="colorVariantFlex">
                                        <div id="beethovenOption1" className="beethovenOption1  activeColorBeethoven"
                                             onClick={(e) => this.changeColorVariant('beethovenBlack')}/>
                                        <div id="beethovenOption2" className="beethovenOption2 "
                                             onClick={(e) => this.changeColorVariant('beethovenGold')}/>
                                    </div>
                                    <h1 className="" style={{color: '#E3BB5F'}}> ₹250</h1> &nbsp;&nbsp;

                                </div>
                                <div style={{width: '50%'}}>
                                    <img id="BeethovenPen" className="ChopinPen" src={Beethoven1} alt="chopin1" style={{width:'25%'}}  onClick={(event) => this.goToCarousalModal(event)}/>


                                </div>
                            </div>
                        </FullpageSection>
                        <FullpageSection className='LandingSecondSectionMbl' data-aos="fade-up"
                                         data-aos-duration="1000">
                            <h2 style={{color: '#fff', marginTop: "0px"}}>Paperkraft Mozart</h2>
                            <h5 className="" style={{color: '#FFF', fontSize: '15px', fontWeight: 'normal'}}>Pen with a
                                touch of elegance & sophistication!</h5>

                            <div className="musicSeriesFlex">
                                <div style={{width: '50%'}}>
                                    <h3 className="" style={{color: '#FFF', marginTop: '0px'}}>Features</h3>
                                    <ul className="musicSeriesList">
                                        <li>Metal body</li>
                                        <li>Ceramic Roller Ball Pen</li>
                                        <li>German Ink Technology</li>
                                        <li>0.6mm Stainless Steel Tip</li>
                                        <li>Smooth Writing Experience</li>
                                    </ul>
                                    <h3 style={{color: '#FFF'}}>Colour Variants</h3>
                                    <div className="colorVariantFlex">
                                        <div className="MozartPen  activeColorMozart"/>
                                    </div>
                                    <h1 className="" style={{color: '#E3BB5F'}}> ₹350</h1> &nbsp;&nbsp;

                                </div>
                                <div style={{width: '50%'}}>
                                    <img id="ChopinPen" className="ChopinPen" src={MozartPen} alt="MozartPen" onClick={(event) => this.goToCarousalModal(event)}/>


                                </div>
                            </div>
                        </FullpageSection>
                        <FullpageSection className='LandingSecondSectionMbl' data-aos="fade-up"
                                         data-aos-duration="1000">
                            <h2 style={{color: '#fff', marginTop: "0px"}}  > Our Customers Reviews
                        </h2>
                            <Slider {...setting} style={{height:'40vh'}}>

                                <div className="testimonial-slider">
                                    <div >
                                        <h3 className="" style={{color: '#FFF', fontWeight: 'normal'}}>John Doe</h3>
                                    <p  style={{color: '#FFF'}}>Chennai, TN</p>
                                        <span style={{display:'flex'}}>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                    <p  style={{color: '#FFF'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>

                                    </div>
                                </div>
                                <div className="testimonial-slider">
                                    <div >
                                        <h3 className="" style={{color: '#FFF' ,fontWeight: 'normal'}}>John Doe</h3>
                                        <p  style={{color: '#FFF'}}>Chennai, TN</p>
                                        <span style={{display:'flex'}}>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                        <p  style={{color: '#FFF'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>

                                    </div>
                                </div>
                                <div className="testimonial-slider">
                                    <div >
                                        <h3 className="" style={{color: '#FFF', fontWeight: 'normal'}}>John Doe</h3>
                                        <p  style={{color: '#FFF'}}>Chennai, TN</p>
                                        <span style={{display:'flex'}}>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar1}/>
                                                    <img src={ReviewStar2}/>
                                                </span>
                                        <p  style={{color: '#FFF'}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren…</p>

                                    </div>
                                </div>
                            </Slider>
                        </FullpageSection>
                    </FullPageSections>
                </Fullpage>

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    // className={classes.modal}
                    className='MblMusicSeriesPenModal'
                    open={this.state.openModal}

                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    // disableScrollLock={false}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    data-aos="fade-up"

                >

                    <div className='MblSeriesProductPaper'>
                        <span className="mblModalTitle">
                            <h4 style={{color: '#fff'}}>Add Item</h4>
                        <CloseIcon onClick={() => this.handleCloseModal()} style={{
                            float: ' right',
                            padding: '2px', cursor: 'pointer',
                            color: '#fff'
                        }}/>
                        </span>
                        <div className="paperPenGrid">

                            {product_array.map((productItem, index) => {

                                // console.log(productItem)
                                return (
                                    <Grid container spacing={3} key={index}>
                                        <Grid item xs={4} className="GiftGrid">
                                            <div className="paperkraft-product-div">
                                                <img className="modalPenLandingImage" src={productItem.product_image}
                                                     alt="product"/>
                                            </div>
                                        </Grid>

                                        <Grid item xs={8} className="GiftGrid"
                                              style={{flexDirection: 'column', alignItems: "flex-start"}}>
                                            <p className="gift_title">{productItem.product_name}</p>
                                            <div className="modalMusicSeriesFlex">
                                                <p className="gift_price">₹{productItem.product_price}</p>
                                                <Button id={'addToCart' + index} onClick={() => this.addItems(index)}
                                                        style={{
                                                            backgroundColor: '#F7DB92',
                                                            color: ' #000', fontWeight: " 600", fontSize: "12px"
                                                        }}
                                                >ADD THIS PEN</Button>

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
                                            </div>
                                            {/*<p className="gift_subtitle">{productItem.color}</p>*/}
                                        </Grid>

                                    </Grid>
                                )
                            })
                            }
                        </div>
                        <Button className="PaperMusicSeriesPenCheckoutBtn paperkraftPenAddToCartButton"
                                onClick={() => this.goToCart()}>GO
                            TO CART <i
                                className="ri-arrow-right-line"
                                style={{marginLeft: '25px'}}/></Button>
                    </div>

                </Modal>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    // className={classes.modal}
                    className='MblMusicSeriesPenModal'
                    open={this.state.openCaurosalModal}

                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    // disableScrollLock={false}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    data-aos="fade-up"

                >

                    <div className='MblSeriesProductPaper'>
                        <span className="mblModalTitle" style={{height:"10vh", justifyContent:'flex-end'}}>
                            {/*<h4 style={{color: '#fff'}}>Add Item</h4>*/}
                        <CloseIcon onClick={() => this.handleCloseCarousalModal()} style={{
                            float: ' left',
                            padding: '2px', cursor: 'pointer',
                            color: '#fff'
                        }}/>
                        </span>
                        <div>

                           <div className="selectedImageSlider">
                               <img  src={this.state.selectedImage} />
                           </div>

                            <ItemsCarousel
                                outsideChevron={true}
                                showSlither={false}
                                requestToChangeActive={value => this.setState({activeItemIndex: value})}
                                activeItemIndex={this.state.activeItemIndex}
                                numberOfCards={3}
                                gutter={1}
                                leftChevron={<Fab aria-label="add" className="desktop_thumbnail_arrows">
                                    <ChevronLeftIcon/>
                                </Fab>}
                                rightChevron={<Fab aria-label="add" className="desktop_thumbnail_arrows">
                                    <ChevronRightIcon/>
                                </Fab>}
                                // chevronWidth={50}
                            >
                                {
                                    this.state.sliderImage.map((image, index) => {
                                        return (
                                            <div
                                                className={index === this.state.currentIndex ? 'desktop_thumbnail_active' : 'desktop_thumbnail_inactive'}
                                                key={index}>
                                                <img src={image.img}
                                                     onClick={(event) => this.changeSlide(event,index)}
                                                     className='desktop_canvas_thumnail penThumbnail'/>
                                            </div>
                                        )
                                    })
                                }

                            </ItemsCarousel>
                        </div>
                    </div>

                </Modal>
                <div className="Paperkraft_landingBg_left">

                    <Button className="buy-Button-mblPaperkraftPen" onClick={() => this.handleOpen()}>
                                 <span style={{display: ' flex', justifyContent: 'space-around'}}>
                                     <span style={{
                                         letterSpacing: ' 2px'
                                     }}> SHOP the COllections</span>
                                     {/*<i className="ri-arrow-right-line" style={{marginLeft: '25px'}}/>*/}
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


export default connect(mapStateToProps, mapDispatchToProps)(MusicSeriesPenLandingMbl)
