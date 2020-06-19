import React from "react";
import './MobileMyOrdersPage.css';
import MobileNavbar from "../NavBar/MobileNavbar";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import graphql from "babel-plugin-relay/macro";
import {connect} from "react-redux";
import {fetchQuery} from "relay-runtime";
import environment from "../../Environment";
import Button from "@material-ui/core/Button";
import OrderTrackingDialog from "./OrderTrackingDialog";
import {Razorpay_Key} from "../../serviceApi";
import CreateUpdatePaymentMutation from "../../mutations/CreateUpdatePaymentMutation";
import cogoToast from "cogo-toast";
import OrderTracking from "./OrderTracking";
import {AddOrderData} from "../../Actions/non_customiser_action";
import {compose} from "redux";
import { withRouter } from 'react-router-dom';


const getOrdersByLoggedinUser = graphql`
  query MobileMyOrdersPageQuery($userId: ID!) {
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

class MobileMyOrdersPage extends React.Component{

    state={
        ordersBasedOnUser:[],
        open:false,
        selected_shipping_id:''
    }

    componentDidMount(){

        const variables = {
            userId: this.props.user_details.user.id,
        };

        fetchQuery(environment, getOrdersByLoggedinUser, variables,{force:false})
            .then(data => {
                if(data.ordersBasedOnUser !== null){
                    this.setState({
                        ordersBasedOnUser:data.ordersBasedOnUser
                    })

                }
            });

    }
    getFormattedDate = (date) => {

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
        return (
            <div className="mobile_myorders_page">
                <MobileNavbar />
                <Container maxWidth={"xs"} className="my_orders_container">
                    <h1 className="my_orders_title">My Orders</h1>
                    <Grid container spacing={3}>

                        {
                            this.state.ordersBasedOnUser.length > 0 && this.state.ordersBasedOnUser.map((item, order_index) => {
                                return (
                                    <Grid item xs={12} key={order_index} className="shipping_orders">
                                        <div className="OrderDetailsBox">
                                            <Typography className="MblOrderItem">#{ item.orderId}</Typography>
                                            {
                                                item.lines.edges.map((line,line_index) => {
                                                    return(
                                                        <div key={line_index} className="ordered_product_details">
                                                            <Typography style={{width:'75%'}}>{line.node.productName}</Typography>
                                                            <Typography>Qty:{line.node.quantity}</Typography>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <Typography style={{margin:'10px 0px'}}>Order Date: <span style={{color:'#000'}}>{this.getFormattedDate(item.created)}</span></Typography>
                                            <Typography className="order_shipping_status"><span><span className="MblOrderStatus" /> </span>{item.status}</Typography>
                                            {
                                                item.isPaymentSuccessful === false && item.payments[0].gateway === "razorpay" ?
                                                    <Button className="mobile_track_order_btn" onClick={() => this.processPayment(item)}>PAY NOW</Button>:
                                                    <Button className="mobile_track_order_btn" onClick={() => this.handleClickOpen(item)} >TRACK ORDER</Button>

                                            }



                                        </div>
                                    </Grid>
                                )
                            })
                        }


                    </Grid>
                    {
                        this.state.ordersBasedOnUser.length === 0 && (
                            <div style={{fontSize:'20px'}}>
                                No Orders Available
                            </div>
                        )
                    }
                </Container>

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
        );
    }
}


const mapStateToProps = state => ({
    user_details:state.UserReducer.user_details
});
const mapDispatchToProps = dispatch => ({
    sendOrderDatasToStore: order_data => dispatch(AddOrderData(order_data)),
});


export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps)
)(MobileMyOrdersPage);
