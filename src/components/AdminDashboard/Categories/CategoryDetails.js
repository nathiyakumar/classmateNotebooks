import React from "react";
import "./CategoryDetails.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";

class CategoryDetails extends React.Component{

    state={
        category_form_data:{
            name:"",
            description:"",
            category_image:PlaceholderImage,
            seoTitle:'',
            seoDescription:'',
            isSubcategory:false,
            parent:'',
            parent_category_list:[],
            selected_parent_category:{},
            is_brand_category:false,
            is_active:false
        }
    };

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            category_form_data:nextProps.data
        })
    }

    componentWillMount(){
        this.setState({
            category_form_data:this.props.data
        })
    }


    render() {
        const { valueErrors,action } = this.props;
        return (
            <div className="category_detail_component">
                <Card>
                    <CardTitle title={"General Information"} />
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Category Name"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.category_form_data.name}
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
                            value={this.state.category_form_data.description}
                            onChange={(e)=>this.props.onChange(e,"description")}
                        />
                        <FormSpacer />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.category_form_data.is_active}
                                    onChange={(e) => this.props.onChangeCheckbox(e,'is_active')}
                                    value={this.state.category_form_data.is_active}/>
                            }
                            label="Active"
                        />
                    </CardContent>
                </Card>
                {
                    action === "edit" && (
                        <>
                            <FormSpacer />
                            <Card>
                                <CardTitle title={"Background image (optional)"}
                                           toolbar={
                                               <Button  variant="text" className="toolbar_buttons" component="label">
                                                   UPLOAD IMAGE
                                                   <input type="file" style={{display:'none'}} accept="image/png,image/jpeg,image/jpg" onChange={(e)=>this.props.handleImageUpload(e)}/>
                                               </Button>
                                           }
                                />
                                <CardContent>
                                    <div className="product_image_section">
                                        <img
                                            src={this.state.category_form_data.category_image?this.state.category_form_data.category_image:PlaceholderImage}
                                            alt="product_image"
                                            className="uploaded_product_image"
                                        />
                                        <div className="overlay">
                                            <IconButton className={"delete_product_image"} aria-label="delete" onClick={this.props.RemoveImage}>
                                                <DeleteIcon />
                                            </IconButton>

                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )
                }
                <FormSpacer />
                <Card>
                    <CardTitle title={"Search Engine Preview"} />
                    <CardContent>
                        <p>Add search engine title and description to make this category easier to find</p>
                        <TextField
                            id="outlined-basic"
                            label="Search engine title"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.category_form_data.seoTitle}
                            onChange={(e)=>this.props.onChange(e,"seoTitle")}
                        />
                        <FormSpacer />
                        <TextField
                            id="outlined-basic"
                            label="Search engine description"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            rows={4}
                            multiline={true}
                            value={this.state.category_form_data.seoDescription}
                            onChange={(e)=>this.props.onChange(e,"seoDescription")}
                        />
                    </CardContent>
                </Card>
                <FormSpacer />
                <Card>
                    <CardTitle title={"Subcategories"} />
                    <CardContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.category_form_data.is_brand_category}
                                    onChange={(e) => this.props.onChangeCheckbox(e,'is_brand_category')}
                                    value={this.state.category_form_data.is_brand_category}/>
                            }
                            label="Is this category Brand Cattegory?"
                        />
                        <FormSpacer />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.category_form_data.isSubcategory}
                                    onChange={(e) => this.props.onChangeCheckbox(e,'isSubcategory')}
                                    value={this.state.category_form_data.isSubcategory}/>
                            }
                            label="Is this category subcategory?"
                        />
                        <FormSpacer />
                        {
                            this.state.category_form_data.isSubcategory === true &&  (
                                <FormControl variant="outlined"  className="form_feild">
                                    <InputLabel  id="demo-simple-select-outlined-label" className="product_form_transition_label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelid="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.category_form_data.selected_parent_category.id?this.state.category_form_data.selected_parent_category.id:''}
                                        onChange={(e)=>this.props.onChangeSelect(e,"selected_parent_category",this.state.category_form_data.parent_category_list)}
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

                                        {
                                            this.state.category_form_data.parent_category_list.map((categoryItem,index)=>{
                                                return(
                                                    <MenuItem value={categoryItem.id} key={index}>{categoryItem.name}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                    <FormHelperText style={{color: '#f44336'}}>{valueErrors.field === "category"?valueErrors.message:null}</FormHelperText>
                                </FormControl>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default CategoryDetails;
