import React from "react";
import {Razorpay_Key} from "../../serviceApi";
import {AddOrderData, AddToCart} from "../../Actions/non_customiser_action";
import {clearNotebookSpecifications} from '../../Actions/index';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import CreateUpdatePaymentMutation from "../../mutations/CreateUpdatePaymentMutation";
import CartContext from "../CartProvider/cart-context";
import CheckoutNavBar from "./CheckoutNavBar";
import cogoToast from 'cogo-toast';
import MetaWrapper from "../../Meta/MetaWrapper";


class PaymentPage extends React.Component{

    static contextType  = CartContext;

    componentDidMount(){

        if(Object.keys(this.props.order_data).length > 0 ){
            this.processPayment();
        } else {
            this.props.history.push('/');
        }

    }

    processPayment  = () => {
        let data = this.props.order_data;

        let scope = this;
        var options = {
            "key": Razorpay_Key, // Enter the Key ID generated from the Dashboard
            "amount": data.payment.total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
            "currency": "INR",
            "name": "Classmate",
            "image": "https://cdn.razorpay.com/logos/DLYwrn8u6zBYFk_medium.png",
            "order_id": data.payment.paymentOrderId,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
            "handler": function (response,err){
                scope.sendPaymentResponse(data,response);
            },
            "prefill": {
                "name": data.order.shippingAddress.firstName,
                "email": data.order.userEmail,
                "contact": data.order.shippingAddress.phone
            },
            "notes": {
                "shopping_order_id": data.order.orderId
            },
            "theme": {
                "color": "#000"
            }
        };
        const rzp1 = new window.Razorpay(options);

        rzp1.open();

    };

    sendPaymentResponse = (checkout_data,data) => {

        let scope = this;
        // CreateUpdatePaymentMutation(checkout_data.order.id,checkout_data.payment.id,data,function (res) {
        //
        //     if(res.createPayment !== null){

                scope.context.addCartData({});

                scope.props.sendCartDatasToStore({});
                scope.props.clearSpecsFromStore('clear');

                scope.props.history.push('order-confirmation');
            // }


        // },function (err) {
        //     cogoToast.error(err, { position: 'top-center'});
        // });
    };

    render(){
        return(
            <div>
                <MetaWrapper
                    meta={{
                        description: "Payment",
                        title: "Payment",
                    }}
                >
                <CheckoutNavBar />
                <div className="order-confirmation">
                    <h3>
                        Make Payment <br /> To Complete Your Order
                    </h3>
                    <div className="order-confirmation__actions">
                        <button type="button" className="continue_shopping_btn" onClick={this.processPayment}><span>Make Payment</span></button>
                    </div>
                </div>
                </MetaWrapper>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    order_data: state.OrderReducer.order_data,

});

const mapDispatchToProps = dispatch => ({
    sendCartDatasToStore: (cart_data) => dispatch(AddToCart(cart_data)),
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
    clearSpecsFromStore: data => dispatch(clearNotebookSpecifications(data))
});


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(PaymentPage);
