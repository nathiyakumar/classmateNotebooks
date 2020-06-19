import React from "react";
import './PaperkraftLandingPageMobile.css'
import Slider from "react-slick/lib";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import $ from "jquery";
import AOS from "aos";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import {fetchQuery} from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';
import environment from "../../Environment";
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


const paperkraftLogo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraftLandinglogo.svg';
const lifetime = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/life-icon.svg";
const EcoFrindly = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/eco-friendly.svg";
const boundIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/bound-icon.svg";
const freeTech = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/free-tech.svg";
const CertPaper = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cert-paper.svg";
const quality = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/quality.svg";
const CartIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cart-icon-black.svg";



const getPaperkraftProduct = graphql`
  query PaperkraftLandingPageMobileQuery{
     listOfPaperkraftGift{
      id
        name
        price
        costPrice
        colorBand
        sku
        stockQuantity
        images{
          url
        }
       product{
        variants(first:1){
           edges{
            node{
              id
              name
              price
            }
          }
        }
        category{
          name
        }
      masterSku
        name
      }
  }
  }
`;
//live products
// const products = [
//     {
//         "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ0",
//         "name":"Paperkraft's Premium Red Gift Box with Superior Quality PU Red Cover Notebook and Matte Black Pen",
//         "price":500.0,
//         "costPrice":500.0,
//         "colorBand":null,
//         "sku":"2254025",
//         "stockQuantity":0,
//         "images":[
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/0922bdd8-0217-43d6-8cc1-531e267d1d9c_-_B082V47T7Y.MAIN.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxMg=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/a06b1b06-9238-4b3c-98be-8abb7d433252_-_B082V47T7Y.PT06.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxMw=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/26e98f4c-8eb7-4524-b45f-e562f62962a1_-_B082V47T7Y.PT05.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxNA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/eb28a279-999b-467f-8dc3-53bdc3846a96_-_B082V47T7Y.PT04.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxNQ=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/8ebe90ed-0868-42dd-86cd-a4c639137ab3_-_B082V47T7Y.PT03.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxNg=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/c4b5c61b-b209-4714-b4c5-0da0f71ae4f8_-_B082V47T7Y.PT01.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxNw=="
//             }
//         ],
//         "product":{
//             "variants":{
//                 "edges":[
//                     {
//                         "node":{
//                             "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ0",
//                             "name":"Paperkraft's Premium Red Gift Box with Superior Quality PU Red Cover Notebook and Matte Black Pen",
//                             "price":500.0
//                         }
//                     }
//                 ]
//             },
//             "category":{
//                 "name":"Paperkraft",
//                 "id":"Q2F0ZWdvcnlUeXBlOjM="
//             },
//             "masterSku":"2254025",
//             "name":"Paperkraft's Premium Red Gift Box with Superior Quality PU Red Cover Notebook and Matte Black Pen",
//             "id":"UHJvZHVjdHNUeXBlOjQ1"
//         }
//     },
//     {
//         "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ1",
//         "name":"Paperkraft's Premium Green Gift Box with Superior Quality PU Green Cover Notebook and Matte Black Pen",
//         "price":500.0,
//         "costPrice":500.0,
//         "colorBand":null,
//         "sku":"2254024",
//         "stockQuantity":29,
//         "images":[
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/36b5aa0b-74e6-4fd7-a8bd-8c24c8d1ef1a_-_B082V48WBS.MAIN.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxOA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/007a458e-ba16-4132-b7e5-342926008654_-_B082V48WBS.PT01.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToxOQ=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/70390563-0f89-48d2-a085-45f1412d205f_-_B082V48WBS.PT02.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyMA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/139ab73e-b94c-48f3-bb10-bb1fb07ddefe_-_B082V48WBS.PT06.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyMQ=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/b477d445-24a6-47d8-a79c-c91b39192198_-_B082V48WBS.PT05.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyMg=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/139ab73e-b94c-48f3-bb10-bb1fb07ddefe_-_B082V48WBS.PT06.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyMw=="
//             }
//         ],
//         "product":{
//             "variants":{
//                 "edges":[
//                     {
//                         "node":{
//                             "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ1",
//                             "name":"Paperkraft's Premium Green Gift Box with Superior Quality PU Green Cover Notebook and Matte Black Pen",
//                             "price":500.0
//                         }
//                     }
//                 ]
//             },
//             "category":{
//                 "name":"Paperkraft",
//                 "id":"Q2F0ZWdvcnlUeXBlOjM="
//             },
//             "masterSku":"2254024",
//             "name":"Paperkraft's Premium Green Gift Box with Superior Quality PU Green Cover Notebook and Matte Black Pen",
//             "id":"UHJvZHVjdHNUeXBlOjQ2"
//         }
//     },
//     {
//         "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ2",
//         "name":"Paperkraft's Premium Dark Blue Gift Box with Superior Quality PU Dark Blue Cover Notebook and Matte Black Pen",
//         "price":500.0,
//         "costPrice":500.0,
//         "colorBand":null,
//         "sku":"2254023",
//         "stockQuantity":9,
//         "images":[
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/c9b226e9-e627-40e0-8086-b807a663997b_-_B082V3XG4W.MAIN.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyNA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/5c632d7f-cc03-4141-a0aa-19da91de7886_-_B082V3XG4W.PT01.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyNQ=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/fe0ce329-2697-4ffe-8c71-c02e51ad6311_-_B082V3XG4W.PT02.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyNg=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/f709c078-2f9a-4ad4-bb6a-768186632a80_-_B082V3XG4W.PT06.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyNw=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/f1bc7b67-7ef7-4b2b-b76f-8408aaa79596_-_B082V3XG4W.PT05.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyOA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/3a700fb3-eebe-445e-837f-49b68bd0d788_-_B082V3XG4W.PT04.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZToyOQ=="
//             }
//         ],
//         "product":{
//             "variants":{
//                 "edges":[
//                     {
//                         "node":{
//                             "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ2",
//                             "name":"Paperkraft's Premium Dark Blue Gift Box with Superior Quality PU Dark Blue Cover Notebook and Matte Black Pen",
//                             "price":500.0
//                         }
//                     }
//                 ]
//             },
//             "category":{
//                 "name":"Paperkraft",
//                 "id":"Q2F0ZWdvcnlUeXBlOjM="
//             },
//             "masterSku":"2254023",
//             "name":"Paperkraft's Premium Dark Blue Gift Box with Superior Quality PU Dark Blue Cover Notebook and Matte Black Pen",
//             "id":"UHJvZHVjdHNUeXBlOjQ3"
//         }
//     },
//     {
//         "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ3",
//         "name":"Paperkraft's Premium Black Gift Box with Superior Quality PU Black Cover Notebook and Matte Black Pen",
//         "price":500.0,
//         "costPrice":500.0,
//         "colorBand":null,
//         "sku":"2254022",
//         "stockQuantity":35,
//         "images":[
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/8ada9832-2fb0-474b-9289-b7b5b06ee6e6_-_B082V44M6C.MAIN.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZTozMA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/bb4cdab3-55c4-4628-91c9-4773bc033f15_-_B082V44M6C.PT01.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZTozMQ=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/58fb1833-7fd5-4e3c-a66f-3bb1fa9c3bb1_-_B082V44M6C.PT02.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZTozMg=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/70a31b64-1e7f-4773-b3da-65faa80a01f7_-_B082V44M6C.PT06.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZTozMw=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/bafd0cd7-bf7e-41b6-9ef5-bfb6f64cc591_-_B082V44M6C.PT05.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZTozNA=="
//             },
//             {
//                 "url":"https://cdn.classmateshop.co.in/live/media/products/248845c4-f211-4135-b17a-8d56c798f521_-_B082V44M6C.PT04.jpg",
//                 "id":"VmFyaWFudEltYWdlVHlwZTozNQ=="
//             }
//         ],
//         "product":{
//             "variants":{
//                 "edges":[
//                     {
//                         "node":{
//                             "id":"UHJvZHVjdFZhcmlhbnRUeXBlOjQ3",
//                             "name":"Paperkraft's Premium Black Gift Box with Superior Quality PU Black Cover Notebook and Matte Black Pen",
//                             "price":500.0
//                         }
//                     }
//                 ]
//             },
//             "category":{
//                 "name":"Paperkraft",
//                 "id":"Q2F0ZWdvcnlUeXBlOjM="
//             },
//             "masterSku":"2254022",
//             "name":"Paperkraft's Premium Black Gift Box with Superior Quality PU Black Cover Notebook and Matte Black Pen",
//             "id":"UHJvZHVjdHNUeXBlOjQ4"
//         }
//     }
//
// ];
//staging products
const products = [];

class PaperkraftLandingPageMobile extends React.Component {

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
            header_cost_price:0,
            header_price:0
        }

    }

    componentDidMount() {

        AOS.init({

            once: true
        });

        this.getPaperkraftProduct()
    }

    getPaperkraftProduct = () => {

        let response = [];
        let row_formate = {};

        for(let i=0; i<products.length; i++){

            let categoryName = products[i].product.category ? products[i].product.category.name : ''
            let masterSku = products[i].product.masterSku ? products[i].product.masterSku : ''
            let productName = products[i].product.name ? products[i].product.name : ''
            let GiftBoxName;
            let Color;
            if(products[i].id !== undefined && products[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ0' &&  products[i].id!=='' && products[i].id!==null){
                GiftBoxName ="Paperkraft's Premium Red Gift Box";
                Color="Red";
            }
            else if(products[i].id !== undefined && products[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ1' &&  products[i].id!=='' && products[i].id!==null){
                GiftBoxName ="Paperkraft's Premium Green Gift Box";
                Color="Green";
            }
            else if(products[i].id !== undefined && products[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ2' &&  products[i].id!=='' && products[i].id!==null){
                GiftBoxName ="Paperkraft's Premium Dark Blue Gift Box";
                Color="Dark Blue";
            }
            else if(products[i].id !== undefined && products[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ3' &&  products[i].id!=='' && products[i].id!==null){
                GiftBoxName ="Paperkraft's Premium Black Gift Box";
                Color="Black";
            }

            row_formate = {
                id:products[i].id,
                name: GiftBoxName,
                image:products[i].images[0] ?products[i].images[0].url:'',
                variantId : products[i].id,
                price: products[i].product.variants.edges[0].node.price,
                costPrice: products,
                stock_quantity:products[i].stockQuantity,
                mastersku : masterSku,
                productname :productName,
                category :categoryName,
                color:Color,
                quantity:1

            };
            response[i] = row_formate;

            if(i === products.length-1){
                this.setState({
                    paperkraftProducts : response,
                    header_cost_price:products[0].costPrice,
                    header_price:products[0].price
                })
            }
        }
        // const variables = {};
        //
        // fetchQuery(environment, getPaperkraftProduct, variables,{force:false})
        //     .then(data => {
        //         if (data.listOfPaperkraftGift !== null && data.listOfPaperkraftGift.length > 0) {
        //
        //             let response = [];
        //             let row_formate = {};
        //
        //             for (let i = 0; i < data.listOfPaperkraftGift.length; i++) {
        //
        //                 let categoryName = data.listOfPaperkraftGift[i].product.category ? data.listOfPaperkraftGift[i].product.category.name : ''
        //                 let masterSku = data.listOfPaperkraftGift[i].product.masterSku ? data.listOfPaperkraftGift[i].product.masterSku : ''
        //                 let productName = data.listOfPaperkraftGift[i].product.name ? data.listOfPaperkraftGift[i].product.name : ''
        //                 let GiftBoxName;
        //                 let Color;
        //                 if(data.listOfPaperkraftGift[i].id !== undefined && data.listOfPaperkraftGift[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ0' &&  data.listOfPaperkraftGift[i].id!=='' && data.listOfPaperkraftGift[i].id!==null){
        //                     GiftBoxName ="Paperkraft's Premium Red Gift Box";
        //                     Color="Red";
        //                 }
        //                 else if(data.listOfPaperkraftGift[i].id !== undefined && data.listOfPaperkraftGift[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ1' &&  data.listOfPaperkraftGift[i].id!=='' && data.listOfPaperkraftGift[i].id!==null){
        //                     GiftBoxName ="Paperkraft's Premium Green Gift Box";
        //                     Color="Green";
        //                 }
        //                 else if(data.listOfPaperkraftGift[i].id !== undefined && data.listOfPaperkraftGift[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ2' &&  data.listOfPaperkraftGift[i].id!=='' && data.listOfPaperkraftGift[i].id!==null){
        //                     GiftBoxName ="Paperkraft's Premium Dark Blue Gift Box";
        //                     Color="Dark Blue";
        //                 }
        //                 else if(data.listOfPaperkraftGift[i].id !== undefined && data.listOfPaperkraftGift[i].id==='UHJvZHVjdFZhcmlhbnRUeXBlOjQ3' &&  data.listOfPaperkraftGift[i].id!=='' && data.listOfPaperkraftGift[i].id!==null){
        //                     GiftBoxName ="Paperkraft's Premium Black Gift Box";
        //                     Color="Black";
        //                 }
        //
        //                 row_formate = {
        //                     id: data.listOfPaperkraftGift[i].id,
        //                     name: GiftBoxName,
        //                     image:data.listOfPaperkraftGift[i].images[0] ?data.listOfPaperkraftGift[i].images[0].url:'',
        //                     variantId: data.listOfPaperkraftGift[i].id,
        //                     price: data.listOfPaperkraftGift[i].product.variants.edges[0].node.price,
        //                     quantity: 1,
        //                     stock_quantity:data.listOfPaperkraftGift[i].stockQuantity,
        //                     mastersku: masterSku,
        //                     productname: productName,
        //                     category: categoryName,
        //                     color:Color
        //                 };
        //                 response[i] = row_formate;
        //
        //                 if (i === data.listOfPaperkraftGift.length - 1) {
        //                     this.setState({
        //                         paperkraftProducts: response,
        //                         header_cost_price:data.listOfPaperkraftGift[0].costPrice,
        //                         header_price:data.listOfPaperkraftGift[0].price
        //                     })
        //                 }
        //             }
        //
        //         } else {
        //             this.setState({
        //                 paperkraftProducts: [],
        //                 header_cost_price:0,
        //                 header_price:0
        //             })
        //         }
        //     });
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
        let product = this.state.paperkraftProducts;
        // product[index].quantity = 1;
        let productsValue = {}
        this.setState({
            paperkraftProducts: product
        });

        let checkout_id = this.props.cart_data.checkout_id ? this.props.cart_data.checkout_id : '';
        let productsItems = this.state.paperkraftProducts;

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

        let products = this.state.paperkraftProducts;
        let value = this.state.paperkraftProducts[index].quantity;
        value = isNaN(value) ? 0 : value;
        value++;
        products[index].quantity = value;
        this.setState({
            paperkraftProducts: products
        });
        let productsValue = {
            'variantId': products[index].variantId,
            'quantity': products[index].quantity
        };

        this.updateProductQuantity(productsValue);


    };
    decreaseValue = (index) => {


        let products = this.state.paperkraftProducts;
        let value = this.state.paperkraftProducts[index].quantity;
        value = isNaN(value) ? 0 : value;
        if (value < 1) {
            value = 1
        } else {
            value--;
        }


        if (value !== 0) {
            products[index].quantity = value;
            this.setState({
                paperkraftProducts: products
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

        let productsItems = this.state.paperkraftProducts

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

            cogoToast.error(err, {position: 'top-center'});

        })

    };

    createCheckout = (data, Index) => {

        let scope = this;
        CreateAddToCartMutation(data, (response) => {

            if (response.checkoutCreate !== null) {

                console.log('checkot', response.checkoutCreate.checkout.id)
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

            cogoToast.error(err, {position: 'top-center'});


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
    }
    openCartSlidingPane = () => {

        this.setState({
            openSlidingPanel: true
        });
        this.sendDataToGA("CartView2PGB");

    };
    closeCartSlidingpane = () => {

        setTimeout(() => {
            this.setState({openSlidingPanel: false});
        }, 10)
    };
    sendAddToCartProductDetailstoGA = (checkout_lines,selected_product_index) => {
        let added_products = {};
        let product  = {...this.state.paperkraftProducts[selected_product_index]};
        checkout_lines.map((line_item)=>{
            if(line_item.variant.sku === product.mastersku){
                added_products = {
                    "id": product.mastersku,
                    "name": product.productname,
                    "price": product.price,
                    "category": "Paperkraft Products",
                    "quantity": product.quantity,
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
        })
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

        };
        const {paperkraftProducts} = this.state
        const settings2 = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,

        };
        // const settings3 = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     arrows: false,
        //
        // };
        return (
            <div className="mobilePaperkraftLanding">
                <header className="mobileLandingHeader">
                    <img src={paperkraftLogo} alt="paperkraftLogo"/>
                </header>
                <section className="LandingFirstSectionMbl">

                    <Slider {...settings} style={{
                        width: ' 80vw',
                        display: 'block',
                        margin: '0 auto', paddingTop: ' 55px'
                    }}>

                        <Grid spacing={3} container style={{margin: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/Greenpaperkraft.png" style={{width: '90%', margin: '0 auto'}} alt="Greenpaperkraft"/>
                            </Grid>

                        </Grid>
                        <Grid spacing={3} container style={{margin: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/Bluepaperkraft.png" style={{width: '90%', margin: '0 auto'}} alt="Bluepaperkraft"/>

                            </Grid>

                        </Grid>
                        <Grid spacing={3} container style={{margin: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/Blackpaperkraft.png" style={{width: '90%', margin: '0 auto'}} alt="Blackpaperkraft"/>

                            </Grid>

                        </Grid>
                        <Grid spacing={3} container style={{margin: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/Redpaperkraft.png" style={{width: '90%', margin: '0 auto'}} alt="Redpaperkraft"/>

                            </Grid>

                        </Grid>

                    </Slider>
                    <h2>The Perfect Gift For New Beginning</h2>
                    <h5 className="MblPaperkraftSubTitle">A Gift box with a premium pen and a notebook that lasts 100
                        years</h5>
                    <span className="pricePaperkraft">
                                {/*<span className="staticPrice">Rs.{this.state.header_cost_price}</span> &nbsp;&nbsp;*/}
                        <span className="OfferPrice"> Rs.{this.state.header_price}/&#42;</span>

                            </span>
                    {/*<span className="shippingText">&nbsp;&nbsp;+&nbsp;&nbsp;Free Shipping</span>*/}

                    <span style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
                        <div className="color_variant1"/>
                        <div className="color_variant2"/>
                        <div className="color_variant3"/>
                        <div className="color_variant4"/>
                    </span>
                </section>
                <section className="LandingSecondSectionMbl">
                    <div className="paperkaftContentMbl" style={{color: '#fff'}} data-aos="fade-up"
                         data-aos-duration="1000">
                        <img src={lifetime} alt="paperkraft"/>
                        <p>100 Years of shelf-life</p>
                        <img src={EcoFrindly} alt="paperkraft"/>
                        <p>Eco-Friendly 80GSM paper</p>
                        <img src={boundIcon} alt="paperkraft"/>
                        <p>Available in Hard and Soft Bound</p>
                        <img src={freeTech} alt="paperkraft"/>
                        <p>Elemental Chlorine Free Technology</p>
                        <img src={CertPaper} alt="paperkraft"/>
                        <p>FSC Certified Paper</p>
                        <img src={quality} alt="paperkraft"/>
                        <p>PU quality covers</p>
                    </div>
                </section>
                <section className='LandingThirdSectionMbl'>
                    <Slider {...settings2} style={{
                        display: 'block',
                        margin: '0 auto',
                    }}>
                        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/mblPaperkraftimage1.jpg" style={{width: '100%', margin: '0 auto'}} alt="mblPaperkraftimage1"/>
                            </Grid>

                        </Grid>
                        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/mblPaperkraftimage2.jpg" style={{width: '100%', margin: '0 auto'}} alt="mblPaperkraftimage2"/>

                            </Grid>

                        </Grid>
                        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/mblPaperkraftimage3.jpg" style={{width: '100%', margin: '0 auto'}} alt="mblPaperkraftimage3"/>

                            </Grid>

                        </Grid>
                        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>
                            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                                <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/mblPaperkraftimage4.jpg" style={{width: '100%', margin: '0 auto'}} alt="mblPaperkraftimage4"/>

                            </Grid>

                        </Grid>
                    </Slider>
                </section>
                <section className='LandingFourthSectionMbl'>

                    <span style={{position: "absolute", cursor: "pointer", zIndex: '1000'}}
                          onClick={() => this.playPause()}>
                            {this.state.isPlayed ? <PauseCircleOutlineIcon className='playIcon'/> :
                                <PlayCircleOutlineIcon className='playIcon'/>}</span>
                    <video width="320" height="240" controls={false} className="MblVideo" id="myVideo">
                        <source src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/landing_pages/Paperkraft-Gift-Box-Dec/gift_box.mp4" type="video/mp4"/>
                    </video>

                </section>
                {/*<section className="LandingFifthSectionMbl">*/}
                {/*    <h2>Reviews</h2>*/}
                {/*    <Slider {...settings3} style={{*/}
                {/*        display: 'block',*/}
                {/*        margin: '0 auto',*/}
                {/*    }}>*/}
                {/*        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>*/}
                {/*            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>*/}
                {/*                <Paper className="reviewCard">*/}
                {/*                    <p className="reviewTitle">John Doe</p>*/}
                {/*                    <p className="reviewSubTitle">Chennai, TN</p>*/}
                {/*                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy*/}
                {/*                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam*/}
                {/*                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet*/}
                {/*                        clita kasd gubergren…</p>*/}
                {/*                </Paper>*/}
                {/*            </Grid>*/}

                {/*        </Grid>*/}
                {/*        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>*/}
                {/*            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>*/}
                {/*                <Paper className="reviewCard">*/}
                {/*                    <p className="reviewTitle">John Doe</p>*/}
                {/*                    <p className="reviewSubTitle">Chennai, TN</p>*/}
                {/*                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy*/}
                {/*                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam*/}
                {/*                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet*/}
                {/*                        clita kasd gubergren…</p>*/}
                {/*                </Paper>*/}
                {/*            </Grid>*/}

                {/*        </Grid>*/}
                {/*        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>*/}
                {/*            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>*/}
                {/*                <Paper className="reviewCard">*/}
                {/*                    <p className="reviewTitle">John Doe</p>*/}
                {/*                    <p className="reviewSubTitle">Chennai, TN</p>*/}
                {/*                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy*/}
                {/*                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam*/}
                {/*                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet*/}
                {/*                        clita kasd gubergren…</p>*/}
                {/*                </Paper>*/}
                {/*            </Grid>*/}

                {/*        </Grid>*/}
                {/*        <Grid spacing={3} container style={{margin: '0px', padding: '0px'}}>*/}
                {/*            <Grid item md={12} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>*/}
                {/*                <Paper className="reviewCard">*/}
                {/*                    <p className="reviewTitle">John Doe</p>*/}
                {/*                    <p className="reviewSubTitle">Chennai, TN</p>*/}
                {/*                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy*/}
                {/*                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam*/}
                {/*                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet*/}
                {/*                        clita kasd gubergren…</p>*/}
                {/*                </Paper>*/}

                {/*            </Grid>*/}

                {/*        </Grid>*/}
                {/*    </Slider>*/}
                {/*</section>*/}
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
                        <div className="paperGrid">

                            {paperkraftProducts.map((productItem, index) => {
                                return (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item xs={4} className="GiftGrid">
                                            <img className="mblImage" src={productItem.image} alt="product image"/>
                                        </Grid>
                                        <Grid item xs={4} className="GiftGrid"
                                              style={{flexDirection: 'column', alignItems: "flex-start"}}>
                                            <p className="gift_title">{productItem.name}</p>
                                            <p className="gift_subtitle">{productItem.color}</p>
                                            <p className="gift_price">Rs.{productItem.price}/&#42;</p>
                                        </Grid>
                                        <Grid item xs={4} className="GiftGrid" style={{justifyContent: 'start'}} >

                                            {
                                                productItem.stock_quantity > 0 ?
                                                    (
                                                        <Button id={'addToCart' + index} onClick={() => this.addItems(index)}
                                                                style={{
                                                                    backgroundColor: ' #ff6733',
                                                                    color: ' #fff',
                                                                    fontSize: '10px'
                                                                }}
                                                        >Add To Cart</Button>
                                                    ):(
                                                        <Button id={'addToCart' + index}
                                                                style={{
                                                                    backgroundColor: ' #ff6733',
                                                                    color: ' #fff',
                                                                    fontSize: '10px'
                                                                }}
                                                        >Sold Out</Button>
                                                    )
                                            }


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
                        <Button className="PaperCheckoutBtn paperkraftAddToCartButton" onClick={() => this.goToCart()}>GO
                            TO CART <i
                                className="ri-arrow-right-line"
                                style={{marginLeft: '25px'}}/></Button>
                    </div>
                </Modal>
                <div className="Paperkraft_landingBg_left">

                    <Button className="buy-Button-mblPaperkraft" onClick={() => this.handleOpen()}>
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


export default connect(mapStateToProps, mapDispatchToProps)(PaperkraftLandingPageMobile)
