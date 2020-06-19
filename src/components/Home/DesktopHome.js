import React from "react";
import "./DesktopHome.css"
import Grid from "@material-ui/core/Grid";
import {ButtonBase, Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card';

import Navbar from "../NavBar/Navbar";
import DesktopFooter from "../Footer/footer";
import {Link, withRouter} from 'react-router-dom'
import AnimatedSlider from "../BannerCarousel/AnimatedSlider";
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../Environment";
import {generateProductUrl} from "../../Core/util";
// import ReactGA from "react-ga";
import AOS from 'aos';


const  DesignImage1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designImg1.png';
const  DesignImage2 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designImg2.png';
const  DesignImage3 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designimg3.png';
const  DesignImage4 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designImg4.png';
const UploadNote = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/UploadNote.png';
const paperKraftImage = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraft-packs.png';
const paperkraftLogo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraft-logo.png';
const LEP1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP1.jpg';
const ThemedNotebook = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Themed-Series.jpg';



const getProducts = graphql`
  query DesktopHomeProductsQuery {
   products{
                 id
                name
                price
              masterSku
                category{
                  id
                  name
                }
                images(first:1){
                  edges{
                    node{
                      url
                    }
                  }
                }
               variants(first:1){
                edges{
                  node{
                    id
                    name
                    priceOverride
                  }
                }
              }
            
              }
  }
`;



class DesktopHome extends React.Component{

    state = {
        CategoryWiseProducts:[],
        banners:[
            {
                image_src:'https://cdn.classmateshop.co.in/live/slider/Resuming-op-desktop.jpg',
                route:false,
                link:'',
                gaCategory:'Corona',
                galabel:'Corona'
            },
            // {
            //     image_src:'https://cdn.classmateshop.co.in/live/slider/Covid-19.png',
            //     route:false,
            //     link:'',
            //     gaCategory:'Corona',
            //     galabel:'Corona'
            // },
            // {
            //     image_src:'https://cdn.classmateshop.co.in/live/slider/Covid-19.jpg',
            //     route:false,
            //     link:'',
            //     gaCategory:'Corona',
            //     galabel:'Corona'
            // },
            // {
            //     image_src:'https://cdn.classmateshop.co.in/live/assets/front/home_des_banner1.jpg',
            //     route:true,
            //     link:'/classmate-customised-notebooks/select-pages',
            //     gaCategory:'design notebook',
            //     galabel:'CustomizerHeroBanner'
            // },
            // {
            //     image_src:'https://cdn.classmateshop.co.in/live/slider/Autism_Desktop.jpg',
            //     route:false,
            //     link:'https://www.classmateshop.com/classmate-designer-notebooks/Autism%20Society%20WB',
            //     gaCategory:'design notebook',
            //     galabel:'CustomizerHeroBanner'
            // },
            // {
            //     image_src:'https://cdn.classmateshop.co.in/live/slider/CallistaHomeBanner-D.jpg',
            //     route:false,
            //     link:'https://www.classmateshop.com/classmate-school-and-office-stationery-products/paperkraft-callista-ceramic-roller-ball-pen-black-pack-of-1/49/',
            //     gaCategory:'design notebook',
            //     galabel:'CustomizerHeroBanner'
            // },
            // {
            //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/home_des_banner2.jpg',
            //     route:true,
            //     link:'/classmate-school-and-office-stationery-products'
            // },
        ]

    };


    componentDidMount(){

        // for animation puspose
        AOS.init({
            duration : 1000
        });
        // for animation puspose


        const variables = {

        };

        fetchQuery(environment, getProducts, variables, {force: false})
            .then(data => {                
                if(data.products !== null && data.products.length > 0){
                    this.setState({
                        CategoryWiseProducts:data.products.slice(0,8)
                    })
                }

            });
    }

    generateCategoryUrl = (category_name,category_id) => {

        return `/category/${category_name}/${category_id}/`;

    };
    sendEventToGA = (category,label) =>{
        // ReactGA.event({
        //     'action':'click',
        //     'category':category,
        //     'label':label,
        //
        // });

    };

    render() {
        return(
            <div className="desktopHome">
                <Navbar />
                <section className="section1"  data-aos='fade-in'>
                    <AnimatedSlider banners={this.state.banners} objectFit={"cover"} sendEventToGA={this.sendEventToGA} />
                </section>
                <section className="section2" data-aos='fade-up'>
                    <Grid container >
                        <Grid item xs={8}>
                            <div className="section2background">
                         <span style={{display:"inline-flex"}}>
                             <span>
                                 <Typography className="section2Title" variant="h4"><span className="underline">Custom Designs</span></Typography>
                                 <Typography style={{width:' 454px'}}>
                                    Explore our custom designs and get your notebooks with the cover you love
                                 </Typography>
                             </span>
                         </span>
                                <span className="cardSpan">
                             <Grid item xs={4} className="grid" >
                                 <Card className="card">
                                     <ButtonBase
                                         value='172 Pages' name='noOfPages'
                                         style={{display: 'block'}} className="cardbtn"
                                         onClick={()=>{
                                             this.props.history.push('/classmate-designer-notebooks');
                                         }}
                                     >
                                         <img src={DesignImage1} style={{width: '100%'}} alt="page1" id="img"/>
                                     </ButtonBase>
                                 </Card>
                                 </Grid>
                                 <Grid item xs={4} className="grid" >
                                     <Card className="card">
                                         <ButtonBase
                                             value='172 Pages' name='noOfPages'
                                             style={{display: 'block'}} className="cardbtn"
                                             onClick={()=>{
                                                 this.props.history.push('/classmate-designer-notebooks');
                                             }}
                                         >
                                             <img src={DesignImage2} style={{width: '100%'}} alt="page1" id="img"/>
                                         </ButtonBase>
                                     </Card>
                                 </Grid> <Grid item xs={4} className="grid" >
                                 <Card className="card">
                                     <ButtonBase
                                         value='172 Pages' name='noOfPages'
                                         style={{display: 'block'}} className="cardbtn"
                                         onClick={()=>{
                                             this.props.history.push('/classmate-designer-notebooks');
                                         }}
                                     >
                                         <img src={DesignImage3} style={{width: '100%'}} alt="page1" id="img"/>
                                     </ButtonBase>
                                 </Card>
                             </Grid> <Grid item xs={4} className="grid" >
                                 <Card className="card">
                                     <ButtonBase
                                         value='172 Pages' name='noOfPages'
                                         style={{display: 'block'}} className="cardbtn"
                                         onClick={()=>{
                                             this.props.history.push('/classmate-designer-notebooks');
                                         }}
                                     >
                                         <img src={DesignImage4} style={{width: '100%'}} alt="page1" id="img"/>
                                     </ButtonBase>
                                 </Card>
                             </Grid>
                         </span>
                                <div style={{marginTop: '20px'}}>
                             <span>
                                 <button className="AllDesign" id="home_section_custom_designs" onClick={()=>{
                                     this.props.history.push('/classmate-designer-notebooks');
                                     this.sendEventToGA('custom designs','DesignerNBSection');
                                 }}>All Designs
                                     <span><i className="ri-arrow-right-s-line"  style={{position: 'relative', top: '4px'}}/></span></button>
                             </span>
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={4} >
                            <img src={ThemedNotebook} alt="ThemedNotebook" className="ThemedNotebookSeries"/>
                        </Grid>
                    </Grid>
                </section>
                <section className="section3" data-aos='fade-up'>
                    <Grid container>
                        <Grid xs={4} item  className="grid">
                            <img src={UploadNote} style={{ width:' 80%'}} alt="classmate"/>
                        </Grid>
                        <Grid xs={8} item  className="grid">
                            <div style={{display:'flex',height:'100%'}}>
                                <div style={{margin:'auto 0'}}>
                                    <div style={{height:'100px'}}>
                                        <Typography className="section2Title" variant="h4">Upload & Make it Yours!</Typography>
                                        <Typography  style={{float: 'left',marginTop: '14px'}}>
                                            Ever-imagined of having your own photos on Classmate Notebooks? Now, it is possible!
                                        </Typography>
                                    </div>
                                    <br />
                                    <div style={{float: "left", display:"block"}}>
                                        <span className="step">1</span><span>Choose Varient</span>
                                        <i className="ri-arrow-right-line"  style={{marginLeft: '10px',marginRight: '10px',position: 'relative', top: '4px'}}/>
                                        <span className="step">2</span><span>Upload Image</span>
                                        <i className="ri-arrow-right-line" style={{marginLeft: '10px',marginRight: '10px',position: 'relative', top: '4px'}}/>
                                        <span className="step">3</span><span>Place Order</span>

                                    </div>
                                    <div style={{marginTop: '98px',display: 'flex'}}>
                                        <button className="uploadBtn" id="home_section_customizer_designs" onClick={()=>{
                                            this.props.history.push('/classmate-customised-notebooks/select-pages');
                                            this.sendEventToGA('design notebooks','CustomizerSection');
                                        }}><span>Design Now</span><span><i className="ri-arrow-right-s-line" style={{position: 'relative', top: '4px'}}/></span></button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </section>
                <section className="section4" data-aos='fade-up'>
                    <Grid container>
                        <Grid xs={5} item  className="grid">
                            <div className="section4Background">
                                <div className="Section4Left">
                                    <Typography className="section2Title" variant="h4">
                                    Stationery Products
                                    </Typography>
                                    <Typography>
                                    Get our hottest new launches and exclusive products here !
                                    </Typography>
                                    <Link to="/classmate-school-and-office-stationery-products" onClick={() => this.sendEventToGA('Limited Edition Products','LEPSection')}>
                                        <button className="viewMoreBtn" id="home_section_LEP_designs"><span>View More</span><span><i className="ri-arrow-right-s-line" style={{position: 'relative', top: '4px'}}/></span></button>
                                    </Link>
                                </div>
                            </div>

                        </Grid>
                        <Grid xs={7} item  className="grid">
                            <div className="Section4Right">
                                <Grid container spacing={3}>
                                    {
                                        this.state.CategoryWiseProducts.map((product,index) => {
                                            return(
                                                <Grid item xs={3} key={index}>
                                                    <Card className="card">
                                                        <Link to={product.variants.edges.length > 0 && product.variants.edges[0].node.id ?generateProductUrl(product.variants.edges[0].node.id,product.name):""}>
                                                            <ButtonBase
                                                                value='172 Pages' name='noOfPages'
                                                                style={{display: 'block'}} className="cardbtn"
                                                            >
                                                                <img src={product.images.edges[0]?product.images.edges[0].node.url:LEP1} style={{width: '100%'}} alt="page1" id="img"/>
                                                            </ButtonBase>
                                                        </Link>
                                                    </Card>
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>


                            </div>
                        </Grid>
                    </Grid>
                </section>
                <section className="section5" data-aos='fade-up'>
                    <Grid container>
                        <Grid xs={12} item className="grid">
                            <div className="section5background">
                                <Grid container spacing={3}>
                                    <Grid xs={6} item className="grid">
                                        <div className="section5Left">
                                            <img className="paperkaftLogo" alt="classmate" src={paperkraftLogo}/><br/>

                                            <div style={{paddingTop: '35px',textAlign: 'left'}}>
                                                <Typography variant="h5" className="paperkaftTitle">Perfectly Crafted for Professionals</Typography>
                                                <Typography className="paperkaftTitle" style={{opacity: '0.8',fontSize:' 13px'}}>An exquisite range of finely crafted professional stationery products</Typography>
                                                <Link to="/paperkraft-notebook-series">
                                                <button className="viewMoreBtn" style={{backgroundColor :"",opacity: '1'}}>View More<i className="ri-arrow-right-s-line" style={{position: 'relative', top: '4px'}}/></button>
                                                </Link>
                                            </div>




                                        </div>
                                    </Grid>
                                    <Grid xs={6} item className="grid">
                                        <img  className="paperkraftImage" src={paperKraftImage} alt="classmate" />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </section>
                {/* <section className="section1"  data-aos='fade-in'>
                    <AnimatedSlider banners={[this.state.banners[1]]} objectFit={"cover"} sendEventToGA={this.sendEventToGA} />
                </section> */}
                <DesktopFooter />

            </div>
        )
    }


}
export default withRouter(DesktopHome);
