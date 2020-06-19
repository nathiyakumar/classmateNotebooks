import React from "react";
import './SelectableTable.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,headCells } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{fontSize:"medium"}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: '#ff6733',
                backgroundColor: '#ff673330',
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    searchForm:{
        width:'100%'
    },
    searchTextFeild:{
        width:'100%',
        backgroundColor:'#fff'
    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected,selectedRows,deleteRows,handleSearch,SearchText } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >


            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (<>
                    <Typography className={"title"} variant="h6" id="tableTitle">
                        {props.table_title}
                    </Typography>
                    <form noValidate autoComplete="off" className={classes.searchForm}>
                        <TextField id="outlined-search"
                                   label="Search..."
                                   type="search" variant="outlined"
                                   className={classes.searchTextFeild}
                                   onChange={(e)=>{
                                       handleSearch(e);
                                   }}
                                   value={SearchText}
                        />
                    </form>
                </>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={()=>deleteRows(selectedRows)}>
                        <DeleteIcon style={{fill:'#ff6733'}}/>
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3),
        overflow: 'auto',
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    TableContainer:{
        width: '100%',
        overflowX: 'auto',
    },
    tableRow:{
        cursor:'pointer'
    }
});

 class SelectableTable extends React.Component{
     state={
         order:'asc',
         orderBy:'calories',
         selected:[],
         page:0,
         rowsPerPage:10,
         row_data:[],
         table_head:[],
         table_title:'',
         SearchText:'',
         filterData:[]
     };

     componentWillReceiveProps(nextProps, nextContext){

         this.setState({
             row_data:nextProps.table_row_data,
             filterData: nextProps.filterData,
             table_head:nextProps.table_head_data,
             table_title:nextProps.table_title,
             selected:[],
         })
     }

     componentWillMount() {

         this.setState({
             row_data:this.props.table_row_data,
             filterData:this.props.filterData,
             table_head:this.props.table_head_data,
             table_title:this.props.table_title,
             selected:[],
         })
     }

     handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order:isAsc ? 'desc' : 'asc',
            orderBy:property
        });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = this.state.row_data.map(n => n.id);
            this.setState({
                selected:newSelecteds,
            });
            return;
        }
        this.setState({
            selected:[],
        });
    };

    handleClick = (event, id) => {
        if(this.props.match.path  !==   "/admin-dashboard/customers"){
            this.props.history.push(
                this.props.edit_path(id)
            );
        }

    };


    handleCheckboxClick = (event, id) => {
        event.stopPropagation();
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page:newPage
        })
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            page:0,
            rowsPerPage:parseInt(event.target.value, 10)
        });
    };
     handleSearchChanges = (event) => {

             this.setState({
                 SearchText:event.target.value,
                 rowsPerPage:10,
                 page:0
             },()=>{
                 this.props.handleSearch(this.state.SearchText);
             })
     };
     deleteSelectedRows = (ids) => {
         this.setState({
             SearchText:"",
         },()=>{
             this.props.deleteRows(ids);
         });
     };

     render() {

         const { classes } = this.props;
         const isSelected = id => this.state.selected.indexOf(id) !== -1;
         // const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.row_data.length - this.state.page * this.state.rowsPerPage);
         return (
             <div className={classes.root}>
                 <Paper className={classes.paper}>
                     <EnhancedTableToolbar
                             numSelected={this.state.selected.length}
                             table_title={this.state.table_title}
                             selectedRows={this.state.selected}
                             deleteRows={this.deleteSelectedRows}
                             handleSearch={this.handleSearchChanges}
                             SearchText={this.state.SearchText}

                         />

                     <div className={classes.TableContainer}>
                         <Table
                             className={classes.table}
                             aria-labelledby="tableTitle"
                             size={'medium'}
                             aria-label="enhanced table"
                         >
                             <EnhancedTableHead
                                 classes={classes}
                                 numSelected={this.state.selected.length}
                                 order={this.state.order}
                                 orderBy={this.state.orderBy}
                                 onSelectAllClick={this.handleSelectAllClick}
                                 onRequestSort={this.handleRequestSort}
                                 rowCount={this.state.row_data.length}
                                 headCells={this.state.table_head}

                             />
                             <TableBody>
                                 {stableSort(this.state.filterData, getSorting(this.state.order, this.state.orderBy))
                                     .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                     .map((row, index) => {
                                         const isItemSelected = isSelected(row.id);
                                         const labelId = `enhanced-table-checkbox-${index}`;

                                         return (
                                             <TableRow
                                                 hover
                                                 onClick={event => this.handleClick(event, row.id)}
                                                 role="checkbox"
                                                 aria-checked={isItemSelected}
                                                 tabIndex={-1}
                                                 key={index}
                                                 selected={isItemSelected}
                                                 className={classes.tableRow}
                                             >
                                                 <TableCell >
                                                     <Checkbox
                                                         checked={isItemSelected}
                                                         inputProps={{ 'aria-labelledby': labelId }}
                                                         onClick={event =>
                                                             this.handleCheckboxClick(event, row.id)
                                                         }

                                                     />
                                                 </TableCell>
                                                 {
                                                     this.state.table_head.map((data_cell,cell_index)=>{
                                                         return (
                                                             <TableCell align="left" key={cell_index}>{row[data_cell.id]}</TableCell>
                                                         );
                                                     })
                                                 }
                                             </TableRow>
                                         );
                                     })}
                                 {/*{emptyRows > 0 && (*/}
                                 {/*    <TableRow style={{ height: (53) * emptyRows }}>*/}
                                 {/*        <TableCell colSpan={6} />*/}
                                 {/*    </TableRow>*/}
                                 {/*)}*/}
                             </TableBody>
                         </Table>
                     </div>
                     <TablePagination
                         rowsPerPageOptions={[5, 10, 25]}
                         component="div"
                         count={this.state.filterData.length}
                         rowsPerPage={this.state.rowsPerPage}
                         page={this.state.page}
                         onChangePage={this.handleChangePage}
                         onChangeRowsPerPage={this.handleChangeRowsPerPage}
                     />
                 </Paper>
             </div>
         );
     }


}


// export default withStyles(useStyles, { withTheme: true })(SelectableTable);

export default compose(
    withRouter,
    withStyles(useStyles, { withTheme: true })
)(SelectableTable);


