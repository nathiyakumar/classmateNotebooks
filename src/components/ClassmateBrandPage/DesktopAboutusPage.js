import React from "react";
import './DesktopAboutusPage.css';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Navbar from "../NavBar/Navbar";

class DesktopAboutusPage extends React.Component{

    render() {
        return(
            <div className="BrandPage">
                <Navbar />
                <div className="BrandBanner" style={{marginTop:' 50px'}}>
                    <Typography variant="h3" style={{paddingTop: '30px'}}>3D NOTEBOOKS</Typography>
                    <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/brandImg.png" className="classmate_brand_page_img" />
                </div>
                <Grid container spacing={3} style={{width:'100%'}}>
                    <Grid item xs={6} className="LeftSideGrid" >
                        <Typography variant="h4" style={{padding: '40px'}}>NOTEBOOK SERIES</Typography>
                        <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/NotebookSeries.png' className="seriesImg classmate_brand_page_img"/>
                    </Grid>
                    <Grid item xs={6} className="RightSideGrid" style={{padding:'0px',}}>
                        <Grid container spacing={3} style={{width:'100%'}}>
                            <Grid item xs={6} className="column1Grid" >
                                <Typography variant="h6">PUZZLES</Typography>
                                <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/Puzzles.png' className="classmate_brand_page_img" />
                            </Grid>
                            <Grid item xs={6} className="column2Grid" >
                                <Typography variant="h6">PENCILS AND PENS</Typography>
                                <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/Pencils&Pens.png' className="classmate_brand_page_img" />
                            </Grid>
                            <Grid item xs={6} className="column3Grid" >
                                <Typography variant="h6">ART STATIONERY</Typography>
                                <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/ART.png' className="classmate_brand_page_img" />
                            </Grid>
                            <Grid item xs={6} className="column4Grid" >
                                <Typography variant="h6">GEOMETRY BOX</Typography>
                                <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/geometry.png' className="classmate_brand_page_img" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        )
    }

}
export default DesktopAboutusPage
