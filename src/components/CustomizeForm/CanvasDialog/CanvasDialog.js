import React from "react";
import './CanvasDialog.css';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Canvas from '../Canvas/Canvas';
import MobileCanvas from "../Designs/Mobile/MobileCanvas";
import Media from 'react-media';
import {small_screen} from '../../../variables';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        [theme.breakpoints.down('xs')]: {
            left: theme.spacing(1),
            color: '#000'
        },
        // right: theme.spacing(1),
        // [theme.breakpoints.up('xs')]: {
        //     right: theme.spacing(1),
        // }
    },

});

const CanvasDialogTitle = withStyles(styles)(props => {
    const {
        // children,
        classes, onClose, saveCanvas
    } = props;
    return (
        <DialogTitle disableTypography className={classes.root}>
            {/*<Typography variant="h6">{children}</Typography>*/}
            {/*{onClose ? (*/}
            {/*    <>*/}
            {/*    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}  >*/}
            {/*        <CloseIcon />*/}
            {/*    </IconButton>*/}
            {/*        <button type="button" className="mobile_canvas_save_btn" onClick={saveCanvas}>Save</button>*/}
            {/*    </>*/}
            {/*) : null}*/}
            {onClose ? (
                <>
                    <IconButton edge="start" color="inherit" aria-label="close" onClick={onClose}
                                className={classes.closeButton}>
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        <span className="canvas_dialog_model_title">Notebook Designer</span>
                    </Typography>
                    <button type="button" className="mobile_canvas_save_btn" onClick={saveCanvas}>Save</button>
                </>
            ) : null}
        </DialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0),
        },
    },
}))(MuiDialogContent);

// const DialogActions = withStyles(theme => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);


class CanvasDialog extends React.Component {

    constructor(props) {
        super(props);
        this.child = null;
        this.state = {
            open: false
        }
    }


    componentWillMount() {


        this.setState({
            open: this.props.open_dialog
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            open: this.props.open_dialog
        })
    }


    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {

        this.setState({
            open: false
        })

        this.props.closeCanvasDialog();

    };

    saveCanvas = () => {
        this.child.SaveAndContinue()
    }


    render() {
        const {open} = this.state;
        const {CurrentIndex} = this.props;

        return (
            <div>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={open}
                        disableBackdropClick
                        disableEscapeKeyDown fullWidth={true} maxWidth={'xl'} id="canvas_dialog">
                    <Media query={{maxWidth: small_screen}} render={() =>
                        (
                            <CanvasDialogTitle id="customized-dialog-title" onClose={this.handleClose}
                                               saveCanvas={this.saveCanvas}/>
                        )}
                    />

                    <DialogContent dividers>

                        <Media query={{maxWidth: small_screen}} render={() =>
                            (
                                <MobileCanvas
                                    UserSelectedImages={this.props.UserSelectedImages}
                                    FormattedPreviewImages={this.props.FormattedPreviewImages}
                                    CurrentIndex={CurrentIndex}
                                    onClose={this.handleClose}
                                    saveCanvas={this.props.saveCanvas}
                                    converted_images={this.props.converted_images}
                                    ref={ref => this.child = ref}
                                />
                            )}
                        />
                        <Media query={{minWidth: small_screen}} render={() =>
                            (
                                <Canvas
                                    UserSelectedImages={this.props.UserSelectedImages}
                                    FormattedPreviewImages={this.props.FormattedPreviewImages}
                                    CurrentIndex={CurrentIndex}
                                    onClose={this.handleClose}
                                    saveCanvas={this.props.saveCanvas}
                                    converted_images={this.props.converted_images}
                                />
                            )}
                        />


                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default CanvasDialog;



