import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class  AttributeValueEditDialog extends React.Component{

    state={
        data:{
            id:'',
            value:""
        }
    };

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.attributeValue){
            this.setState({
                data:nextProps.attributeValue
            })
        }

    }


    componentDidMount(){
        let attributeValue = this.props.attributeValue;
        let tmp_data = {...this.state.data};
        if(attributeValue && attributeValue.value){
            tmp_data = attributeValue;
        }
        // tmp_data.value = attributeValue && attributeValue.value?attributeValue.value:"";
        // tmp_data.id = attributeValue && attributeValue.id?attributeValue.id:"";
        this.setState({
            data:tmp_data
        })
    }
    handleValueChanges = (e) => {
        let tmp_data = {...this.state.data};
        tmp_data.value = e.target.value;
        this.setState({
            data:tmp_data
        });
    };


    render() {
        const { attributeValue,onSubmit,onClose,open,valueErrors } =  this.props;
        return (
            <div>
                <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} fullWidth maxWidth="md">
                    <DialogTitle>
                        {attributeValue === null
                            ? "Add Value"
                            :"Edit Value"}
                    </DialogTitle>
                    <form>
                        <DialogContent>
                            <TextField
                                autoFocus
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                className="form_text_feild"
                                fullWidth
                                value={this.state.data.value}
                                onChange={this.handleValueChanges}
                                error={valueErrors.field === "value"?!!valueErrors.field:null}
                                helperText={valueErrors.field === "value"?valueErrors.message:null}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={()=>onSubmit(this.state.data)} >Save</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default AttributeValueEditDialog;
