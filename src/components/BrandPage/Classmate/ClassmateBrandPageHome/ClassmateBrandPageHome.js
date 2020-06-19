import React from "react";
import './ClassmateBrandPageHome.css';
import Navbar from "../../../NavBar/Navbar";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CardMedia from "@material-ui/core/CardMedia";
import Plyr from "plyr";
import Media from 'react-media';
import MobileNavbar from "../../../NavBar/MobileNavbar";
import {small_screen} from '../../../../variables';
import Grid from "@material-ui/core/Grid";
import $ from 'jquery'
import CallMadeIcon from '@material-ui/icons/CallMade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MobileFooterPage from "../../../Footer/MobileFooterPage";
import DesktopFooter from "../../../Footer/footer";
import MetaWrapper from "../../../../Meta/MetaWrapper";
import graphql from "babel-plugin-relay/macro";
import environment from "../../../../Environment";
import {fetchQuery} from "relay-runtime";

const catalogueCategoryList = graphql`
   query ClassmateBrandPageHomeCategoryListQuery{
      catalogueCategoryList{
           id
         name
         backgroundImage
      }
   }`;

class ClassmateBrandPageHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    componentDidMount() {
        const
            player = new Plyr('#player',
            {});

        window.player = player;
        $('#section1').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
        });
        this.catalogueCategoryList()
    }

    Readmore = () => {
        var dots = document.getElementById("TextDots");
        var moreText = document.getElementById("TextMore");
        var readMoreBtn = document.getElementById("readMoreBtn");
        var readLessBtn = document.getElementById("readLessBtn");

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            readMoreBtn.style.display = "flex";
            readLessBtn.style.display = "none";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            readLessBtn.style.display = "flex";
            readMoreBtn.style.display = "none";
            moreText.style.display = "inline";
        }
    }

    catalogueCategoryList = () => {
        let LowerColor = ["#ECF2F5","#ffc2c2","#FFE0C2","#9DCEB4","#D4C2FF","#ECF2F5","#ffc2c2","#FFE0C2","#9DCEB4","#D4C2FF"];
        let UpperColor = ["#407088","#B53838","#A77340","#427158","#4E348A","#407088","#B53838","#A77340", "#427158","#4E348A"];
        let variables = {};
        fetchQuery(environment, catalogueCategoryList, variables)
            .then(data => {
                if (data.catalogueCategoryList !== null && data.catalogueCategoryList.length > 0) {
                    let list = this.state.categoryList
                    data.catalogueCategoryList.map((item, index) => {
                        list[index] = {
                            'id': item.id,
                            'name': item.name,
                            'upperColor': UpperColor[index],
                            'lowerColor': LowerColor[index],
                            'image' : item.backgroundImage
                        };
                    });
                    this.setState({
                        categoryList: list
                    })

                } else {
                    this.setState({
                        categoryList: []
                    })
                }
            });

    };
    goCatalogueList = (id) => {
        this.props.history.push("/classmate-office-and-school-stationeries/" + id);
    };
    goToCategory = () => {
      let category_id = this.state.categoryList[0].id;
      this.goCatalogueList(category_id);
    };

    render() {
        return (
            <MetaWrapper
                meta={{
                    description: "Order several stationeries at a wholesale price such as 3D Notebooks, Puzzles, Art Stationeries, Pens and Pencils, Geometry boxes at Classmate online store delivering near you.",
                    title: "One Stop Destination to All Your Stationeries at Classmate Store Online",
                }}
            >
                <Media query={{maxWidth: small_screen}} render={() =>
                    (
                        <MobileNavbar/>
                    )}
                />
                <Media query={{minWidth: small_screen}} render={() =>
                    (
                        <Navbar/>
                    )}
                />
                <div className="Classmate_Brand_Page" style={{marginBottom: "10vh", overflowX: " hidden"}}>
                    <div className="Classmate_Brand_Banner">
                        <Typography variant="h4" style={{paddingTop: '45px'}}>Classmate
                            #BeBetterThanYourself</Typography>
                        <p className="brand_sub_title">Classmate products has been recognized as 'India's No.1 Notebook
                            Brand'</p>
                        <Button className="Brand_Learn_More_btn"><a id="section1" href="#section2" style={{
                            color: 'inherit',
                            textDecoration: "none"
                        }}>LEARN MORE <ArrowDownwardIcon/></a></Button>
                        <div className="brand_video">
                            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="M8k1U3vk5RE"/>
                        </div>
                    </div>
                    <Grid id="section2" container spacing={3} style={{width: '100%'}}>
                        <Grid item xs={12} md={6} className="brand_story_left">
                            <div className="story_space">&nbsp;
                                <br/>&nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                &nbsp;<br/>
                                {/*&nbsp;<br/>*/}
                            </div>
                            <div className="Story_Block">
                                <h2 className="story_title">Our Story</h2>

                                <p className="story_sub_title">Launched in 2003, with an array of student
                                    notebooks,
                                    Classmate currently offers a
                                    comprehensive stationery portfolio with writing instruments (ball, gel and
                                    roller
                                    pens,
                                    and mechanical pencils), mathematical drawing instruments (geometry boxes),
                                    scholastic
                                    products (erasers, sharpeners and ruler) and art stationery products (wax
                                    Crayons,
                                    plastic crayons, sketch pens and oil pastels). Carefully designed, the wide
                                    range of
                                    products address every child's unique needs.<Media
                                        query={{maxWidth: small_screen}} render={() =>
                                        (
                                            <span id="TextDots">...</span>
                                        )}
                                    />
                                </p>
                                <Media query={{maxWidth: small_screen}} render={() =>
                                    (
                                        <> <span id="TextMore"><p className="story_sub_title"> Children, through school and college,
                                    are
                                    almost always compared with others, their classmates and peers. And in an
                                    achievement-oriented society like ours, they are conditioned to perceive others s
                                    competition. Classmate understands that every child is unique and encourages the
                                    child
                                    to chase his or her future self. To set only their personal values and ambitions
                                    ahead
                                    of them. And to be judged only on their own metrics, not anyone else's. To compete
                                    with
                                    themselves and not others. To be better than themselves. <b>Be Better Than
                                    Yourself.</b></p></span>
                                            <button className="readMoreBtn" onClick={this.Readmore}
                                                    id="readMoreBtn">
                                                <span>Read more</span>
                                            </button>
                                            <button className="readLessBtn" onClick={this.Readmore}
                                                    id="readLessBtn">
                                                <span>Read less</span></button>
                                        </>
                                    )}
                                />
                                <Media query={{minWidth: small_screen}} render={() =>
                                    (
                                        <>
                                            <p className="story_sub_title"> Children, through school and college,
                                                are
                                                almost always compared with others, their classmates and peers. And in
                                                an
                                                achievement-oriented society like ours, they are conditioned to perceive
                                                others s
                                                competition. Classmate understands that every child is unique and
                                                encourages the
                                                child
                                                to chase his or her future self. To set only their personal values and
                                                ambitions
                                                ahead
                                                of them. And to be judged only on their own metrics, not anyone else's.
                                                To compete
                                                with
                                                themselves and not others. To be better than themselves. <b>Be Better
                                                    Than
                                                    Yourself.</b>
                                            </p>
                                        </>
                                    )}
                                />

                            </div>

                        </Grid>
                        <Grid item xs={12} md={6} className="brand_story_right"/>
                    </Grid>
                    <div className="new_launches_banner">
                        <h2 className="story_title"
                            style={{textAlign: "center", paddingTop: "20px", marginTop: "0px"}}>New Launches</h2>
                        <img src="https://cdn.classmateshop.co.in/live/Front-Assets/BrandPage/new_launches_img.png" className="classmate_brand_new_launches_desktop" alt="New Launches"/>
                        <img src="https://cdn.classmateshop.co.in/live/Front-Assets/BrandPage/mobile_new_launch.png" className="classmate_brand_new_launches_mobile" alt="Mbl New Launches"/>
                        <div style={{display: 'flex'}}>
                            <Button className="Brand_Learn_More_btn" onClick={this.goToCategory}>EXPLORE PRODUCTS <CallMadeIcon/></Button>
                        </div>

                    </div>
                    <div className="brandBannerSection">
                        <div className="story_space_launches">&nbsp;
                            <br/>&nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;<br/>
                        </div>
                        <div className="banner_grid" style={{
                            display: "flex",
                            justifyContent: " center"
                        }}>
                            {this.state.categoryList.map((category, index) => {
                                return <div key={index}>
                                    <Card className="banner_card" style={{backgroundColor: category.upperColor}}
                                    >
                                        <CardMedia
                                            title="Contemplative Reptile"
                                            style={{backgroundColor: category.lowerColor}}
                                            className="card_image"
                                            image={category.image ?category.image:'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/NotebookSeries.png' }>
                                        </CardMedia>

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2"
                                                        className="card_content">
                                                {category.name}
                                            </Typography>
                                            <Button style={{padding: "0px"}}
                                                    onClick={() => this.goCatalogueList(category.id)}>
                                                <a className="explore_btn">EXPLORE PRODUCTS</a>
                                            </Button>
                                        </CardContent>

                                    </Card>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
                <Media query={{maxWidth: small_screen}} render={() =>
                    (
                        <MobileFooterPage/>
                    )}
                />
                <Media query={{minWidth: small_screen}} render={() =>
                    (
                        <DesktopFooter/>
                    )}
                />
            </MetaWrapper>

        );
    }
}

export default ClassmateBrandPageHome
