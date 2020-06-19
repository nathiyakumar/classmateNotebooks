import React from "react";
import './AdminDashboardOrders.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import OrderTrackingDialog from "../../MyOrdersPage/OrderTrackingDialog";
import SingleOrder from "./SingleOrder";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const theme = createMuiTheme();


class AdminDashboardTable extends React.Component{



    constructor(props){
        super(props);
        this.inputLabel = null;
        this.state = {
            open:false,
            selected_order_id:'',
            order_id:'',
            selected_shipping_id:'',
            selected_vendor:'',
            labelWidth:0,
            order:'asc',
            orderBy:'order_date',
            selected_vendor_id:'',
        }
    }

    componentDidMount(){
        this.setState({
            labelWidth:this.inputLabel && this.inputLabel.current.offsetWidth?this.inputLabel.current.offsetWidth:0
        })
    }


    handleClickOpen = (item) => {
        this.setState({
            open:true,
            selected_order_id:item.id,
            order_id:item.order_id,
            selected_shipping_id:item.shipping_id,
            selected_vendor:item.vendor_details[0],
            selected_vendor_id:item.vendor_details[1],
        })
    };
    handleClose = () => {
        this.setState({
            open:false
        })
    };

    completeAction = () => {
        this.setState({
            open:false
        },() => {

            if(this.props.activeStatus === "waiting_for_approval"){
                this.props.getWaitingForApprovalOrders();
            } else if(this.props.activeStatus === "approved"){
                this.props.getApprovedOrders();
            }else if(this.props.activeStatus === "disapproved"){
                this.props.getDisApprovedOrders();
            }else if(this.props.activeStatus === "payment_pending"){
                this.props.getAllPaymentPendingOrders();
            }else if(this.props.activeStatus === "allorders"){
                this.props.getAllOrders();
            }else if(this.props.activeStatus === "processing"){
                this.props.getProcessingOrders();
            }else if(this.props.activeStatus === "ready_to_ship"){
                this.props.getReadyToShipOrders();
            }else if(this.props.activeStatus === "pickup_schedule"){
                this.props.getPickupScheduleDatas();
            }else if(this.props.activeStatus === "shipped"){
                this.props.getShippedOrders();
            }else if(this.props.activeStatus === "returned"){
                this.props.getReturnedOrders();
            }else if(this.props.activeStatus === "delivered"){
                this.props.getDeliveredOrders();
            }else if(this.props.activeStatus === "all_orders_basedon_shipping"){
                this.props.getAllOrdersBasedonShippingOrders();
            }else if(this.props.activeStatus === "exception_orders"){
                this.props.getExceptionOrders();
            }

        })
    };
    createSortHandler = property => event => {
        this.handleRequestSort(event, property);
    };
     handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order:isAsc ? 'desc' : 'asc',
            orderBy:property
        },()=>{
            this.props.SortDataByDate(this.state.order);
        });
    };


    render() {

        return (
            <div>
                <Paper className="admin_dash_table_root">
                    <div className="admin_dash_table_tableWrapper">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {this.props.columns.map((column,index) => (
                                        <TableCell
                                            key={index}
                                            style={{ minWidth: column.minWidth }}
                                            sortDirection={this.state.orderBy === column.id ? this.state.order : false}
                                        >
                                            {
                                                column.id === "order_date" ? (
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
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.filterData.map((row,parent_index) => {

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={parent_index} className="admin_table_rows" onClick={() => this.handleClickOpen(row)}>
                                            {this.props.columns.map(column => {
                                                const value = row[column.id];
                                                if (column.id === "products_details" || column.id === "customer_details" || column.id === "vendor_details" || column.id === "quantity" || column.id === "product_sku") {
                                                    return (
                                                        <TableCell key={column.id} >
                                                            {
                                                                value.length > 0 && value.map((item,index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            {item}<br/><br/>

                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </TableCell>
                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} >
                                                            {value}
                                                        </TableCell>
                                                    );
                                                }

                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {
                        this.props.filterData.length > 0 && (
                            <div className="admin_table_footer">
                                <h4>Total Records: {this.props.count}</h4>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <div className="admin_table_pagination_menu">
                                        <FormControl className="admin_table_select_menu">
                                            <InputLabel id="demo-simple-select-label">Rows Per Page</InputLabel>
                                            <Select
                                                labelid="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.props.rowsPerPage}
                                                onChange={this.props.handleRowsPerPageChange}
                                            >
                                                {
                                                    this.props.rowsPerPageOptions.map((item,index)=>{
                                                        return (
                                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                                        );
                                                    })
                                                }

                                            </Select>
                                        </FormControl>

                                    </div>
                                    <MuiThemeProvider theme={theme} >
                                        <CssBaseline />
                                        <Pagination
                                            limit={this.props.rowsPerPage}
                                            offset={this.props.offset}
                                            total={this.props.count}
                                            onClick={(e, offset,page) => this.props.handlePaginationClick(offset,page)}
                                            previousPageLabel={<ChevronLeftIcon />}
                                            nextPageLabel={<ChevronRightIcon />}
                                            size={'large'}
                                        />
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        )
                    }
                </Paper>
                {
                    this.state.open === true?<OrderTrackingDialog
                        handleClickOpen={this.handleClickOpen}
                        handleClose={this.handleClose}
                        open={this.state.open}
                        title={'#'+this.state.order_id}
                        width="xl"
                        fullWidth={true}

                    >
                        <SingleOrder
                            orderId={this.state.selected_order_id}
                            completeAction={this.completeAction}
                            activeStatus={this.props.activeStatus}
                            shippingId={this.state.selected_shipping_id}
                            selected_vendor={this.state.selected_vendor}
                            selected_vendor_id={this.state.selected_vendor_id}
                        />

                    </OrderTrackingDialog>:null
                }
            </div>
        );
    }
}

export default AdminDashboardTable;
