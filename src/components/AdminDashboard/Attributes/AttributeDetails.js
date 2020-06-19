import React from "react";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "../FormSpacer";

class AttributeDetails extends React.Component{

    state={
        attribute_form_data:{
            name:"",
            slug:""
        }
    };

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            attribute_form_data:nextProps.data
        })
    }

    componentWillMount(){
        this.setState({
            attribute_form_data:this.props.data
        })
    }


    render() {
        const { valueErrors } = this.props;
        return (
            <div>
                <Card>
                    <CardTitle title={"General Information"} />
                    <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Attribute Name"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.attribute_form_data.name}
                            onChange={(e)=>this.props.onChange(e,"name")}
                            error={valueErrors.field === "name"?!!valueErrors.field:null}
                            helperText={valueErrors.field === "name"?valueErrors.message:null}
                        />
                        <FormSpacer />
                        <TextField
                            id="outlined-basic"
                            label="Slug Name"
                            variant="outlined"
                            className="form_text_feild"
                            fullWidth
                            value={this.state.attribute_form_data.slug}
                            onChange={(e)=>this.props.onChange(e,"slug")}
                            error={valueErrors.field === "slug"?!!valueErrors.field:null}
                            helperText={valueErrors.field === "slug"?valueErrors.message:null}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default AttributeDetails;
