import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ThumbnailTable from "../../VendorDashboard/ThumbnailTable";

import {fetchQuery} from 'relay-runtime';
import environment from "../../../Environment";
import graphql from 'babel-plugin-relay/macro';
import CreateApproveOrderMutation from '../../../mutations/CreateApproveOrderMutation';
import CreateRefundOrderMutation from "../../../mutations/CreateRefundOrderMutation";
import cogoToast from "cogo-toast";


const getSingleOrderDetails = graphql`
  query SingleOrderDetailQuery($shippingId: String,$vendor:String) {
    singleShippingOrderView(shippingId:$shippingId, vendor:$vendor){
     id
    orderId   
    lines{
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
      order{
        orderId
         created   
         total
         userEmail
         status
         payments{
          gateway
          id
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
      }
    }
  }
  }
`;




class SingleOrder extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            single_order_data: [],
            refund_amount:''
        }

    }




    componentDidMount(){


        // ReactGA.initialize('UA-57376375-16');
        // ReactGA.event({
        //     'page_title' : 'Single Order',
        //     'page_path': window.location.pathname
        // });

        const variables = {
            shippingId: this.props.shippingId,
            vendor: this.props.selected_vendor_id
        };

        fetchQuery(environment, getSingleOrderDetails, variables)
            .then(data => {
                if(data.singleShippingOrderView !== null){

                  this.setState({
                      single_order_data:data.singleShippingOrderView
                  })


                }
            });
    }

    approveOrder = () => {

        let data = {
            order_id:this.props.orderId,
            status:'APPROVED'
        }

        let scope = this;

        CreateApproveOrderMutation(data,function (response) {


            if(response.approveOrder !== null){
                cogoToast.success("Order "+response.approveOrder.order.orderId+" is Approved Successfully", { position: 'top-center'});
                setTimeout(
                    function() {
                        scope.props.completeAction();
                    }
                        .bind(this),
                    1000
                );
            }

        },function (err) {

            cogoToast.error(err, { position: 'top-center'});

        });

    }
    disApproveOrder = () => {

        let data = {
            order_id:this.props.orderId,
            status:'DISAPPROVED'
        }

        let scope = this;

        CreateApproveOrderMutation(data,function (response) {


            if(response.approveOrder !== null){
                cogoToast.success("Order "+response.approveOrder.order.orderId+" is Disapproved Successfully", { position: 'top-center'});
                setTimeout(
                    function() {
                        scope.props.completeAction();
                    }
                        .bind(this),
                    1000
                );
            }

        },function (err) {

            cogoToast.error(err, { position: 'top-center'});

        });

    }

    refundAmount = () => {
        if(this.state.refund_amount === "" || this.state.refund_amount === undefined || this.state.refund_amount === null){
            cogoToast.warn("Please Enter Valid Amount", { position: 'top-center'});
        } else {
            let refund_amound = parseFloat(this.state.refund_amount);

            let total_amount = this.state.single_order_data.lines[0].order.total;

            // console.log(total_amount);

            if(refund_amound > total_amount){
                cogoToast.warn("Please Enter Valid Amount", { position: 'top-center'});
            } else {

                let data = {
                    order_id:this.props.orderId,
                    payment_id:this.state.single_order_data.lines[0].order.payments[0].id,
                    refund_amount:refund_amound
                }

                let scope = this;

                CreateRefundOrderMutation(data,function (response) {


                    if(response.createRefund !== null){
                        cogoToast.success("Order "+response.createRefund.order.orderId+" is Refunded Successfully", { position: 'top-center'});
                        setTimeout(
                            function() {
                                scope.props.completeAction();
                            }
                                .bind(this),
                            1000
                        );
                    }

                },function (err) {

                    cogoToast.error(err, { position: 'top-center'});

                });
            }
        }


    }

    getFormattedDate = (date)=>{
        let today = new Date(date);
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        let date1=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear() +' : ' + strTime;

        return date1;
    }

    render() {

        return (
            <div>
                {/*<Paper style={{paddingBottom: '24px',boxShadow:'none'}}>*/}
                {/*    <Typography variant="h5" component="h3" >*/}
                {/*        #{this.state.single_order_data.singleOrder[0].orderId}*/}
                {/*    </Typography>*/}
                {/*</Paper>*/}
                {
                    Object.keys(this.state.single_order_data).length > 0 &&

                <Grid container spacing={0}>
                    <Grid item xs={3} className="dashboard_model_left_column">
                       <div className="dashboard_info_section">
                           <Typography variant="h5" component="h3" className="dashboard_fields_title">Order Information</Typography>
                           <p className="dashboard_fields_para">Order Id: {this.state.single_order_data.lines[0].order.orderId}</p>
                           <p className="dashboard_fields_para">Order Date: {this.getFormattedDate(this.state.single_order_data.lines[0].order.created)}</p>
                           <p className="dashboard_fields_para">Order Status : {this.state.single_order_data.lines[0].order.status}</p>
                           <p className="dashboard_fields_para">Order Total: Rs {this.state.single_order_data.lines[0].order.total}</p>
                       </div>
                        <div className="dashboard_info_section">
                            <Typography variant="h5" component="h3" className="dashboard_fields_title">Shipping Information</Typography>
                            <p className="dashboard_fields_para">Shipping Method: {this.state.single_order_data.lines[0].order.shippingMethod.name}</p>
                            <p className="dashboard_fields_para">Shipping Price: Rs {this.state.single_order_data.lines[0].order.shippingMethod.shippingTotal}</p>
                        </div>
                        <div className="dashboard_info_section">
                            <Typography variant="h5" component="h3" className="dashboard_fields_title">Customer Information</Typography>
                            <p className="dashboard_fields_para">Customer Name: {this.state.single_order_data.lines[0].order.shippingAddress.firstName}</p>
                            <p className="dashboard_fields_para">Email: {this.state.single_order_data.lines[0].order.userEmail}</p>
                            <p className="dashboard_fields_para">phone : {this.state.single_order_data.lines[0].order.shippingAddress.phone}</p>
                        </div>
                        {
                            this.state.single_order_data.lines[0].order.shippingAddress && (
                                <div className="dashboard_info_section">
                                    <Typography variant="h5" component="h3" className="dashboard_fields_title">Billing Address</Typography>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.shippingAddress.firstName}, {this.state.single_order_data.lines[0].order.shippingAddress.lastName}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.shippingAddress.companyName}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.shippingAddress.phone}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.shippingAddress.city} - {this.state.single_order_data.lines[0].order.shippingAddress.postalCode}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.shippingAddress.country.country}</p>
                                </div>
                            )
                        }
                        {
                            this.state.single_order_data.lines[0].order.billingAddress && (
                                <div className="dashboard_info_section">
                                    <Typography variant="h5" component="h3" className="dashboard_fields_title">Shipping Address</Typography>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.billingAddress.firstName}, {this.state.single_order_data.lines[0].order.billingAddress.lastName}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.billingAddress.companyName}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.billingAddress.phone}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.billingAddress.city} - {this.state.single_order_data.lines[0].order.billingAddress.postalCode}</p>
                                    <p className="dashboard_fields_para">{this.state.single_order_data.lines[0].order.billingAddress.country.country}</p>
                                </div>
                            )
                        }

                    </Grid>
                    <Grid item xs={9} className="dashboard_model_right_column">
                        <div>
                            <div className="dashboard_action_section">
                                <div>
                                    <Typography variant="h5" component="h3" className="dashboard_fields_title">Ordered Item</Typography>
                                </div>

                                {       this.props.activeStatus !== "payment_pending" &&

                                        <div style={{display:'flex'}}>
                                            <div>
                                                <span className="currency_symbol" >Rs</span>
                                                <input type="number"  className="refund_input_field" placeholder="Refund Amount" value={this.state.refund_amount} onChange={(e) => {
                                                    this.setState({
                                                        refund_amount:e.target.value
                                                    })
                                                }}/>
                                            </div>
                                            <button type="button" className="dashboard_approve_btn" onClick={this.refundAmount} >REFUND</button>
                                            {
                                                this.props.activeStatus === "waiting_for_approval" || this.props.activeStatus === "allorders" ? (
                                                    <div>
                                                        <button type="button" className="dashboard_approve_btn" onClick={this.approveOrder}>APPROVE</button>
                                                        <button type="button" className="dashboard_disapprove_btn" onClick={this.disApproveOrder}>DISAPPROVE</button>
                                                    </div>
                                                ):null
                                            }
                                        </div>

                                }

                            </div>


                            <Paper className="dash_products_table_paper">
                                <Table className="dash_products_table" aria-label="simple table">
                                    <TableHead style={{backgroundColor:'#f4f4f4'}}>
                                        <TableRow>
                                            <TableCell align="left">Product</TableCell>
                                            <TableCell align="left">Quantity</TableCell>
                                            <TableCell align="left">Tax</TableCell>
                                            <TableCell align="left">Price</TableCell>
                                            <TableCell align="left">Total</TableCell>
                                            <TableCell align="left">Vendor Details</TableCell>
                                            <TableCell align="left">Shipping Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/*{*/}
                                        {/*    this.state.single_order_data.map((item,index) => {*/}
                                        {/*        return(*/}
                                        {/*            <>*/}
                                                        {
                                                            this.state.single_order_data.lines.map((line,lineIndex) => {
                                                               return (
                                                                   <TableRow key={lineIndex}>
                                                                       <TableCell component="th" scope="row" align="left">
                                                                           {line.productName}
                                                                       </TableCell>
                                                                       <TableCell align="left">{line.quantity}</TableCell>
                                                                       <TableCell align="left">Rs {line.taxRate}</TableCell>
                                                                       <TableCell align="left">Rs {parseFloat(line.unitPriceNet) - parseFloat(line.taxRate)}</TableCell>
                                                                       <TableCell align="left">Rs {line.unitPriceNet}</TableCell>
                                                                       <TableCell align="left">
                                                                           {Object.keys(line.vendor.vendor).map((keyName, i) => (
                                                                               <div  key={i}>{line.vendor.vendor[keyName]}</div>
                                                                           ))}
                                                                       </TableCell>
                                                                       <TableCell align="left">{line.lineShipping.edges[0] && line.lineShipping.edges[0].node && line.lineShipping.edges[0].node.shippingStatus}</TableCell>
                                                                   </TableRow>
                                                               )
                                                           })
                                                        }
                                        {/*            </>*/}
                                        {/*        )*/}
                                        {/*    })*/}
                                        {/*}*/}

                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                        <div>
                            <Typography variant="h5" component="h3" className="dashboard_fields_title">Ordered Item Designs</Typography>
                            <ThumbnailTable orderId={this.props.orderId} />
                        </div>
                    </Grid>
                </Grid>
                }
            </div>
        );
    }
}

export default SingleOrder;
