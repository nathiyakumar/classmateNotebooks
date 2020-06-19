import React from "react";
import "./ShippingMethodDetails.css";
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
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";


const PlaceholderImage = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/placeholder255x255.png';


class ShippingMethodDetails extends React.Component {

    state = {
        shipping_form_data: {
            name: "",
            productTypes: {
                customized: false,
                nonCustomized: false
            },
            price: 0,
            gstInPercent: 0,
            charges: 0,
            minimumOrderPrice: 0,
            shippingZone: {},
            maximumOrderPrice: 0,
            type: "PRODUCT_TYPE_BASED",
            shippingZoneList: [],
            isEdit:false
            // description:"",
            // category_image:PlaceholderImage,
            // seoTitle:'',
            // seoDescription:'',
            // isSubcategory:false,
            // parent:'',
            // parent_category_list:[],
            // selected_parent_category:{}


        },


    };

    componentWillReceiveProps(nextProps, nextContext) {

        this.setState({
            shipping_form_data: nextProps.data
        })
    }

    componentWillMount() {

        this.setState({
            shipping_form_data: this.props.data
        })
    }


    render() {
        const {valueErrors, action} = this.props;
        return (
            <div className="shipping_detail_component">
                <Card>
                    <CardTitle title={"General Information"}/>
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Shipping Method Name"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.shipping_form_data.name}
                            onChange={(e) => this.props.onChange(e, "name")}
                            error={valueErrors.field === "name" ? !!valueErrors.field : null}
                            helperText={valueErrors.field === "name" ? valueErrors.message : null}
                        />

                            <FormSpacer/> <FormControl variant="outlined" className="form_feild">
                            <InputLabel id="demo-simple-select-outlined-label"
                                        className="product_form_transition_label">Select Shipping Zone
                            </InputLabel>
                            <Select
                                labelid="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.shipping_form_data.shippingZone.id}
                                onChange={(e) => this.props.onChangeSelect(e, "shippingZone", this.state.shipping_form_data.shippingZoneList)}
                                error={valueErrors.field === "shippingZone" ? !!valueErrors.field : null}
                                MenuProps={{
                                    getContentAnchorEl: null,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    style: {
                                        maxHeight: '20rem',
                                    },

                                }}
                                disabled={this.state.shipping_form_data.isEdit}
                                // InputProps={{
                                //     readOnly: this.state.shipping_form_data.isEdit === true,
                                // }}

                            >

                                {
                                    this.state.shipping_form_data.shippingZoneList.map((zoneItem, index) => {
                                        return (
                                            <MenuItem value={zoneItem.node.id}
                                                      key={index}>{zoneItem.node.name}</MenuItem>
                                        );
                                    })
                                }
                                 
                            </Select>
                            <FormHelperText
                                style={{color: '#f44336'}}>{valueErrors.field === "category" ? valueErrors.message : null}</FormHelperText>
                        </FormControl>
                    </CardContent>
                </Card>

                <FormSpacer/>
                <Card>
                    <CardTitle title={"Shipping Method Type"}/>
                    <CardContent>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="type" name="Type"
                                        value={this.state.shipping_form_data.type}


                            >
                                <FormControlLabel value="PRODUCT_TYPE_BASED" control={<Radio/>}
                                                  label="Product Type Based"/>


                            </RadioGroup>
                        </FormControl>
                        <h3>Product Types</h3>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.shipping_form_data.productTypes.customized}
                                    onChange={(e) => this.props.onChangeCheckbox(e, 'customized')}
                                    value={this.state.shipping_form_data.productTypes.nonCustomized}/>
                            }
                            label="Customized"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.shipping_form_data.productTypes.nonCustomized}
                                    onChange={(e) => this.props.onChangeCheckbox(e, 'nonCustomized')}
                                    value={this.state.shipping_form_data.productTypes.nonCustomized}/>
                            }
                            label="Non Customized"
                        />
                    </CardContent>
                </Card>
                <FormSpacer/>
                <Card>
                    <CardTitle title={"Price"}/>
                    <CardContent>
                        <TextField
                            type="number"
                            id="outlined-basic"
                            label="Shipping Price"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.shipping_form_data.price}
                            onChange={(e) => this.props.onChange(e, "price")}
                            error={valueErrors.field === "price" ? !!valueErrors.field : null}
                            helperText={valueErrors.field === "price" ? valueErrors.message : null}
                        />
                        <FormSpacer/>
                        <span className="input-euro right" id="input-euro">
                        <TextField
                            id="outlined-basic"
                            type="number"
                            label="GST In Percent"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.shipping_form_data.gstInPercent}
                            onChange={(e) => this.props.onChange(e, "gstInPercent")}
                            error={valueErrors.field === "gstInPercent" ? !!valueErrors.field : null}
                            helperText={valueErrors.field === "gstInPercent" ? valueErrors.message : null}
                        />
                        </span>
                        <FormSpacer/>
                        <TextField
                            type="number"
                            id="outlined-basic"
                            label="Charges"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.shipping_form_data.charges}
                            onChange={(e) => this.props.onChange(e, "charges")}
                            error={valueErrors.field === "charges" ? !!valueErrors.field : null}
                            helperText={valueErrors.field === "charges" ? valueErrors.message : null}
                        />
                        <FormSpacer/>

                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ShippingMethodDetails;
