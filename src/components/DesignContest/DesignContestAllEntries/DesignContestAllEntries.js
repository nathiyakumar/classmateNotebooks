import React from 'react';
import './DesignEntriesAllEntries.css';
import DesignContestHeaders from "../DesignContestHeader/DesignContestHeader";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from "@material-ui/core/CardContent";
import AddIcon from '@material-ui/icons/Add';
import Media from "react-media";
import {small_screen} from "../../../variables";
import MobileDesignContestHeader from "../DesignContestHeader/MobileDesignContestHeader";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../Environment";

const getDesignContestAllEntries = graphql`
  query DesignContestAllEntriesQuery{
       allDesignsDataList
       { 
        id
        designTitle
        workType
        isRulesAccepted
        designedImage
        isFeatured
        isSelected
        created
        }      
   }
`;

class DesignContestAllEntries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DesignLists: [],
            loadingMsg: "Designs are being populated.. Please wait.",
        }
    }

    componentDidMount(): void {
        this.getDesignContestAllEntries()
    }

    getDesignContestAllEntries = () => {
        const variables = {};
        this.setState({
            loadingMsg: "Designs are being populated.. Please wait."
        });

        fetchQuery(environment, getDesignContestAllEntries, variables, {force: false})
            .then(data => {
                if (data.allDesignsDataList !== null && data.allDesignsDataList.length !== 0) {
                    this.setState({
                        DesignLists: data.allDesignsDataList,
                    })

                } else {
                    this.setState({
                        DesignLists: [],
                        loadingMsg: "Designs Not Available"
                    })
                }
            });


    };


    render() {
        return (
            <div>
                <Media query={{maxWidth: small_screen}} render={() =>
                    (
                        <MobileDesignContestHeader/>
                    )}
                />
                <Media query={{minWidth: small_screen}} render={() =>
                    (
                        <DesignContestHeaders/>
                    )}
                />
                <div className="design_contest_all_entries_page">
                    <div className="contest_home_content">
                        <p className="classmate_title">Classmate's</p>
                        <h1>Weekly Design Challenge</h1>
                        {/*<button className="submit_btn">REGISTER TO PARTICIPATE</button>*/}
                    </div>

                    <div className="design-contest-third-section">
                        <h2 style={{textAlign: 'center'}}>All Enteries</h2>
                        <div className="design-contest-third-section-designs">
                            <Grid container spacing={1}>
                                {this.state.DesignLists && this.state.DesignLists.map(function (item, index) {

                                        return (

                                            <Grid item md={3} xs={6} className="design_contest_all_list" key={index}>
                                                <div style={{
                                                    border: '2px solid #70707033',
                                                    height: '280px'
                                                }}>
                                                    <img src={item.designedImage} align='designContestImg' style={{
                                                        width: '100%',
                                                        objectFit: 'fill',
                                                        height: '75%',
                                                        backgroundColor: '#ebedf0'
                                                    }}/>
                                                    <div style={{padding: '5px 5px'}}><h6
                                                        style={{margin: '0px', color: '#5F4DFF'}}>{item.workType}</h6>
                                                        <p>{item.designTitle}</p></div>
                                                </div>
                                            </Grid>
                                        )
                                    }
                                )}
                                {
                                    this.state.DesignLists.length === 0 &&
                                    <div className="empty_msg">{this.state.loadingMsg}</div>
                                }

                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*       <div style={{padding: '0px 5px'}}><h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*        <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}> <h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}> <h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}> <h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}><h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}> <h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}><h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item md={3} xs={6}>*/}
                                {/*    <div style={{*/}
                                {/*        border: '2px solid #70707033',*/}
                                {/*    }}>*/}
                                {/*        <img src={designContestImg} align='designContestImg' style={{width:'100%'}}/>*/}
                                {/*        <div style={{padding: '0px 5px'}}><h6 style={{margin: '0px',color:'#5F4DFF'}}>PHOTOGRAPHY</h6>*/}
                                {/*            <p>DESIGN #342</p></div>*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                            </Grid>

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default DesignContestAllEntries
