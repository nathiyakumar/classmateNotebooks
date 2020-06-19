import React from "react";
import './OrderConfirmation.css';
import CheckoutNavBar from "../CheckoutPage/CheckoutNavBar";
import Media from 'react-media';
import { small_screen } from '../../variables';
import Container from "@material-ui/core/Container";
import {compose} from "redux";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {AddOrderData} from "../../Actions/non_customiser_action";
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from 'react-ga';
// import ReactPixel from 'react-facebook-pixel';

const dots = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/dots.svg';


class OrderConfirmation extends React.Component{

    state={
        cart_items_GA:[]
    };

    GotoHomePage = () => {
        this.props.sendOrderDatasToStore({});
        this.props.history.push('/');
        // ReactGA.plugin.execute('ec', 'clear');
    };

    componentWillMount(){
        let cart_items=[];
        this.props.order_data.order.lines.edges && this.props.order_data.order.lines.edges.map((item,index)=>{
            cart_items[index] = {
                "id": item.node.variant.sku,
                "name": item.node.variant.name,
                "price": item.node.variant.price,
                "category":item.node.variant.product.category?item.node.variant.product.category.name:"classmate",
                "quantity": item.node.quantity
            }
        });
        this.setState({
            cart_items_GA:cart_items
        })
    }

    componentDidMount(){
        if(window.dataLayer) {
            window.dataLayer.push({
                "event": "transaction",
                "revenue": this.props.order_data.order.total,
                "ecommerce": {
                    "purchase": {
                        "actionField": {
                            "id": this.props.order_data.order.orderId,
                            "revenue": this.props.order_data.order.total,
                            "shipping": this.props.order_data.order.shippingPrice
                        },
                        "products": this.state.cart_items_GA
                    }
                }
            });
        }
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Order confirmation"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
        // ReactGA.plugin.execute(
        //     'ec',
        //     'setAction',
        //     'purchase',
        //     {
        //         id: this.props.order_data.order.orderId, // the same as for addItem to connect them
        //         revenue: this.props.order_data.order.total, // obviously it's price * quantity
        //     }
        // );

        // window.gtag('event', 'conversion', {
        //     'send_to': 'AW-961287320/qp0SCNPcrrYBEJipsMoD',
        //     'transaction_id': this.props.order_data.order.orderId
        // });
        //
        // ReactPixel.track( "Purchase", {
        //
        //     value: this.props.order_data.order.total,
        //
        //     currency: 'INR',
        //
        // } )
    }


    render() {
        return (
            <MetaWrapper
                meta={{
                    description: "Order confirmation",
                    title: "Order confirmation",
                }}
            >
            <div>
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <div>
                            {/*<CheckoutNavBar />*/}
                            <div className="thankyouPage">
                                <Container className="container">
                                   <span className="align dot-rotate">
                                      <img className="dots animated-dots position1" src={dots} alt="dots"/>
                                      <img className="dots  position2" src={dots} width="40px" alt="dots"/>
                                      <img className="dots  position3"  src={dots} alt="dots"/>
                                      <img className="dots  position4"  src={dots} alt="dots"/>
                                      <img className="dots  position5" src={dots} alt="dots"/>
                                      <img className="dots  position6" src={dots} alt="dots"/>
                                    </span>
                                    <div className="sonar-emitter animated zoomIn">
                                        {/*<i className="material-icons tick center"> done</i>*/}
                                        <i className="ri-check-line tick center"></i>

                                    </div>
                                    <div className="animated fadeInUp" style={{paddingBottom: '35px'}}>
                                        <h2 className="ThankYouTitle">Welcome to our group of awesome customers!</h2>
                                        {/*<p style={{textAlign: 'center', color: '#fff', fontSize: '1rem', paddingTop: '12px'}}>*/}
                                        {/*    Hola! Your order has been placed*/}
                                        {/*</p>*/}
                                        <p className="order-confirmation__info" style={{margin:'10px'}}>
                                            We once again thank you for placing an order on Classmateshop.com.
                                            <br />
                                            You order details is Order Number: {this.props.order_data.order?this.props.order_data.order.orderId:'None'} and we will be dispatching your order soon.
                                            <br />
                                            Track your order in my order section and you will be notified with tracking details once your order gets shipped. Usually, it takes 15 days to get your notebook delivered.
                                        </p>
                                        <div className="order-confirmation__actions">
                                                <button type="button" className="green_continue_shopping_btn" onClick={this.GotoHomePage}><span>Continue Shopping</span></button>

                                        </div>
                                    </div>


                                </Container>
                                {/*<div className = "dots animated " > &zwnj;</div>*/}
                            </div>
                        </div>
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <>
                            <CheckoutNavBar />
                            <div className="order-confirmation">
                                <h3>
                                    Welcome to our group of awesome customers!
                                </h3>
                                <p className="order-confirmation__info">
                                    We once again thank you for placing an order on Classmateshop.com.
                                    <br />
                                    You order details is Order Number: {this.props.order_data.order?this.props.order_data.order.orderId:'None'} and we will be dispatching your order soon.
                                    <br />
                                    Track your order in my order section and you will be notified with tracking details once your order gets shipped. Usually, it takes 15 days to get your notebook delivered.
                                </p>
                                <div className="order-confirmation__actions">

                                        <button type="button" className="continue_shopping_btn" onClick={this.GotoHomePage}><span>Continue Shopping</span></button>

                                    {/*<Link to={""}>*/}
                                    {/*    <button type="button" className="order_detail_btn"><span>Order Details</span></button>*/}
                                    {/*</Link>*/}
                                </div>
                            </div>
                        </>
                    )}
                />

            </div>
            </MetaWrapper>
        );
    }
}

const mapStateToProps = state => ({
    order_data: state.OrderReducer.order_data,
})

const mapDispatchToProps = dispatch => ({
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
})


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(OrderConfirmation);


