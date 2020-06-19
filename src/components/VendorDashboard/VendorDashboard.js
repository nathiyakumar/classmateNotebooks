import React from "react";
import './VendorDashboard.css'
import {createMuiTheme, MuiThemeProvider, Typography} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckoutNavBar from "../CheckoutPage/CheckoutNavBar";

import {fetchQuery} from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';
import environment from "../../Environment";
import {connect} from 'react-redux'
import Container from "@material-ui/core/Container";
import CreateVendorUpdateOrderLinesMutation from "../../mutations/CreateVendorUpdateOrderLinesMutation";
import CreateCreateInvoiceMutation from "../../mutations/CreateCreateInvoiceMutation";
import CreateManifestMutation from "../../mutations/CreateManifestMutation";
import CreateSchedulePickupMutation from "../../mutations/CreateSchedulePickupMutation";

import cogoToast from 'cogo-toast';
import LoadingScreen from "react-loading-screen";
import OrderTrackingDialog from "../MyOrdersPage/OrderTrackingDialog";
import ThumbnailTable from "./ThumbnailTable";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from "material-ui-flat-pagination/lib/Pagination";
import ChevronLeftIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AuthContext from "../AuthProvider/auth-context";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import * as FileSaver from 'file-saver';


const DownloadIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/download_icon.svg"


const theme = createMuiTheme();


const getProcessingData = graphql`
  query VendorDashboardProcessingQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
      ordersBasedOnVendorProcessing(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
            order{
              id
              orderId
              created 
              approvedDate  
              myTotal 
              userEmail
              shippingAddress{
                firstName        
                phone
              }
              vendorLines{
                id
                productName
                productSku
                quantity
                
              }
            }
            vendor{
              vendor{
                firstName
              }
            }
            lineShipping(first:10){
              edges{
                node{
                  id
                  vendorProductTypeIsCustomizable
                  shippingStatus  
                  dimensions
                }
              }
            }            
          }
    }
  }
`;

const getRedayToShipData = graphql`
  query VendorDashboardReadyToShipQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorReadyToShip(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
               pageRange
               totalRecordCount
               orderData{
                order{
                      id
                      orderId
                      created 
                      approvedDate    
                      myTotal 
                      userEmail
                      shippingAddress{
                        firstName        
                        phone
                      }
                      vendorLines{
                        id
                        productName
                        productSku
                        quantity
                        
                      }
                    }
                    vendor{
                      vendor{
                        firstName
                      }
                    }
                    lineShipping(first:10){
                      edges{
                        node{
                          id
                          vendorProductTypeIsCustomizable  
                          shippingStatus
                          dimensions
                        }
                      }
                    }              
              }
       }
  }
`;
const getPickupSheduledData = graphql`
  query VendorDashboardPickupSheduledQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorPickupScheduled(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
               pageRange
               totalRecordCount
               orderData{
                order{
                      id
                      orderId
                      created 
                      approvedDate    
                      myTotal 
                      userEmail
                      shippingAddress{
                        firstName        
                        phone
                      }
                      vendorLines{
                        id
                        productName
                        productSku
                        quantity
                        
                      }
                    }
                    vendor{
                      vendor{
                        firstName
                      }
                    }
                    lineShipping(first:10){
                      edges{
                        node{
                          id
                          vendorProductTypeIsCustomizable  
                          shippingStatus
                          dimensions
                        }
                      }
                    }              
              }
       }
  }
`;

const getPickupOrdersData = graphql`
  query VendorDashboardPickupOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorPickup(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
                   pageRange
                   totalRecordCount
                   orderData{
                     order{
                      id
                      orderId
                      created 
                      approvedDate    
                      myTotal 
                      userEmail
                      shippingAddress{
                        firstName        
                        phone
                      }
                      vendorLines{
                        id
                        productName
                        productSku
                        quantity
            
                      }
                    }
                    vendor{
                      vendor{
                        firstName
                      }
                    }
                    lineShipping(first:10){
                        edges{
                          node{
                            id
                            vendorProductTypeIsCustomizable  
                            shippingStatus
                            dimensions
                          }
                        }
                    }            
                  }
       }
  }
`;


const getReturnedOrdersData = graphql`
  query VendorDashboardReturnedOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorReturns(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
               pageRange
               totalRecordCount
               orderData{
                order{
                      id
                      orderId
                      created 
                      approvedDate    
                      myTotal 
                      userEmail
                      shippingAddress{
                        firstName        
                        phone
                      }
                      vendorLines{
                        id
                        productName
                        productSku
                        quantity
                        
                      }
                    }
                    vendor{
                      vendor{
                        firstName
                      }
                    } 
                     lineShipping(first:10){
                        edges{
                          node{
                            id
                            vendorProductTypeIsCustomizable  
                            shippingStatus
                            dimensions
                          }
                        }
                    }       
              }
       }
  }
`;


const getAllOrdersData = graphql`
  query VendorDashboardAllOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorAll(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
          pageRange
          totalRecordCount
            orderData{
              order{
                id
                orderId
                created   
                approvedDate  
                myTotal 
                userEmail
                shippingAddress{
                  firstName        
                  phone
                }
                vendorLines{
                  id
                  productName
                  productSku
                  quantity
        
                }
              }
              vendor{
                vendor{
                  firstName
                }
              } 
               lineShipping(first:10){
                    edges{
                      node{
                        id
                        vendorProductTypeIsCustomizable  
                        shippingStatus
                        dimensions
                      }
                    }
                }    
            }    
          }   
       
  }
`;

const getAllDeliveredOrdersData = graphql`
  query VendorDashboardAllDeliveredOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorDelivered(end:$end, paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
              order{
                  id
                  orderId
                  created  
                  approvedDate   
                  myTotal 
                  userEmail
                  shippingAddress{
                    firstName        
                    phone
                  }
                  vendorLines{
                    id
                    productName
                    productSku
                    quantity
                  }
                }
                vendor{
                  vendor{
                    firstName
                  }
                } 
                 lineShipping(first:10){
                    edges{
                      node{
                        id
                        vendorProductTypeIsCustomizable  
                        shippingStatus
                        dimensions
                      }
                    }
                }    
          }  
       }
  }
`;

const getAllPrintingOrdersData = graphql`
  query VendorDashboardAllPrintingOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnPrinting(end:$end,paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
             order{
              id
              orderId
              created  
              approvedDate   
              myTotal 
              userEmail
              shippingAddress{
                firstName        
                phone
              }
              vendorLines{
                id
                productName
                productSku
                quantity
              }
            }
            vendor{
              vendor{
                firstName
              }
            }
            lineShipping(first:10){
              edges{
                node{
                  id
                  vendorProductTypeIsCustomizable 
                  shippingStatus 
                  dimensions
                }
              }
            }
          }
      }
  }
`;

const getExceptionOrdersData = graphql`
  query VendorDashboardExceptionOrdersQuery($end:Int!, $paginationValue:Int,$sortOrder:SortValueEnum){
       ordersBasedOnVendorExceptions(end:$end,paginationValue:$paginationValue,sortOrder:$sortOrder){
           pageRange
           totalRecordCount
           orderData{
             order{
              id
              orderId
              created  
              approvedDate   
              myTotal 
              userEmail
              shippingAddress{
                firstName        
                phone
              }
              vendorLines{
                id
                productName
                productSku
                quantity
              }
            }
            vendor{
              vendor{
                firstName
              }
            }
            lineShipping(first:10){
              edges{
                node{
                  id
                  vendorProductTypeIsCustomizable 
                  shippingStatus 
                  dimensions
                }
              }
            }
          }
      }
  }
`;


const getSearchWithOrderId = graphql`
  query VendorDashboardSearchWithOrderIdQuery($orderId:String!){
      searchWithOrderIdVendor(orderId:$orderId){            
             order{
              id
              orderId
              created   
              approvedDate  
              myTotal 
              userEmail
              shippingAddress{
                firstName        
                phone
              }
              vendorLines{
                id
                productName
                productSku
                quantity
              }
            }
            vendor{
              vendor{
                firstName
              }
            }
            lineShipping(first:10){
              edges{
                node{
                  id
                  vendorProductTypeIsCustomizable 
                  shippingStatus 
                  dimensions
                }
              }
            }  
      }
  }
`;

const downloadBulkDesign = graphql`
  query VendorDashboarddownloadBulkDesignQuery($orderId:[ID]){
    pdfBulkDownload(orderId:$orderId){            
        orderId
        pdf         
    }
  }
`;





class VendorDashboard extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.inputLabel = null;

        this.state = {
            page: 1,
            rowsPerPage: 10,
            tableAction: [],
            createInvoice: {"createInvoice": false},
            width: "",
            height: "",
            weight: "",
            length: "",
            tableRow: [],
            OrderStatus: "processing",
            loading: false,
            open_thumb_model: false,
            selected_order_id: '',
            customizer_vendor: false,
            selected_row: null,
            selected_schedule: null,
            selected_label: null,
            searchText: '',
            filterData: [],
            rowsPerPageOptions: [10, 25, 100],
            total_data_count: 0,
            offset: 0,
            order:'asc',
            orderBy:'orderDate',
            shorting_order:'ASCENDING',

            selectedRow:[]


        }
    }

    componentWillMount() {

        if (this.props.user_details.user && this.props.user_details.user.isVendor === false) {
            this.props.history.push('/');
        }
        if (this.props.user_details.user.customizable === false && this.props.user_details.user.isVendor === true) {
            this.setState({
                customizer_vendor: false
            })
        } else if (this.props.user_details.user.customizable === true && this.props.user_details.user.isVendor === true) {
            this.setState({
                customizer_vendor: true
            })
        }
    }


    componentDidMount() {
        this.setState({
            labelWidth:this.inputLabel && this.inputLabel.current.offsetWidth?this.inputLabel.current.offsetWidth:0
        });
        this.getProcessingDatas();
    }

    getProcessingDatas = () => {
        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };
        fetchQuery(environment, getProcessingData, variables,{force:false})
            .then(data => {
                if (data.ordersBasedOnVendorProcessing !== null && data.ordersBasedOnVendorProcessing.orderData && data.ordersBasedOnVendorProcessing.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorProcessing);

                } else {

                    this.setEmptyState();
                }
            });
    };

    getReadyToShipDatas = () => {
        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getRedayToShipData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnVendorReadyToShip !== null && data.ordersBasedOnVendorReadyToShip.orderData && data.ordersBasedOnVendorReadyToShip.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorReadyToShip);

                } else {
                    this.setEmptyState();
                }
            });
    };
    getPickupScheduleDatas = () => {
        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getPickupSheduledData, variables,{force:false})
            .then(data => {
                if (data.ordersBasedOnVendorPickupScheduled !== null && data.ordersBasedOnVendorPickupScheduled.orderData && data.ordersBasedOnVendorPickupScheduled.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorPickupScheduled);

                } else {
                    this.setEmptyState();
                }
            });
    };



    getPickupOrders = () => {

        this.setState({
            loading: true
        });

        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getPickupOrdersData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnVendorPickup !== null && data.ordersBasedOnVendorPickup.orderData && data.ordersBasedOnVendorPickup.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorPickup);

                } else {

                    this.setEmptyState();
                }
            });

    };

    getReturnedOrders = () => {

        this.setState({
            loading: true
        });

        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getReturnedOrdersData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnVendorReturns !== null && data.ordersBasedOnVendorReturns.orderData && data.ordersBasedOnVendorReturns.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorReturns);

                } else {
                    this.setEmptyState();
                }
            });

    };

    getAllOrders = (pageno) => {
        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getAllOrdersData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnVendorAll !== null && data.ordersBasedOnVendorAll.orderData && data.ordersBasedOnVendorAll.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorAll);

                } else {
                    this.setEmptyState();
                }
            });
    };

    getDeliveredOrders = () => {

        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getAllDeliveredOrdersData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnVendorDelivered !== null && data.ordersBasedOnVendorDelivered.orderData && data.ordersBasedOnVendorDelivered.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorDelivered);

                } else {

                    this.setEmptyState();
                }
            });
    };
    getPrintingOrders = () => {
        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getAllPrintingOrdersData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnPrinting !== null && data.ordersBasedOnPrinting.orderData && data.ordersBasedOnPrinting.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnPrinting);

                } else {

                    this.setEmptyState();
                }
            });
    };
    getExceptionOrders = () => {
        this.setState({
            loading: true
        });
        const variables = {
            end: this.state.page,
            paginationValue: this.state.rowsPerPage,
            sortOrder:this.state.shorting_order
        };

        fetchQuery(environment, getExceptionOrdersData, variables,{force:false})
            .then(data => {

                if (data.ordersBasedOnVendorExceptions !== null && data.ordersBasedOnVendorExceptions.orderData && data.ordersBasedOnVendorExceptions.orderData.length > 0) {

                    this.setTableDatas(data.ordersBasedOnVendorExceptions);

                } else {

                    this.setEmptyState();
                }
            });
    };

    setTableDatas = (response) => {
        
        let rows = [];
        let Tableaction = [];

        let Tabledata = response.orderData;



        if (Tabledata.length > 0) {

            for (let i = 0; i < Tabledata.length; i++) {

                let productDetails = [];
                let productSku = [];
                let quantity = [];
                let shippingStatus;
                let dimensions = {};

                for (let j = 0; j < Tabledata[i].order.vendorLines.length; j++) {
                    productDetails.push({
                        name: Tabledata[i].order.vendorLines[j].productName,
                        isCustomiser: Tabledata[i].lineShipping && Tabledata[i].lineShipping.edges.length > 0 ? Tabledata[i].lineShipping.edges[0].node.vendorProductTypeIsCustomizable : false
                    });
                    productSku.push({
                        sku: Tabledata[i].order.vendorLines[j].productSku,
                    });
                    quantity.push({
                        quantity: Tabledata[i].order.vendorLines[j].quantity,
                    })
                }
                let customerDetails = {
                    name: Tabledata[i].order.shippingAddress.firstName,
                    email: Tabledata[i].order.userEmail,
                    mobile: Tabledata[i].order.shippingAddress.phone
                };

                shippingStatus = Tabledata[i].lineShipping && Tabledata[i].lineShipping.edges.length > 0 ? Tabledata[i].lineShipping.edges[0].node.shippingStatus : "";
                dimensions = Tabledata[i].lineShipping && Tabledata[i].lineShipping.edges.length > 0 ? JSON.parse(Tabledata[i].lineShipping.edges[0].node.dimensions):{"length": 0.0, "width": 0.0, "height": 0.0, "weight": 0.0};
                // Tableaction = this.state.tableAction;
                let approvedDate = Tabledata[i].order.approvedDate?Tabledata[i].order.approvedDate:"--";
                Tableaction.push({                    
                    'createInvoice': false,
                    'length': dimensions.length,
                    'width': dimensions.width,
                    'height': dimensions.height,
                    'weight': dimensions.weight,
                    'order_id': Tabledata[i].order.id,
                    'selected_row': i
                });
                let data = this.createData(Tabledata[i].order.id, this.getFormattedDate(Tabledata[i].order.created), Tabledata[i].order.orderId, productDetails,approvedDate , quantity, productSku,shippingStatus,
                    Tabledata[i].order.myTotal, customerDetails);
                rows.push(data);
                this.setState({
                    loading: false,
                    tableRow: rows,
                    filterData: rows,
                    tableAction: Tableaction,
                    total_data_count: response.totalRecordCount,
                    rowsPerPageOptions: [10, 25, 100],
                },()=>{

                })

            }

        } else {
            this.setState({
                tableAction: [],
                tableRow: [],
                filterData: [],
                rowsPerPageOptions: [],
                page: 1,
                rowsPerPage: 10,
                total_data_count: 0,
                offset: 0
            },()=>{

            })
        }


    };
    setEmptyState = () => {
        this.setState({
            tableAction: [],
            tableRow: [],
            loading: false,
            filterData: [],
            rowsPerPageOptions: [],
            page: 1,
            rowsPerPage: 10,
            total_data_count: 0,
            offset: 0
        })
    };

    getFormattedDate = (date) => {

        let today = new Date(date);

        let date1 = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();

        return date1;
    };

    createData(graphqlOrderId, orderDate, orderId, productDetails,approvedDate, quantity, productSku,shippingStatus, Payment, CustomerDetails, DimensionWeight, action) {
        if (this.state.OrderStatus === "processing" || this.state.OrderStatus === "ready_to_ship") {
            return {
                graphqlOrderId,
                orderDate,
                orderId,
                productDetails,
                approvedDate,
                quantity,
                productSku,
                shippingStatus,
                Payment,
                CustomerDetails,
                DimensionWeight,
                action
            };
        } else {
            return {graphqlOrderId, orderDate, orderId, productDetails,approvedDate, quantity, productSku,shippingStatus, Payment, CustomerDetails};
        }

    }

    AddDimension = (row_data) => {
        let InvoiceBtn = document.getElementById("shipnow_btn_" + row_data.orderId);
        let table_action = this.state.tableAction.slice();
        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });
        if (this.state.tableAction[selected_index].width !== "" && this.state.tableAction[selected_index].length !== "" && this.state.tableAction[selected_index].weight !== "" && this.state.tableAction[selected_index].height !== "") {
            table_action[selected_index].createInvoice = false;
            InvoiceBtn.classList.add("ActiveBtn");
            this.setState({table_action});
        }

    };


    changeDimensions = (event, key, row_data) => {
        this.setState({
            ...this.state, [key]: event.target.value
        });

        let table_action = this.state.tableAction.slice();

        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });
        table_action[selected_index][key] = event.target.value;

    };
    CreateInvoice = (row_data) => {
        let table_action = this.state.tableAction.slice();
        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });

        this.updateOrderLine(selected_index);

    };

    openThumbnailsModel = (row_data) => {
        this.setState({
            open_thumb_model: true,
            selected_order_id: row_data.graphqlOrderId
        })
    };

    CloseThumbnailsModel = () => {
        this.setState({
            open_thumb_model: false,
            selected_order_id: ''
        })
    };

    getInvoice = (row_data) => {

        let table_action = this.state.tableAction.slice();
        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });

        this.setState({
            selected_row: selected_index
        });

        let scope = this;
        CreateCreateInvoiceMutation([this.state.tableAction[selected_index].order_id], function (response) {

            if (response.createInvoice !== null) {

                setTimeout(
                    function () {
                        scope.setState({selected_row: null});
                    },
                    6000
                );

                window.open(
                    response.createInvoice.invoice[0].invoiceUrl,
                    '_blank' // <- This is what makes it open in a new window.
                );

                if (scope.state.OrderStatus === "processing") {
                    scope.getProcessingDatas();
                } else if (scope.state.OrderStatus === "ready_to_ship") {
                    scope.getReadyToShipDatas();
                }


            }

        }, function (err) {
            scope.setState({selected_row: null});
            cogoToast.error(err, {position: 'top-center'});

        });


    };

    getManifest = (row_data) => {
        let scope = this;
        let table_action = this.state.tableAction.slice();
        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });
        this.setState({
            selected_label: selected_index
        });
        CreateManifestMutation(this.state.tableAction[selected_index].order_id, function (response) {

            if (response.createManifest !== null) {

                setTimeout(
                    function () {
                        scope.setState({selected_label: null});
                    },
                    6000
                );


                if (scope.state.OrderStatus === "pickup_schedule") {

                    window.open(response.createManifest.invoices.manifestUrl, '_blank');
                    scope.getPickupScheduleDatas();

                } else {
                    window.open(response.createManifest.invoices.labelUrl, '_blank');
                    scope.getReadyToShipDatas();
                }


            }

        }, function (err) {
            // alert(err);
            scope.setState({selected_label: null});
            cogoToast.error(err, {position: 'top-center'});

        });
    };

    createSchedulePickup = (row_data) => {

        let scope = this;
        let table_action = this.state.tableAction.slice();
        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });
        this.setState({
            selected_schedule: selected_index
        });

        CreateSchedulePickupMutation(this.state.tableAction[selected_index].order_id, function (response) {

            if (response.createSchedulePickup !== null) {

                setTimeout(
                    function () {
                        scope.setState({selected_schedule: null});
                    },
                    6000
                );
                scope.getReadyToShipDatas();
            }

        }, function (err) {
            // alert(err);
            scope.setState({selected_schedule: null});
            cogoToast.error(err, {position: 'top-center'});

        });

    };

    updateOrderLine = (index) => {
        let table_action = this.state.tableAction.slice();
        table_action[index].createInvoice = true;
        this.setState({table_action});
        let variables = {
            orderId: this.state.tableAction[index].order_id,
            dimensions: {
                length: parseFloat(this.state.tableAction[index].length),
                breadth: parseFloat(this.state.tableAction[index].width),
                height: parseFloat(this.state.tableAction[index].height),
                weight: parseFloat(this.state.tableAction[index].weight)
            }
        };
        let scope = this;


        CreateVendorUpdateOrderLinesMutation(variables, function (response) {

            if (response.updateOrderLines !== null) {

                setTimeout(
                    function () {
                        table_action[index].createInvoice = false;
                        scope.setState({
                            table_action
                        }, () => {
                            if (scope.state.OrderStatus === "processing") {
                                scope.getProcessingDatas();
                            } else if (scope.state.OrderStatus === "printing_orders") {
                                scope.getPrintingOrders();
                            }

                        });
                    },
                    2000
                );


            }

        }, function (err) {
            // alert(err);
            table_action[index].createInvoice = false;
            scope.setState({table_action});
            cogoToast.error(err, {position: 'top-center'});

        });


    };
    setFilterStatus = (orderStatus) =>{
        this.setState({
            searchText:"",
            page:1,
            rowsPerPage: 10,
            offset: 0
        },()=>{
            this.FilterOrder(orderStatus);
        });
    };

    FilterOrder(orderStatus) {
        this.setState({
            OrderStatus: orderStatus,
        });
        if (orderStatus === "processing") {
            this.getProcessingDatas();
        } else if (orderStatus === "ready_to_ship") {
            this.getReadyToShipDatas();
        }else if (orderStatus === "pickup_schedule") {
            this.getPickupScheduleDatas();
        } else if (orderStatus === "shipped") {
            this.getPickupOrders();
        } else if (orderStatus === "returned") {
            this.getReturnedOrders();
        } else if (orderStatus === "all_order") {
            this.getAllOrders(0);
        } else if (orderStatus === "delivered") {
            this.getDeliveredOrders();
        } else if (orderStatus === "printing_orders") {
            this.getPrintingOrders();
        } else if(orderStatus === "exception_orders"){
            this.getExceptionOrders();
        }
    }

    handleSearchTextChanges = (event) =>{
        this.setState({
            searchText : event.target.value,
            OrderStatus:""
        },()=>{
            if(this.state.searchText === ""){
                this.setState({
                    OrderStatus:"processing"
                },()=>{
                    this.getProcessingDatas();
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
                loading:true
            });

            fetchQuery(environment, getSearchWithOrderId, variables,{force:false})
                .then(data => {

                    if(data.searchWithOrderIdVendor !== null && data.searchWithOrderIdVendor.length > 0){
                        let data_formate = {
                            pageRange:1,
                            totalRecordCount:1,
                            orderData:data.searchWithOrderIdVendor
                        };

                        if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 && (this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PROCESSING") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("APPROVED"))){
                            this.setState({
                                OrderStatus:"processing"
                            })
                        } else if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 &&  this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PRINTING")){
                            this.setState({
                                OrderStatus:"printing_orders"
                            })
                        } else if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 &&  (this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("READY_TO_SHIP") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("AWB_ASSIGNED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("LABEL_GENERATED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("NEW"))){
                            this.setState({
                                OrderStatus:"ready_to_ship"
                            })
                        }else if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 && (this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PICKUP_SCHEDULED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PICKUP_GENERATED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PICKUP_QUEUED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("MANIFEST_GENERATED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("OUT_FOR_PICKUP") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PICKUP_RESCHEDULED"))){
                            this.setState({
                                OrderStatus:"pickup_schedule"
                            })
                        } else if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 && (this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("SHIPPED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("OUT_FOR_DELIVERY") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("IN_TRANSIT"))){
                            this.setState({
                                OrderStatus:"shipped"
                            })
                        } else  if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 && (this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("CANCELLED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("RETURNS") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("RTO_INITIATED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("RTO_DELIVERED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("RTO_ACKNOWLEDGED"))){
                            this.setState({
                                OrderStatus:"returned"
                            })
                        }else  if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 && this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("DELIVERED")){
                            this.setState({
                                OrderStatus:"delivered"
                            })
                        } else if(data.searchWithOrderIdVendor[0].lineShipping.edges.length > 0 && (this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("EXCEPTION") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("LOST") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PICKUP_ERROR") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("CANCELLATION_REQUESTED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("PICKUP_EXCEPTION") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("UNDELIVERED") ||
                            this.convertStringToLowecase(data.searchWithOrderIdVendor[0].lineShipping.edges[0].node.shippingStatus) === this.convertStringToLowecase("DELAYED"))){
                            this.setState({
                                OrderStatus:"exception_orders"
                            })
                        }

                        this.setTableDatas(data_formate);
                    } else {
                        this.setEmptyState();
                    }
                });
        }
    };

    convertStringToLowecase = (string) => {
        return string.toLowerCase();
    };

    includesStr(values, str) {
        return values.map(function (value) {
            return String(value);
        }).find(function (value) {
            return value.includes(str);
        });
    };

    getValues = (row_data, key) => {
        let table_action = this.state.tableAction.slice();
        let selected_index = table_action.findIndex(function (data) {
            return data.order_id === row_data.graphqlOrderId;
        });

        return table_action[selected_index][key];
    };

    handleRowsPerPageChange = event => {

        this.setState({
            rowsPerPage: event.target.value,
            page: 1,
            offset: 0,
            searchText:"",
        }, () => {
            this.FilterOrder(this.state.OrderStatus);
        })
    };

    handlePaginationClick = (offset, page) => {
        this.setState({
            offset: offset,
            page: page,
            searchText:"",
        }, () => {
            this.FilterOrder(this.state.OrderStatus);
        });
    };
    createSortHandler = property => event => {
        this.handleRequestSort(event, property);
    };
    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order:isAsc ? 'desc' : 'asc',
            orderBy:property,
            shorting_order: isAsc ? 'DESCENDING' : 'ASCENDING'
        },()=>{
            this.FilterOrder(this.state.OrderStatus);
        });

    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = this.state.filterData.map((n) => n.graphqlOrderId);

          this.setState({
              selectedRow:newSelecteds
          });

          return;
        }
        this.setState({
            selectedRow:[]
        });
      };

      selectRow = (event, id) => {
        let selected = this.state.selectedRow;

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        this.setState({
            selectedRow:newSelected
        });

      }
      DownloadBulkDesigns = () => {
        this.setState({
            loading: true
        });
        const variables = {
            orderId: this.state.selectedRow,           
        };
        fetchQuery(environment, downloadBulkDesign, variables,{force:false})
            .then(data => {

                this.setState({
                    loading: false
                });

                let pdfs = [];
                
                if (data.pdfBulkDownload !== null &&  data.pdfBulkDownload.length > 0) {

                    data.pdfBulkDownload.map((item,index)=>{
                        let pdf_link = JSON.parse(item.pdf);
                        Object.keys(pdf_link).map(function(key) {
                            if(pdf_link[key] !== "Not Available"){
                                pdfs.push(pdf_link[key]);
                            }                            
                        });  
                    });   
                    
                    if(pdfs.length > 0){
                       pdfs.map((pdf_item,index) => {
                           var filename = pdf_item.split('/').pop();
                            this.downloadFile(pdf_item,filename);   
                       });
                       
                    } else {
                        cogoToast.error("No PDF available", {position: 'top-center'});
                    }

                } else {
                    cogoToast.error("No PDF available", {position: 'top-center'});
                    
                }
            });

      }
      DownloadBulkInvoice = () => {
        this.setState({
            loading: true
        });

        let scope = this;
        
        CreateCreateInvoiceMutation(this.state.selectedRow, function (response) {

            scope.setState({
                loading: false
            });

            if (response.createInvoice !== null && response.createInvoice.invoice &&  response.createInvoice.invoice.length > 0) {                
                response.createInvoice.invoice.map((pdf_item,index) => {
                    var filename = pdf_item.invoiceUrl.split('/').pop();
                    scope.downloadFile(pdf_item.invoiceUrl,filename);   
                });
            } else {
                cogoToast.error("No PDF available", {position: 'top-center'});
            }

        }, function (err) {
            scope.setState({
                loading: false
            });
            cogoToast.error(err, {position: 'top-center'});

        });       

      }
      downloadFile = (fileUrl, fileName) => {
          
        //   fileUrl ="https://cdn.classmateshop.co.in/media/customizer/c94f5281-b0ba-4d89-b0b3-20569e809294/order_10000000097-1.pdf";
         var oReq = new XMLHttpRequest();
        // The Endpoint of your server 
        var URLToPDF = fileUrl;
        

        // https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf
        // Configure XMLHttpRequest
        oReq.open("GET", URLToPDF, true);
        
        // Important to use the blob response type
        oReq.responseType = "blob";
        
        // When the file request finishes
        // Is up to you, the configuration for error events etc.
        oReq.onload = function() {
            // Once the file is downloaded, open a new window with the PDF
            // Remember to allow the POP-UPS in your browser
            var file = new Blob([oReq.response], { 
                type: 'application/pdf' 
            });
            
            // Generate file download directly in the browser !
            FileSaver.saveAs(file, fileName);
        };
        
        oReq.send();
      }
    render() {
        let columns = [];
        if (this.state.OrderStatus === "printing_orders") {
            columns = [
                {id: 'checkbox', label: ''},
                {id: 'orderDate', label: 'ORDER DATE',minWidth: '12rem'},
                {id: 'orderId', label: 'ORDER ID',minWidth: '11rem'},
                {id: 'productDetails', label: 'PRODUCT DETAILS',minWidth: '25rem'},
                {id: 'approvedDate', label: 'APPROVED DATE',minWidth: '12rem'},
                {id: 'quantity', label: 'QUANTITY',minWidth: '11rem'},
                {id: 'productSku', label: 'PRODUCT SKU',minWidth: '11rem'},
                {id: 'shippingStatus', label: 'SHIPPING STATUS',minWidth: '12rem'},
                {id: 'Payment', label: 'PAYMENT',minWidth: '11rem'},
                {id: 'CustomerDetails',label: 'CUSTOMER DETAILS',minWidth: '11rem'},
                {id: 'DimensionWeight', label: 'DIMENSION & WEIGHT',minWidth: '18rem'},
                {id: 'action', label: 'ACTION',minWidth: '11rem'}
            ]
        } else if (this.state.OrderStatus === "processing") {
            if (this.state.customizer_vendor === false) {
                columns = [ 
                    {id: 'checkbox', label: ''},                   
                    {id: 'orderDate', label: 'ORDER DATE',minWidth: '12rem'},
                    {id: 'orderId', label: 'ORDER ID',minWidth: '11rem'},
                    {id: 'productDetails', label: 'PRODUCT DETAILS',minWidth: '25rem'},
                    {id: 'approvedDate', label: 'APPROVED DATE',minWidth: '12rem'},
                    {id: 'quantity', label: 'QUANTITY',minWidth: '11rem'},
                    {id: 'productSku', label: 'PRODUCT SKU',minWidth: '11rem'},
                    {id: 'shippingStatus', label: 'SHIPPING STATUS',minWidth: '12rem'},
                    {id: 'Payment', label: 'PAYMENT',minWidth: '11rem'},
                    {id: 'CustomerDetails', label: 'CUSTOMER DETAILS',minWidth: '11rem'},
                    {id: 'DimensionWeight', label: 'DIMENSION & WEIGHT',minWidth: '18rem'},
                    {id: 'action', label: 'ACTION',minWidth: '11rem'}
                ]

            } else if (this.state.customizer_vendor === true) {
                columns = [
                    {id: 'checkbox', label: ''},
                    {id: 'orderDate', label: 'ORDER DATE',minWidth: '12rem'},
                    {id: 'orderId', label: 'ORDER ID',minWidth: '11rem'},
                    {id: 'productDetails',label: 'PRODUCT DETAILS',minWidth: '25rem'},
                    {id: 'approvedDate', label: 'APPROVED DATE',minWidth: '12rem'},
                    {id: 'quantity', label: 'QUANTITY',minWidth: '11rem'},
                    {id: 'productSku', label: 'PRODUCT SKU',minWidth: '11rem'},
                    {id: 'shippingStatus', label: 'SHIPPING STATUS',minWidth: '12rem'},
                    {id: 'Payment', label: 'PAYMENT',minWidth: '11rem'},
                    {id: 'CustomerDetails',label: 'CUSTOMER DETAILS',minWidth: '11rem'},
                    {id: 'action', label: 'ACTION',minWidth: '11rem'}
                ]
            }

        } else if (this.state.OrderStatus === "ready_to_ship" || this.state.OrderStatus === "pickup_schedule") {
            columns = [
                {id: 'checkbox', label: ''}, 
                {id: 'orderDate', label: 'ORDER DATE',minWidth: '12rem'},
                {id: 'orderId', label: 'ORDER ID',minWidth: '11rem'},
                {id: 'productDetails',label: 'PRODUCT DETAILS',minWidth: '25rem'},
                {id: 'approvedDate', label: 'APPROVED DATE',minWidth: '12rem'},
                {id: 'quantity', label: 'QUANTITY',minWidth: '11rem'},
                {id: 'productSku', label: 'PRODUCT SKU',minWidth: '11rem'},
                {id: 'shippingStatus', label: 'SHIPPING STATUS',minWidth: '12rem'},
                {id: 'Payment', label: 'PAYMENT',minWidth: '11rem'},
                {id: 'CustomerDetails',label: 'CUSTOMER DETAILS',minWidth: '11rem'},
                {id: 'action', label: 'ACTION',minWidth: '11rem'}
            ]
        } else {
            columns = [
                {id: 'orderDate', label: 'ORDER DATE',minWidth: '12rem'},
                {id: 'orderId', label: 'ORDER ID',minWidth: '11rem'},
                {id: 'productDetails',label: 'PRODUCT DETAILS',minWidth: '25rem'},
                {id: 'approvedDate', label: 'APPROVED DATE',minWidth: '12rem'},
                {id: 'quantity', label: 'QUANTITY',minWidth: '11rem'},
                {id: 'productSku', label: 'PRODUCT SKU',minWidth: '11rem'},
                {id: 'shippingStatus', label: 'SHIPPING STATUS',minWidth: '12rem'},
                {id: 'Payment', label: 'PAYMENT',minWidth: '11rem'},
                {id: 'CustomerDetails',label: 'CUSTOMER DETAILS',minWidth: '11rem'}
            ]
        }

        let filter_data = this.state.filterData;

        const isSelected = (id) => this.state.selectedRow.indexOf(id) !== -1;


        return (
            <div>
                <CheckoutNavBar
                    handleSearchTextChanges={this.handleSearchTextChanges}
                    handleSearch={this.handleSearch}
                    searchText ={this.state.searchText}
                />
                <LoadingScreen
                    loading={this.state.loading}
                    bgColor='#ffffffbf'
                    spinnerColor='#000'
                    textColor='#676767'
                    logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                    text='Loading'
                >
                    <Container maxWidth={"xl"} className="table_container">
                        <div className="DashboardTablePage">
                            <span style={{display: 'flex',alignItems: 'center',flexWrap:'wrap'}}>
                                <Typography variant="h6" className="DashboardTitle">Order History</Typography>
                                <button
                                    className={this.state.OrderStatus === "processing" ? "filterButton ActiveFilter" : "filterButton"}
                                    onClick={() => {
                                        this.setFilterStatus("processing")
                                    }}>
                                    PROCESSING
                                </button>
                                {
                                    this.state.customizer_vendor === true &&
                                    <button
                                        className={this.state.OrderStatus === "printing_orders" ? "filterButton ActiveFilter" : "filterButton"}
                                        onClick={() => {
                                            this.setFilterStatus("printing_orders")
                                        }}>
                                        PRINTING ORDERS
                                    </button>
                                }
                                <button
                                    className={this.state.OrderStatus === "ready_to_ship" ? "filterButton ActiveFilter" : "filterButton"}
                                    onClick={() => {
                                        this.setFilterStatus("ready_to_ship")
                                    }}>
                                    READY TO SHIP
                                </button>
                                 <button
                                     className={this.state.OrderStatus === "pickup_schedule" ? "filterButton ActiveFilter" : "filterButton"}
                                     onClick={() => {
                                         this.setFilterStatus("pickup_schedule")
                                     }}>
                                     PICKUP SCHEDULED
                                </button>
                                <button
                                    className={this.state.OrderStatus === "shipped" ? "filterButton ActiveFilter" : "filterButton"}
                                    onClick={() => {
                                        this.setFilterStatus("shipped")
                                    }}>
                                    SHIPPED
                                </button>
                                <button
                                    className={this.state.OrderStatus === "returned" ? "filterButton ActiveFilter" : "filterButton"}
                                    onClick={() => {
                                        this.setFilterStatus("returned")
                                    }}>
                                    RETURNS
                                </button>
                                <button
                                    className={this.state.OrderStatus === "delivered" ? "filterButton ActiveFilter" : "filterButton"}
                                    onClick={() => {
                                        this.setFilterStatus("delivered")
                                    }}>
                                    DELIVERED
                                </button>
                                <button
                                    className={this.state.OrderStatus === "all_order" ? "filterButton ActiveFilter" : "filterButton"}
                                    onClick={() => {
                                        this.setFilterStatus("all_order")
                                    }}>
                                    ALL ORDERS
                                </button>
                                 <button
                                     className={this.state.OrderStatus === "exception_orders" ? "filterButton ActiveFilter" : "filterButton"}
                                     onClick={() => {
                                         this.setFilterStatus("exception_orders")
                                     }}>
                                    EXCEPTION
                                </button>
                            </span>
                            {
                                this.state.selectedRow.length > 0 && 
                                <div className="bulk-download-btn-section">
                                    {
                                         this.state.customizer_vendor === true && 
                                         <button type="button" onClick={this.DownloadBulkDesigns}>Download Bulk Designs</button>
                                    }
                                  
                                    <button type="button" onClick={this.DownloadBulkInvoice}>Download Bulk Invoices</button>
                                </div>
                            }


                          



                            
                            <Paper>
                                <div className="tableWrapper">
                                    <Table>
                                        <TableHead>
                                            <TableRow>                                            
                                                {columns.map((column,column_index) => {
                                                    return(
                                                        <>
                                                        {
                                                            column.id === "checkbox" ? (
                                                                <TableCell padding="checkbox" className="head">
                                                                    <Checkbox
                                                                        indeterminate={this.state.selectedRow.length > 0 && this.state.selectedRow.length < filter_data.length}
                                                                        checked={filter_data.length > 0 && this.state.selectedRow.length  === filter_data.length }
                                                                        onChange={this.handleSelectAllClick}
                                                                        inputProps={{ 'aria-label': 'select all desserts' }}
                                                                    />
                                                                </TableCell>
                                                            ):(
                                                                <TableCell
                                                                className="head"
                                                                key={column.id}
                                                                style={{ minWidth: column.minWidth }}
                                                            >
                                                                {
                                                                    column.id === "orderDate" ? (
                                                                        <TableSortLabel
                                                                            active={this.state.orderBy === column.id}
                                                                            direction={this.state.orderBy === column.id ? this.state.order : 'asc'}
                                                                            onClick={this.createSortHandler(column.id)}
                                                                            className="shorting_head"
                                                                        >
                                                                            {column.label}
                                                                            {this.state.orderBy === column.id ? (
                                                                                <span className="visuallyHidden">
                                                                                  {this.state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                                                </span>
                                                                            ) : null}
                                                                        </TableSortLabel>
                                                                    ): column.label
                                                                }
                                                            </TableCell>
                                                            )
                                                        }                                                            
                                                        </>
                                                    )
                                                })}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>                                            
                                            {filter_data.map((row, index) => {

                                                const isItemSelected = isSelected(row.graphqlOrderId);
                                                const labelId = `enhanced-table-checkbox-${index}`;


                                                return <TableRow 
                                                            hover 
                                                            role="checkbox" 
                                                            tabIndex={-1} 
                                                            key={index}
                                                           >
                                                    {columns.map(column => {
                                                        const value = row[column.id];
                                                        {
                                                            if (column.id === "DimensionWeight" && this.state.OrderStatus === "printing_orders" || column.id === "DimensionWeight" && this.state.OrderStatus === "processing" && this.state.customizer_vendor === false) {
                                                                return <TableCell key={column.id} align={column.align}
                                                                                  style={{
                                                                                      textAlign: 'left',
                                                                                      minWidth: '180px'
                                                                                  }}>
                                                                    <div className="vendor_dimensions_section">
                                                                        <div>
                                                                            <label>L:</label>
                                                                            <input type="number" className="Dimensions"
                                                                                   onChange={(event) => {
                                                                                       this.changeDimensions(event, "length", row)
                                                                                   }}
                                                                                   placeholder="L"
                                                                                   value={this.getValues(row, "length")} />
                                                                        </div>
                                                                        <div>
                                                                            <label>W:</label>
                                                                            <input type="number" className="Dimensions"
                                                                                   onChange={(event) => {
                                                                                       this.changeDimensions(event, "width", row)
                                                                                   }}
                                                                                   placeholder="W"
                                                                                   value={this.getValues(row, "width")}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                    <br/>
                                                                    <div className="vendor_dimensions_section">
                                                                        <div>
                                                                            <label>H:</label>
                                                                            <input type="number" className="Dimensions"
                                                                                   onChange={(event) => {
                                                                                       this.changeDimensions(event, "height", row)
                                                                                   }}
                                                                                   value={this.getValues(row, "height")}
                                                                                   placeholder="h" />
                                                                        </div>
                                                                        <div>
                                                                            <label>Wt:</label>
                                                                            <input type="number" className="Dimensions"
                                                                                   onChange={(event) => {
                                                                                       this.changeDimensions(event, "weight", row)
                                                                                   }}
                                                                                   placeholder="Wt"
                                                                                   value={this.getValues(row, "weight")} />
                                                                        </div>

                                                                        {/*<FormControlLabel*/}
                                                                        {/*    control={*/}
                                                                        {/*        <button className="checkbtn"*/}
                                                                        {/*                onClick={(event) => {*/}
                                                                        {/*                    this.AddDimension(row)*/}
                                                                        {/*                }}><i*/}
                                                                        {/*            className="ri-check-line"/></button>*/}
                                                                        {/*    }*/}
                                                                        {/*/>*/}
                                                                    </div>

                                                                </TableCell>
                                                            } else if (column.id === "action") {
                                                                return <TableCell
                                                                    // style={{minWidth: '180px'}}
                                                                                  key={column.id}>

                                                                    {

                                                                        this.state.OrderStatus === "processing" || this.state.OrderStatus === "ready_to_ship" || this.state.OrderStatus === "pickup_schedule" || this.state.OrderStatus === "printing_orders" ?
                                                                            (<div>

                                                                                    {this.state.OrderStatus === "processing" && (
                                                                                        <>
                                                                                            {
                                                                                                this.state.customizer_vendor === true && (
                                                                                                    <>
                                                                                                        <button
                                                                                                            className="downloadInvoice"
                                                                                                            id={"downloadInvoice" + row.orderId}
                                                                                                            onClick={() => this.getInvoice(row)}
                                                                                                            disabled={this.getValues(row, "selected_row") === this.state.selected_row}>
                                                                                                            <img
                                                                                                                src={DownloadIcon}
                                                                                                                style={{padding: "0px 2px"}}/>
                                                                                                            INVOICE
                                                                                                        </button>
                                                                                                        {

                                                                                                            row.productDetails[0].isCustomiser === true ? (
                                                                                                                <button
                                                                                                                    className="download_pdf"
                                                                                                                    id={"design_pdf_btn" + row.orderId}
                                                                                                                    onClick={() => {
                                                                                                                        this.openThumbnailsModel(row)
                                                                                                                    }}
                                                                                                                >Design
                                                                                                                </button>
                                                                                                            ) : null
                                                                                                        }

                                                                                                    </>
                                                                                                )

                                                                                            }
                                                                                            {
                                                                                                this.state.customizer_vendor === false && (
                                                                                                    <>
                                                                                                        <button
                                                                                                            className="invoiceBtn"
                                                                                                            id={"shipnow_btn_" + row.orderId}
                                                                                                            onClick={(event) => {
                                                                                                                this.CreateInvoice(row)
                                                                                                            }}
                                                                                                            disabled={this.getValues(row, "createInvoice")}>SHIP
                                                                                                            NOW
                                                                                                        </button>
                                                                                                        <button
                                                                                                            className="downloadInvoice"
                                                                                                            id={"downloadInvoice" + row.orderId}
                                                                                                            onClick={() => this.getInvoice(row)}
                                                                                                            style={{
                                                                                                                marginLeft: 0,
                                                                                                                marginRight: 0
                                                                                                            }}
                                                                                                            disabled={this.getValues(row, "selected_row") === this.state.selected_row}>
                                                                                                            <img
                                                                                                                src={DownloadIcon}
                                                                                                                style={{padding: "0px 2px"}}/>
                                                                                                            INVOICE
                                                                                                        </button>

                                                                                                    </>
                                                                                                )

                                                                                            }
                                                                                        </>


                                                                                    )}
                                                                                    {this.state.OrderStatus === "printing_orders" && (
                                                                                        <>

                                                                                            <button
                                                                                                className="invoiceBtn"
                                                                                                id={"shipnow_btn_" + row.orderId}
                                                                                                onClick={() => {
                                                                                                    this.CreateInvoice(row)
                                                                                                }}
                                                                                                disabled={this.getValues(row, "createInvoice")}>SHIP
                                                                                                NOW
                                                                                            </button>


                                                                                            {
                                                                                                row.productDetails[0].isCustomiser === true ? (
                                                                                                    <button
                                                                                                        className="download_pdf"
                                                                                                        id={"invoiceBtn" + row.orderId}
                                                                                                        onClick={() => {
                                                                                                            this.openThumbnailsModel(row)
                                                                                                        }}
                                                                                                    >Design
                                                                                                    </button>
                                                                                                ) : null
                                                                                            }

                                                                                        </>


                                                                                    )}
                                                                                    {
                                                                                        this.state.OrderStatus === "ready_to_ship" && (
                                                                                            <>
                                                                                                <button
                                                                                                    className="downloadInvoice"
                                                                                                    id={"downloadInvoice" + row.orderId}
                                                                                                    onClick={() => this.getInvoice(row)}
                                                                                                    disabled={this.getValues(row, "selected_row") === this.state.selected_row}>
                                                                                                    <img
                                                                                                        src={DownloadIcon}
                                                                                                        style={{padding: "0px 2px"}}/>
                                                                                                    INVOICE
                                                                                                </button>

                                                                                                <button
                                                                                                    className="downloadLabel"
                                                                                                    id={"downloadLabel" + row.orderId}
                                                                                                    onClick={() => this.getManifest(row)}
                                                                                                    disabled={this.getValues(row, "selected_row") === this.state.selected_label}
                                                                                                >
                                                                                                    <img
                                                                                                        src={DownloadIcon}
                                                                                                        style={{padding: "0px 2px"}}/>
                                                                                                    LABEL
                                                                                                </button>
                                                                                                <br/>
                                                                                                <button
                                                                                                    className="scheduleBtn"
                                                                                                    id={"scheduleBtn" + row.orderId}

                                                                                                    onClick={() => this.createSchedulePickup(row)}
                                                                                                    disabled={this.getValues(row, "selected_row") === this.state.selected_schedule}
                                                                                                >
                                                                                                    SCHEDULE PICKUP
                                                                                                </button>
                                                                                                {
                                                                                                    row.productDetails[0].isCustomiser === true ? (
                                                                                                        <button
                                                                                                            className="scheduleBtn"
                                                                                                            id={"scheduleBtn" + row.orderId}
                                                                                                            onClick={(event) => {
                                                                                                                this.openThumbnailsModel(row)
                                                                                                            }}

                                                                                                        >
                                                                                                            Design
                                                                                                        </button>
                                                                                                    ) : null
                                                                                                }
                                                                                            </>
                                                                                        )}
                                                                                    {
                                                                                        this.state.OrderStatus === "pickup_schedule" && (
                                                                                            <>
                                                                                                <button
                                                                                                    className="downloadLabel"
                                                                                                    id={"downloadLabel" + row.orderId}
                                                                                                    onClick={() => this.getManifest(row)}
                                                                                                    disabled={this.getValues(row, "selected_row") === this.state.selected_label}
                                                                                                >
                                                                                                    <img
                                                                                                        src={DownloadIcon}
                                                                                                        style={{padding: "0px 2px"}}/>
                                                                                                    MANIFEST
                                                                                                </button>
                                                                                                <br/>
                                                                                            </>
                                                                                        )}
                                                                                </div>
                                                                            ) : null


                                                                    }
                                                                </TableCell>
                                                            }
                                                            else if (column.id === "productDetails") {

                                                                return <TableCell key={column.id}
                                                                                  // style={{
                                                                                  //     textAlign: 'left',
                                                                                  //     minWidth: '250px'
                                                                                  // }}
                                                                                  className="tableCell">
                                                                                    {
                                                                                        value.map((item, index) => {
                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    {item.name}<br/><br/>
                                                                                                </div>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                </TableCell>
                                                            } else if (column.id === "quantity") {
                                                                return <TableCell key={column.id}
                                                                                  // style={{
                                                                                  //     textAlign: 'left',
                                                                                  //     minWidth: '130px'
                                                                                  // }}
                                                                                  className="tableCell">
                                                                                    {
                                                                                        value.map((item, index) => {
                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    {item.quantity}<br/><br/>
                                                                                                </div>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                </TableCell>
                                                            } else if (column.id === "productSku") {
                                                                return <TableCell key={column.id}
                                                                                  // style={{
                                                                                  //     textAlign: 'left',
                                                                                  //     minWidth: '130px'
                                                                                  // }}
                                                                                  className="tableCell">
                                                                                    {
                                                                                        value.map((item, index) => {
                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    {item.sku}<br/><br/>
                                                                                                </div>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                </TableCell>
                                                            } else if (column.id === "CustomerDetails") {

                                                                return <TableCell key={column.id}
                                                                                  // style={{
                                                                                  //     textAlign: 'left',
                                                                                  //     minWidth: '130px'
                                                                                  // }}
                                                                                  className="tableCell">
                                                                                    {value.name}<br/>
                                                                                    {value.email} <br/>
                                                                                    {value.mobile} <br/>
                                                                </TableCell>
                                                            } else if(column.id === "checkbox"){

                                                                return  <TableCell padding="checkbox">
                                                                            <Checkbox
                                                                            checked={isItemSelected}
                                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                                            onClick={(event) => this.selectRow(event, row.graphqlOrderId)}
                                                                            />
                                                                        </TableCell> 

                                                            }

                                                            return <TableCell key={column.id}
                                                                              // style={{
                                                                              //     textAlign: 'left',
                                                                              //     minWidth: '130px'
                                                                              // }}
                                                                              className="tableCell">
                                                                {value}
                                                            </TableCell>
                                                        }
                                                    })}
                                                </TableRow>;
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                                {
                                    this.state.open_thumb_model === true ? <OrderTrackingDialog
                                        handleClose={this.CloseThumbnailsModel}
                                        open={this.state.open_thumb_model}
                                        title="Designs"
                                        width="lg"
                                        fullWidth={true}

                                    >
                                        <ThumbnailTable orderId={this.state.selected_order_id}/>

                                    </OrderTrackingDialog> : null
                                }
                                {
                                    this.state.filterData.length > 0 && (
                                        <div className="admin_table_footer">
                                            <h4>Total Records: {this.state.total_data_count}</h4>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                                <div className="admin_table_pagination_menu">
                                                    <FormControl className="admin_table_select_menu">
                                                        <InputLabel id="demo-simple-select-label">Rows Per Page</InputLabel>
                                                        <Select
                                                            labelid="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.rowsPerPage}
                                                            onChange={this.handleRowsPerPageChange}
                                                        >
                                                            {
                                                                this.state.rowsPerPageOptions.map((item, index) => {
                                                                    return (
                                                                        <MenuItem value={item} key={index}>{item}</MenuItem>
                                                                    );
                                                                })
                                                            }

                                                        </Select>
                                                    </FormControl>

                                                </div>
                                                <MuiThemeProvider theme={theme} >
                                                    <CssBaseline/>
                                                    <Pagination
                                                        limit={this.state.rowsPerPage}
                                                        offset={this.state.offset}
                                                        total={this.state.total_data_count}
                                                        onClick={(e, offset, page) => this.handlePaginationClick(offset, page)}
                                                        previousPageLabel={<ChevronLeftIcon/>}
                                                        nextPageLabel={<ChevronRightIcon/>}
                                                        size={'large'}
                                                    />
                                                </MuiThemeProvider>
                                            </div>
                                        </div>
                                    )
                                }
                            </Paper>
                        </div>
                    </Container>
                </LoadingScreen>
            </div>)
    }
}


const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details
});


export default connect(mapStateToProps)(VendorDashboard);
