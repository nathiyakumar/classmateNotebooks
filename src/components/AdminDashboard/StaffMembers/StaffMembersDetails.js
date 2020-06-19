import React from "react";
import "./StaffMembersDetails.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class staffMembersDetails extends React.Component {

    state = {
        staff_member_form_data: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            isAdmin:false,
            isEdited:false
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            staff_member_form_data: nextProps.data
        })


    }

    componentWillMount() {
        this.setState({
            staff_member_form_data: this.props.data
        })

    }


    render() {
        const {valueErrors} = this.props;
        return (
            <div className="staff_member_detail_component">
                <Card>
                    <CardTitle title={"Staff Member Overview"}/>
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
                                    value={this.state.staff_member_form_data.firstName}
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
                                    value={this.state.staff_member_form_data.lastName}
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
                                    value={this.state.staff_member_form_data.mobileNumber}
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
                                    value={this.state.staff_member_form_data.email}
                                    onChange={(e) => this.props.onChange(e, "email")}
                                    error={valueErrors.field === "email" ? !!valueErrors.field : null}
                                    helperText={valueErrors.field === "email" ? valueErrors.message : null}
                                />
                                <FormSpacer/>
                            </Grid>
                        </Grid>
                        {this.state.staff_member_form_data.isEdited === true ?
                            <>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.staff_member_form_data.isAdmin}
                                            onChange={(e) => this.props.onChangeCheckbox(e,'isAdmin')}
                                            value={this.state.staff_member_form_data.isAdmin}/>
                                    }
                                    label="IsAdmin"
                                />
                          {/*<p>If this option is disabled, discount will be counted for every eligible product</p>*/}
                                </>
                            :null
                        }
                    </CardContent>
                </Card>
                <FormSpacer/>

            </div>
        );
    }
}

export default staffMembersDetails;
