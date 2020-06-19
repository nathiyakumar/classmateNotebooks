import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";

const styles = theme => ({
    root: {
        display: "flex",
        height: 40,
        top: -35,
        position: "relative",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

    },
    item: {
        width: 12,
        height: 12,
        borderRadius: 12,
        // backgroundColor: theme.palette.background.paper,
        marginRight: 5,
        backgroundColor: '#FFE1D6',
        boxShadow:"none"

    },
    active: {

        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#FF6733',
        border: '2px solid #FFE1D6',
        boxShadow:"none"

    }
});

const Controls = ({
                      classes,
                      itemsnumber,
                      index,
                      handleChangeIndex
                  }) => {
    return (

        <div className={classes.root}>
            {[...Array(itemsnumber).keys()].map((item, i) => (
                <Paper
                    className={classNames({
                        [classes.item]: true,
                        [classes.active]: i === index
                    })}
                    key={i}
                    // elevation={12}
                    onClick={() => handleChangeIndex(i)}
                />
            ))}
        </div>
    );
};

export default withStyles(styles)(Controls);
