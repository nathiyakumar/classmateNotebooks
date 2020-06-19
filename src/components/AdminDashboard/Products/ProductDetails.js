import React from "react";
import "./ProductDetails.css";
import CardTitle from "../CardTitle/CardTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';



const PlaceholderImage = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal:"left"
    }
};

class ProductDetails extends React.Component{
    state={
        product_form_data:{
            name:"",
            description:"",
            chargeTaxes:false,
            price:0,
            masterSku:"",
            taxRate:"",
            isActive:false,
            isFeatured:false,
            length:0,
            height:0,
            width:0,
            weight:0,

        },
        category_list: [],
        producttypes_list: [],
        collection_list: [],
        selected_product_type:{},
        selected_category:{},
        selected_collection:[],
        attributes_basedon_product_type:[],
        selected_attributes:[],
        product_image:[PlaceholderImage],
        selected_featured_image:[],
        branding:false,
        amazonLink:"",
        flipkartLink:"",
        classmateShopLink:""

    };
    componentWillReceiveProps(nextProps, nextContext){

        this.setState({
            product_form_data:nextProps.data.product_form_data,
            category_list: nextProps.data.category_list,
            producttypes_list: nextProps.data.producttypes_list,
            collection_list: nextProps.data.collection_list,
            selected_product_type:nextProps.data.selected_product_type,
            selected_category:nextProps.data.selected_category,
            selected_collection:nextProps.data.selected_collection,
            attributes_basedon_product_type:nextProps.data.attributes_basedon_product_type,
            selected_attributes:nextProps.data.selected_attributes,
            product_image:nextProps.data.product_image?nextProps.data.product_image:[],
            selected_featured_image:nextProps.data.selected_featured_image,
            branding:nextProps.data.branding,
            amazonLink:nextProps.data.amazonLink,
            flipkartLink:nextProps.data.flipkartLink,
            classmateShopLink:nextProps.data.classmateShopLink
        })
    }

    componentWillMount(){
        this.setState({
            product_form_data:this.props.data.product_form_data,
            category_list: this.props.data.category_list,
            producttypes_list: this.props.data.producttypes_list,
            collection_list: this.props.data.collection_list,
            selected_product_type:this.props.data.selected_product_type,
            selected_category:this.props.data.selected_category,
            selected_collection:this.props.data.selected_collection,
            attributes_basedon_product_type:this.props.data.attributes_basedon_product_type,
            selected_attributes:this.props.data.selected_attributes,
            product_image:this.props.data.product_image?this.props.data.product_image:[],
            selected_featured_image:this.props.data.selected_featured_image,
            branding:this.props.data.branding,
            amazonLink:this.props.data.amazonLink,
            flipkartLink:this.props.data.flipkartLink,
            classmateShopLink:this.props.data.classmateShopLink
        })
    }

    getSelectedAttributeId = (attribute_id) => {

        let attribute = this.state.selected_attributes.filter( function (user) {
            return user.id === attribute_id
          });    

        if(attribute.length > 0){

            return attribute[0].values[0].id;

        } else {
            return "";
        }

    };

    render() {
        const { valueErrors,action,openModal } = this.props;
        return (
            <div className="product_detail_component">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardTitle title={"General Information"} />
                            <CardContent>
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.product_form_data.name}
                                    onChange={(e)=>this.props.onChange(e,"name")}
                                    error={valueErrors.field === "name"?!!valueErrors.field:null}
                                    helperText={valueErrors.field === "name"?valueErrors.message:null}
                                />
                                <FormSpacer />
                                <TextField
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.product_form_data.description}
                                    onChange={(e)=>this.props.onChange(e,"description")}
                                    multiline={true}
                                    rows={4}
                                    error={valueErrors.field === "description"?!!valueErrors.field:null}
                                    helperText={valueErrors.field === "description"?valueErrors.message:null}
                                />
                            </CardContent>
                        </Card>
                        {
                            action === "edit" && (
                                <>
                                    <FormSpacer />
                                    <Card>
                                        <CardTitle title={"Images"}
                                                   toolbar={
                                                       <Button  variant="text" className="toolbar_buttons" component="label">
                                                           UPLOAD IMAGE
                                                           <input type="file"
                                                                  multiple={true}
                                                                  style={{display:'none'}}
                                                                  accept="image/png,image/jpeg,image/jpg"
                                                                  onChange={(e)=>this.props.handleImageUpload(e)}
                                                           />
                                                       </Button>
                                                   }
                                        />
                                        <CardContent>
                                            {
                                                Array.from(this.state.product_image).map((item,image_index)=>{
                                                    return(
                                                        <div className="product_image_section" key={image_index}>
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
                                                    );
                                                })
                                            }
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        }

                        <FormSpacer />
                        <Card>
                            <CardTitle title={"Pricing"} />
                            <CardContent>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.product_form_data.chargeTaxes}
                                                onChange={(e)=>this.props.onChangeCheckbox(e,"chargeTaxes")}
                                                      value={this.state.product_form_data.chargeTaxes} />
                                        }
                                        label="Charge taxes for this item"
                                    />
                                </FormGroup>
                                <FormSpacer />
                                <TextField
                                    id="outlined-basic"
                                    label="Price"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    type={"number"}
                                    value={this.state.product_form_data.price}
                                    onChange={(e)=>this.props.onChange(e,"price")}
                                    error={valueErrors.field === "price"?!!valueErrors.field:null}
                                    helperText={valueErrors.field === "price"?valueErrors.message:null}
                                />
                            </CardContent>
                        </Card>
                        {
                            Object.keys(this.state.selected_product_type).length > 0 && (
                                <>
                                    <FormSpacer />
                                    <Card>
                                        <CardTitle title={"Attributes"} />
                                        <CardContent>
                                            <FormLabel component="label" className="product_form_label">{this.state.attributes_basedon_product_type.length} Attributes</FormLabel>
                                            <FormSpacer />

                                                {
                                                    this.state.attributes_basedon_product_type.length > 0 &&
                                                    this.state.attributes_basedon_product_type.map((item,index)=>{

                                                        return(
                                                            <>
                                                            <Grid container spacing={3} key={index}>
                                                                <Grid item xs={6} className="product_attributes_label_section">
                                                                    <FormControl component="fieldset" className="form_feild " >
                                                                        <FormLabel component="div" className="product_attributes_label">{item.name}</FormLabel>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={6} className="product_attributes_value_section">
                                                                    <FormControl variant="outlined"  className="form_feild" style={{width:'100%'}}>
                                                                        <InputLabel  id="demo-simple-select-outlined-label" className="product_form_transition_label">
                                                                            {item.name}
                                                                        </InputLabel>
                                                                        <Select
                                                                            labelid="demo-simple-select-outlined-label"
                                                                            id="demo-simple-select-outlined"
                                                                            value={this.getSelectedAttributeId(item.id)}
                                                                            onChange={(e)=>this.props.onChangeAttribute(e,index,this.state.attributes_basedon_product_type[index])}
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
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                                <FormSpacer />
                                                            </>
                                                        )
                                                    })
                                                }
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        }
                        {
                            this.state.branding === true &&(
                                <>
                                    <FormSpacer />
                                    <Card>
                                        <CardTitle title={"Purchase Link"} />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Amazon Link"
                                                        variant="outlined"
                                                        className="form_text_feild"
                                                        fullWidth
                                                        value={this.state.amazonLink}
                                                        onChange={(e)=>this.props.onChange(e,"amazonLink")}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Flipkart Link"
                                                        variant="outlined"
                                                        className="form_text_feild"
                                                        fullWidth
                                                        value={this.state.flipkartLink}
                                                        onChange={(e)=>this.props.onChange(e,"flipkartLink")}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="ClassmateShop Link"
                                                        variant="outlined"
                                                        className="form_text_feild"
                                                        fullWidth
                                                        value={this.state.classmateShopLink}
                                                        onChange={(e)=>this.props.onChange(e,"classmateShopLink")}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        }
                        <FormSpacer />
                        <Card>
                            <CardTitle title={"Inventory"} />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="SKU (Stock Keeping Unit)"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            value={this.state.product_form_data.masterSku}
                                            onChange={(e)=>this.props.onChange(e,"masterSku")}
                                            error={valueErrors.field === "masterSku"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "masterSku"?valueErrors.message:null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Tax Rate"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            value={this.state.product_form_data.taxRate}
                                            onChange={(e)=>this.props.onChange(e,"taxRate")}
                                            error={valueErrors.field === "taxRate"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "taxRate"?valueErrors.message:null}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <FormSpacer />
                        <Card>
                            <CardTitle title={"Dimensions"} />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Length"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            type={"number"}
                                            value={this.state.product_form_data.length}
                                            onChange={(e)=>this.props.onChange(e,"length")}
                                            error={valueErrors.field === "length"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "length"?valueErrors.message:null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Height"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            type={"number"}
                                            value={this.state.product_form_data.height}
                                            onChange={(e)=>this.props.onChange(e,"height")}
                                            error={valueErrors.field === "height"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "height"?valueErrors.message:null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Width"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            type={"number"}
                                            value={this.state.product_form_data.width}
                                            onChange={(e)=>this.props.onChange(e,"width")}
                                            error={valueErrors.field === "width"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "width"?valueErrors.message:null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Weight"
                                            variant="outlined"
                                            className="form_text_feild"
                                            fullWidth
                                            type={"number"}
                                            value={this.state.product_form_data.weight}
                                            onChange={(e)=>this.props.onChange(e,"weight")}
                                            error={valueErrors.field === "weight"?!!valueErrors.field:null}
                                            helperText={valueErrors.field === "weight"?valueErrors.message:null}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardTitle title={"Organize Product"} />
                            <CardContent>
                                <FormControl variant="outlined"  className="form_feild">
                                    <InputLabel  id="demo-simple-select-outlined-label" className="product_form_transition_label">
                                        Product Type
                                    </InputLabel>
                                    <Select
                                        labelid="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.selected_product_type.id}
                                        onChange={(e)=>this.props.onChangeSelect(e,"selected_product_type",this.state.producttypes_list)}
                                        error={valueErrors.field === "product_type"?!!valueErrors.field:null}
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
                                            this.state.producttypes_list.map((producttype,index)=>{
                                                return(
                                                    <MenuItem value={producttype.id} key={index}>{producttype.name}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                    <FormHelperText style={{color: '#f44336'}}>{valueErrors.field === "product_type"?valueErrors.message:null}</FormHelperText>
                                </FormControl>
                                {/*<FormSpacer />*/}
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.branding}
                                                      onChange={(e)=>this.props.onChangeCheckbox(e,"branding")}
                                                      value={this.state.branding} />
                                        }
                                        label="Is this category Brand Cattegory?"
                                    />
                                </FormGroup>
                                <FormSpacer />
                                <FormControl variant="outlined"  className="form_feild">
                                    <InputLabel  id="demo-simple-select-outlined-label" className="product_form_transition_label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelid="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.selected_category.id}
                                        onChange={(e)=>this.props.onChangeSelect(e,"selected_category",this.state.category_list)}
                                        error={valueErrors.field === "category"?!!valueErrors.field:null}
                                        MenuProps={{
                                            getContentAnchorEl: null,
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal:"left"
                                            },
                                            style: {
                                                maxHeight: '20rem',
                                            },

                                        }}

                                    >
                                        {/*<MenuItem value="" style={{cursor: 'no-drop'}}>*/}
                                        {/*    <em>None</em>*/}
                                        {/*</MenuItem>*/}
                                        {
                                            this.state.category_list.map((categoryItem,index)=>{
                                                return(
                                                    <MenuItem value={categoryItem.id} key={index}>{categoryItem.name}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                    <FormHelperText style={{color: '#f44336'}}>{valueErrors.field === "category"?valueErrors.message:null}</FormHelperText>
                                </FormControl>
                                <FormSpacer />
                                <FormControl variant="outlined"  className="form_feild">
                                    <InputLabel  id="demo-simple-select-outlined-label" className="product_form_transition_label">
                                        Collections
                                    </InputLabel>
                                    <Select
                                        labelid="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.selected_collection}
                                        multiple

                                        renderValue={selected => (
                                            <div className={"chips"}>
                                                {selected.map((value,selected_index) => (
                                                    <div key={selected_index}>
                                                        {
                                                            value.name ? (
                                                                <Chip
                                                                    key={value.name}
                                                                    label={value.name}
                                                                    className={"chip"}
                                                                />
                                                            ):null

                                                        }
                                                    </div>

                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {this.state.collection_list.map((collectionItem,index) => {
                                            const valueOptions = this.state.selected_collection.map(eachValue => eachValue.id);
                                            const isChecked = valueOptions.includes(collectionItem.id);
                                            return (
                                                <MenuItem key={index} value={collectionItem}>
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onClick={(e)=>this.props.onChangeSelect(e,"selected_collection",collectionItem)}
                                                    />
                                                    <ListItemText primary={collectionItem.name} />
                                                </MenuItem>
                                            )
                                        } )}
                                    </Select>
                                    <FormHelperText>*Optional. Adding product to collection helps users find it</FormHelperText>
                                </FormControl>
                            </CardContent>
                        </Card>
                        <FormSpacer />
                        <Card>
                            <CardTitle title={"Visibility"} />
                            <CardContent>
                                <FormControl component="fieldset" className="form_feild">
                                    <RadioGroup aria-label="visibility" name="visibility"
                                                value={this.state.product_form_data.isActive}
                                                onChange={(e)=>this.props.onChangeRadio(e,"isActive")}>
                                        <FormControlLabel value={true} control={<Radio />} label="Visible" />
                                        <FormControlLabel value={false} control={<Radio />} label="Hidden" />
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                        </Card>
                        <FormSpacer />
                        <Card>
                            <CardTitle title={"Featured Product"} />
                            <CardContent>
                                <FormControl component="fieldset" className="form_feild">
                                    <RadioGroup aria-label="isFeatured" name="isFeatured"
                                                value={this.state.product_form_data.isFeatured}
                                                onChange={(e)=>this.props.onChangeRadio(e,"isFeatured")}>
                                        <FormControlLabel value={true} control={<Radio />} label="True" />
                                        <FormControlLabel value={false} control={<Radio />} label="False" />
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                        </Card>
                        {
                            action === "edit" && (
                                <>
                                    <FormSpacer />
                                    <Card>
                                        <CardTitle title={"Featured Image"}
                                                   toolbar={
                                                       <Button  variant="text" className="toolbar_buttons" onClick={openModal}>
                                                            CHOOSE IMAGE
                                                       </Button>
                                                   }
                                        />
                                        <CardContent>
                                            {
                                               this.state.selected_featured_image.length > 0 && this.state.selected_featured_image.map((item,index)=>{
                                                   return(

                                                       <div className="product_image_section" key={index}>
                                                           <img
                                                               src={item.url}
                                                               alt="product_image"
                                                               className="uploaded_product_image"
                                                           />
                                                       </div>
                                                   )
                                               })


                                            }
                                            {

                                                this.state.selected_featured_image.length === 0 && <p className="product_variant_image_description">Select a specific Featured image from product images</p>
                                            }
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ProductDetails;
