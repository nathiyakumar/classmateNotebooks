import React from "react";
import './MobileProductPage.css'
import {Typography} from "@material-ui/core";

import Container from "@material-ui/core/Container";
import MobileProductGridView from "./MobileProductGridView";
import {withRouter} from "react-router-dom";
import MobileProductListView from "./MobileProductListView";
import Drawer from "@material-ui/core/Drawer";
import Divider from '@material-ui/core/Divider';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";


const gridIcon = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/gridIcon.svg'
const ListIcon = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Listicon.svg'


class MobileProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // pageView: 'grid',
            bottom: false,
            top: false,
            sortlist:"",
            category: "",
            pages:"",
            ruling:"",
            size:"",
            binding:"",
            pageviews:true,


        }

    }



    GetGridView(view) {

        if (view === true) {
            this.setState({
                pageviews: !view
            });
            // this.props.history.push("/MobileProductPage/ProductListView");


        } else {

            this.setState({
                pageviews: !view
            });
            // this.props.history.push("/MobileProductPage/ProductGridView");

        }
    }

    toggleDrawer(event, side, open) {
        if (side === "bottom") {
            this.setState({bottom: open});
        } else if (side === "top") {
            this.setState({top: open});
        }

    };

    handleChange(event,filterValue) {
        this.setState({
            ...this.state, [filterValue]: event.target.value
        })
    };
    ResetAll(event){
        this.setState({
            category: "",
            pages:"",
            ruling:"",
            size:"",
            binding:""
        });
    }

    render() {


        const fullList = side => (

            <div
                className="DrawerFullList"
                role="presentation"
                style={side === "top" ? {height: "100vh"} : {height: "auto", padding: "20px"}}
                // onClick={(event) =>{this.toggleDrawer(event,side, false)}}
                // onKeyDown={(event) =>{this.toggleDrawer(event,side, false)}}
            >

                {side === "bottom" ? (
                    <>
                        <Typography className="drawerTitle">SORT BY</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="sortList" name="sortList" value={this.state.sortlist}
                                        onChange={(event) =>{this.handleChange(event,"sortlist")}}>
                                <FormControlLabel value="newest_arival" control={<Radio/>} label="Newest Arival"/>
                                <FormControlLabel value="popularity" control={<Radio/>} label="Popularity"/>
                                <FormControlLabel value="price_low_to_high" control={<Radio/>}
                                                  label="Price -- Low to High"/>
                                <FormControlLabel value="price_high_to_low" control={<Radio/>} label="Price -- High to Low"/>
                            </RadioGroup>
                        </FormControl>
                    </>

                ) : (
                    <>
                        <div style={{display: "flex", justifyContent: "space-between", padding: '25px'}}>
                            <button className="closeBtn" onClick={(event) => {
                                this.toggleDrawer(event, side, false)
                            }}><i
                                className="ri-close-line drawerTitle"/>
                            </button>
                            <Typography className="drawerTitle">FILTER </Typography>
                            <Typography className="drawerTitle" style={{color: '#ff6733'}} onClick={(event)=>{this.ResetAll(event)}}>RESET</Typography>
                        </div>
                        <Divider/>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore className="FilterPanelIcon" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="FilterPanelTitle">Product Category</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="category" name="category" value={this.state.category}
                                                onChange={(event) =>{this.handleChange(event,"category")}}>
                                        <FormControlLabel value="long_notebook" control={<Radio/>} label="Long Notebook"/>
                                        <FormControlLabel value="practical_notebook" control={<Radio/>} label="Practical Notebook"/>
                                        <FormControlLabel value="drawing_notebook" control={<Radio/>} label="Drawing notebook"/>
                                    </RadioGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore className="FilterPanelIcon"/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="FilterPanelTitle">Pages</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="pages" name="Pages" value={this.state.pages}
                                                onChange={(event) =>{this.handleChange(event,"pages")}}>
                                        <FormControlLabel value="172_pages" control={<Radio/>} label="172 Pages"/>
                                        <FormControlLabel value="140_pages" control={<Radio/>} label="140 Pages"/>
                                    </RadioGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore className="FilterPanelIcon"/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="FilterPanelTitle">Ruling</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="ruling" name="Ruling" value={this.state.ruling}
                                                onChange={(event) =>{this.handleChange(event,"ruling")}}>
                                        <FormControlLabel value="ruled" control={<Radio/>} label="Ruled"/>
                                        <FormControlLabel value="unruled" control={<Radio/>} label="Unruled"/>
                                    </RadioGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore className="FilterPanelIcon"/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="FilterPanelTitle">Size</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="size" name="Size" value={this.state.size}
                                                onChange={(event) =>{this.handleChange(event,"size")}}>
                                        <FormControlLabel value="24cmx18cm" control={<Radio/>} label="24cm x 18cm"/>
                                        <FormControlLabel value="29.7cmx21cm" control={<Radio/>} label="29.7cm x 21cm"/>
                                    </RadioGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore className="FilterPanelIcon"/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="FilterPanelTitle">Binding</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="binding" name="Binding" value={this.state.binding}
                                                onChange={(event) =>{this.handleChange(event,"binding")}}>
                                        <FormControlLabel value="center_stabled" control={<Radio/>} label="Center Stabled"/>
                                        <FormControlLabel value="wiro" control={<Radio/>} label="Wiro"/>
                                    </RadioGroup>
                                </FormControl>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Button className="ApplyFilterBtn">Apply Filter</Button>
                    </>
                )}

            </div>
        );
        return (
            <div className="MblProductList">
                <div>
                    <button className="sortBtn" onClick={(event) => {
                        this.toggleDrawer(event, 'bottom', true)
                    }}>Sort
                    </button>
                    <button className="filterBtn" onClick={(event) => {
                        this.toggleDrawer(event, 'top', true)
                    }}>Filter
                    </button>
                </div>
                <Container>
                    <span className="MblProductTitle">
                           <Typography variant="h6">All Products</Typography>
                            <img
                                src={this.state.pageviews ? gridIcon : ListIcon }
                                onClick={(event) => this.GetGridView(this.state.pageviews)}/>
                        </span>
                    {this.state.pageviews  ? <MobileProductGridView/> : <MobileProductListView/>}
                    {/*{this.props.match.params.Page === "ProductListView" && }*/}
                </Container>
                <Drawer anchor="bottom" open={this.state.bottom} onClose={(event) => {
                    this.toggleDrawer(event, 'bottom', false)
                }}>
                    {fullList('bottom')}
                </Drawer>
                <Drawer anchor="top" open={this.state.top} onClose={(event) => {
                    this.toggleDrawer(event, 'top', false)
                }}>
                    {fullList('top')}
                </Drawer>
            </div>
        );
    }
}


export default MobileProductPage;
