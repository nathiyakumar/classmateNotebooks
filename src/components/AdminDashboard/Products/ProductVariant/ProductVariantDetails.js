import React from "react";
import "./ProductVariantDetails.css";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardTitle from "../../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../../FormSpacer";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import PhotoIcon from '@material-ui/icons/Photo';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


const PlaceholderImage = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

class ProductVariantDetails extends React.Component{
    state={
      value:0,
      product_id:'',
      product_name:'',
      selling_price_override:'',
      cost_price_override:'',
      inventory:0,
      sku:'',
      variant_attribute_list:[],
      selected_variant_attributes:[],
      variants_list:[],
      selected_product_images:[],
      quantityAllocated:0


    };

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            product_id:nextProps.data.product_id,
            product_name:nextProps.data.product_name,
            selling_price_override:nextProps.data.selling_price_override,
            cost_price_override:nextProps.data.cost_price_override,
            inventory:nextProps.data.inventory,
            sku:nextProps.data.sku,
            variant_attribute_list:nextProps.data.variant_attribute_list,
            selected_variant_attributes:nextProps.data.selected_variant_attributes,
            variants_list:nextProps.data.variants_list,
            value:nextProps.data.value,
            selected_product_images:nextProps.data.selected_product_images,
            quantityAllocated:nextProps.data.quantityAllocated
        })
    }

    componentWillMount(){
        this.setState({
            product_id:this.props.data.product_id,
            product_name:this.props.data.product_name,
            selling_price_override:this.props.data.selling_price_override,
            cost_price_override:this.props.data.cost_price_override,
            inventory:this.props.data.inventory,
            sku:this.props.data.sku,
            variant_attribute_list:this.props.data.variant_attribute_list,
            selected_variant_attributes:this.props.data.selected_variant_attributes,
            variants_list:this.props.data.variants_list,
            value:this.props.data.value,
            selected_product_images:this.props.data.selected_product_images,
            quantityAllocated:this.props.data.quantityAllocated
        })
    }
    handleChange = (event, newValue) => {

        if(event.target.children.length > 0){
            let variant_id = event.target.children[0].id;
            this.props.handleTabChange(newValue,variant_id);
        }

    };

    render() {
        const {valueErrors,action,openModal}=this.props;
        return (
            <div className="product_variant_detail_component">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardTitle title={"Variants"} />
                            <CardContent style={{padding:0}}>
                                <div className="vertical_tab_root">
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        aria-label="Vertical tabs example"
                                        className="vertical_tab_tabs"
                                    >
                                        {
                                            this.state.variants_list.length > 0 && this.state.variants_list.map((item,index) =>{
                                                return(
                                                     <Tab label={item.name}
                                                          key={index}
                                                          {...a11yProps(index)}
                                                          icon={<img src={item.image_url?item.image_url:PlaceholderImage}
                                                          className="variant_image"
                                                          alt="variant"
                                                          id={item.id}
                                                          />}

                                                     />
                                                );
                                            })
                                        }
                                        <Tab label="New Variant"
                                             icon={<PhotoIcon style={{fontSize:'45px',fill: '#FF6733',marginRight:'10px',cursor:'none'}} id="new"/>}
                                             {...a11yProps(this.state.value)}

                                        />
                                    </Tabs>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card>
                            <CardTitle title={"General Information"} />
                            <CardContent>
                                <Grid container spacing={3}>
                                    {
                                        this.state.variant_attribute_list.length > 0 &&  this.state.variant_attribute_list.map((item,index)=>{
                                            return(
                                                <Grid item xs={12} md={6} key={index}>
                                                    <FormControl variant="outlined"  className="form_feild">
                                                        <InputLabel  id="demo-simple-select-outlined-label" className="product_form_transition_label">
                                                            {item.name}
                                                        </InputLabel>
                                                        <Select
                                                            labelid="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={this.state.selected_variant_attributes[index]? this.state.selected_variant_attributes[index].values[0].id : ''}
                                                            onChange={(e)=>this.props.onChangeAttribute(e,index,this.state.variant_attribute_list[index])}
                                                            error={valueErrors.field === "selected_variant_attributes"?!!valueErrors.field:null}
                                                            MenuProps={{
                                                                getContentAnchorEl: null,
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal:"left"
                                                                }
                                                            }}
                                                        >

                                                            {/*<MenuItem value="" style={{cursor: 'no-drop'}}>*/}
                                                            {/*    <em>None</em>*/}
                                                            {/*</MenuItem>*/}
                                                            {
                                                                item.values.map((attribute_values,attribute_index)=>{
                                                                    return(
                                                                        <MenuItem value={attribute_values.id} key={attribute_index}>{attribute_values.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                        <FormHelperText style={{color: '#f44336'}}>{valueErrors.field === "selected_variant_attributes"?valueErrors.message:null}</FormHelperText>

                                                    </FormControl>
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                        <FormSpacer/>
                        {
                            action === "edit" && (
                                <>
                                    <FormSpacer />
                                    <Card>
                                        <CardTitle title={"Images"}
                                                   toolbar={
                                                       <Button  variant="text" className="toolbar_buttons" onClick={openModal}>
                                                           CHOOSE IMAGE
                                                       </Button>
                                                   }
                                        />
                                        <CardContent>
                                            {
                                                this.state.selected_product_images.length > 0 && this.state.selected_product_images.map((item,index)=>{
                                                    return(

                                                        <div className="product_image_section" key={index}>
                                                            <img
                                                                src={item.url}
                                                                alt="product_image"
                                                                className="uploaded_product_image"
                                                            />
                                                            <div className="overlay">
                                                                <IconButton className={"delete_product_image"} aria-label="delete" onClick={()=>this.props.RemoveImage(item.id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>

                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                this.state.selected_product_images.length === 0 && <p className="product_variant_image_description">Select a specific variant image from product images</p>
                                            }
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        }
                        <FormSpacer/>
                        <Card>
                            <CardTitle title={"Pricing"} />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Selling price override"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            value={this.state.selling_price_override}
                                            onChange={(e)=>this.props.onChange(e,"selling_price_override")}
                                            helperText="optional"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Cost price override"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            value={this.state.cost_price_override}
                                            onChange={(e)=>this.props.onChange(e,"cost_price_override")}
                                            helperText="optional"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <FormSpacer/>
                        <Card>
                            <CardTitle title={"Stock"} />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Inventory"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            type="number"
                                            value={this.state.inventory}
                                            onChange={(e)=>this.props.onChange(e,"inventory")}
                                        />
                                        {
                                            action === "edit" && <p style={{fontSize: '14px', color: 'green'}}>Allocated
                                                quantity {this.state.quantityAllocated}</p>
                                        }
                                            </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="SKU(Stock keeping unit)"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            value={this.state.sku}
                                            onChange={(e)=>this.props.onChange(e,"sku")}
                                            error={valueErrors.field === "sku"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "sku"?valueErrors.message:null}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default ProductVariantDetails;
