import React from "react";
import "./ProductTypeDetails.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormSpacer from "../FormSpacer";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

class ProductTypeDetails extends React.Component{

    state={
        product_type_form_data:{
            name:"",
            isDigital:false,
            isCustomizable:false,
            taxType:"",
            taxRate:0,
            isShippingRequired:false,
            weight:0,
            hasVariants:false
        },
    };

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            product_type_form_data:nextProps.data
        })
    }

    componentWillMount(){
        this.setState({
            product_type_form_data:this.props.data
        })
    }

    render() {
        const { valueErrors,action } = this.props;
        return (
            <div className="product_type_detail_component">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <>
                            <Card>
                                <CardTitle title={"General Information"} />
                                <CardContent>
                                    <TextField
                                        id="outlined-basic"
                                        label="Product Type Name"
                                        variant="outlined"
                                        className="form_text_feild"
                                        fullWidth
                                        value={this.state.product_type_form_data.name}
                                        onChange={(e)=>this.props.onChangeFeild(e,"name")}
                                        error={valueErrors.field === "name"?!!valueErrors.field:null}
                                        helperText={valueErrors.field === "name"?valueErrors.message:null}
                                    />
                                    <FormSpacer />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.product_type_form_data.isDigital}
                                                onChange={(e) => this.props.onChangeCheckbox(e,'isDigital')}
                                                value={this.state.product_type_form_data.isDigital}

                                            />
                                        }
                                        label="IsDigital"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.product_type_form_data.isCustomizable}
                                                onChange={(e) => this.props.onChangeCheckbox(e,'isCustomizable')}
                                                value={this.state.product_type_form_data.isCustomizable}

                                            />
                                        }
                                        label="IsCustomizable"
                                    />
                                </CardContent>
                            </Card>
                            <FormSpacer />
                            <Card>
                                <CardTitle title={"Taxes"} />
                                <CardContent>
                                    <FormControl component="fieldset">
                                        <FormLabel component="label" className="product_type_form_label">Tax Type</FormLabel>
                                        <RadioGroup aria-label="tax_values" name="tax_values"
                                                    value={this.state.product_type_form_data.taxType}
                                                    onChange={(e)=>this.props.onChangeFeild(e,"taxType")}
                                        >
                                            <FormControlLabel value="FIXED" control={<Radio/>} label="Fixed Amount"/>
                                            <FormControlLabel value="PERCENTAGE" control={<Radio/>} label="Percentage"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormSpacer />
                                    <FormControl component="fieldset">
                                        <FormLabel component="label" className="product_type_form_label">Values in {this.state.product_type_form_data.taxType === "FIXED"? "Rupees": "Percentage"} </FormLabel>
                                        <FormSpacer />
                                    </FormControl>
                                    {
                                        this.state.product_type_form_data.taxType === "FIXED" && (
                                            <TextField
                                                id="outlined-basic"
                                                label="Tax Values"
                                                variant="outlined"
                                                className="form_text_feild"
                                                fullWidth
                                                value={this.state.product_type_form_data.taxRate}
                                                onChange={(e)=>this.props.onChangeFeild(e,"taxRate")}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                                                }}
                                            />
                                        )
                                    }
                                    {
                                        this.state.product_type_form_data.taxType === "PERCENTAGE" && (
                                            <TextField
                                                id="outlined-basic"
                                                label="Tax Values"
                                                variant="outlined"
                                                className="form_text_feild"
                                                fullWidth
                                                value={this.state.product_type_form_data.taxRate}
                                                onChange={(e)=>this.props.onChangeFeild(e,"taxRate")}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                }}
                                            />
                                        )
                                    }
                                    <FormSpacer />
                                    {
                                        action === "ADD" && (
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.product_type_form_data.hasVariants}
                                                        onChange={(e) => this.props.onChangeCheckbox(e,'hasVariants')}
                                                        value={this.state.product_type_form_data.hasVariants}
                                                    />
                                                }
                                                label="Product type uses Variant Attributes"
                                            />
                                        )
                                    }



                                </CardContent>
                            </Card>
                        </>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardTitle title={"Shipping"} />
                            <CardContent>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.product_type_form_data.isShippingRequired}
                                            onChange={(e) => this.props.onChangeCheckbox(e,'isShippingRequired')}
                                            value={this.state.product_type_form_data.isShippingRequired}/>
                                    }
                                    label="Is this product shippable?"
                                />

                                {
                                    this.state.product_type_form_data.isShippingRequired && (
                                        <>                                            <FormSpacer />
                                            <TextField
                                                id="outlined-basic"
                                                label="Weight"
                                                variant="outlined"
                                                className="form_text_feild"
                                                fullWidth
                                                value={this.state.product_type_form_data.weight}
                                                onChange={(e)=>this.props.onChangeFeild(e,"weight")}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                                }}
                                            />
                                        </>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ProductTypeDetails;
