import React from "react";
import './TrackSigleOrder.css';
import Navbar from "../NavBar/Navbar";
import MobileNavbar from "../NavBar/MobileNavbar";
import Media from 'react-media';
import {small_screen} from '../../variables';
import Container from '@material-ui/core/Container';
import {fetchQuery} from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';
import environment from "../../Environment";
import Grid from "@material-ui/core/Grid";
import cogoToast, {error} from 'cogo-toast';
import Card from "@material-ui/core/Card";
import CardTitle from "../AdminDashboard/CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import FormSpacer from "../AdminDashboard/FormSpacer";
import Stepper from "@material-ui/core/Stepper";

import styled from 'styled-components'
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const getTrackingDetailsByOrderId = graphql`
  query TrackSigleOrderQuery($orderId: String) {
     trackingDataNew(orderId:$orderId){
        orderData{
          orderId
          orderDate
        }
        shippingData{
          shippingStatus
          dateData
          shippingActivities
          courierName
          trackingId
        }
     }
  }
`;

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed,icons_count} = props;
    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons_count}
        </div>
    );
}

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 25,
        height: 25,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor:
            '#ff6733',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor:
            '#ff6733',
    },
});


class TrackSigleOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orderid: '',
            tracking_datas: {},
            activeStep: 0,
            shippingData:[],
            show_shipping_data:true,
        }
    }

    componentWillMount(){
        if(this.props.match.params.order_id){
            this.setState({
                orderid:this.props.match.params.order_id
            },()=>{
                this.getTrackingDetails();
            });
        }

    }

    handleChange = (e) => {
        this.setState({
            orderid: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.getTrackingDetails();
    };
    getTrackingDetails = () =>{
        const variables = {
            orderId: this.state.orderid
        };


        if (variables.orderId.length < 1) {
            return false
        }

        fetchQuery(environment, getTrackingDetailsByOrderId, variables, {force: false})
            .then(data => {
                if (data.trackingDataNew !== null) {
                    let shippingData = [];
                    let tmp_shippingActivities = [];
                    let show_shipping_data = true;
                    data.trackingDataNew.shippingData.map((item,index)=>{
                        item.shippingActivities.map((activities,activity_index)=>{
                            tmp_shippingActivities[activity_index] = JSON.parse(activities);
                        });
                        if(item.shippingStatus === "DISAPPROVED"){
                            show_shipping_data = false;
                        }

                        shippingData[index] = {
                            shippingStatus: item.shippingStatus,
                            dateData: JSON.parse(item.dateData),
                            shippingActivities:tmp_shippingActivities,
                            courierName:item.courierName,
                            trackingId:item.trackingId,
                        };
                    });



                    this.setState({
                        tracking_datas:data.trackingDataNew ,
                        // orderid: '',
                        shippingData:shippingData,
                        show_shipping_data:show_shipping_data,

                    })
                } else {
                    cogoToast.error("Please enter valid order id", {position: 'top-center'});
                }
            });
    };




    render() {
        // const table_data = this.state.tracking_datas.slice(1);
        const Styled = styled;

        const Block = Styled.div`
        &:before {
            display: absolute;
            top:0;  
            content: '${props => props.before}';
       
        }
       `;
        const {tracking_datas,shippingData} = this.state;
        return (
            <div className="single_order_tracking_component">
                <Media query={{maxWidth: small_screen}} render={() =>
                    (
                        <MobileNavbar/>
                    )}
                />
                <Media query={{minWidth: small_screen}} render={() =>
                    (
                        <Navbar/>
                    )}
                />
                <Container maxWidth={"md"} style={{marginTop:' 60px'}}>
                    <div className="newOrderTrackPage_container">
                        <Grid container>
                            <Grid md={12} xs={12} item={true}>
                                <Card>
                                    <CardTitle title={"Track Your Order"}/>
                                    <CardContent>
                                        <form className='react-form' onSubmit={this.handleSubmit}>
                                            <fieldset className='form-group'>
                                                <ReactFormLabel htmlFor='OrderId' title='Your Order Id:' class="react_form_tabel"/>

                                                <input id='OrderId' className='form-input' name='orerid' type='text'
                                                       required onChange={this.handleChange}
                                                       value={this.state.orderid}
                                                       placeholder="Your Order Id"
                                                />
                                            </fieldset>
                                            <span>
                                                <div className='form-group'>
                                                    <input id='formButton' className='btn' type='submit'
                                                           placeholder='Send message'/>
                                                </div>
                                            </span>
                                        </form>
                                    </CardContent>
                                </Card>
                                {
                                  Object.keys(tracking_datas).length > 0 && (
                                        <>
                                            <FormSpacer/>
                                            <Card>
                                                <CardTitle title={"Order Details"}/>
                                                <CardContent>
                                                    <div>
                                                        <div className="OrderDetailRow"><span
                                                            className="OrderDetailRowLeft">Order Id</span>
                                                            <span className="OrderDetailRowRight">{tracking_datas.orderData.orderId}</span>
                                                        </div>
                                                        <div className="OrderDetailRow"><span
                                                            className="OrderDetailRowLeft">Order Placed On</span>
                                                            <span className="OrderDetailRowRight">{tracking_datas.orderData.orderDate}</span>
                                                        </div>
                                                        {
                                                            this.state.show_shipping_data === false && (
                                                                <div className="OrderDetailRow"><span
                                                                    className="OrderDetailRowLeft">Status</span>
                                                                    <span className="OrderDetailRowRight">Disapproved and Refunded</span>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {
                                                this.state.show_shipping_data === true &&  shippingData.length > 0 && shippingData.map((item,index)=>{
                                                    let card_title = item.shippingStatus === "DELIVERED" ? "Delivered Date":"Estimated Delivery Date";
                                                    return (
                                                        <div key={index}>
                                                        <FormSpacer/>
                                                        <Card>
                                                            <CardTitle title={card_title}/>
                                                            <CardContent>
                                                                <span className="estimated_day_section">
                                                                    <h3>{item.dateData.estimated_weekday} &nbsp;</h3><small> (On Time)</small>
                                                                </span>
                                                                <h4 style={{margin: "0px", opacity: " 0.9"}}>{item.dateData.estimated_month} &nbsp;</h4>
                                                                <span style={{display: "flex", alignItems: "baseline"}}><p
                                                                    className="order_date">{item.dateData.estimated_day}</p><p
                                                                    style={{fontWeight: "600"}}>{item.dateData.estimated_year}</p></span>
                                                                <p style={{fontWeight: "600", opacity: " 0.9"}}>Status:</p>
                                                                <p className="order_status" style={{opacity: " 0.9"}}>{item.shippingStatus}</p>
                                                                <div>
                                                                     <span className="courier_parner_detail_section">
                                                                          <h3 style={{margin: "0px", opacity: " 0.9"}}>{item.courierName} &nbsp;</h3>
                                                                          <span>
                                                                              <p style={{fontWeight: "bold", opacity: " 0.9"}}>Tracking Id</p>
                                                                              <p style={{color: "#ff6733", fontWeight: "bold", opacity: " 0.9"}}>{item.trackingId}</p>
                                                                          </span>
                                                                      </span>
                                                                    {/*<h4 style={{margin: "0px"}}>Fedex &nbsp;</h4>*/}
                                                                    <div
                                                                        className="status_steps"
                                                                    >
                                                                        <Stepper activeStep={item.shippingActivities.length} orientation="vertical">

                                                                            {item.shippingActivities.map((label,step_index) => {
                                                                                let count = {icons_count: item.shippingActivities.length - step_index};
                                                                                return(
                                                                                    <Step key={step_index}>
                                                                                        <Block className="stepper_activity_date" before={label.date}>
                                                                                            {/*    <p style={{*/}
                                                                                            {/*    fontWeight: '200',*/}
                                                                                            {/*    margin: "0px"*/}
                                                                                            {/*}}>05.45AM</p>*/}
                                                                                        </Block>
                                                                                        <StepLabel StepIconComponent={ColorlibStepIcon} StepIconProps={count}>
                                                                                            <p style={{margin: '0px', fontSize: "14px"}}>
                                                                                                <span style={{fontWeight: "600"}}>Activity: </span>
                                                                                                {label.activity}
                                                                                            </p>
                                                                                            <p style={{margin: '0px', fontSize: "14px"}}>
                                                                                                <span style={{fontWeight: "600"}}>Location: </span>
                                                                                                {label.location}
                                                                                            </p>
                                                                                        </StepLabel>
                                                                                    </Step>


                                                                                )
                                                                            })}
                                                                        </Stepper>

                                                                    </div>

                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                        </div>
                                                    )

                                                })
                                            }

                                        </>
                                    )
                                }

                            </Grid>
                        </Grid>

                    </div>
                </Container>
            </div>
        );
    }
}

export default TrackSigleOrder;

class ReactFormLabel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        )
    }
}
