import React from "react";
import "./VoucherDetails.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";


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

class VoucherDetails extends React.Component {

    state = {
        voucher_form_data: {
            discount_name: "",
            discount_code: "",
            discount_type: "FIXED",
            discount_value: 0,
            discount_uses: 0,
            startDate: new Date(),
            endDate: new Date(),
            MaxDiscountVal: 0,
            MinAmntSpend: 0,
            voucher_type: "VALUE",
            categories: [],
            collections: [],
            products: [],
            product_list: [],
            category_list: [],
            isActive:false,
            applyOncePerOrder:false
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            voucher_form_data: nextProps.data
        })
        if (this.state.voucher_form_data.discount_type === "FIXED") {
            document.getElementById("valueField1").style.display = "block";
            document.getElementById("valueField2").style.display = "none";
            if (!document.querySelector("fixed")) {
                document.getElementById("input-euro").classList.add("fixed");
            }

            document.getElementById("input-euro").classList.remove("percentage");
        } else {
            document.getElementById("valueField1").style.display = "none";
            document.getElementById("valueField2").style.display = "block";
            document.getElementById("input-euro").classList.add("percentage");
            document.getElementById("input-euro").classList.remove("fixed");
        }

    }

    componentWillMount() {
        this.setState({
            voucher_form_data: this.props.data
        })

    }

    componentDidMount() {

        document.getElementById("input-euro").classList.add("fixed");
        if (this.state.voucher_form_data.discount_type === "FIXED") {
            document.getElementById("valueField1").style.display = "block";
            document.getElementById("valueField2").style.display = "none";
            if (!document.querySelector("fixed")) {
                document.getElementById("input-euro").classList.add("fixed");
            }

            document.getElementById("input-euro").classList.remove("percentage");
        } else {
            document.getElementById("valueField1").style.display = "none";
            document.getElementById("valueField2").style.display = "block";
            document.getElementById("input-euro").classList.add("percentage");
            document.getElementById("input-euro").classList.remove("fixed");
        }
        // document.getElementById("productType").style.display = "none";
        // document.getElementById("categoryType").style.display = "none";
    }


    render() {
        const {valueErrors} = this.props;
        return (
            <div className="voucher_detail_component">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                <Card>
                    <CardTitle title={"General Information"}/>
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Discount Name"
                            variant="outlined"
                            type="text"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.voucher_form_data.discount_name}
                            onChange={(e) => this.props.onChange(e, "discount_name")}
                            error={valueErrors.field === "discount_name" ? !!valueErrors.field : null}
                            helperText={valueErrors.field === "discount_name" ? valueErrors.message : null}
                        />
                        <FormSpacer/>
                        <TextField
                            id="outlined-basic"
                            label="Discount code"
                            variant="outlined"
                            type="text"
                            className="form_text_feild"
                            inputProps={{maxLength:"12"}}
                            fullWidth
                            value={this.state.voucher_form_data.discount_code}
                            onChange={(e) => this.props.onChange(e, "discount_code")}
                            error={valueErrors.field === "discount_code" ? !!valueErrors.field : null}
                            helperText={valueErrors.field === "discount_code" ? valueErrors.message : null}
                        />
                    </CardContent>
                </Card>
                <FormSpacer/>
                <Card>
                    <CardTitle title={"Voucher Type"}/>
                    <CardContent>
                        <FormControl component="fieldset"
                            // className={classes.formControl}
                        >
                            <RadioGroup aria-label="voucher_type" name="voucher_type"
                                        value={this.state.voucher_form_data.voucher_type}

                                        onChange={(e) => this.props.onChange(e, "voucher_type")}
                            >
                                <FormControlLabel value="VALUE" control={<Radio/>} label="All Products"/>
                                <FormControlLabel value="PRODUCT" control={<Radio/>} label="Product"/>
                                <FormControlLabel value="CATEGORY" control={<Radio/>} label="Category"/>


                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>
                <FormSpacer/>
                <Card>
                    <CardTitle title={"Discount Type"}/>
                    <CardContent>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="discount_type" name="discount_type"
                                        value={this.state.voucher_form_data.discount_type}
                                        onChange={(e) => this.props.onChange(e, "discount_type")}
                            >
                                <FormControlLabel value="FIXED" control={<Radio/>} label="Fixed Amount"/>
                                <FormControlLabel value="PERCENTAGE" control={<Radio/>} label="Percentage"/>

                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>
                <FormSpacer/>
                <Card>
                    <CardTitle title={"Value"}/>
                    <CardContent>
                        <p id="valueField1">Values in Rupees</p>
                        <p id="valueField2">Values in Percentage</p>
                        <span className="input-euro right" id="input-euro">
                                        <TextField className="form_text_feild"
                                                   id="outlined-basic"
                                                   label="Discount Value"
                                                   variant="outlined"
                                                   type="number"
                                                   fullWidth
                                                   value={this.state.voucher_form_data.discount_value}
                                                   onChange={(e) => this.props.onChange(e, "discount_value")}
                                                   error={valueErrors.field === "discount_value" ? !!valueErrors.field : null}
                                                   helperText={valueErrors.field === "discount_value" ? valueErrors.message : null}

                                        />
                                    </span>
                        <FormSpacer/>
                        <TextField className="form_text_feild"
                                   id="outlined-basic"
                                   label="Max Discount Value"
                                   variant="outlined"
                                   type="number"
                                   fullWidth
                                   value={this.state.voucher_form_data.MaxDiscountVal}
                                   onChange={(e) => this.props.onChange(e, "MaxDiscountVal")}
                                   error={valueErrors.field === "MaxDiscountVal" ? !!valueErrors.field : null}
                                   helperText={valueErrors.field === "MaxDiscountVal" ? valueErrors.message : null}
                        />
                        <FormSpacer/>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.voucher_form_data.applyOncePerOrder}
                                    onChange={(e) => this.props.onChangeCheckbox(e,'applyOncePerOrder')}
                                    value={this.state.voucher_form_data.applyOncePerOrder}/>
                            }
                            label="Only once per order"
                        />
                        <p>If this option is disabled, discount will be counted for every eligible product</p>
                    </CardContent>
                </Card>
                <FormSpacer/>

                {this.state.voucher_form_data.voucher_type==="PRODUCT" && <Card id="productType">
                    <CardTitle title={"Products"}/>
                    <CardContent>
                        <FormControl variant="outlined"  className="form_feild">
                            <InputLabel id="demo-mutiple-checkbox-label" className="product_form_transition_label">
                                Products
                            </InputLabel>
                            <Select
                                id="demo-mutiple-checkbox"
                                value={this.state.voucher_form_data.products}
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
                                {this.state.voucher_form_data.product_list.map((productItem,index) => {
                                    const valueOptions = this.state.voucher_form_data.products.map(eachValue => eachValue.id);
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
                </Card>}
                <FormSpacer/>
                {this.state.voucher_form_data.voucher_type === "CATEGORY" && <Card>
                    <CardTitle title={"Categories"}/>
                    <CardContent>
                        <FormControl variant="outlined"  className="form_feild">
                            <InputLabel id="demo-mutiple-checkbox-label" className="product_form_transition_label">
                                Categories
                            </InputLabel>
                            <Select
                                id="demo-mutiple-checkbox"
                                value={this.state.voucher_form_data.categories}
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
                                {this.state.voucher_form_data.category_list.map((categoryItem,index) => {
                                    const valueOptions = this.state.voucher_form_data.categories.map(eachValue => eachValue.id);
                                    const isChecked = valueOptions.includes(categoryItem.id);
                                    return (
                                        <MenuItem key={index} value={categoryItem}>
                                            <Checkbox
                                                checked={isChecked}
                                                onClick={(e)=>this.props.onChangeSelect(e,"categories",categoryItem)}
                                            />
                                            <ListItemText primary={categoryItem.name} />
                                        </MenuItem>
                                    )
                                } )}
                            </Select>

                        </FormControl>
                    </CardContent>
                </Card>
                }
                <FormSpacer/>
                <Card >
                    <CardTitle title={"Minimum Requirements"}/>
                    <CardContent>
                        <TextField className="form_text_feild"
                                   id="outlined-basic"
                                   label="Minimum Amount Spend"
                                   variant="outlined"
                                   type="number"
                                   fullWidth
                                   value={this.state.voucher_form_data.MinAmntSpend}
                                   onChange={(e) => this.props.onChange(e, "MinAmntSpend")}
                                   error={valueErrors.field === "MinAmntSpend" ? !!valueErrors.field : null}
                                   helperText={valueErrors.field === "MinAmntSpend" ? valueErrors.message : null}

                        />

                    </CardContent>
                </Card>
                <FormSpacer/>
                <Card id="categoryType">
                    <CardTitle title={"Usage Limit"}/>
                    <CardContent>
                        <p>Limit number of times this discount can be used in total</p>
                        <TextField className="form_text_feild"
                                   id="outlined-basic"
                                   label="Usage Limit"
                                   variant="outlined"
                                   type="number"
                                   fullWidth
                                   value={this.state.voucher_form_data.discount_uses}
                                   onChange={(e) => this.props.onChange(e, "discount_uses")}
                                   error={valueErrors.field === "discount_uses" ? !!valueErrors.field : null}
                                   helperText={valueErrors.field === "discount_uses" ? valueErrors.message : null}

                        />

                    </CardContent>
                </Card>
                    </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardTitle title={"Visibility"} />
                        <CardContent>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="visibility" name="visibility"
                                            value={this.state.voucher_form_data.isActive}
                                            onChange={(e) => this.props.onChange(e, "isActive")}
                                >
                                    <FormControlLabel value={true} control={<Radio/>} label="Visible"/>
                                    <FormControlLabel value={false} control={<Radio/>} label="Hidden"/>

                                </RadioGroup>
                            </FormControl>

                        </CardContent>
                    </Card>
                    <FormSpacer/>
                    <Card>
                        <CardTitle title={"Active Dates"}/>
                        <CardContent>
                            <p>Start Date</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="start-date-picker-inline"
                                    label="Date picker inline"
                                    value={this.state.voucher_form_data.startDate}
                                    onChange={(e) => this.props.onChangeDate(e, "startDate")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <p>End Date</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="end-date-picker-inline"
                                    label="Date picker inline"
                                    value={this.state.voucher_form_data.endDate}
                                    onChange={(e) => this.props.onChangeDate(e, "endDate")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                        </CardContent>
                    </Card>
                    <FormSpacer/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default VoucherDetails;
