import React from "react";
import './MblBrandPage.css';
import {ScrollSection, ScrollContainer} from 'react-onepage-scroll';
import {Typography} from "@material-ui/core";
import MobileNavbar from "../NavBar/MobileNavbar";


class MblBrandPage extends React.Component{
    componentDidMount() {

    }

    render() {
        return(

            <div className="mblBrandPage">
                <MobileNavbar />
                <ScrollContainer >
                    <ScrollSection style={{backgroundColor:"#ff6f4f",
                        backgroundRepeat: 'no-repeat',
                    }}
                                   pageId={0}  >
                        <div className="ScrollsectionDiv">
                            <Typography variant='h4' style={{marginTop:"70px",
                                textAlign:"center",    fontFamily:"'Montserrat', sans-serif",
                                fontWeight:"600"
                            }}>Classmate Range of Stationaries</Typography>
                            <Typography style={{marginTop:"35px",
                                textAlign:"center",    fontFamily:"'Montserrat', sans-serif",
                                fontWeight:"600"
                            }}>India's No.1 Notebook Brand</Typography>
                            <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/IN-Logo.png" style={{margin:' 15px auto',
                                display: 'block',width: '45%'
                            }} alt="brandimage"/> <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/classmateMblBrandImg.png" style={{margin:' 25px auto',
                            display: 'block',width: '100%'
                        }} alt="brandimage"/>
                        </div>


                    </ScrollSection>

                    <ScrollSection style={{backgroundColor:"#AEE4FF",
                        backgroundRepeat: 'no-repeat'}}
                                   pageId={1}>
                        <div className="ScrollsectionDiv">
                            <Typography className="section2brandTitle" variant="h5">Notebook Series</Typography>
                            <Typography className="section2brandSubTitle" >Starting from <b>₹275</b></Typography>
                            <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/mblNotebookSeries.png' className="mblNotebookSeries" alt="brandimage"/>
                            <span className="sec1Blob"></span>
                            <span style={{display:"block" , marginTop:"20px" ,padding: '10px'}}>
                        {/*<button className="Section2BrandBtn">VIEW PRODUCTS</button>*/}
                    </span>
                        </div>
                    </ScrollSection>

                    <ScrollSection style={{backgroundColor:"#FFE0C2",
                        backgroundRepeat: 'no-repeat'}}
                                   pageId={2}>
                        <div className="ScrollsectionDiv">
                            <Typography className="section2brandTitle" variant="h5">PUZZLES</Typography>
                            <Typography className="section2brandSubTitle" >Starting from <b>₹275</b></Typography>
                            <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/Puzzles.png' className="mblNotebookSeries" alt="brandimage"/>
                            <span style={{display:"block" , marginTop:"20px" ,padding: '10px'}}>
                        {/*<button className="Section2BrandBtn">VIEW PRODUCTS</button>*/}
                    </span>
                        </div>
                    </ScrollSection>
                    <ScrollSection style={{backgroundColor:"#9DCEB4",
                        backgroundRepeat: 'no-repeat'}}
                                   pageId={3}>
                        <div className="ScrollsectionDiv">
                            <Typography className="section2brandTitle" variant="h5">ART STATIONERY</Typography>
                            <Typography className="section2brandSubTitle" >Starting from <b>₹275</b></Typography>
                            <img src="https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/ART.png" className="mblNotebookSeries" style={{ width: '60%'}} alt="brandimage"/>
                            <span style={{display:"block" , marginTop:"20px" ,padding: '10px'}}>
                        {/*<button className="Section2BrandBtn">VIEW PRODUCTS</button>*/}
                    </span>
                        </div>
                    </ScrollSection>
                    <ScrollSection style={{backgroundColor:"#D4C2FF",
                        backgroundRepeat: 'no-repeat'}}
                                   pageId={4}>
                        <div className="ScrollsectionDiv">
                            <Typography className="section2brandTitle" variant="h5">PENCILS AND PENS</Typography>
                            <Typography className="section2brandSubTitle" >Starting from <b>₹275</b></Typography>
                            <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/Pencils&Pens.png' className="mblNotebookSeries" style={{ width: '85%'}} alt="brandimage"/>
                            <span style={{display:"block" , marginTop:"20px" ,padding: '10px'}}>
                            {/*<button className="Section2BrandBtn">VIEW PRODUCTS</button>*/}
                        </span>
                        </div>
                    </ScrollSection>
                    <ScrollSection style={{backgroundColor:"#FFC2C2",
                        backgroundRepeat: 'no-repeat'}}
                                   pageId={5}>
                        <div className="ScrollsectionDiv">
                            <Typography className="section2brandTitle" variant="h5">GEOMETRY BOX</Typography>
                            <Typography className="section2brandSubTitle" >Starting from <b>₹275</b></Typography>
                            <img src='https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/geometry.png' className="mblNotebookSeries" style={{ width: '85%'}} alt="brandimage"/>
                            <span style={{display:"block" , marginTop:"20px" ,padding: '10px'}}>
                            {/*<button className="Section2BrandBtn">VIEW PRODUCTS</button>*/}
                        </span>
                        </div>
                    </ScrollSection>
                </ScrollContainer>
            </div>

        )
    }

}
export default MblBrandPage
