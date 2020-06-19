import React from "react";
import './VendorDashboard.css';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {fetchQuery} from 'relay-runtime';
import environment from "../../Environment";
import graphql from 'babel-plugin-relay/macro';
import Grid from "@material-ui/core/Grid";
import cogoToast, {error} from "cogo-toast";
import CreateDownloadPdfStatusUpdateMutation from "../../mutations/CreateDownloadPdfStatusUpdateMutation";
import {connect} from "react-redux";

const getdesignThumbnailImageOrder = graphql`
  query ThumbnailTableQuery($orderId: String!) {
    designThumbnailImageOrder(orderId:$orderId)
  }
`;

const getdesignPdfOrder = graphql`
  query ThumbnailTablePdfQuery($orderId: String!) {
    designPdfOrder(orderId:$orderId)
  }
`;


class ThumbnailTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            thumbnailData:{},
            pdfData:{}
        }
    }


    componentDidMount(){
        const variables = {
            orderId: this.props.orderId,
        };

        fetchQuery(environment, getdesignThumbnailImageOrder, variables,{force:false})
            .then(data => {
                if(data.designThumbnailImageOrder !== null){
                    this.setState({
                        thumbnailData:JSON.parse(data.designThumbnailImageOrder)
                    })
                }
            }).catch(error => {

        });

        fetchQuery(environment, getdesignPdfOrder, variables,{force:false})
            .then(data => {
                if(data.designPdfOrder !== null){
                    this.setState({
                        pdfData:JSON.parse(data.designPdfOrder)
                    })
                }
            });
    }

    sendSMSToUser = (url,design_id) => {
        let data = {
            orderId:this.props.orderId,
            designId:design_id
        }

        if(this.props.user_details.user && this.props.user_details.user.isVendor === true){

            CreateDownloadPdfStatusUpdateMutation(data, (response) => {

                if(response.downloadPdfStatusUpdate !== null ){

                    window.open(
                        url,
                        '_blank' // <- This is what makes it open in a new window.
                    );

                }

            },function (err) {
                cogoToast.error(err, { position: 'top-center'});


            })

        } else {
            window.open(
                url,
                '_blank' // <- This is what makes it open in a new window.
            );
        }





    }

    render() {

        return (
            <Paper className="container " style={{padding:'20px'}}>
                <Table className="thumbnail_table">
                    <TableHead style={{backgroundColor:'#f4f4f4'}}>
                        <TableRow>
                            <TableCell  align={"center"}>Notebooks</TableCell>
                            <TableCell  align={"center"}>PDF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {Object.keys(this.state.thumbnailData).map((keyName, i) => (

                            <TableRow key={i}>

                                <TableCell component="th" scope="row" align={"center"} style={{width:'40%'}} >
                                    <Grid container spacing={0}>

                                        {
                                            this.state.thumbnailData[keyName] === "No Thumbnail Available" ? <div style={{width:'100%'}}>{this.state.thumbnailData[keyName]}</div>: this.state.thumbnailData[keyName].map((thumbnail,index)=>{
                                                return(
                                                    <Grid item xs={4} style={{margin:'15px 0px'}}>
                                                        <img src={thumbnail} alt="thumbnails" style={{width:'150px',height:'150px',objectFit:'contain'}}/>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </TableCell>



                                <TableCell  className={keyName} align={"center"}>

                                    {
                                        this.state.pdfData[keyName] === "Not Available" ? this.state.pdfData[keyName]:
                                            <button className="download_pdf_button" onClick={()=>this.sendSMSToUser(this.state.pdfData[keyName],keyName)}>Download PDF</button>

                                    }

                                </TableCell>

                            </TableRow>

                        ))}

                        {
                            Object.keys(this.state.thumbnailData).length === 0 &&  <TableRow>

                                <TableCell component="th" scope="row" align={"center"} style={{width:'40%'}} >
                                   Not Available
                                </TableCell>

                                <TableCell   align={"center"}>
                                    Not Available
                                </TableCell>

                            </TableRow>
                        }

                        {/*{*/}
                        {/*    Object.keys(this.state.thumbnailData).length === 0 && <TableRow>*/}

                        {/*        <TableCell component="th" scope="row" align={"center"} style={{width:'40%'}} >*/}
                        {/*            <Grid container spacing={0}>*/}
                        {/*                <Grid item xs={4} style={{margin:'15px 0px'}}>*/}
                        {/*                    <p>Thumbnail not available</p>*/}
                        {/*                </Grid>*/}
                        {/*            </Grid>*/}
                        {/*        </TableCell>*/}
                        {/*        <TableCell align={"center"}>*/}

                        {/*            <p>PDF not available</p>*/}
                        {/*        </TableCell>*/}

                        {/*    </TableRow>*/}
                        {/*}*/}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


const mapStateToProps = state => ({
    user_details: state.UserReducer.user_details
})


export default connect(mapStateToProps)(ThumbnailTable);
