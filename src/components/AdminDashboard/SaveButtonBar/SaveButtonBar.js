import React from "react";
import "./SaveButtonBar.css";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";

class SaveButtonBar extends React.Component{

    render() {
        const { onCancel, onSave } = this.props;
        return (
            <div className="save_btn_bar_component">
                <Container maxWidth={"lg"} className={"save_btn_bar_container"}>
                    {/*<div>*/}
                    {/*    <Button*/}
                    {/*        className="removeButton save_bar_btn"*/}
                    {/*        variant="text"*/}
                    {/*        onClick={onCancel}*/}
                    {/*    >*/}
                    {/*        Delete*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    <div>
                        <Button
                            className="cancelButton toolbar_buttons"
                            variant="text"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="saveButton save_bar_btn"
                            variant="contained"
                            onClick={onSave}
                        >
                            Save
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default SaveButtonBar;
