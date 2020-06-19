import React from "react";
import "./CollectionDetails.css";
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
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

const PlaceholderImage = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class CollectionDetails extends React.Component{

    state={
        collection_form_data:{
            name:"",
            description:"",
            collection_image:PlaceholderImage,
            seoTitle:'',
            seoDescription:'',
            isPublished:false,
            publicationDate:new Date(),
            products:[],
            product_list:[],
            isEditing:false,
        },

    };



    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            collection_form_data:nextProps.data,
            isEditing:nextProps.isEditing,

        })
    }

    componentWillMount(){

        this.setState({
            collection_form_data:this.props.data,
            isEditing:this.props.isEditing,
        })
    }


    render() {

        const { valueErrors } = this.props;
        return (
            <div className="collection_detail_component">
                <Card>
                    <CardTitle title={"General Information"} />
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Collection Name"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            type="text"
                            value={this.state.collection_form_data.name}
                            onChange={(e)=>this.props.onChange(e,"name")}
                            error={valueErrors.field === "name"?!!valueErrors.field:null}
                            helperText={valueErrors.field === "name"?valueErrors.message:null}
                        />
                        <FormSpacer />
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            type="text"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.collection_form_data.description}
                            onChange={(e)=>this.props.onChange(e,"description")}
                        />
                    </CardContent>
                </Card>
                <FormSpacer />
                {this.state.isEditing === true ? <div></div> :
                    <Card>
                        <CardTitle title={"Background image (optional)"}
                                   toolbar={
                                       <Button variant="text" className="toolbar_buttons" component="label">
                                           UPLOAD IMAGE
                                           <input type="file" style={{display: 'none'}}
                                                  accept="image/png,image/jpeg,image/jpg"
                                                  onChange={(e) => this.props.handleImageUpload(e)}/>
                                       </Button>
                                   }
                        />
                        <CardContent>
                            <div className="product_image_section">
                                <img
                                    src={this.state.collection_form_data.collection_image}
                                    alt="product_image"
                                    className="uploaded_product_image"
                                />
                                <div className="overlay">
                                    <IconButton className={"delete_product_image"} aria-label="delete"
                                                onClick={this.props.RemoveImage}>
                                        <DeleteIcon/>
                                    </IconButton>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                }

                  < FormSpacer />
                    < Card >
                    <CardTitle title={"Search Engine Preview"} />
                    <CardContent>
                        <p>Add search engine title and description to make this collection easier to find</p>
                        <TextField
                            id="outlined-basic"
                            label="Search engine title"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            type="text"
                            value={this.state.collection_form_data.seoTitle}
                            onChange={(e)=>this.props.onChange(e,"seoTitle")}
                        />
                        <FormSpacer />
                        <TextField
                            id="outlined-basic"
                            label="Search engine description"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            type="text"
                            rows={4}
                            multiline={true}
                            value={this.state.collection_form_data.seoDescription}
                            onChange={(e)=>this.props.onChange(e,"seoDescription")}
                        />
                    </CardContent>
                </Card>
                <FormSpacer />
                <Card>
                    <CardTitle title={"Published Details"} />
                    <CardContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.collection_form_data.isPublished}
                                    onChange={(e) => this.props.onChangeCheckbox(e,'isPublished')}
                                    value={this.state.collection_form_data.isPublished}/>
                            }
                            label="Is this collection is Published?"
                        />
                        <FormSpacer />
                        <h4>Publication Date</h4>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="start-date-picker-inline"
                                label="Published Date"
                                value={this.state.collection_form_data.publicationDate}
                                onChange={(e)=>this.props.onChange(e,"publicationDate")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </CardContent>
                </Card>
                <FormSpacer />
                {this.state.isEditing === true  &&
                    <Card>
                <CardTitle title={"Collection Products"}/>
                <CardContent>
                <FormControl variant="outlined"  className="form_feild">
                    <InputLabel id="demo-mutiple-checkbox-label" className="product_form_transition_label">
                    Products
                    </InputLabel>
                    <Select
                    id="demo-mutiple-checkbox"
                    value={this.state.collection_form_data.products}
                    multiple

                    renderValue={selected => (
                    <>
                        {selected.map((value,selected_index) => (
                            <span key={selected_index}>
                                                {
                                                    value.name ? (
                                                        <Chip
                                                            key={value.name}
                                                            label={value.name}
                                                            // className={"chip"}
                                                        />
                                                    ):null

                                                }
                                            </span>

                        ))}
                    </>
                )}
                    MenuProps={MenuProps}
                    >
                    {this.state.collection_form_data.product_list.map((productItem,index) => {
                        const valueOptions = this.state.collection_form_data.products.map(eachValue => eachValue.id);
                        const isChecked = valueOptions.includes(productItem.id);
                        return (
                            <MenuItem key={index} value={productItem}>
                                <Checkbox
                                    checked={isChecked}
                                    onClick={(e)=>this.props.onChangeSelect(e,"products",productItem)}
                                />
                                <ListItemText primary={productItem.name} />
                            </MenuItem>
                        )
                    } )}
                    </Select>

                    </FormControl>
                    </CardContent>
                    </Card>
                }

            </div>
        );
    }
}
export default CollectionDetails;
