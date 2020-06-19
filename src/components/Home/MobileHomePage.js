import React from "react";
import './MobileHomePage.css'
import {ButtonBase, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


import MobileNavbar from "../NavBar/MobileNavbar";
import MobileFooterPage from "../Footer/MobileFooterPage";

import AnimatedSlider from "../BannerCarousel/AnimatedSlider";

import {Link} from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import graphql from "babel-plugin-relay/macro";
import {fetchQuery} from "relay-runtime";
import environment from "../../Environment";
import Card from "@material-ui/core/Card";
import {generateProductUrl} from "../../Core/util";
// import ReactGA from 'react-ga';
import AOS from 'aos';




const UploadNote = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/mobile-uploadImage.png';
const paperkraftLogo = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraft-logo.png';
const MblPaperkraftImage1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/mblPaperkraftimage.png';
const MblPaperkraftImage2 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/mblPaperkraftimage1.png';
const LEP1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP1.jpg';
const  DesignImage1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designImg1.png';
const  DesignImage2 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designImg2.png';
const  DesignImage3 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designimg3.png';
const  DesignImage4 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/designImg4.png';


const getProducts = graphql`
  query MobileHomePageProductsQuery {
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



const list = [
    {name: 'All Category'},
    {name: 'AntMan & Wasp'},
    {name: 'Avengers'},
    {name: 'Captain Marvel'},
    {name: 'Christmas'},
    {name: 'End Game'},
    {name: 'Fathers Day'},
    {name: 'Football'},
    {name: 'Generic'},
    {name: 'Incredibles'},
    {name: 'Independence Day'}

];
const selected = 'All Category';




class MobileHomePage  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: selected,
            CategoryWiseProducts:[],
            banners:[
                {
                    image_src:'https://cdn.classmateshop.co.in/live/slider/Resuming-op-mobile.jpg',
                    route:false,
                    link:'',
                    gaCategory:'Corona',
                    galabel:'Corona'
                },
                // {
                //     image_src:'https://cdn.classmateshop.co.in/live/slider/covid-mobile.png',
                //     route:false,
                //     link:'',
                //     gaCategory:'Corona',
                //     galabel:'Corona'
                // },
                // {
                //     image_src:'https://cdn.classmateshop.co.in/live/slider/Covid-19-Mobile.jpg\n',
                //     route:false,
                //     link:'',
                //     gaCategory:'Corona',
                //     galabel:'Corona'
                // },
                // {
                //     image_src:'https://cdn.classmateshop.co.in/live/assets/front/home_mob_banner1.jpg',
                //     route:true,
                //     link:'/classmate-customised-notebooks/select-pages',
                //     gaCategory:'design notebook',
                //     galabel:'CustomizerHeroBanner'
                // },
                // {
                //     image_src:'https://cdn.classmateshop.co.in/live/slider/Autism_Mobile.jpg',
                //     route:false,
                //     link:'https://www.classmateshop.com/classmate-designer-notebooks/Autism%20Society%20WB',
                //     gaCategory:'design notebook',
                //     galabel:'CustomizerHeroBanner'
                // },
                // {
                //     image_src:'https://cdn.classmateshop.co.in/live/slider/CallistaHomeBanner-M.jpg',
                //     route:false,
                //     link:'https://www.classmateshop.com/classmate-school-and-office-stationery-products/paperkraft-callista-ceramic-roller-ball-pen-black-pack-of-1/49/',
                //     gaCategory:'design notebook',
                //     galabel:'CustomizerHeroBanner'
                // },
                // {
                //     image_src:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/home_mob_banner2.jpg',
                //     route:true,
                //     link:'/classmate-school-and-office-stationery-products'
                // }
            ]
        }
        this.menuItems = Menu(list, selected);
    }

    componentDidMount(){

        // for animation puspose
        AOS.init({
            duration : 1000
        })
        // for animation puspose

        const variables = {

        };

        fetchQuery(environment, getProducts, variables,{force:false})
            .then(data => {

                if(data.products !== null && data.products.length > 0){
                    this.setState({
                        CategoryWiseProducts:data.products.slice(0,8)
                    })
                }

            });
    }
    selectCategory = key => {
        this.setState({selected: key});
    }

    generateCategoryUrl = (category_name,category_id) => {

        return `/category/${category_name}/${category_id}/`;

    }
    sendEventToGA = (category,label) =>{
        // ReactGA.event({
        //     'action':'click',
        //     'category':category,
        //     'label':label,
        //
        // });

    }
    render() {

        const menu = this.menuItems;
        return(
            <div className="MobileHomePage" >
                <MobileNavbar />
                <div data-aos='fade-in'>
                    <AnimatedSlider banners={this.state.banners} objectFit={"cover"} sendEventToGA={this.sendEventToGA}/>
                </div>
                <section className="MblSection4" data-aos='fade-up'>
                    <Typography variant="h5"  className="MblSection4Title" style={{color:"#fff"}}>Our Newest Designs</Typography>
                    <Typography className="MblSection4Para" style={{color:"#fff"}}>Exquisite Themes That Catch Your Eye</Typography>
                    <Grid  container spacing={3} style={{ marginTop: '15px', width:"100%",margin:'0px'}}>
                        <Grid item xs={6} className="grid">
                            <Link to="/classmate-designer-notebooks">
                                <img src={DesignImage1} style={{width: '100%'}} />
                            </Link>
                        </Grid>
                        <Grid item xs={6} className="grid">
                            <Link to="/classmate-designer-notebooks">
                                <img src={DesignImage2}  style={{width: '100%'}}/>
                            </Link>
                        </Grid>
                        <Grid item xs={6} className="grid" >
                            <Link to="/classmate-designer-notebooks" >
                                <img src={DesignImage3}  style={{width: '100%'}}/>
                            </Link>
                        </Grid>
                        <Grid item xs={6} className="grid" >
                            <Link to="/classmate-designer-notebooks">
                                <img src={DesignImage4}  style={{width: '100%'}}/>
                            </Link>
                        </Grid>
                    </Grid>
                    <span style={{display:"flex",justifyContent: 'flex-end',font: 'Medium Poppins',alignItems:' center'}} id="home_section_custom_designs" onClick={()=>{
                        this.props.history.push('/classmate-designer-notebooks');
                        this.sendEventToGA('custom designs','DesignerNBSection');
                    }}>
                        <Typography className="MblSection4Link" >More Designs</Typography>
                        <i className="ri-arrow-right-s-line" style={{fontSize: ' 22px'}}/>
                    </span>
                </section>

                <section className="MblSection3" data-aos='fade-up'>

                    <Typography variant="h5"  className="MblSection3Title" style={{color:"#fff"}}>Upload & Make it Yours!</Typography>
                    <Typography className="MblSection3Para" style={{color:"#fff"}}>Ever-imagined of having your own photos on Classmate Notebooks? Now, it is possible!</Typography>
                    <span style={{display:"flex",justifyContent:'center', alignItems:' center'}} id="home_section_customizer_designs" onClick={()=>{
                        this.props.history.push('/classmate-customised-notebooks/select-pages');
                        this.sendEventToGA('design notebooks','CustomizerSection');
                    }}>
                        <Typography className="MblSection2Link" style={{color:"#fff"}}>Design Now</Typography>
                        <i className="ri-arrow-right-s-line" style={{fontSize: '22px', color: "#fff"}}/>
                    </span>
                    <img src={UploadNote} />
                </section>
                <section className="MblSection2" data-aos='fade-up'>
                    <Typography variant="h5"  className="MblSection2Title">Stationery Products</Typography>
                    <Typography className="MblSection2Para">Get our hottest new launches and exclusive products here !</Typography>
                    <Link to="/classmate-school-and-office-stationery-products"  onClick={() => this.sendEventToGA('Limited Edition Products','LEPSection')}>
                        <span style={{display:"flex",justifyContent:'center', alignItems:' center'}} id="home_section_LEP_designs">
                            <Typography className="MblSection2Link"> All Design</Typography>
                            <i className="ri-arrow-right-s-line" style={{fontSize:' 22px'}}></i>
                        </span>
                    </Link>
                    <Grid  container spacing={3} style={{ marginTop: '15px'}}>
                        {
                            this.state.CategoryWiseProducts.map((product,index) => {
                                return(
                                    <Grid item xs={6} className="grid" key={index}>
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
                </section>
                <section className="MblSection5" data-aos='fade-up' style={{marginBottom:'15px'}}>
                    <img src={paperkraftLogo} style={{marginTop:'30px'}}/>
                    <Typography className="MblSection5Title">An exquisite range of finely crafted professional stationery products</Typography>
                    <span style={{display:"flex",justifyContent:'center', alignItems:' center', color: '#fff',marginTop: '15px'}} onClick={()=>{
                        this.props.history.push('/paperkraft-notebook-series');
                    }}>
                        <Typography className="MblSection2Link"> Learn More</Typography>
                        <i className="ri-arrow-right-s-line" style={{fontSize:' 22px'}}></i>
                    </span>
                    <Grid  container spacing={3} style={{ marginTop: '15px', width:"100%",margin:'0px'}}>
                        <Grid item xs={6} className="grid">
                            <img src={MblPaperkraftImage1} style={{width: '100%'}} />
                            {/*<Typography className="MblSec4DesignTitle">Thor Design </Typography>*/}
                        </Grid>
                        <Grid item xs={6} className="grid">
                            <img src={MblPaperkraftImage2} style={{width: '100%'}} />
                            {/*<Typography className="MblSec4DesignTitle">Ant-Man Designs </Typography>*/}

                        </Grid>
                    </Grid>
                </section>
                {/* <div data-aos='fade-in'>
                    <AnimatedSlider banners={[this.state.banners[1]]} objectFit={"cover"} sendEventToGA={this.sendEventToGA}/>
                </div> */}
                <MobileFooterPage />
            </div>
        )
    }
}

export const Menu = (list, selected) =>
    list.map(el => {
        const {name} = el;

        return <MenuItem text={name} key={name} selected={selected}/>;
    });

const MenuItem = ({text, selected}) => {

    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

const Arrow = ({text, className}) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({text: <i className="fa fa-arrow-left fa-1x" aria-hidden="true"/>, className: 'arrow-prev'});
const ArrowRight = Arrow({text: <i className="fa fa-arrow-right fa-1x" aria-hidden="true"/>, className: 'arrow-next'});

export default withRouter(MobileHomePage);
