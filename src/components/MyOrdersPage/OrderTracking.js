import React from 'react';
import './OrderTracking.css';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {fetchQuery} from 'relay-runtime';
import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';


const getOrderTrackingData = graphql`
  query OrderTrackingQuery($shippingId: ID) {
    trackingData(shippingId:$shippingId)
  }
`;

class OrderTracking extends React.Component{

state={
    trackingData:[]
}

componentDidMount(){
    const variables = {
        shippingId: this.props.shippingId,
    };

    fetchQuery(environment, getOrderTrackingData, variables,{force:false})
        .then(data => {
            if(data.trackingData !== null){

                let response = [];

              for(let i=0;i<data.trackingData.length;i++){
                  response[i] = JSON.parse(data.trackingData[i]);
                  if(i === data.trackingData.length-1){
                        this.setState({
                            trackingData:response
                        })
                  }

              }


            }
        });
}

getFormattedDate(date){

    let today = new Date(date);

    let date1=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();

    return date1;
}


    render(){

        return(
            <Paper className="container " style={{padding:'20px'}}>
            <Table className="order_tracking_table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                      this.state.trackingData.map((item,index)=>{
                          return(
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                {this.getFormattedDate(item.date)}
                                </TableCell>
                                <TableCell >{item.activity}</TableCell>
                                <TableCell >{item.location}</TableCell>

                            </TableRow>
                          )
                      })
                  }

              </TableBody>
            </Table>
          </Paper>
        );
    }
}

export default OrderTracking;
