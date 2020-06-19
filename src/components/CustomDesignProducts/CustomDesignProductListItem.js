import React from "react";
import './CustomDesignProductListItem.css';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {Typography} from "@material-ui/core";


class CustomDesignProductListItem extends React.Component{

    render() {
        let product = this.props.product;
        return (
            <Grid item  md={3} xl={2} lg={3} sm={6} xs={6} className="ldp_product_item" >
                <div className="designItem">
                    <div className="ldp_product_img">
                        <img src={product.thumbnailUrl} style={{width: '100%'}} alt="thumbnail_image"/>
                    </div>
                    <span style={{
                        display: ' flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Fab color="primary" aria-label="add"

                         onClick={(event) => {
                             this.props.addDesign(event, product);
                         }}>
                        <AddIcon/>
                    </Fab>
                        <Typography style={{
                            fontSize: ' 11px',
                            color: '#ff6733'
                        }}>ADD TO PACK</Typography>
                        <i className="ri-heart-fill" style={{visibility:"hidden"}}/>
                    </span>
                </div>
            </Grid>
        );
    }
}

export default CustomDesignProductListItem;
