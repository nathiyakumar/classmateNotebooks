import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

class AttributesListDialog extends React.Component{

    state={
        selected_attributes:[]
    };

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({
            selected_attributes:nextProps.selected_attributes
        })

    }


    componentDidMount(){
        this.setState({
            selected_attributes:this.props.selected_attributes
        })
    }

    handleAttributeSelect = (attribute, e, action_type) => {

            let selected_attributes = this.state.selected_attributes.slice();

            if(e.target.checked === true){
                selected_attributes.push(attribute);
                this.setState({
                    selected_attributes:selected_attributes
                })
            } else {
                let index = selected_attributes.map(x => {
                    return x.id;
                }).indexOf(attribute.id);

                selected_attributes.splice(index, 1);
                this.setState({
                    selected_attributes:selected_attributes
                })

            }
    };

    checkIndex = (selected_product_attributes,attribute) => {
        return selected_product_attributes.findIndex(function (e) {
            return e.id === attribute.id;
        });

    };
    render() {
        const { onClose,open,onSubmit,attributes_list,action_type } =  this.props;
        return (
            <div>
                <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} fullWidth maxWidth="md">
                    <DialogTitle>
                        Assign Attribute
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            {attributes_list.map((attribute, index) => {

                                const labelId = `checkbox-list-secondary-label-${index}`;
                                return (
                                    <ListItem key={index} button>
                                        <Checkbox
                                            edge="end"
                                            onClick={(e) => this.handleAttributeSelect(attribute, e,action_type)}
                                            checked={this.checkIndex(this.state.selected_attributes,attribute) !== -1}
                                            inputProps={{'aria-labelledby': labelId}}

                                        />
                                        <ListItemText id={labelId} primary={attribute.name} style={{marginLeft:'3%'}}/>
                                    </ListItem>
                                );
                            })
                            }
                        </List>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={()=>onSubmit(this.state.selected_attributes,action_type)} >Assign Attribute</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AttributesListDialog;
