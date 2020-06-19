import React from "react";
import './PaperkraftBrandCategoryPage.css'
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const lifetime = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/life-icon.svg';
const EcoFrindly = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/eco-friendly.svg';
const boundIcon = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/bound-icon.svg';
const CertPaper = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/cert-paper.svg';
const quality = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/quality.svg';
const freeTech = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/free-tech.svg';

class PaperkraftBrandCategorypage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedCategory: {},
            Categoryimage: ""
        }
    }


    componentDidMount() {
        let selectedId = this.props.selectedId;
        let categories = this.props.categories;
        for (let i = 0; i < categories.length; i++) {
            if (selectedId === categories[i].id) {

                this.setState({
                    SelectedCategory: categories[i],

                })
            }

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let selectedId = nextProps.selectedId;
        let categories = nextProps.categories;
        for (let i = 0; i < categories.length; i++) {
            if (selectedId === categories[i].id) {

                this.setState({
                    SelectedCategory: categories[i],

                })
            }

        }
    }

    render() {
        const {SelectedCategory} = this.state;
        return (
            <div className="PaperkraftCategoryPage" style={{backgroundColor: SelectedCategory.backgroundColor,paddingBottom:'5%'}}>
                <div className="FlexPage">

                    <div className="PaperkraftCategoryDiv">
                        <img src={SelectedCategory.image} className="PaperkraftCategoryImg" alt="PaperkraftCategoryImg"/>

                        <a className="sliderLink">
                            <Typography variant="h4">{SelectedCategory.name}</Typography>
                            <p className="BrandPrice">Starting from {SelectedCategory.Price}</p>
                            <p className="brandDef">{SelectedCategory.desc}</p>
                            <span style={{display: "flex", marginTop: '35px'}}>
                                <div className="paperkaftContent">
                                    <img src={lifetime} alt="paperkraft"/>
                                    <p>100 Years of shelf-life</p>
                                    <img src={EcoFrindly} alt="paperkraft"/>
                                    <p>Eco-Friendly 80GSM paper</p>
                                    <img src={boundIcon} alt="paperkraft"/>
                                    <p>Available in Hard and Soft Bound</p>
                                </div>
                               <div className="paperkaftContent">
                                   <img src={freeTech} alt="paperkraft"/>
                                    <p>Elemental Chlorine Free Technology</p>
                                    <img src={CertPaper} alt="paperkraft"/>
                                    <p>FSC Certified Paper</p>
                                    <img src={quality} alt="paperkraft"/>
                                    <p>PU quality covers</p>
                                </div>
                            </span>
                        </a>
                    </div>

                    <div style={{padding: '35px 0px'}}>
                        <Typography variant='h6'>Other Categories</Typography>
                        <Grid spacing={2} style={{display: ' flex', marginTop: '60px'}} container>
                            {this.props.categories.map((item, index) => {

                                return <div key={index}>
                                    {this.props.selectedId !== item.id ?
                                        <Grid item xs={12}>
                                            <div className="categoryImageDiv" onClick={(event) => {
                                                this.props.GotoCategoryPage(event, item.id)
                                            }}>
                                                <img src={item.image} className='categoryImage' alt="paperkraft"/>
                                                <span className="CategoryDetails">
                                                 <Typography variant='h6'>{item.name}</Typography>
                                                 <Typography >Starting from {item.Price}</Typography>
                                          </span>
                                            </div>
                                        </Grid> : null
                                    }
                                </div>

                            })
                            }
                        </Grid>
                    </div>
                </div>

            </div>
        )
    }

}

export default PaperkraftBrandCategorypage
