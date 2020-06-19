import React from "react";
import "./ClassmateBrand.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {fetchQuery} from "relay-runtime";
import graphql from "babel-plugin-relay/macro";
import environment from "../../../../Environment";
import {withRouter,Link} from "react-router-dom";
import Navbar from "../../../NavBar/Navbar";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import {generateBrandProductUrl} from "../../../../Core/util";
import DesktopFooter from "../../../Footer/footer";

const NotbookIcon = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook_icon.svg";
const Notebook = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/notebook1.jpg';

const getCategoryList = graphql`
    query ClassmateBrandCategoryListQuery{
         catalogueCategoryList{
            id
            name
            backgroundImage
            categoryIcon
            subCategories{
              id
              name
            }
         }
    }
`;


const getSingleCategoryProducts = graphql`
    query ClassmateBrandSingleCategoryProductsQuery($categoryId:ID!){
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
    query ClassmateBrandFilterProductsBySpecQuery($categoryId:ID!,$filters:String,$sortOrder:String){
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




class ClassmateBrand extends React.Component{
    constructor(props){
        super(props);
        this.anchorRef = React.createRef();
        this.sizeRef = React.createRef();
        this.bindingRef = React.createRef();
        this.pageRef = React.createRef();
        this.rulingRef = React.createRef();
        this.state={
            open_category_menu:false,
            open_size_dropdown:false,
            open_binding_dropdown:false,
            open_page_dropdown:false,
            open_ruling_dropdown:false,
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
            product_list:[],
            sub_categories:[],

        };
    }


    componentWillMount(){

        this.setState({
            category_id:this.props.match.params.id
        },()=>{
            this.getCategoryList();

        });

    };
    // componentWillReceiveProps(nextProps, nextContext) {
    //     this.setState({
    //         category_id:nextProps.match.params.id
    //     },()=>{
    //         // this.getSingleCategoryProductsList();
    //     })
    // }

    getCategoryList = () => {

        let variables = {};

        fetchQuery(environment, getCategoryList, variables)
            .then(data => {
                if(data.catalogueCategoryList !== null && data.catalogueCategoryList.length > 0){
                    let selected_category = {...this.state.selected_category};
                    let category_id=this.state.category_id;
                    let selected_subcategory={...this.state.selected_subcategory};
                    let subcategories = [];
                    let found = data.catalogueCategoryList.find(function (element) {
                        return element.id === category_id;
                    });
                    if(found){
                        selected_category = found;
                        selected_subcategory=found.subCategories[0]?found.subCategories[0]:{};
                        subcategories = found.subCategories;
                    }


                    this.setState({
                        category_list:data.catalogueCategoryList,
                        selected_category:selected_category,
                        selected_subcategory:selected_subcategory,
                        sub_categories:subcategories
                    },()=>{
                        this.getSingleCategoryProductsList();
                    })
                } else {
                    this.setState({
                        category_list:[],
                        selected_category:{},
                        selected_subcategory:{},
                        sub_categories:[]
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

    handleToggle = (feild) => {
        this.setState(
            prevState => {
                return {
                    [feild]: !prevState[feild],
                };
            }
        );
    };
    handleClose = (event,feild) => {
        // if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
        //     return;
        // }
        this.setState({
            [feild]:false
        });
    };
    handleListKeyDown = (event,feild) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.setState({
                [feild]:false
            });
        }
    };

    handleMenuItemClick = (item,feild,dialog) => {
        if(dialog === "open_category_menu"){
            this.setState({
                selected_subcategory:item.subCategories[0]?item.subCategories[0]:{},
                sub_categories:item.subCategories,
                category_id:item.id

            });
            this.props.history.push("/classmate-office-and-school-stationeries/"+item.id);
        }
        this.setState({
            [feild]:item,
            [dialog]:false
        },()=>{
            this.FilterProducts();
        });
    };
    FilterProducts = () =>{

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
                      })
                  } else {
                      this.setState({
                          product_list:[]
                      })
                  }

              });

      } else{
          this.getSingleCategoryProductsList();
      }

    };

    setSubCategory = (subcategory) => {
        let product_list = [];

        let found = this.state.products.find(function (element) {
            return element.categoryId === subcategory.id;
        });
        if(found){
            product_list=found.products
        }
        this.setState({
            selected_subcategory:subcategory,
            product_list:product_list
        })
    };


    render() {
        return (
            <div className="classmate_brand_component">
                <Navbar />
                <Card className="filterbar_section_card">
                    <CardContent style={{paddingBottom:'16px'}}>
                        <Container maxWidth={"lg"} className="filterbar_container">
                            <div>
                                <Button
                                    ref={this.anchorRef}
                                    aria-controls={this.state.open_category_menu ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={()=>this.handleToggle("open_category_menu")}
                                    className="category_menu_btn"
                                >
                                    <ArrowBackIcon className="back_arrow_icon" onClick={()=>{
                                        this.props.history.push("/classmate-office-and-school-stationeries");
                                    }}/>
                                    {this.state.selected_category.name}
                                    {this.state.open_category_menu?  <ExpandLessIcon className="up_dow_arrow_icon"/>:<ExpandMoreIcon className="up_dow_arrow_icon"/> }
                                </Button>
                                <Popper open={this.state.open_category_menu} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={(event) => this.handleClose(event,"open_category_menu")}>
                                                    <MenuList autofocusitem={this.state.open_category_menu? 1 : 0} id="menu-list-grow" onKeyDown={(event)=>this.handleListKeyDown(event,"open_category_menu")}>
                                                        {
                                                            this.state.category_list.map((item,index)=>{
                                                                return(
                                                                    <MenuItem
                                                                        key={index}
                                                                        onClick={() => this.handleMenuItemClick(item,"selected_category","open_category_menu")}>
                                                                        {item.name}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                            <div className="specification_dropdown_section">
                                <div className="dropdown_section">
                                    <p className="dropdown_label">SIZE :</p>
                                    <Button
                                        ref={this.sizeRef}
                                        aria-controls={this.state.open_size_dropdown ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={()=>this.handleToggle("open_size_dropdown")}
                                        className="category_menu_btn"
                                    >
                                        {Object.keys(this.state.selected_size).length === 0 ? "--Select--":this.state.selected_size.name}
                                        {this.state.open_size_dropdown?  <ExpandLessIcon className="up_dow_arrow_icon"/>:<ExpandMoreIcon className="up_dow_arrow_icon"/> }
                                    </Button>
                                    <Popper open={this.state.open_size_dropdown} anchorEl={this.sizeRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={(event) => this.handleClose(event,"open_size_dropdown")}>
                                                        <MenuList autofocusitem={this.state.open_size_dropdown? 1 : 0} id="menu-list-grow" onKeyDown={(event)=>this.handleListKeyDown(event,"open_size_dropdown")}>
                                                            {
                                                                this.state.size_list.map((item,index)=>{
                                                                    return(
                                                                        <MenuItem
                                                                            key={index}
                                                                            onClick={() => this.handleMenuItemClick(item,"selected_size","open_size_dropdown")}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                                <div className="dropdown_section">
                                    <p className="dropdown_label">BINDING :</p>
                                    <Button
                                        ref={this.bindingRef}
                                        aria-controls={this.state.open_binding_dropdown ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={()=>this.handleToggle("open_binding_dropdown")}
                                        className="category_menu_btn"
                                    >
                                        {Object.keys(this.state.selected_binding).length === 0 ? "--Select--":this.state.selected_binding.name}
                                        {this.state.open_binding_dropdown?  <ExpandLessIcon className="up_dow_arrow_icon"/>:<ExpandMoreIcon className="up_dow_arrow_icon"/> }
                                    </Button>
                                    <Popper open={this.state.open_binding_dropdown} anchorEl={this.bindingRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener  onClickAway={(event) => this.handleClose(event,"open_binding_dropdown")}>
                                                        <MenuList autofocusitem={this.state.open_binding_dropdown? 1 : 0} id="menu-list-grow" onKeyDown={(event)=>this.handleListKeyDown(event,"open_binding_dropdown")}>
                                                            {
                                                                this.state.binding_list.map((item,index)=>{
                                                                    return(
                                                                        <MenuItem
                                                                            key={index}
                                                                            onClick={() => this.handleMenuItemClick(item,"selected_binding","open_binding_dropdown")}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                                <div className="dropdown_section">
                                    <p className="dropdown_label">PAGE :</p>
                                    <Button
                                        ref={this.pageRef}
                                        aria-controls={this.state.open_page_dropdown ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={()=>this.handleToggle("open_page_dropdown")}
                                        className="category_menu_btn"
                                    >
                                        {Object.keys(this.state.selected_page).length === 0 ? "--Select--":this.state.selected_page.name}
                                        {this.state.open_page_dropdown?  <ExpandLessIcon className="up_dow_arrow_icon"/>:<ExpandMoreIcon className="up_dow_arrow_icon"/> }
                                    </Button>
                                    <Popper open={this.state.open_page_dropdown} anchorEl={this.pageRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener  onClickAway={(event) => this.handleClose(event,"open_page_dropdown")}>
                                                        <MenuList autofocusitem={this.state.open_page_dropdown? 1 : 0} id="menu-list-grow" onKeyDown={(event)=>this.handleListKeyDown(event,"open_page_dropdown")}>
                                                            {
                                                                this.state.page_list.map((item,index)=>{
                                                                    return(
                                                                        <MenuItem
                                                                            key={index}
                                                                            onClick={() => this.handleMenuItemClick(item,"selected_page","open_page_dropdown")}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                                <div className="dropdown_section">
                                    <p className="dropdown_label">RULING :</p>
                                    <Button
                                        ref={this.rulingRef}
                                        aria-controls={this.state.open_ruling_dropdown ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={()=>this.handleToggle("open_ruling_dropdown")}
                                        className="category_menu_btn"
                                    >
                                        {Object.keys(this.state.selected_ruling).length === 0 ? "--Select--":this.state.selected_ruling.name}
                                        {this.state.open_ruling_dropdown?  <ExpandLessIcon className="up_dow_arrow_icon"/>:<ExpandMoreIcon className="up_dow_arrow_icon"/> }
                                    </Button>
                                    <Popper open={this.state.open_ruling_dropdown} anchorEl={this.rulingRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={(event) => this.handleClose(event,"open_ruling_dropdown")}>
                                                        <MenuList autofocusitem={this.state.open_ruling_dropdown? 1 : 0} id="menu-list-grow" onKeyDown={(event)=>this.handleListKeyDown(event,"open_ruling_dropdown")}>
                                                            {
                                                                this.state.ruling_list.map((item,index)=>{
                                                                    return(
                                                                        <MenuItem
                                                                            key={index}
                                                                            onClick={() => this.handleMenuItemClick(item,"selected_ruling","open_ruling_dropdown")}>
                                                                            {item.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </div>
                        </Container>
                    </CardContent>
                </Card>
                <div className="classmate_brand_grid_section">
                    <Grid container className="classmate_brand_grid_container">
                        <Grid item md={3} lg={3} sm={3} className="left_column">
                            <Container maxWidth={"lg"} className="left_grid_container">
                                <div>
                                    <Grid container spacing={0}>
                                        {
                                            this.state.category_list.map((item,index)=>{
                                                return(
                                                    <Grid item xs={6} key={index}>
                                                        <ButtonBase
                                                            style={{
                                                                width:"100%",
                                                            }}

                                                            onClick={() => this.handleMenuItemClick(item,"selected_category","open_category_menu")}
                                                        >

                                                            <Paper className="main_category_grid">
                                                                <div className="category_icon_detail">
                                                                    <img src={item.categoryIcon?item.categoryIcon:NotbookIcon} alt="category_icon" className="main_category_icon"/>
                                                                    <p>{item.name}</p>
                                                                    <div className={this.state.selected_category.id === item.id ? "main_category_active" : "main_category_inactive"}/>
                                                                </div>
                                                            </Paper>

                                                        </ButtonBase>
                                                    </Grid>

                                                )
                                            })
                                        }

                                    </Grid>
                                </div>
                            </Container>
                            {
                                this.state.sub_categories.length > 0 && (
                                    <div>
                                        <h3 className="sub_category_heading">{this.state.selected_category.name} Types</h3>
                                        <List component="nav" aria-label="secondary mailbox folder">
                                            {
                                                this.state.sub_categories.map((category,index)=>{
                                                    return(
                                                        <ListItem
                                                            key={index}
                                                            button
                                                            selected={this.state.selected_subcategory.id === category.id}
                                                            onClick={()=>this.setSubCategory(category)}
                                                            className={this.state.selected_subcategory.id === category.id?"sub_category_active":"sub_category_inactive"}
                                                        >
                                                            <ListItemText primary={category.name} className="sub_category_list_item"/>
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </div>
                                )
                            }

                        </Grid>
                        <Grid item lg={9} md={9} sm={9} className="right_column">
                            <Container maxWidth={"lg"} className="right_grid_container">
                                <Grid container spacing={0}>
                                    {
                                        this.state.product_list.length > 0 && this.state.product_list.map((item,index)=>{
                                            return(
                                                <Grid item lg={3} md={4} sm={4} key={index}>
                                                    <Link to={generateBrandProductUrl(item.id,item.name)}>
                                                    <Card>
                                                        <CardContent className="align_text product_cart_content">
                                                            <div className="classmate_image_section">
                                                                <img src={item.images.edges[0]?item.images.edges[0].node.url:Notebook} alt="product" className="classmate_product_image"/>
                                                            </div>
                                                        </CardContent>
                                                        <CardActions className="align_text product_card_action">
                                                            <Typography  component="h4" className="classmate_product_name">
                                                                {item.name}
                                                            </Typography>
                                                            <p  className="classmate_product_price">
                                                                Rs. {item.price}
                                                            </p>

                                                        </CardActions>
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
                            </Container>
                        </Grid>
                    </Grid>
                </div>
                <DesktopFooter />
            </div>
        );
    }
}
export default withRouter(ClassmateBrand);

