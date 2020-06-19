import React from "react";
import CardTitle from "../CardTitle/CardTitle";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class ProductVariantsList extends React.Component{
    render() {
        const { data,title,onProductVariantAdd,onProductVariantEdit,onAttributesEdit,removeProductVariant } = this.props;
        return (
            <div>
                <Card>
                    <CardTitle
                        title={title}
                        toolbar={
                            <div style={{display:'flex'}}>
                                <Button  variant="text" className="toolbar_buttons" onClick={onAttributesEdit}>
                                   EDIT ATTRIBUTES
                                </Button>
                                <Button  variant="text" className="toolbar_buttons" onClick={onProductVariantAdd} >
                                    ADD VARIANT
                                </Button>
                            </div>
                        }
                    />
                    <CardContent>
                        <p>Use variants for products that come in a variety of versions for example different sizes or colors</p>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="admin_table_head" align="left">
                                        Name
                                    </TableCell>
                                    <TableCell className="admin_table_head" align="left">
                                        Status
                                    </TableCell>
                                    <TableCell className="admin_table_head" align="left">SKU</TableCell>
                                    <TableCell className="admin_table_head" align="left">Price</TableCell>
                                    <TableCell className="admin_table_head" align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.length > 0 ? (
                                        <>
                                            {
                                                data.map((item,index)=>{
                                                    let product_variant = item.node;

                                                    return (
                                                        <TableRow
                                                            style={{cursor:"pointer"}}
                                                            onClick={()=>onProductVariantEdit(product_variant.id)}
                                                            key={index}>
                                                            <TableCell align="left">{product_variant.name}</TableCell>
                                                            <TableCell align="left">{product_variant.isAvailable ? "Available":"Unavailable"}</TableCell>
                                                            <TableCell align="left">{product_variant.sku}</TableCell>
                                                            <TableCell align="left">₹{product_variant.price}</TableCell>
                                                            <TableCell align="right">
                                                                <IconButton onClick={(e)=>{
                                                                    e.stopPropagation();
                                                                    removeProductVariant(product_variant.id);
                                                                }}>
                                                                    <DeleteIcon className="admin_delete_icon" />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                        </>
                                    ):(
                                        <TableRow>
                                            <TableCell colSpan={2}>No values found</TableCell>
                                        </TableRow>
                                    )
                                }

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ProductVariantsList;
