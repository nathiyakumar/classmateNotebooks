import React from "react";
import "../common.css";
import Card from "@material-ui/core/Card";
import CardTitle from "../CardTitle/CardTitle";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";


class ProductTypeAttributeList extends React.Component{
    render() {
        const { data,onValueAdd,removeValue,title,action_type } = this.props;
        return (
            <div>
                <Card>
                    <CardTitle
                        title={title}
                        toolbar={
                            <Button  variant="text" className="toolbar_buttons" onClick={onValueAdd}>
                                Assign Attributes
                            </Button>
                        }
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="admin_table_head" align="center">
                                    Attribute Name
                                </TableCell>
                                <TableCell className="admin_table_head" align="center">
                                    Slug
                                </TableCell>
                                <TableCell className="admin_table_head" align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.length > 0 ? (
                                    <>
                                        {
                                            data.map((item,index)=>{

                                                return (
                                                    <TableRow  key={index}>
                                                        <TableCell align="center">{item.name}</TableCell>
                                                        <TableCell align="center">{item.slug}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton onClick={(e)=>{
                                                                e.stopPropagation();
                                                                removeValue(item.id,action_type);
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
                </Card>
            </div>
        );
    }
}

export default ProductTypeAttributeList;
