import React from "react";
import './PressAndMedia.css'
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Media from "react-media";
import {small_screen} from "../../variables";
import MobileNavbar from "../NavBar/MobileNavbar";
import Navbar from "../NavBar/Navbar";
import DesktopFooter from "../Footer/footer";
import MobileFooterPage from "../Footer/MobileFooterPage";
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from "react-ga";

const Itc_Logo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Itc_Logo.jpg';


class PressAndMedia  extends  React.Component{
    componentWillMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Press And Media"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }

    render() {
        return(
            <MetaWrapper
                meta={{
                    description: "Press And Media",
                    title: "Press And Media",
                }}
            >
         <div>
            <Media query={{maxWidth:small_screen}} render={() =>
                (
                    <MobileNavbar />
                )}
            />
            <Media query={{minWidth:small_screen}} render={() =>
        (
            <Navbar />
        )}
        />
            <div className="press_Media_page">
                <Typography variant="h5" className="pressMediaTitle">Press and Media</Typography>

                <a href="https://www.itcportal.com/media-centre/press-reports-content.aspx?id=1979&amp;type=C&amp;news=ITC-sharpens-the-classroom-pitch" target="_blank" rel="noopener noreferrer">
                    <Paper className="Paper_Panel">
                        <Grid container>

                            <Grid item md={2} className="pressMediaGrid imgGrid">
                                <img src={Itc_Logo} alt="itc_logo"/>
                            </Grid>
                            <Grid item md={10} className="pressMediaGrid">
                                <h3>
                                    ITC sharpens the classroom pitch
                                </h3>
                                <p className="panel_description">Business Standard</p>
                                <p className="panel_time">May 22, 2018</p>
                            </Grid>
                        </Grid>

                        <div>

                        </div>
                    </Paper>

                </a>
                <a href="https://www.itcportal.com/media-centre/press-reports-content.aspx?id=1972&amp;type=C&amp;news=ITCs-notebook-biz-banks-on-critical-markets-like-TN" target="_blank" rel="noopener noreferrer">
                    <Paper className="Paper_Panel">
                        <Grid container>

                            <Grid item md={2} className="pressMediaGrid imgGrid">
                                <img src={Itc_Logo} alt="itc_logo"/>
                            </Grid>
                            <Grid item md={10} className="pressMediaGrid">
                                <h3>
                                    ITC's notebook biz banks on critical markets like TN
                                </h3>
                                <p className="panel_description">DT Next</p>
                                <p className="panel_time">May 09, 2018</p>
                            </Grid>
                        </Grid>

                        <div>

                        </div>
                    </Paper>

                </a>
                <a href="https://www.itcportal.com/media-centre/press-reports-content.aspx?id=1914&amp;type=C&amp;news=itc-rolls-out-customised-notebooks" target="_blank" rel="noopener noreferrer">
                    <Paper className="Paper_Panel">
                        <Grid container>

                            <Grid item md={2}  className="pressMediaGrid imgGrid">
                                <img src={Itc_Logo} alt="itc_logo"/>
                            </Grid>
                            <Grid item md={10} className="pressMediaGrid">
                                <h3>
                                    ITC rolls out customised notebooks
                                </h3>
                                <p className="panel_description">The Hindu Business Line</p>
                                <p className="panel_time">Nov 18, 2017</p>
                            </Grid>
                        </Grid>

                        <div>

                        </div>
                    </Paper>

                </a>

                <a href="https://www.itcportal.com/businesses/fmcg/education-and-stationery-products.aspx"
                   target="_blank" rel="noopener noreferrer">
                    <button type="button" className="button morebtn">More</button>
                </a>
            </div>
             <Media query={{maxWidth:small_screen}} render={() =>
                 (
                     <MobileFooterPage />
                 )}
             />
             <Media query={{minWidth:small_screen}} render={() =>
                 (
                     <DesktopFooter />
                 )}
             />
         </div>
            </MetaWrapper>
        )
    }

}
export default PressAndMedia
