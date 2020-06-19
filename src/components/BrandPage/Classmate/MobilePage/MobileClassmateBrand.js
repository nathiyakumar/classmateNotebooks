import React from "react";
import "./MobileClassmateBrand.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {fetchQuery} from "relay-runtime";
import graphql from "babel-plugin-relay/macro";
import environment from "../../../../Environment";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Drawer from "@material-ui/core/Drawer";
import {withRouter,Link} from "react-router-dom";
import MobileNavbar from "../../../NavBar/MobileNavbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {generateBrandProductUrl} from "../../../../Core/util";


const Notebook = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook1.jpg';

const getCategoryList = graphql`
    query MobileClassmateBrandCategoryListQuery{
         catalogueCategoryList{
            id
            name
            subCategories{
              id
              name
            }
         }
    }
`;


const getSingleCategoryProducts = graphql`
    query MobileClassmateBrandSingleCategoryProductsQuery($categoryId:ID!){
         catalogueCategorySingleView(categoryId:$categoryId){
            categoryId
            name   
            products(first:10){
              edges{
                node{
                  id
                  name
                  price
                  featuredImage{
                    id
                    url
                  }
                  images(first:100){
                    edges{
                      node{
                        id
                        url
                      }
                    }
                  }
                }
              }
            }
          }
    }
`;


const getFilterProductsBySpec = graphql`
    query MobileClassmateBrandFilterProductsBySpecQuery($categoryId:ID!,$filters:String,$sortOrder:String){
         catalogueProductsFilter(categoryId:$categoryId,filters:$filters,sortOrder:$sortOrder){
              id
              name
              price
              featuredImage{
                id
                url
              }
              images(first:100){
                edges{
                  node{
                    id
                    url
                  }
                }
              }
          }
    }
`;


class MobileClassmateBrand extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selection : 1,
            open_drawer:false,
            selected_filter_btn:"",
            selected_subcategory:{},
            category_list:[],
            selected_category:{
                id:"",
                name:"Category"
            },
            size_list:[
                {id:"297x210",name:"Long Notebook"},
                {id:"240x180",name:"Short Notebook"}
            ],
            selected_size:{},
            binding_list:[
                {id:"BPCS",name:"Center-Stapled"},
                {id:"Wiro",name:"Spiral"}
            ],
            selected_binding:{},
            page_list:[
                {id:"140",name:"140 Pages"},
                {id:"172",name:"172 Pages"}
            ],
            selected_page:{},
            ruling_list:[
                {id:"Single Line",name:"Ruled"},
                {id:"Unruled",name:"Unruled"}
            ],
            selected_ruling:{},
            category_id:"",
            products:[],
            product_list:[]

        };
    }


    componentWillMount(){
        this.setState({
            category_id:this.props.match.params.id
        },()=>{
            this.getCategoryList();

        });
    };

    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.catalogueCategoryList !== null && data.catalogueCategoryList.length > 0){
                    let selected_category = {...this.state.selected_category};
                    let category_id=this.state.category_id;
                    let selected_subcategory={...this.state.selected_subcategory};
                    let found = data.catalogueCategoryList.find(function (element) {
                        return element.id === category_id;
                    });
                    if(found){
                        selected_category = found;
                        selected_subcategory=found.subCategories[0]?found.subCategories[0]:{}
                    }


                    this.setState({
                        category_list:data.catalogueCategoryList,
                        selected_category:selected_category,
                        selected_subcategory:selected_subcategory
                    },()=>{
                        this.getSingleCategoryProductsList();
                    })
                } else {
                    this.setState({
                        category_list:[],
                        selected_category:{},
                        selected_subcategory:{}
                    })
                }

            });

    };

    getSingleCategoryProductsList = () =>{
        let variables = {
            categoryId:this.state.category_id
        };
        fetchQuery(environment, getSingleCategoryProducts, variables)
            .then(data => {
                if(data.catalogueCategorySingleView !== null && data.catalogueCategorySingleView.length > 0){
                    let tmp_products = [];
                    let product_list=[];
                    let subcategory_id=this.state.selected_subcategory.id;
                    let found = data.catalogueCategorySingleView.find(function (element) {
                        return element.categoryId === subcategory_id;
                    });
                    data.catalogueCategorySingleView.map((item,index)=>{
                        let list = [];
                        item.products.edges.map((product,product_index)=>{
                            list[product_index]= product.node;
                        });
                        tmp_products[index] = {
                            categoryId: item.categoryId,
                            name: item.name,
                            products:list
                        };
                    });
                    if(found){
                        found.products.edges.map((item,index)=>{
                            product_list[index] = item.node;
                        });

                    }


                    this.setState({
                        products:tmp_products,
                        product_list:product_list
                    })
                } else {
                    this.setState({
                        products:[],
                        product_list:[]
                    })
                }

        });
    };


    handleClose = (event,feild) => {
        // if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
        //     return;
        // }
        this.setState({
            [feild]:false
        });
    };


    handleMenuItemClick = (item,feild) => {

        this.setState({
            [feild]:item,
        });
    };

    openDrawer = (value) =>{
        this.setState({
            open_drawer:true,
            selected_filter_btn:value
        });
    };
    closeDrawer = (event) =>{
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            open_drawer:false,
            selected_filter_btn:""
        });
    };
    handleRadioBtnChane = (e,list,feild) =>{
        let index = list.findIndex(x => x.id === e.target.value);
        if(index !== -1) {
            this.handleMenuItemClick(list[index],feild);
        }
    };
    ApplyFilter = () => {
        this.props.history.push("/classmate-office-and-school-stationeries/"+this.state.category_id);
        let size = this.state.selected_size;
        let page = this.state.selected_page;
        let binding = this.state.selected_binding;
        let ruling = this.state.selected_ruling;
        if(Object.keys(size).length !== 0 || Object.keys(page).length !== 0 || Object.keys(binding).length !== 0 || Object.keys(ruling).length !== 0){
            let spec = {
                size:this.state.selected_size.id,
                page:this.state.selected_page.id,
                binding:this.state.selected_binding.id,
                ruling:this.state.selected_ruling.id
            };
            let variables = {
                categoryId:this.state.selected_subcategory.id,
                filters: JSON.stringify(spec),
                sortOrder:"DESCENDING"
            };
            fetchQuery(environment, getFilterProductsBySpec, variables)
                .then(data => {
                    if(data.catalogueProductsFilter !== null && data.catalogueProductsFilter.length > 0){
                        this.setState({
                            product_list:data.catalogueProductsFilter
                        },()=>{
                            this.closeDrawer();
                        })
                    } else {
                        this.setState({
                            product_list:[]
                        },()=>{
                            this.closeDrawer();
                        })
                    }

                });

        } else{
            let variables = {
                categoryId:this.state.category_id
            };
            fetchQuery(environment, getSingleCategoryProducts, variables)
                .then(data => {
                    if(data.catalogueCategorySingleView !== null && data.catalogueCategorySingleView.length > 0){
                        let tmp_products = [];
                        let product_list=[];
                        let subcategory_id=this.state.selected_subcategory.id;
                        let found = data.catalogueCategorySingleView.find(function (element) {
                            return element.categoryId === subcategory_id;
                        });
                        data.catalogueCategorySingleView.map((item,index)=>{
                            let list = [];
                            item.products.edges.map((product,product_index)=>{
                                list[product_index]= product.node;
                            });
                            tmp_products[index] = {
                                categoryId: item.categoryId,
                                name: item.name,
                                products:list
                            };
                        });
                        if(found){
                            found.products.edges.map((item,index)=>{
                                product_list[index] = item.node;
                            });

                        }


                        this.setState({
                            products:tmp_products,
                            product_list:product_list
                        },()=>{
                            this.closeDrawer();
                        })
                    } else {
                        this.setState({
                            products:[],
                            product_list:[]
                        },()=>{
                            this.closeDrawer();
                        })
                    }

                });
        }
    };

    handleSubCategoryChange = (e,parent_index) =>{
        let category = this.state.category_list[parent_index];

        let selected_scategory = category.subCategories.filter(subcategory => subcategory.id === e.target.value);

        if(selected_scategory){
           this.setState({
               selected_subcategory:selected_scategory[0],
               selected_category:category,
               category_id:category.id
           })
        }

    };
    resetFilter = () =>{
      this.setState({
          selected_size:{},
          selected_page:{},
          selected_binding:{},
          selected_ruling:{},
      })
    };

    render() {
        return (
            <div className="filterbar_component">
                <MobileNavbar />
                <Card className="filterbar_card">
                    <CardContent style={{paddingBottom:'16px'}} className="filterbar_card_content">
                        <div className="mobile_filterbar_container">
                            <ButtonGroup color="primary" aria-label="outlined primary button group" className="filterbar_btn_group">
                                <Button onClick={()=>this.openDrawer("SORT")}>SORT</Button>
                                <Button onClick={()=>this.openDrawer("FILTER")}>FILTER</Button>
                            </ButtonGroup>
                        </div>
                    </CardContent>
                    <Drawer anchor={this.state.selected_filter_btn === "SORT"?"bottom":"top"} open={this.state.open_drawer} onClose={(event)=>this.closeDrawer(false)}>
                        <div>
                            <Paper style={{marginTop:'55px'}}>
                                <div className="filter_appbar">
                                    <IconButton aria-label="delete" onClick={(e)=>this.closeDrawer(e)}>
                                        <CloseIcon />
                                    </IconButton>
                                    <h4>FILTER</h4>
                                    <Button className="reset_btn" onClick={this.resetFilter}>RESET</Button>
                                </div>
                            </Paper>
                            {
                                this.state.selected_filter_btn === "SORT"?"SORT":(
                                    <div className="filterbar_filter_tab">
                                        <div>
                                            <div>
                                                <ExpansionPanel >
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography>Product Category</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails  style={{paddingLeft:0,paddingRight:0}}>
                                                        <List  subheader={<li />} className="mobile_category_menu">
                                                            {
                                                                this.state.category_list.map((parent_category,parent_index)=>{

                                                                    return(
                                                                        <li key={parent_index} className="mobile_category_listSection">
                                                                            <ul  className="mobile_subcategory_list">
                                                                                <ListItem>
                                                                                    <ListItemText primary={parent_category.name} />
                                                                                </ListItem>
                                                                                {
                                                                                    parent_category.subCategories.length > 0 && (
                                                                                        <FormControl component="fieldset" >
                                                                                            <RadioGroup
                                                                                                aria-label="subcategory"
                                                                                                name="subcategory"
                                                                                                value={this.state.selected_subcategory.id}
                                                                                                onChange={(e)=>this.handleSubCategoryChange(e,parent_index)}
                                                                                                style={{marginLeft:'2rem'}}
                                                                                            >
                                                                                                {
                                                                                                    parent_category.subCategories.map((subCategory,child_index)=>{
                                                                                                        return(
                                                                                                            <FormControlLabel
                                                                                                                key={child_index}
                                                                                                                value={subCategory.id}
                                                                                                                control={<Radio color="default" checked={this.state.selected_subcategory.id===subCategory.id}/>}
                                                                                                                label={subCategory.name}
                                                                                                            />
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </RadioGroup>
                                                                                        </FormControl>
                                                                                    )
                                                                                }
                                                                            </ul>
                                                                        </li>
                                                                    )
                                                                })
                                                            }

                                                        </List>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>Size</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <FormControl component="fieldset" >
                                                            <RadioGroup
                                                                aria-label="size"
                                                                name="size"
                                                                value={this.state.selected_size.id}
                                                                onChange={(e)=>this.handleRadioBtnChane(e,this.state.size_list,"selected_size")}
                                                            >
                                                                {
                                                                    this.state.size_list.map((item,index)=>{
                                                                        return(
                                                                            <FormControlLabel
                                                                                key={index}
                                                                                value={item.id}
                                                                                control={<Radio color="default" checked={this.state.selected_size.id === item.id}/>}
                                                                                label={item.name}
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel3a-content"
                                                        id="panel3a-header"
                                                    >
                                                        <Typography>Binding</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <FormControl component="fieldset" >
                                                            <RadioGroup
                                                                aria-label="binding"
                                                                name="binding"
                                                                value={this.state.selected_binding.id}
                                                                onChange={(e)=>this.handleRadioBtnChane(e,this.state.binding_list,"selected_binding")}
                                                            >
                                                                {
                                                                    this.state.binding_list.map((item,index)=>{
                                                                        return(
                                                                            <FormControlLabel
                                                                                key={index}
                                                                                value={item.id}
                                                                                control={<Radio color="default" checked={this.state.selected_binding.id === item.id}/>}
                                                                                label={item.name}
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel4a-content"
                                                        id="panel4a-header"
                                                    >
                                                        <Typography>Pages</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <FormControl component="fieldset" >
                                                            <RadioGroup
                                                                aria-label="page"
                                                                name="page"
                                                                value={this.state.selected_page.id}
                                                                onChange={(e)=>this.handleRadioBtnChane(e,this.state.page_list,"selected_page")}
                                                            >
                                                                {
                                                                    this.state.page_list.map((item,index)=>{
                                                                        return(
                                                                            <FormControlLabel
                                                                                key={index}
                                                                                value={item.id}
                                                                                control={<Radio color="default" checked={this.state.selected_page.id === item.id}/>}
                                                                                label={item.name}
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel5a-content"
                                                        id="panel5a-header"
                                                    >
                                                        <Typography>Ruling</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <FormControl component="fieldset" >
                                                            <RadioGroup
                                                                aria-label="ruling"
                                                                name="ruling"
                                                                value={this.state.selected_ruling.id}
                                                                onChange={(e)=>this.handleRadioBtnChane(e,this.state.ruling_list,"selected_ruling")}
                                                            >
                                                                {
                                                                    this.state.ruling_list.map((item,index)=>{
                                                                        return(
                                                                            <FormControlLabel
                                                                                key={index}
                                                                                value={item.id}
                                                                                control={<Radio color="default" checked={this.state.selected_ruling.id === item.id}/>}
                                                                                label={item.name}
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </div>
                                            <div className="apply_filter_section">
                                                <Button variant="contained" className="apply_filter_btn" onClick={this.ApplyFilter}>Apply Filter</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Drawer>
                </Card>
                <div className="classmate_brand_container">
                    <Grid container className="mobile_product_section">
                        <Grid container spacing={0}>
                            {
                                this.state.product_list.length > 0 && this.state.product_list.map((item,index)=>{
                                    return(
                                        <Grid item  xs={12} key={index}>
                                            <Link to={generateBrandProductUrl(item.id,item.name)}>
                                                <Card>
                                                    <CardContent className="align_text product_cart_content">
                                                        <div className="classmate_image_section">
                                                            <img src={item.images.edges[0]?item.images.edges[0].node.url:Notebook} alt="product" className="classmate_product_image"/>
                                                        </div>
                                                        <div className="align_text product_card_action">
                                                            <Typography  component="h4" className="classmate_product_name">
                                                                {item.name}
                                                            </Typography>
                                                            <p  className="classmate_product_price">
                                                                Rs. {item.price}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    );
                                })
                            }
                            {
                                this.state.product_list.length === 0 && (
                                    <div style={{width: '100%',
                                        textAlign: 'center'}}>
                                        <p>No Products Available</p>
                                    </div>
                                )
                            }

                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
export default withRouter(MobileClassmateBrand);

