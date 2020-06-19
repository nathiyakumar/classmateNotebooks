import React from "react";
import "./CustomerDetail.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";


class CustomerDetail extends React.Component {

    state = {
        customer_form_data: {
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            address_firstName: "",
            address_lastName: "",
            company: "",
            phone: "",
            address_line1: "",
            address_line2: "",
            city: "",
            area: "",
            pin_code: "",
            country: "",
            state: "",
            country_list: [],
            state_list: [],
            selected_country: {},
            selected_state: {}
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {

        this.setState({
            customer_form_data: nextProps.data
        })
    }

    componentWillMount() {

        this.setState({
            customer_form_data: this.props.data
        })
    }


    render() {

        const {valueErrors} = this.props;
        return (
            <div className="customer_detail_component">
                <Card>
                    <CardTitle title={"Customer Overview"}/>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    className="form_text_feild"
                                    required
                                    fullWidth
                                    value={this.state.customer_form_data.firstName}
                                    onChange={(e) => this.props.onChange(e, "firstName")}
                                    error={valueErrors.field === "firstName" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "firstName" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                    className="form_text_feild"
                                    required
                                    fullWidth
                                    value={this.state.customer_form_data.lastName}
                                    onChange={(e) => this.props.onChange(e, "lastName")}
                                    error={valueErrors.field === "lastName" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "lastName" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    inputProps={{maxLength: "10", pattern: "^[0–9]$"}}
                                    id="outlined-basic"
                                    label="Mobile Number"
                                    variant="outlined"
                                    className="form_text_feild"
                                    required
                                    fullWidth
                                    value={this.state.customer_form_data.mobileNumber}
                                    onChange={(e) => this.props.onChange(e, "mobileNumber")}
                                    error={valueErrors.field === "mobileNumber" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "mobileNumber" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="email"
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    required
                                    value={this.state.customer_form_data.email}
                                    onChange={(e) => this.props.onChange(e, "email")}
                                    error={valueErrors.field === "email" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "email" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <FormSpacer/>

                <FormSpacer/>
                <Card>
                    <CardTitle title={"Primary Address"}/>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.address_firstName}
                                    onChange={(e) => this.props.onChange(e, "address_firstName")}
                                    error={valueErrors.field === "address_firstName" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "address_firstName" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.address_lastName}
                                    onChange={(e) => this.props.onChange(e, "address_lastName")}
                                    error={valueErrors.field === "address_lastName" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "address_lastName" ? valueErrors.message : null}
                                />

                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Phone"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.phone}
                                    onChange={(e) => this.props.onChange(e, "phone")}
                                    error={valueErrors.field === "phone" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "phone" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Company"
                                    variant="outlined"
                                    className="form_text_field"
                                    fullWidth
                                    value={this.state.customer_form_data.company}
                                    onChange={(e) => this.props.onChange(e, "company")}
                                    error={valueErrors.field === "company" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "company" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Address Line 1"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.address_line1}
                                    onChange={(e) => this.props.onChange(e, "address_line1")}
                                    error={valueErrors.field === "address_line1" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "address_line1" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Address Line2"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.address_line2}
                                    onChange={(e) => this.props.onChange(e, "address_line2")}
                                    error={valueErrors.field === "address_line2" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "address_line2" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.city}
                                    onChange={(e) => this.props.onChange(e, "city")}
                                    error={valueErrors.field === "city" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "city" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Area"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.area}
                                    onChange={(e) => this.props.onChange(e, "area")}
                                    error={valueErrors.field === "area" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "area" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    inputProps={{maxLength: "6", pattern: "[0-9]{6}"}}
                                    id="outlined-basic"
                                    label="Pin Code"
                                    variant="outlined"
                                    className="form_text_feild"
                                    fullWidth
                                    value={this.state.customer_form_data.pin_code}
                                    onChange={(e) => this.props.onChange(e, "pin_code")}
                                    error={valueErrors.field === "pin_code" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "pin_code" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="form_feild">
                                    <InputLabel id="demo-simple-select-outlined-label"
                                                className="product_form_transition_label">
                                        State
                                    </InputLabel>
                                    <Select
                                        required
                                        labelid="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.customer_form_data.selected_state.stateAbbr ? this.state.customer_form_data.selected_state.stateAbbr : ''}
                                        onChange={(e) => this.props.onChangeSelect(e, "selected_state", this.state.customer_form_data.state_list)}
                                        error={valueErrors.field === "state" ? !!valueErrors.field : null}
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

                                    >
                                        {
                                            this.state.customer_form_data.state_list.map((stateItem, index) => {
                                                return (
                                                    <MenuItem value={stateItem.stateAbbr}
                                                              key={index}>{stateItem.stateAbbr}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                    <FormHelperText
                                        style={{color: '#f44336'}}>{valueErrors.field === "state" ? valueErrors.message : null}</FormHelperText>

                                </FormControl>
                                <FormSpacer/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="form_feild">
                                    <InputLabel id="demo-simple-select-outlined-label"
                                                className="product_form_transition_label">
                                        Country
                                    </InputLabel>
                                    <Select
                                        labelid="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.customer_form_data.selected_country.country ? this.state.customer_form_data.selected_country.country : ''}
                                        onChange={(e) => this.props.onChangeSelect(e, "selected_country", this.state.customer_form_data.country_list)}
                                        error={valueErrors.field === "country" ? !!valueErrors.field : null}
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

                                    >
                                        {
                                            this.state.customer_form_data.country_list.map((countryItem, index) => {
                                                return (
                                                    <MenuItem value={countryItem.country}
                                                              key={index}>{countryItem.country}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                    </CardContent>
                </Card>
                <FormSpacer/>
            </div>
        );
    }
}

export default CustomerDetail;
