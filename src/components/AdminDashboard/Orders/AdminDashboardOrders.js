import React from "react";
import './AdminDashboardOrders.css';
import {connect} from "react-redux";
import $ from 'jquery';
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../Environment";
import AdminDashboardIndex from ".././AdminDashboardIndex";
import LoadingScreen from "react-loading-screen";
import Container from "@material-ui/core/Container";
import {ExportCSV} from '../../../ExportCSV';
import Button from "@material-ui/core/Button";
import AdminDashboardTable from "./AdminDashboardTable";
import cogoToast from "cogo-toast";
import axios from "axios";
import {host_name} from "../../../serviceApi";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import TablePagination from "@material-ui/core/TablePagination";
import OrderTrackingDialog from "../../MyOrdersPage/OrderTrackingDialog";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const getWaitingForApprovalOrders = graphql`
  query AdminDashboardOrdersWaitingForApprovalOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
     ordersToBeApproved(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
            pageRange
            totalRecordCount
            orderData{
              id
              shippingStatus
              lines{
                id
                order{
                  id
                  orderId
                  created   
                  total
                  userEmail
                  shippingAddress{
                    firstName
                    phone
                  }
                  status
                  payments{
                    gateway
                    id
                    chargeStatus
                  }
                }
                productName  
                productSku
                quantity
                vendor{
                  id
                  vendor{
                    firstName
                    mobileNumber
                  }
                }
                lineShipping(first: 100) {
                  edges {
                    node {
                      shippingStatus
                      id
                    }
                  }
                }
        
              }
            }
            
          
     }
  }
`;


const getApprovedOrders = graphql`
  query AdminDashboardOrdersApprovedOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
     ordersApproved(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
             pageRange
       totalRecordCount
       orderData{
            id
            shippingStatus
            lines{
              id
              order{
                id
                orderId
                  created   
                  total
                  userEmail
                  shippingAddress{
                    firstName
                    phone
                  }
                  status
                  payments{
                    gateway
                    id
                    chargeStatus
                  }
              }
               productName  
               productSku
               quantity
              vendor{
                id
                vendor{
                  firstName
                  mobileNumber
                }
              }
               lineShipping(first: 100) {
                edges {
                  node {
                    shippingStatus
                    id
                  }
                }
              }
              
            }
      }
   }
  }
`;




const getDisApprovedOrders = graphql`
  query AdminDashboardOrdersDisApprovedOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
     disapprovedOrders(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName 
                   productSku 
                   quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                  lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                }
          }
   }
  }
`;


const getAllOrders = graphql`
  query AdminDashboardOrdersAllOrdersQuery{
    adminOrdersList{
        id
        orderId
        created   
        total
        userEmail
        status
        payments{
          gateway
          id
          chargeStatus
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

const getAllOrdersByDate = graphql`
  query AdminDashboardOrdersAllOrdersByDateQuery(
        $query:JSONString ){
    adminOrdersList(query : $query ){
        id
        orderId
        created   
        total
        userEmail
        status
        payments{
          gateway
          id
          chargeStatus
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

const getPaymentPendingOrders = graphql`
  query AdminDashboardOrdersPaymentPendingOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
     failedPayment(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName  
                    productSku
                    quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                  lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                }
    
          }
  }
  }
`;

const getProcessingOrders = graphql`
  query AdminDashboardOrdersProcessingOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminProcessingOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
         pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName  
                    productSku
                    quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                  lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                }
          }
  }
  }
`;


const getReadyToShipOrders = graphql`
  query AdminDashboardOrdersReadyToShipOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminReadyToShipOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName  
                    productSku
                    quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                    lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                } 
          }
       }
  }
`;
const getShedulePickupOrders = graphql`
  query AdminDashboardOrdersShedulePickupOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminPickupScheduledOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName  
                    productSku
                    quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                    lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                } 
          }
       }
  }
`;


const getShippedOrders = graphql`
  query AdminDashboardOrdersShippedOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminShippedOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
               pageRange
               totalRecordCount
               orderData{
                    id
                    shippingStatus
                    lines{
                      id
                      order{
                        id
                        orderId
                          created   
                          total
                          userEmail
                          shippingAddress{
                            firstName
                            phone
                          }
                          status
                          payments{
                            gateway
                            id
                            chargeStatus
                          }
                      }
                       productName  
                        productSku
                        quantity
                      vendor{
                        id
                        vendor{
                          firstName
                          mobileNumber
                        }
                      }
                        lineShipping(first: 100) {
                        edges {
                          node {
                            shippingStatus
                            id
                          }
                        }
                      }
                      
                    }    
              }
       }
  }
`;


const getReturnedOrders = graphql`
  query AdminDashboardOrdersReturnedOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminReturnsOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName  
                    productSku
                    quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                    lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                }      
          }
       }
  }
`;


const getDeliveredOrders = graphql`
  query AdminDashboardOrdersDeliveredOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminDeliveredOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
                id
                shippingStatus
                lines{
                  id
                  order{
                    id
                    orderId
                      created   
                      total
                      userEmail
                      shippingAddress{
                        firstName
                        phone
                      }
                      status
                      payments{
                        gateway
                        id
                        chargeStatus
                      }
                  }
                   productName  
                    productSku
                    quantity
                  vendor{
                    id
                    vendor{
                      firstName
                      mobileNumber
                    }
                  }
                  lineShipping(first: 100) {
                    edges {
                      node {
                        shippingStatus
                        id
                      }
                    }
                  }
                  
                }        
          }
       }
  }
`;

const getPrintingdOrders = graphql`
  query AdminDashboardOrdersPrintingOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminPrintingOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
               totalRecordCount
               orderData{
                    id
                    shippingStatus
                    lines{
                      id
                      order{
                        id
                        orderId
                          created   
                          total
                          userEmail
                          shippingAddress{
                            firstName
                            phone
                          }
                          status
                          payments{
                            gateway
                            id
                            chargeStatus
                          }
                      }
                       productName  
                        productSku
                        quantity
                      vendor{
                        id
                        vendor{
                          firstName
                          mobileNumber
                        }
                      }
                      lineShipping(first: 100) {
                        edges {
                          node {
                            shippingStatus
                            id
                          }
                        }
                      }
                      
                    }          
              }
  }
  }
`;

const getExceptiondOrders = graphql`
  query AdminDashboardOrdersExceptionOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminExceptionOrdersLines(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
               totalRecordCount
               orderData{
                    id
                    shippingStatus
                    lines{
                      id
                      order{
                        id
                        orderId
                          created
                          total
                          userEmail
                          shippingAddress{
                            firstName
                            phone
                          }
                          status
                          payments{
                            gateway
                            id
                            chargeStatus
                          }
                      }
                       productName
                        productSku
                        quantity
                      vendor{
                        id
                        vendor{
                          firstName
                          mobileNumber
                        }
                      }
                      lineShipping(first: 100) {
                        edges {
                          node {
                            shippingStatus
                            id
                          }
                        }
                      }

                    }
              }
  }
  }
`;



const getOrdersBasedonShippingOrders = graphql`
  query AdminDashboardOrdersShippingOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       adminOrdersListBasedOnShipping(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
            pageRange
            totalRecordCount
    orderData{
            id
            shippingStatus
            lines{
              id
              order{
                id
                orderId
                  created   
                  total
                  userEmail
                  shippingAddress{
                    firstName
                    phone
                  }
                  status
                  payments{
                    gateway
                    id
                    chargeStatus
                  }
              }
               productName  
                productSku
                quantity
              vendor{
                id
                vendor{
                  firstName
                  mobileNumber
                }
              }
               lineShipping(first: 100) {
                edges {
                  node {
                    shippingStatus
                    id
                  }
                }
              }
              
            }
    }   
  }
  }
`;

const getAllReports = graphql`
  query AdminDashboardOrdersAllReportsQuery{
       reportsTaskIds{
            id
            taskId
            reportName
            isGenerated
            url
            dateRange
            createdOn
      }
  }
`;


const getSearchWithOrderId = graphql`
  query AdminDashboardOrdersSearchWithOrderIdQuery($orderId:String!){
     searchWithOrderIdAdmin(orderId:$orderId){
            id
            shippingStatus
            lines{
              id
              order{
                id
                orderId
                created   
                total
                userEmail
                shippingAddress{
                  firstName
                  phone
                }
                status
                payments{
                  gateway
                  id
                  chargeStatus
                }
              }
              productName  
              productSku
              quantity
              vendor{
                id
                vendor{
                  firstName
                  mobileNumber
                }
              }
              lineShipping(first: 100) {
                edges {
                  node {
                    shippingStatus
                    id
                  }
                }
              }
            }       
          
     }
  }
`;

const table_header = [{id: 'order_date',label: 'ORDER DATE',minWidth: '11rem'},
    {id: 'order_id',label: 'ORDER ID',minWidth: '11rem'},
    {id: 'products_details',label: 'PRODUCT DETAILS',minWidth: '25rem'},
    {id: 'quantity',label: 'QUANTITY',minWidth: '11rem'},
    {id: 'product_sku',label: 'PRODUCT SKU',minWidth: '11rem'},
    {id: 'shipping_status',label: 'SHIPPING STATUS',minWidth: '11rem'},
    {id: 'order_status',label: 'ORDER STATUS',minWidth: '11rem'},
    {id: 'payment',label: 'PAYMENT',minWidth: '11rem'},
    {id: 'vendor_details',label: 'VENDOR DETAILS',minWidth: '12rem'},
    {id: 'customer_details',label: 'CUSTOMER DETAILS',minWidth: '11rem'},
    {id: 'order_total',label: 'ORDER TOTAL',minWidth: '11rem'}
];

const table_row_formate = {
    order_date:'',
    order_id:'',
    products_details:[],
    quantity:[],
    product_sku:'',
    payment:'',
    customer_details:[],
    order_total:'',
    order_status:[],
    shipping_status:'',
    vendor_details:[],

};


class AdminDashboardOrders extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns : [],
            rows : [],
            page:1,
            rowsPerPage:10,
            min_width:'130px',
            activeStatus:'waiting_for_approval',
            loading:false,
            searchText:'',
            filterData:[],
            selectedDate:new Date(),
            export_data:[],
            rowsPerPageOptions:[10, 25, 100],
            total_data_count:0,
            offset: 0,
            filtered_status:[],
            order:'ASCENDING'

        }
    }
    componentWillMount(){
        if(this.props.user_details.user && this.props.user_details.user.isAdmin === false){
            this.props.history.push('/');
        }
    }
    componentDidMount() {

        let scope = this;

        $('select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');

            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            });

            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
                if($(this).text() === "Waiting For Approval"){
                    scope.setActiveStatus("waiting_for_approval");
                }else if($(this).text() === "Approved"){
                    scope.setActiveStatus("approved");
                }else if($(this).text() === "Printing"){
                    scope.setActiveStatus("printing");
                }else if($(this).text() === "DisApproved"){
                    scope.setActiveStatus("disapproved");
                }else if($(this).text() === "Payment Pending"){
                    scope.setActiveStatus("payment_pending");
                }else if($(this).text() === "SUNTECH"){
                    scope.setActiveStatus("processing");
                }else if($(this).text() === "Ready To Ship"){
                    scope.setActiveStatus("ready_to_ship");
                }else if($(this).text() === "Pickup Scheduled"){
                    scope.setActiveStatus("pickup_schedule");
                }else if($(this).text() === "Shipped"){
                    scope.setActiveStatus("shipped");
                }else if($(this).text() === "Returned"){
                    scope.setActiveStatus("returned");
                }else if($(this).text() === "Delivered"){
                    scope.setActiveStatus("delivered");
                }else if($(this).text() === "Orders By Shipping"){
                    scope.setActiveStatus("all_orders_basedon_shipping");
                }else if($(this).text() === "Exception Orders"){
                    scope.setActiveStatus("exception_orders");
                }

                //console.log($this.val());
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });

        });

        this.getWaitingForApprovalOrders();
    }
    getWaitingForApprovalOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });

        fetchQuery(environment, getWaitingForApprovalOrders, variables)
            .then(data => {
                if(data.ordersToBeApproved !== null && data.ordersToBeApproved.orderData && data.ordersToBeApproved.orderData.length > 0){
                    this.FormateTableData(data.ordersToBeApproved);
                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0

                    })
                }
            });
    };
    getApprovedOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });

        fetchQuery(environment, getApprovedOrders, variables)
            .then(data => {
                if(data.ordersApproved !== null && data.ordersApproved.orderData && data.ordersApproved.orderData.length > 0){
                    this.FormateTableData(data.ordersApproved);
                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getDisApprovedOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });

        fetchQuery(environment, getDisApprovedOrders, variables)
            .then(data => {
                if(data.disapprovedOrders !== null &&  data.disapprovedOrders.orderData && data.disapprovedOrders.orderData.length > 0){

                    this.FormateTableData(data.disapprovedOrders);
                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getAllPaymentPendingOrders = () => {

        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true,
        });
        fetchQuery(environment, getPaymentPendingOrders, variables)
            .then(data => {
                if(data.failedPayment !== null && data.failedPayment.orderData  && data.failedPayment.orderData.length > 0){
                    this.FormateTableData(data.failedPayment);

                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0

                    })
                }
            });
    };
    getProcessingOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });

        fetchQuery(environment, getProcessingOrders, variables)
            .then(data => {
                if(data.adminProcessingOrdersLines !== null && data.adminProcessingOrdersLines.orderData && data.adminProcessingOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminProcessingOrdersLines);
                } else {

                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getReadyToShipOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });
        fetchQuery(environment, getReadyToShipOrders, variables)
            .then(data => {
                if(data.adminReadyToShipOrdersLines !== null && data.adminReadyToShipOrdersLines.orderData && data.adminReadyToShipOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminReadyToShipOrdersLines);

                } else {

                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getPickupScheduleDatas = () => {

        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });
        fetchQuery(environment, getShedulePickupOrders, variables)
            .then(data => {
                if(data.adminPickupScheduledOrdersLines !== null && data.adminPickupScheduledOrdersLines.orderData && data.adminPickupScheduledOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminPickupScheduledOrdersLines);

                } else {

                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };

    getShippedOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });

        fetchQuery(environment, getShippedOrders, variables)
            .then(data => {
                if(data.adminShippedOrdersLines !== null && data.adminShippedOrdersLines.orderData && data.adminShippedOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminShippedOrdersLines);

                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getReturnedOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });
        fetchQuery(environment, getReturnedOrders, variables)
            .then(data => {
                if(data.adminReturnsOrdersLines !== null && data.adminReturnsOrdersLines.orderData && data.adminReturnsOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminReturnsOrdersLines);
                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0

                    })
                }
            });
    };
    getDeliveredOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };

        this.setState({
            columns:table_header,
            loading:true
        });
        fetchQuery(environment, getDeliveredOrders, variables)
            .then(data => {
                if(data.adminDeliveredOrdersLines !== null && data.adminDeliveredOrdersLines.orderData && data.adminDeliveredOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminDeliveredOrdersLines);
                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getAllPrintingOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };

        this.setState({
            columns:table_header,
            loading:true
        });
        fetchQuery(environment, getPrintingdOrders, variables)
            .then(data => {
                if(data.adminPrintingOrdersLines !== null && data.adminPrintingOrdersLines.orderData && data.adminPrintingOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminPrintingOrdersLines);

                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    getExceptionOrders = () => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };

        this.setState({
            columns:table_header,
            loading:true
        });
        fetchQuery(environment, getExceptiondOrders, variables)
            .then(data => {
                if(data.adminExceptionOrdersLines !== null && data.adminExceptionOrdersLines.orderData && data.adminExceptionOrdersLines.orderData.length > 0){
                    this.FormateTableData(data.adminExceptionOrdersLines);

                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };

    getAllOrdersBasedonShippingOrders = (pageno) => {
        const variables = {
            end:this.state.page,
            paginationValue:this.state.rowsPerPage,
            sortOrder:this.state.order
        };
        this.setState({
            columns:table_header,
            loading:true
        });

        fetchQuery(environment, getOrdersBasedonShippingOrders, variables)
            .then(data => {
                if(data.adminOrdersListBasedOnShipping !== null && data.adminOrdersListBasedOnShipping.orderData && data.adminOrdersListBasedOnShipping.orderData.length > 0){
                    this.FormateTableData(data.adminOrdersListBasedOnShipping);
                } else {
                    this.setState({
                        rows:[],
                        loading:false,
                        filterData:[],
                        rowsPerPageOptions:[],
                        page:1,
                        rowsPerPage:10,
                        total_data_count:0,
                        offset: 0
                    })
                }
            });
    };
    FormateTableData = (response) => {

        let table_data = response.orderData;

        let table_rows = [];
        let export_data = [];
        let row_formate = table_row_formate;
        if(table_data.length > 0){
            for(let i=0;i<table_data.length;i++){
                let product_detals= [];
                let customer_details = [];
                let vendor_details = [];
                let quantity = [];
                let sku = [];
                table_data[i].lines.map((item,index) => {
                    product_detals[index] = item.productName;
                    quantity[index] = item.quantity;
                    sku[index] = item.productSku;
                    customer_details[0] = item.order.shippingAddress.firstName;
                    customer_details[1] = item.order.shippingAddress.phone;
                    customer_details[2] = item.order.userEmail;
                    vendor_details[0]= item.vendor && item.vendor.vendor ? item.vendor.vendor.firstName:'';
                    vendor_details[1]= item.vendor && item.vendor.vendor ? item.vendor.vendor.mobileNumber:'';
                    vendor_details[1]= item.vendor && item.vendor.id ? item.vendor.id:'';

                    row_formate = {
                        shipping_id:table_data[i].lines[0].lineShipping.edges[0] ? table_data[i].lines[0].lineShipping.edges[0].node.id:'',
                        id:item.order.id,
                        order_date:this.getFormattedDate(item.order.created),
                        order_id:item.order.orderId,
                        products_details:product_detals,
                        quantity:quantity,
                        product_sku:sku,
                        payment:item.order.payments[0].gateway,
                        customer_details:customer_details,
                        order_total:'Rs.'+item.order.total,
                        order_status:item.order.status,
                        shipping_status:table_data[i].shippingStatus,
                        vendor_details:vendor_details
                    };

                    export_data[i] = {
                        "ORDER DATE":this.getFormattedDate(item.order.created),
                        "ORDER ID":item.order.orderId,
                        "PRODUCT DETAILS":product_detals.toString(),
                        "QUANTITY":quantity.toString(),
                        "PRODUCT SKU":sku.toString(),
                        "SHIPPING STATUS":table_data[i].shippingStatus,
                        "ORDER STATUS":item.order.status,
                        "PAYMENT GATEWAY":item.order.payments[0].gateway,
                        "VENDOR DETAILS":vendor_details.toString(),
                        "CUSTOMER DETAILS":customer_details.toString(),
                        "ORDER TOTAL":'Rs.'+item.order.total
                    }


                });

                table_rows[i] = row_formate;



                if(i === table_data.length - 1){
                    this.setState({
                        rows:table_rows,
                        loading:false,
                        filterData:table_rows,
                        export_data:export_data,
                        total_data_count:response.totalRecordCount,
                        rowsPerPageOptions:[10, 25, 100],

                    })

                }

            }
        } else{
            this.setState({
                rows:[],
                loading:false,
                filterData:[],
                export_data:[],
                rowsPerPageOptions:[],
                page:1,
                rowsPerPage:10,
                total_data_count:0,
                offset: 0
            })
        }


    };
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
    };
    getCurrentDate = () => {
        let currentdate = new Date();
        return currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
    };
    setActiveStatus = (activeStatus) => {
        this.setState({
            searchText:"",
            page:1,
            rowsPerPage: 10,
            offset: 0
        },()=>{
            this.changeActiveStatus(activeStatus);
        });
    };
    changeActiveStatus = (activeStatus) => {

        this.setState({
            activeStatus:activeStatus,
            filtered_status:[]
        });
        if(activeStatus === "waiting_for_approval"){
            this.getWaitingForApprovalOrders();
        } else if(activeStatus === "approved"){
            this.getApprovedOrders();
        } else if(activeStatus === "disapproved"){
            this.getDisApprovedOrders();
        } else if(activeStatus === "payment_pending"){
            this.getAllPaymentPendingOrders();
        } else if(activeStatus === "allorders"){
            this.getAllOrders();
        } else if(activeStatus === "processing"){
            this.getProcessingOrders();
        }else if(activeStatus === "ready_to_ship"){
            this.getReadyToShipOrders();
        }else if(activeStatus === "pickup_schedule"){
            this.getPickupScheduleDatas();
        }else if(activeStatus === "shipped"){
            this.getShippedOrders();
        }else if(activeStatus === "returned"){
            this.getReturnedOrders();
        }else if(activeStatus === "delivered"){
            this.getDeliveredOrders();
        }else if(activeStatus === "all_orders_basedon_shipping"){
            this.getAllOrdersBasedonShippingOrders(0);
        }else if(activeStatus === "printing"){
            this.getAllPrintingOrders();
        } else if(activeStatus === "exception_orders") {
            this.getExceptionOrders();
        }
    };
    handlePaginationClick = (offset,page) => {
        this.setState({
            offset:offset,
            page:page,
            searchText:"",
        },()=>{
            this.changeActiveStatus(this.state.activeStatus);
        });
    };
    handleRowsPerPageChange = event => {

        this.setState({
            rowsPerPage: event.target.value,
            page:1,
            offset:0,
            searchText:"",
        },()=>{
            this.changeActiveStatus(this.state.activeStatus);
        })
    };
    handleSearchTextChanges = (event) =>{
        event.preventDefault();
        this.setState({
            searchText : event.target.value,
            activeStatus:""
        },()=>{
            if(this.state.searchText === ""){
                this.setState({
                    activeStatus:"waiting_for_approval"
                },()=>{
                    this.getWaitingForApprovalOrders();
                });

            }
        });


    };

    handleSearch = () => {
        if(this.state.searchText !== ''){
            const variables = {
                orderId:this.state.searchText,
            };
            this.setState({
                columns:table_header,
                loading:true
            });

            fetchQuery(environment, getSearchWithOrderId, variables)
                .then(data => {
                    if(data.searchWithOrderIdAdmin !== null && data.searchWithOrderIdAdmin.length > 0){

                        let data_formate = {
                            pageRange:1,
                            totalRecordCount:1,
                            orderData:data.searchWithOrderIdAdmin
                        };
                        let filtered_status = [];

                        data.searchWithOrderIdAdmin.map((item,index) => {
                            if(this.convertStringToLowecase(item.lines[0].order.status) === this.convertStringToLowecase("PAYMENT PENDING")){
                                filtered_status[index] = {status:"Payment Pending",count:1};
                                $('.select-styled')[0].innerText = "Payment Pending";
                                this.setState({
                                    activeStatus:"payment_pending"
                                });
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("WAITING_FOR_APPROVAL")){
                                filtered_status[index] = {status:"Waiting For Approval",count:1};
                                $('.select-styled')[0].innerText = "Waiting For Approval";
                                this.setState({
                                    activeStatus:"waiting_for_approval"
                                });
                            }else if(((this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PROCESSING") && item.lines[0].vendor && this.convertStringToLowecase(item.lines[0].vendor.vendor.firstName) === this.convertStringToLowecase("wewin"))) ||
                                (this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("APPROVED") && item.lines[0].vendor && this.convertStringToLowecase(item.lines[0].vendor.vendor.firstName) === this.convertStringToLowecase("wewin"))){
                                filtered_status[index] = {status:"Approved",count:1};
                                $('.select-styled')[0].innerText = "Approved";
                                this.setState({
                                    activeStatus:"approved"
                                })
                            }else if((this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PROCESSING") && item.lines[0].vendor && this.convertStringToLowecase(item.lines[0].vendor.vendor.firstName) === this.convertStringToLowecase("suntech")) ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("APPROVED") && item.lines[0].vendor && this.convertStringToLowecase(item.lines[0].vendor.vendor.firstName) === this.convertStringToLowecase("suntech")){
                                filtered_status[index] = {status:"SUNTECH",count:1};
                                $('.select-styled')[0].innerText = "SUNTECH";
                                this.setState({
                                    activeStatus:"processing"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PRINTING")){
                                filtered_status[index] = {status:"Printing",count:1};
                                $('.select-styled')[0].innerText = "Printing";
                                this.setState({
                                    activeStatus:"printing"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("DISAPPROVED")){
                                filtered_status[index] = {status:"DisApproved",count:1};
                                $('.select-styled')[0].innerText = "DisApproved";
                                this.setState({
                                    activeStatus:"disapproved"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("READY_TO_SHIP") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("AWB_ASSIGNED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("LABEL_GENERATED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("NEW")
                            ){
                                filtered_status[index] = {status:"Ready To Ship",count:1};
                                $('.select-styled')[0].innerText = "Ready To Ship";
                                this.setState({
                                    activeStatus:"ready_to_ship"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PICKUP_SCHEDULED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PICKUP_GENERATED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PICKUP_QUEUED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("MANIFEST_GENERATED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("OUT_FOR_PICKUP") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PICKUP_RESCHEDULED")){
                                filtered_status[index] = {status:"Pickup Scheduled",count:1};
                                $('.select-styled')[0].innerText = "Pickup Scheduled";
                                this.setState({
                                    activeStatus:"pickup_schedule"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("SHIPPED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("OUT_FOR_DELIVERY") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("IN_TRANSIT")){
                                filtered_status[index] = {status:"Shipped",count:1};
                                $('.select-styled')[0].innerText = "Shipped";
                                this.setState({
                                    activeStatus:"shipped"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("CANCELLED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("RETURNS") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("RTO_INITIATED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("RTO_DELIVERED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("RTO_ACKNOWLEDGED")){
                                filtered_status[index] = {status:"Returned",count:1};
                                $('.select-styled')[0].innerText = "Returned";
                                this.setState({
                                    activeStatus:"returned"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("DELIVERED")){
                                filtered_status[index] = {status:"Delivered",count:1};
                                $('.select-styled')[0].innerText = "Delivered";
                                this.setState({
                                    activeStatus:"delivered"
                                })
                            }else if(this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("EXCEPTION") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("LOST") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PICKUP_ERROR") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("CANCELLATION_REQUESTED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("UNDELIVERED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("DELAYED") ||
                                this.convertStringToLowecase(item.shippingStatus) === this.convertStringToLowecase("PICKUP_EXCEPTION")){
                                filtered_status[index] = {status:"Exception Orders",count:1};
                                $('.select-styled')[0].innerText = "Exception Orders";
                                this.setState({
                                    activeStatus:"exception_orders"
                                })
                            }
                        });
                        this.setState({
                            filtered_status:filtered_status
                        });
                        this.FormateTableData(data_formate);
                    } else {
                        this.setState({
                            rows:[],
                            loading:false,
                            filterData:[],
                            rowsPerPageOptions:[],
                            page:1,
                            rowsPerPage:10,
                            total_data_count:0,
                            offset: 0

                        })
                    }
                });
        }
    };
    convertStringToLowecase = (string) => {
        return string.toLowerCase();
    };
    SortDataByDate = (order) => {
        let short_order = order === 'desc' ? 'DESCENDING' : 'ASCENDING';
        this.setState({
            order:short_order
        },()=>{
            this.changeActiveStatus(this.state.activeStatus);
        })

    };
    render() {
        let filter_data = this.state.filterData;
        return (
            <div>
                <AdminDashboardIndex active_page={"orders"} >
                    <div>
                        <LoadingScreen
                            loading={this.state.loading}
                            bgColor='#ffffffbf'
                            spinnerColor='#000'
                            textColor='#676767'
                            logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                            text="Loading"
                        >
                            <Container maxWidth={"lg"} className="admin_dashboard_section">
                                <div className="orders_table_dropdown_section">
                                    <label htmlFor="order_status">Order Status</label>
                                    <select id="order_status" >
                                        <option value="waiting_for_approval">Waiting For Approval</option>
                                        <option value="approved">Approved</option>
                                        <option value="printing">Printing</option>
                                        <option value="disapproved">DisApproved</option>
                                        <option value="payment_pending">Payment Pending</option>
                                        <option value="processing">SUNTECH</option>

                                        <option value="ready_to_ship">Ready To Ship</option>
                                        <option value="pickup_schedule">Pickup Scheduled</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="returned">Returned</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="all_orders_basedon_shipping">Orders By Shipping</option>
                                        <option value="exception_orders">Exception Orders</option>
                                    </select>
                                    <div className="order_status_action">
                                        <ExportCSV csvData={this.state.export_data} fileName={"Export-"+this.getCurrentDate()} />
                                    </div>
                                    <div className="order_status_action">
                                        <Button  variant={"contained"} className="admin_report_btn"  onClick={() => this.setActiveStatus("report")}>Reports</Button>
                                    </div>
                                </div>
                                <div>
                                    {
                                        this.state.filtered_status.length > 0 && this.state.filtered_status.map((item,index)=>{
                                            return(
                                                <Chip label={item.status} avatar={<Avatar>{item.count}</Avatar>} />
                                            );
                                        })
                                    }
                                </div>
                                <form noValidate autoComplete="off" className={"searchForm"}>
                                    <TextField id="outlined-search"
                                               label="Search Order "
                                               type="search" variant="outlined"
                                               className={"searchTextFeild"}
                                               value={this.state.searchText}
                                               onChange={(e)=>this.handleSearchTextChanges(e)}
                                               onKeyDown={(event) => {
                                                   if (event.key === 'Enter') {
                                                       event.preventDefault();
                                                       this.handleSearch();
                                                   }
                                               }}
                                    />
                                </form>
                                {/*<div className="table_search_section">*/}
                                {/*    <form className="example" style={{width:'20rem',marginBottom:'2rem'}}>*/}
                                {/*        <input type="text" placeholder="Search.."  value={this.state.searchText}*/}
                                {/*               onChange={(e)=>this.handleSearchTextChanges(e)}*/}
                                {/*               onKeyDown={(event) => {*/}
                                {/*                   if (event.key === 'Enter') {*/}
                                {/*                       event.preventDefault();*/}
                                {/*                       this.handleSearch();*/}
                                {/*                   }*/}
                                {/*               }}*/}
                                {/*        />*/}
                                {/*        <Button onClick={this.handleSearch}><SearchIcon style={{fontSize: '1.3rem'}}/></Button>*/}
                                {/*    </form>*/}
                                {/*</div>*/}
                                {
                                    this.state.activeStatus !== "report" && (
                                        <AdminDashboardTable
                                            rowsPerPageOptions={this.state.rowsPerPageOptions}
                                            columns={this.state.columns}
                                            rows={this.state.rows}
                                            page={this.state.page}
                                            count={this.state.total_data_count}
                                            rowsPerPage={this.state.rowsPerPage}
                                            getWaitingForApprovalOrders={this.getWaitingForApprovalOrders}
                                            getApprovedOrders={this.getApprovedOrders}
                                            getDisApprovedOrders={this.getDisApprovedOrders}
                                            getAllOrders={this.getAllOrders}
                                            getAllPaymentPendingOrders={this.getAllPaymentPendingOrders}
                                            getProcessingOrders={this.getProcessingOrders}
                                            getReadyToShipOrders={this.getReadyToShipOrders}
                                            getPickupScheduleDatas={this.getPickupScheduleDatas}
                                            getShippedOrders={this.getShippedOrders}
                                            getReturnedOrders={this.getReturnedOrders}
                                            getDeliveredOrders={this.getDeliveredOrders}
                                            getAllOrdersBasedonShippingOrders={this.getAllOrdersBasedonShippingOrders}
                                            getExceptionOrders={this.getExceptionOrders}
                                            activeStatus={this.state.activeStatus}
                                            filterData={filter_data}
                                            handlePaginationClick={this.handlePaginationClick}
                                            offset={this.state.offset}
                                            handleRowsPerPageChange={this.handleRowsPerPageChange}
                                            SortDataByDate={this.SortDataByDate}

                                        />
                                    )
                                }
                                {
                                    this.state.activeStatus === "report" && (
                                        <ReportTable admin_token={this.props.user_details.token}/>
                                    )
                                }
                            </Container>
                        </LoadingScreen>
                    </div>
                </AdminDashboardIndex>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details
});


export default connect(mapStateToProps)(AdminDashboardOrders);



class ReportTable extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            reports:[],
            open_model:false,
            date: [new Date(), new Date()],
            report_name:'',
            loading:false,
            page:0,
            rowsPerPage:10,
            report_type:''

        };
    }

    onChange = date => this.setState({ date });

    componentWillMount(){
        this.setState({
            loading:true
        });

        this.getReportList();

    }
    getReportList = () => {
        const variables = {};

        fetchQuery(environment, getAllReports, variables)
            .then(data => {
                if(data.reportsTaskIds !== null && data.reportsTaskIds.length > 0){
                    this.setState({
                        reports:data.reportsTaskIds,
                        loading:false
                    });
                } else {
                    this.setState({
                        reports:[],
                        loading:false
                    });
                }
            });
    };

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
    };

    openModel = () => {
        this.setState({
            open_model:true
        })
    };
    handleClose = () => {
        this.setState({
            open_model:false
        })
    };

    submitReportForm = () => {
        if(this.state.report_name === ""){
            cogoToast.error("Please Fill Report Name", { position: 'top-center'});
        } else if(this.state.date === null){
            cogoToast.error("Please Select Date Range", { position: 'top-center'});
        } else {
            this.setState({
                loading:true
            });
            let scope = this;
            let startDate = new Date(this.state.date[0]);
            let endDate = new Date(this.state.date[1]);
            let start_date = startDate.getFullYear() +'-' + parseInt(startDate.getMonth()+1) + '-' + startDate.getDate();
            let end_date = endDate.getFullYear() +'-' + parseInt(endDate.getMonth()+1) + '-' + endDate.getDate();
            axios.get(host_name +'/report/?token=' + this.props.admin_token +'&start_date='+start_date+'&end_date='+end_date+'&report_name='+this.state.report_name+'&report_type='+this.state.report_type )
                .then(function (response) {
                    scope.getReportUrl(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    getReportUrl = (data) => {
        let scope = this;

        axios.get(host_name +'/task_result?task_id=' + data.task_id)
            .then(function (response) {
                if(response.data.message){
                    cogoToast.success(response.data.message, { position: 'top-center'});
                    var task_id = data.task_id;
                    setTimeout(
                        function() {
                            scope.setState({
                                loading:false,
                                open_model:false
                            },()=>{
                                scope.getURL(task_id);
                            })
                        }
                            .bind(this),
                        3000
                    );

                }

            })
            .catch(function (error) {
                console.log(error);
            });
    };
    getURL = (task_id) => {
        let scope = this;
        axios.get(host_name +'/task_result?task_id=' + task_id)
            .then(function (response) {
                if(response.data.url){
                    window.open(response.data.url,'_blank')
                    scope.getReportList();
                }
                if(response.data.message){
                    cogoToast.success(response.data.message, { position: 'top-center'});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    handleReportTableChangePage = (event, newPage) => {
        this.setState({
            page:newPage
        })
    };

    handleReportTableChangeRowsPerPage = event => {

        this.setState({
            rowsPerPage:+event.target.value,
            page:0
        })

    };


    render() {
        return (
            <LoadingScreen
                loading={this.state.loading}
                bgColor='#ffffffbf'
                spinnerColor='#000'
                textColor='#676767'
                logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                text="Loading"
            >
                <div className="Report_component">
                    <Button variant={"contained"} className="admin_report_btn" onClick={this.openModel}>Generate Report</Button>

                    <div component={Paper} style={{width:'100%',overflowX:'auto'}} className="admin_report_table_section">
                        <Table stickyHeader aria-label="sticky table"  style={{minWidth:650,border: '1px solid #80808052'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Report Name</TableCell>
                                    {/*<TableCell>Is Generated?</TableCell>*/}
                                    <TableCell>Url</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Created Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.reports.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.reportName ? row.reportName : 'Not provided'}
                                        </TableCell>

                                        {/*<TableCell component="th" scope="row">{row.isGenerated ? 'Generated':'Not Generated'}</TableCell>*/}
                                        {
                                            row.url?<TableCell component="th" scope="row"><a style={{textDecoration:'underline'}} href={row.url}>Download</a></TableCell> :
                                                <TableCell component="th" scope="row">
                                                    <IconButton style={{fontSize: '20px'}} onClick={()=>{this.getURL(row.taskId)}} ><RefreshIcon style={{fontSize: '1.3rem'}}/></IconButton>
                                                </TableCell>

                                        }
                                        <TableCell component="th" scope="row">{row.dateRange}</TableCell>
                                        <TableCell component="th" scope="row">{this.getFormattedDate(row.createdOn)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.reports.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleReportTableChangePage}
                        onChangeRowsPerPage={this.handleReportTableChangeRowsPerPage}
                    />
                    {
                        this.state.open_model === true?<OrderTrackingDialog
                            handleClose={this.handleClose}
                            open={this.state.open_model}
                            title={"Generate New Report"}
                            width='md'
                            fullWidth={true}

                        >
                            <div className="report_form">
                                <Container maxWidth={"sm"}>
                                    <form>
                                        <div className="report_form_group">
                                            <label htmlFor="report_name">Report Name *</label>
                                            <input type="text" value={this.state.report_name} className="report_name_input" onChange={(e)=>{
                                                this.setState({
                                                    report_name:e.target.value
                                                })
                                            }}/>
                                        </div>
                                        <div className="report_form_group">
                                            <label htmlFor="report_name">Report Type *</label>
                                            <FormControl variant="outlined"  className="form_feild">
                                                <Select
                                                    labelid="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={this.state.report_type}
                                                    onChange={(e)=>{
                                                        this.setState({
                                                            report_type:e.target.value
                                                        })
                                                    }}
                                                    MenuProps={{
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal:"left"
                                                        }
                                                    }}

                                                >
                                                    <MenuItem value="ORDERS">
                                                        ORDERS
                                                    </MenuItem>
                                                    <MenuItem value="ITEM WISE SALES" >
                                                        ITEM WISE SALES
                                                    </MenuItem>
                                                    <MenuItem value="SKU SALES ITEM WISE">
                                                        SKU SALES ITEM WISE
                                                    </MenuItem>
                                                    <MenuItem value="PRODUCT TYPE WISE SALES">
                                                        PRODUCT TYPE WISE SALES
                                                    </MenuItem>

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="report_form_group">
                                            <label htmlFor="date_range">Date Range *</label>
                                            <DateRangePicker
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                dayPlaceholder={"dd"}
                                                monthPlaceholder={"mm"}
                                                yearPlaceholder={"yyyy"}
                                                format={"dd-MM-y"}
                                                isOpen={false}
                                            />
                                        </div>
                                        <div>
                                            <Button variant="contained" className="admin_submit_report_btn" onClick={this.submitReportForm}>Generate Report</Button>
                                        </div>
                                    </form>
                                </Container>
                            </div>

                        </OrderTrackingDialog>:null
                    }
                </div>
            </LoadingScreen>
        );
    }
}
