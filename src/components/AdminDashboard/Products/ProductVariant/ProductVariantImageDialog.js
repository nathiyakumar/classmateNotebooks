import React from "react";
import "./ProductVariantImageDialog.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class  ProductVariantImageDialog extends React.Component{

    checkImageId = (selected_product_images,id) => {
        if(selected_product_images.length > 0){
            let index = selected_product_images.findIndex(function (data) {
                return data.id === id;
            });
            if(index > -1){
                return true;
            } else {
                return false;
            }
            return selected_product_images.id;
        } else {
            return false;
        }
    };

    render() {
        const { onClose,open,closeModal,product_images,selected_product_images } =  this.props;
        return (
            <div >
                <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open} fullWidth maxWidth="md">
                    <DialogTitle>
                        Image selection
                    </DialogTitle>
                    <form>
                        <DialogContent className="product_variant_image_dialogs_content">
                            <div className="product_image_list">
                            {
                                product_images.map((item,index)=>{
                                    let selected = this.checkImageId(selected_product_images,item.id);
                                    let isSelected = selected ? "selected" : "";
                                    let className = "selectable " + isSelected;
                                    return (
                                        <div className="card" key={index}>
                                            <div className={className} onClick={()=>this.props.onImageSelected(item)}>
                                                <div className="content">
                                                    <img src={item.url} alt="product" className="product_images"/>
                                                </div>
                                                <div className="check"><span className="checkmark">✔</span></div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeModal}>Close</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ProductVariantImageDialog;
