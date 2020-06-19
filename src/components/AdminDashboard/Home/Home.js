import React from "react";
import "./Home.css";
import AdminDashboardIndex from "../AdminDashboardIndex";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../Environment";
import {Container} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormSpacer from "../FormSpacer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import LoadingScreen from "react-loading-screen";


const todayOrder =  'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/NewOrder - active.svg'
const PaymentPending = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/PaymentPending.svg'
const printing = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/print.svg'
const processing = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/process.svg'
const shipped = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/shipped.svg'
const Waiting4Approval = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Waiting4Approval.svg'
const delivered = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/delivered.svg';

const getCountByDate = graphql`
    query HomeOrdersCountByDateQuery($startDate:String,$endDate:String){
          ordersCount(startDate:$startDate,endDate:$endDate)
          shippedCount(startDate:$startDate,endDate:$endDate){
            customized
            nonCustomized
            total
          }
          disapprovedCount(startDate:$startDate,endDate:$endDate)
          ordersTotalValue(startDate:$startDate,endDate:$endDate)
          vendorsCount(startDate:$startDate,endDate:$endDate){
            customized
            nonCustomized
            total
          }
          deliveredCount(startDate:$startDate,endDate:$endDate){
            customized
            nonCustomized
            total
          }
          processingCount(startDate:$startDate,endDate:$endDate){
            customized
            nonCustomized
            total
          }
          printingCount(startDate:$startDate,endDate:$endDate)
          waitingForApprovalCount(startDate:$startDate,endDate:$endDate)
          paymentsPendingCount(startDate:$startDate,endDate:$endDate)
            ordersIssueCount{
                ordersCount
                orderNumbers
                totalOrdersShippingZero
            }
            awbOrdersIssueCount{
                ordersCount
                orderNumbers
                totalOrdersShippingZero
            }
            approvedNoPdfCount{
                ordersCount
                orderNumbers
                totalOrdersShippingZero
            }
            waitingForApprovalThumbnailNotGenerated{
                ordersCount
                orderNumbers
                totalOrdersShippingZero
            }
            readyToShipNoLabel{
                labelOrdersCount
                labelOrderNumbers
                manifestOrdersCount
                manifestOrderNumbers
            }
    }
`;


class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            date: [new Date(), new Date()],
            orders_count:{},
            startDate:null,
            endDate:null,
            order_issues:[
                {
                    id:'ordersIssueCount',label:'Order Issues Count'
                },
                {
                    id:'awbOrdersIssueCount',label:'AWB Order Issues Count'
                },
                {
                    id:'approvedNoPdfCount',label:'Approved Order No PDF Count'
                },
                {
                    id:'waitingForApprovalThumbnailNotGenerated',label:'Waiting For Approval Thumbnail Not Generated'
                },
                {
                    id:'readyToShipNoLabel',label:'Ready To Ship No Label'
                }
            ],
            selected_order_issues:{},
            issues_table_head:[],
            issues_table_data:{},
            loading:false
        };
    }

    componentDidMount() {
        this.getCounts();
    }

    getCounts = () => {
        let variables = {
            startDate:this.state.startDate?this.state.startDate:"",
            endDate: this.state.endDate?this.state.endDate:""
        };
        let selected_order_issues =  {
            id:'ordersIssueCount',label:'Order Issues Count'
        };
        this.setState({
            loading:true
        });

        fetchQuery(environment, getCountByDate, variables)
            .then(data => {
                this.setState({
                    orders_count:data,
                    selected_order_issues:selected_order_issues,

                },()=>{
                    this.FormateIssuesTableData("ordersIssueCount");
                });
            });
    };

    onChange = date => {
        let start_date = new Date(date[0]);
        let startDate=start_date.getFullYear() + "-"+ parseInt(start_date.getMonth()+1) + "-"+ start_date.getDate();
        let end_date = new Date(date[1]);
        let endDate=end_date.getFullYear() + "-"+ parseInt(end_date.getMonth()+1) + "-"+ end_date.getDate();
        this.setState({
            date : date,
            startDate: startDate,
            endDate:endDate
        },()=>{
            this.getCounts();
        })
    };

    onChangeSelect = (e) =>{
        if(e.target.value !== ""){
            let value;
            let selected_index = this.state.order_issues.findIndex(function (data) {
                return data.id === e.target.value;
            });
            value = {...this.state.order_issues[selected_index]};
            this.setState({
                selected_order_issues:value
            },()=>{
                this.FormateIssuesTableData(value.id);
            })
        }
    };

    FormateIssuesTableData = (selected_issues) => {
        let value;

        let selected_index = this.state.order_issues.findIndex(function (data) {
            return data.id === selected_issues;
        });
        value = {...this.state.order_issues[selected_index]};
        let head_cell = [];
        let row_cell = [];

        if(selected_issues !== "readyToShipNoLabel"){
            head_cell = [
                {
                    id:'ordersCount', label:'Orders Count'
                },
                {
                    id:'orderNumbers', label:'Orders Numbers'
                },
                {
                    id:'totalOrdersShippingZero', label:'Total Orders Shipping Zero'
                }
            ];
            row_cell = {...this.state.orders_count[value.id]};
            this.setState({
                issues_table_head:head_cell,
                issues_table_data:row_cell,
                loading:false
            })

        } else {
            head_cell = [
                {
                    id:'labelOrdersCount', label:'Orders Count'
                },
                {
                    id:'labelOrderNumbers', label:'Orders Numbers'
                },
                {
                    id:'manifestOrdersCount', label:'Manifest Orders Count'
                },
                {
                    id:'manifestOrderNumbers', label:'Manifest Orders Numbers'
                }
            ];
            row_cell = {...this.state.orders_count[value.id]};
            this.setState({
                issues_table_head:head_cell,
                issues_table_data:row_cell,
                loading:false
            })
        }


    };



    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"home"} >
                    <LoadingScreen
                        loading={this.state.loading}
                        bgColor='#ffffffbf'
                        spinnerColor='#000'
                        textColor='#676767'
                        logoSrc='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/ITC_Classmate_logo.png/613px-ITC_Classmate_logo.png'
                        text="Loading"
                    >
                    <div className="admin_home_component">
                        <div className="admin_home_header">
                            <h5>Hello there, {this.props.user_details.user?this.props.user_details.user.email:""}</h5>
                            <span className="HomeDashboardDatePicker"><h3 style={{margin:' 0px'}}>Date : &nbsp;</h3>
                                <DateRangePicker
                                    onChange={this.onChange}
                                    value={this.state.date}
                                    dayPlaceholder={"dd"}
                                    monthPlaceholder={"mm"}
                                    yearPlaceholder={"yyyy"}
                                    format={"dd-MM-y"}
                                    isOpen={false}
                                />
                            </span>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Orders</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.ordersCount?this.state.orders_count.ordersCount:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={todayOrder} alt="Orders"/>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Payment Pending</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.paymentsPendingCount?this.state.orders_count.paymentsPendingCount:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={PaymentPending} alt="Payment"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Waiting For Approval</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.waitingForApprovalCount?this.state.orders_count.waitingForApprovalCount:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={Waiting4Approval} alt="WaitingForApproval"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                             </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Printing</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.printingCount?this.state.orders_count.printingCount:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={printing} alt="Printing"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">DisApproved</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.disapprovedCount?this.state.orders_count.disapprovedCount:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={printing} alt="Printing"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Total Order Value</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">Rs {this.state.orders_count.ordersTotalValue?this.state.orders_count.ordersTotalValue:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={todayOrder} alt="TodayOrder"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Processing</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.processingCount?this.state.orders_count.processingCount.total:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={processing} alt="Processing"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Shipped</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.shippedCount?this.state.orders_count.shippedCount.total:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={shipped} alt="Shipped"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <div className="admin_home_card_grid">
                                            <div className="admin_home_card_title">
                                                <h3 className="card-title">Delivered</h3>
                                                {/*<span>Today</span>*/}
                                                <h2 className="count">{this.state.orders_count.deliveredCount?this.state.orders_count.deliveredCount.total:0}</h2>
                                            </div>
                                            <div className="admin_home_card_icon">
                                                <img   src={delivered} alt="Delivered"/>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {/*<Grid item xs={12} md={4}>*/}
                            {/*    <Card>*/}
                            {/*        <CardContent>*/}
                            {/*            <div className="admin_home_card_grid">*/}
                            {/*                <div className="admin_home_card_title">*/}
                            {/*                    <h3 className="card-title">Vendors</h3>*/}
                            {/*                    /!*<span>Today</span>*!/*/}
                            {/*                    <h2 className="count">{this.state.orders_count.vendorsCount?this.state.orders_count.vendorsCount.total:0}</h2>*/}
                            {/*                </div>*/}
                            {/*                <div className="admin_home_card_icon">*/}
                            {/*                    <img   src={delivered} alt="Delivered"/>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </CardContent>*/}
                            {/*    </Card>*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Container maxWidth="lg" style={{padding:0}}>
                            <h5>Customized</h5>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Processing</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.processingCount?this.state.orders_count.processingCount.customized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={processing} alt="Processing"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Shipped</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.shippedCount?this.state.orders_count.shippedCount.customized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={shipped} alt="Shipped"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Delivered</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.deliveredCount?this.state.orders_count.deliveredCount.customized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={delivered} alt="Delivered"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Orders</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.vendorsCount?this.state.orders_count.vendorsCount.customized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={todayOrder} alt="Delivered"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                        <Container maxWidth="lg" style={{padding:0}}>
                            <h5>Non Customized</h5>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Processing</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.processingCount?this.state.orders_count.processingCount.nonCustomized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={processing} alt="Processing"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Shipped</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.shippedCount?this.state.orders_count.shippedCount.nonCustomized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={shipped} alt="Shipped"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Delivered</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.deliveredCount?this.state.orders_count.deliveredCount.nonCustomized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={delivered} alt="Delivered"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent>
                                            <div className="admin_home_card_grid">
                                                <div className="admin_home_card_title">
                                                    <h3 className="card-title">Orders</h3>
                                                    {/*<span>Today</span>*/}
                                                    <h2 className="count">{this.state.orders_count.vendorsCount?this.state.orders_count.vendorsCount.nonCustomized:0}</h2>
                                                </div>
                                                <div className="admin_home_card_icon">
                                                    <img   src={todayOrder} alt="Delivered"/>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                        <FormSpacer />
                        <Container maxWidth="lg" style={{padding:0}}>
                            <h5>Tools</h5>
                            <FormControl variant="outlined"  className="form_feild">
                                <InputLabel  id="demo-simple-select-outlined-label" className="form_transition_label">
                                   Select Issues
                                </InputLabel>
                                <Select
                                    labelid="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.selected_order_issues.id?this.state.selected_order_issues.id:""}
                                    onChange={(e)=>this.onChangeSelect(e)}
                                    MenuProps={{
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal:"left"
                                        }
                                    }}

                                >
                                    {
                                        this.state.order_issues.map((issue,index)=>{
                                            return(
                                                <MenuItem value={issue.id} key={index}>{issue.label}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormSpacer/>
                            <Paper>
                                {
                                    this.state.selected_order_issues.id && this.state.selected_order_issues.id !== "readyToShipNoLabel" &&(
                                        <Table className="issues_table" aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {
                                                        this.state.issues_table_head.map((head,index)=>{
                                                            return(
                                                                <TableCell key={index}>{head.label}</TableCell>
                                                            );
                                                        })
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    {
                                                        Object.keys(this.state.issues_table_data).map((item,row_index)=>{
                                                            return (
                                                                item !== "orderNumbers" ?
                                                                    <TableCell key={row_index}>{this.state.issues_table_data[item]?this.state.issues_table_data[item]:'None'}</TableCell>:
                                                                    <TableCell key={row_index}>
                                                                        {
                                                                            this.state.issues_table_data[item].length > 0 ? this.state.issues_table_data[item].map((order_number,order_index)=>{
                                                                                return(
                                                                                    <p key={order_index}>{order_number}</p>
                                                                                )
                                                                            }):'None'
                                                                        }
                                                                    </TableCell>
                                                            )
                                                        })
                                                    }
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                {
                                    this.state.selected_order_issues.id && this.state.selected_order_issues.id === "readyToShipNoLabel" &&(
                                        <Table className="issues_table" aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {
                                                        this.state.issues_table_head.map((head,index)=>{
                                                            return(
                                                                <TableCell>{head.label}</TableCell>
                                                            );
                                                        })
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    {
                                                        Object.keys(this.state.issues_table_data).map((item,row_index)=>{
                                                            return (
                                                                item !== "labelOrderNumbers" && item !== "manifestOrderNumbers" ?
                                                                    <TableCell key={row_index}>{this.state.issues_table_data[item]?this.state.issues_table_data[item]:'None'}</TableCell>:
                                                                    <TableCell key={row_index}>
                                                                        {
                                                                            this.state.issues_table_data[item].length > 0 ? this.state.issues_table_data[item].map((order_number,order_index)=>{
                                                                                return(
                                                                                    <p key={order_index}>{order_number}</p>
                                                                                )
                                                                            }):'None'
                                                                        }
                                                                    </TableCell>
                                                            )
                                                        })
                                                    }
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }

                            </Paper>
                        </Container>
                    </div>
                    </LoadingScreen>
                </AdminDashboardIndex>
            </div>
        );
    }
}
const mapStateToProps = state => ({

    user_details: state.UserReducer.user_details,

});
export default compose(withRouter,connect(mapStateToProps))(Home)
