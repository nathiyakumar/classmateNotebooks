import React from "react";
import './Configuration.css';
import AdminDashboardIndex from "../AdminDashboardIndex";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link} from 'react-router-dom';
import {attributeSection, productTypeSection, staffMemberSection, shippingSection} from "../../../Core/util";


class Configuration extends React.Component{
    render() {
        return (
            <div>
                <AdminDashboardIndex active_page={"configuration"}>
                    <div className="configuration_component">
                        <Container maxWidth={"lg"} className={"configuration_container"}>
                             <h5 className="component_title">Configuration</h5>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Link to={attributeSection}>
                                        <Paper className="configuration_paper">
                                            <p className="configuration_paper_title">Attributes</p>
                                            <p  className="configuration_paper_description">Determine attributes used to create product types</p>
                                        </Paper>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to={productTypeSection}>
                                        <Paper className="configuration_paper">
                                            <p className="configuration_paper_title">Product Types</p>
                                            <p  className="configuration_paper_description">Define types of products you sell</p>
                                        </Paper>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to={staffMemberSection}>
                                        <Paper className="configuration_paper">
                                            <p className="configuration_paper_title">Staff Members</p>
                                            <p  className="configuration_paper_description">Manage your employees and their permissions</p>
                                        </Paper>
                                    </Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to={shippingSection}>
                                        <Paper className="configuration_paper">
                                            <p className="configuration_paper_title">Shipping Methods</p>
                                            <p  className="configuration_paper_description">Manage how you ship out orders</p>
                                        </Paper>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>

                </AdminDashboardIndex>
            </div>
        );
    }
}
export default Configuration;
