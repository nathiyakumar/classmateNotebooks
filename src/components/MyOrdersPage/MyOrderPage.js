import React from "react";
import  './MyOrderPage.css'
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { connect } from 'react-redux'
import {fetchQuery} from 'relay-runtime';
import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';
import OrderTrackingDialog from './OrderTrackingDialog';
import OrderTracking from "./OrderTracking";
import {Razorpay_Key} from "../../serviceApi";
import CreateUpdatePaymentMutation from "../../mutations/CreateUpdatePaymentMutation";
import cogoToast from "cogo-toast";
import {AddOrderData, AddToCart} from "../../Actions/non_customiser_action";
import {clearNotebookSpecifications} from "../../Actions";
import {compose} from "redux";
import { withRouter } from 'react-router-dom';

const getOrdersByLoggedinUser = graphql`
  query MyOrderPageQuery($userId: ID!) {
        ordersBasedOnUser(userId:$userId){
             id
        orderId
        created   
        total
        userEmail
        status
        isPaymentSuccessful
        payments{
          gateway
          id
          chargeStatus
          paymentOrderId
          total
        }
        shippingAddress{
          id
          firstName
          lastName
          companyName
          city
          country{
            code
            country
          }
          postalCode
          phone
        }
        billingAddress{
          id
          firstName
          lastName
          companyName
          city
          country{
            code
            country
          }
          postalCode
          phone
        }
        shippingMethod{
          name
          shippingTotal
        }
       voucher{
        name
        code
      }
      discountName
      discountAmount
      isPaymentSuccessful
        lines(first:100){
          edges{
            node{
              id 
              weight
              productName
              quantity 
              unitPrice
              unitPriceNet
              unitPriceGross
              taxRate
              vendor{
                vendor{
                  firstName
                  email
                  mobileNumber
                }
              }
              
              lineShipping(first:100){
                edges{
                  node{
                    shippingStatus
                  }
                }
              }
            }
          }
        } 
      }
  }
`;

class MyOrdersPage extends React.Component{

    state={
        ordersBasedOnUser:[],
        ExpandOrdersBasedOnShipping:[],
        open:false,
        selected_shipping_id:''
    }


    componentDidMount(){

        if(this.props.user_details.user){
            const variables = {
                userId: this.props.user_details.user.id,
            };

            fetchQuery(environment, getOrdersByLoggedinUser, variables,{force:false})
                .then(data => {
                    if(data.ordersBasedOnUser !== null){

                        // let ExpandOrdersBasedOnShipping = this.state.ExpandOrdersBasedOnShipping;
                        //
                        // for(let i=0;i<data.ordersBasedOnShipping.length;i++){
                        //     for(let j=0;j<data.ordersBasedOnShipping[i].lines.length;j++){
                        //         ExpandOrdersBasedOnShipping.push('open')
                        //
                        //     }
                        // }

                        this.setState({
                            ordersBasedOnUser:data.ordersBasedOnUser
                        })

                    }
                });
        }



    }

    getFormattedDate(date){

        let today = new Date(date);

        let date1=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();

        return date1;
    }

    handleClickOpen = (item) => {

        this.setState({
            open:true,
            selected_shipping_id:item.id
        })
    };
    handleClose = () => {
        this.setState({
            open:false
        })
    };

    processPayment  = (orderData) => {
        this.props.sendOrderDatasToStore({
            order:orderData
        });

        let scope = this;
        var options = {
            "key": Razorpay_Key, // Enter the Key ID generated from the Dashboard
            "amount": orderData.payments[0].total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
            "currency": "INR",
            "name": "Classmate",
            "image": "https://cdn.razorpay.com/logos/DLYwrn8u6zBYFk_medium.png",
            "order_id": orderData.payments[0].paymentOrderId,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
            "handler": function (response,err){
                scope.sendPaymentResponse(orderData,response);


            },
            "prefill": {
                "name": orderData.shippingAddress.firstName,
                "email": orderData.userEmail,
                "contact": orderData.shippingAddress.phone
            },
            "notes": {
                "shopping_order_id": orderData.orderId
            },
            "theme": {
                "color": "#000"
            }
        };
        const rzp1 = new window.Razorpay(options);

        rzp1.open();



    }
    sendPaymentResponse = (checkout_data,data) => {
        let scope = this;
        CreateUpdatePaymentMutation(checkout_data.id,checkout_data.payments[0].id,data,function (res) {

            if(res.createPayment !== null){
                scope.props.history.push('order-confirmation');
            }


        },function (err) {
            // alert(err);
            cogoToast.error(err, { position: 'top-center'});
        });
    }


    render() {

        return(
            <div className="MyOrderPage">

                {
                    this.state.ordersBasedOnUser.length > 0 && this.state.ordersBasedOnUser.map((item,order_index) =>{
                        return (
                            <div className="panel" key={order_index}>
                                <Paper className="panelHead">
                                    <div className="panelTitle">
                                        <span>#{ item.orderId}</span>
                                    </div>
                                    <div className="panelBody">
                                        <Grid container spacing={0} style={{ padding: '15px'}} >
                                            <Grid item xs={6} className="grid specification" >
                                                <div className="same_height_column">
                                                {
                                                    item.lines.edges.map((line,line_index) => {
                                                        return(
                                                            <div className="order_shipping_details" key={line_index}>
                                                                <li key={line_index} className="order_shipping_product_name">{line.node.productName}</li>
                                                                <Grid item xs={3} className="grid order_shipping_product_quantity" style={{fontWeight:'600'}}>{line.node.quantity}</Grid>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </div>

                                            </Grid>

                                            <Grid item xs={4} className="grid orderDetail">
                                                <div className="same_height_column">
                                                    <div>
                                                        <Typography>Order Date: <span style={{fontWeight:'600'}}>{this.getFormattedDate(item.created)}</span></Typography>
                                                        {/*<Typography>Deliver by: <span style={{fontWeight:'600'}}>23-05-2019</span></Typography>*/}
                                                        <div style={{display:'flex',margin:'10px 0px'}}>
                                                            <span>
                                                                <span className="orderStatus" />
                                                            </span>
                                                            <p className="shipping_status">{item.status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={2} className="grid">
                                                <div className="same_height_column track_btn_column">
                                                    {
                                                        item.isPaymentSuccessful === false && item.payments[0].gateway === "razorpay" ?
                                                            <Button className="trackBtn" onClick={() => this.processPayment(item)}>PAY NOW</Button>:
                                                            <Button className="trackBtn" onClick={() => this.handleClickOpen(item)}>TRACK ORDER</Button>

                                                    }

                                                </div>
                                            </Grid>
                                        </Grid>
                                        {
                                            this.state.open === true?<OrderTrackingDialog
                                                handleClickOpen={this.handleClickOpen}
                                                handleClose={this.handleClose}
                                                open={this.state.open}
                                                title="Tracking"
                                                width="lg"
                                                fullWidth={true}

                                            >
                                                <OrderTracking shippingId = {this.state.selected_shipping_id} />
                                                </OrderTrackingDialog>:null
                                        }

                                    </div>
                                </Paper>
                            </div>
                        );
                    })
                }

                {
                    this.state.ordersBasedOnUser.length === 0 && (
                        <div style={{fontSize:'20px'}}>
                            No Orders Available
                        </div>
                    )
                }

            </div>
        )
    }

}

const mapStateToProps = state => ({
    user_details:state.UserReducer.user_details
})
const mapDispatchToProps = dispatch => ({
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
})

export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(MyOrdersPage);

