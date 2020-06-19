import React from 'react';
import './DesignContestUserDesignList.css';
import DesignContestHeaders from "../DesignContestHeader/DesignContestHeader";
import Grid from "@material-ui/core/Grid";
import Media from "react-media";
import {small_screen} from "../../../variables";
import MobileDesignContestHeader from "../DesignContestHeader/MobileDesignContestHeader";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../../Environment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const getDesignContestUserDesignList = graphql`
  query DesignContestUserDesignListQuery($workType:WorkTypeEnum ){
       userDesignsDataList(workType : $workType)
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
class DesignContestUserDesignList extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            DesignLists:[],
            worktype:'Photography',
            loadingMsg:"Designs are being populated.. Please wait.",
        }
    }

    componentDidMount(): void {
        document.getElementById('Photography').classList.add('activeWrkType')
        document.getElementById('Art').classList.remove('activeWrkType')
        this.getDesignContestUserDesignList()
    }

    getDesignContestUserDesignList = () => {
        const variables = {
            workType:this.state.workType
        };
        this.setState({
            loadingMsg:"Designs are being populated.. Please wait."
        });

        fetchQuery(environment, getDesignContestUserDesignList, variables,{force:false})
            .then(data => {

                if (data.userDesignsDataList !== null && data.userDesignsDataList.length !== 0) {
                    this.setState({
                        DesignLists: data.userDesignsDataList,
                    })

                }

                else{
                    this.setState({
                        DesignLists: [],
                        loadingMsg : "Designs Not Available"
                    })
                }
            });


    };
    chengeWorkType =(wrkType) =>{
         if(wrkType === 'Photography'){
             document.getElementById('Photography').classList.add('activeWrkType')
             document.getElementById('Art').classList.remove('activeWrkType')
         }
         else{
             document.getElementById('Art').classList.add('activeWrkType')
             document.getElementById('Photography').classList.remove('activeWrkType')
         }
         this.setState({
             workType:wrkType
         },()=>{
            this.getDesignContestUserDesignList()
         })


    }

    render() {
        return (
            <div>
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MobileDesignContestHeader />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
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
                    <div className="user-designs-title">
                        <h2 style={{textAlign:'center'}}>All Enteries</h2>
                        <div className="design-contest-button-group">
                            <button id='Photography' onClick={(e) => this.chengeWorkType('Photography' , e)}>Photography</button>
                            <button id='Art' onClick={(e) => this.chengeWorkType('Art' , e)}>Art</button>
                        </div>
                        {/*<FormControl>*/}
                        {/*    <InputLabel id="demo-simple-select-label">Work Type</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        labelId="demo-simple-select-label"*/}
                        {/*        id="demo-simple-select"*/}
                        {/*        value={this.state.workType}*/}
                        {/*        onChange={this.handleChangeSelect}*/}
                        {/*    >*/}
                        {/*        <MenuItem value="Photography">Photography</MenuItem>*/}
                        {/*        <MenuItem value="Art">Art</MenuItem>*/}
                        {/*    </Select>*/}
                        {/*</FormControl>*/}

                    </div>

                    <div className="design-contest-third-section-designs">
                        <Grid container spacing={1}  >
                            {this.state.DesignLists && this.state.DesignLists.map(function (item, index) {

                                        return (

                                            <Grid item md={3} xs={6} key={index} className="design_contest_all_list">
                                                <div style={{
                                                    border: '2px solid #70707033',
                                                    height:'280px'
                                                }}>
                                                    <img src={item.designedImage} align='designContestImg' style={{width:'100%',objectFit: 'fill',height:'75%',backgroundColor: '#ebedf0'}}/>
                                                    <div style={{padding: '5px 5px'}}><h6 style={{margin: '0px',color:'#5F4DFF'}}>{item.workType}</h6>
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

export default DesignContestUserDesignList
