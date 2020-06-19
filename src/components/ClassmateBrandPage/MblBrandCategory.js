import React from "react";
import './MblBrandCategory.css';
import {Typography} from "@material-ui/core";
import ScrollMenu from "react-horizontal-scrolling-menu";
import SubCategoryImg1 from './../../assets/BrandSubCategoryImg1.png';
import SubCategoryImg2 from './../../assets/BrandSubCategoryImg2.png';
import SubCategoryImg from './../../assets/BrandSubCategoryImg.png';


const mblNotebookSeries = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/mblNotebookSeries.png";


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

class MblBrandCategory  extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            selected: selected,

        };
        this.menuItems = Menu(list, selected);
    }

    selectCategory = key => {
        this.setState({selected: key});
    };

    render() {
        const menu = this.menuItems;

        return(
            <div className="MblCategoryBrandPage">

                <div className="brandCategoryBanner">
                    <div >
                        <Typography className="MblCategoryBrandPageTitle" variant="h4">Classmate Notebook Series</Typography>
                        <Typography className="MblCategoryBrandPageSubTitle" >Starting from <b>&#8377; 275</b></Typography>
                        <img src={mblNotebookSeries} className="mblNotebookSeries"/>
                        <span className="CategorySec1Blob"/>
                        <span style={{display:"block" , marginTop:"20px" ,padding: '10px'}}>

                    </span>
                    </div>
                </div>

                <div >
                    <Typography  variant="h5" style={{padding:'15px',  fontFamily: "'Poppins' , sans-serif" }}>Products</Typography>

                    <ScrollMenu
                        data={menu}
                        selected={this.state.selected}
                        onSelect={this.selectCategory}
                        scrollToSelected={true}
                        // arrowLeft={ArrowLeft}
                        // arrowRight={ArrowRight}
                        hideSingleArrow={true}
                        inertiaScrolling={true}

                    />
                    <div style={{ padding:"15px"}}>
                            <span style={{display:'flex'}}>
                                <span className="Productbox"/>

                              <img src={SubCategoryImg1} className="categoryImg"/>
                              <div style={{paddingTop: '35px'}}>
                                 <Typography className="CayegoryName" variant="h5">3D Pulse Notebook Series</Typography>
                                  <Typography className="CayegoryPrice"  >Starting from â‚¹275</Typography>
                              </div>
                            </span>
                        <span style={{display:'flex'}}>
                                <span className="Productbox"/>

                              <img src={SubCategoryImg2} className="categoryImg"/>
                              <div style={{paddingTop: '35px'}}>
                                 <Typography className="CayegoryName" variant="h5">Pulse Notebook Series</Typography>
                                  <Typography className="CayegoryPrice"  >Starting from â‚¹275</Typography>
                              </div>
                            </span>
                        <span style={{display:'flex'}}>
                                <span className="Productbox"/>

                              <img src={SubCategoryImg} className="categoryImg" />
                              <div style={{paddingTop: '35px'}}>
                                 <Typography className="CayegoryName" variant="h5">Standard Notebook Series</Typography>
                                  <Typography className="CayegoryPrice"  >Starting from â‚¹275</Typography>
                              </div>
                            </span>


                    </div>

                </div>

            </div>
        )
    }

}

const MenuItem = ({text, selected}) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};
export const Menu = (list, selected) =>
    list.map(el => {
        const {name} = el;

        return <MenuItem text={name} key={name} selected={selected}/>;
    });
//     const Arrow = ({text, className}) => {
//         return (
//             <div
//                 className={className}
//             >{text}</div>
//         );
//     };
//
// const ArrowLeft = Arrow({text: <i className="fa fa-arrow-left fa-1x" aria-hidden="true"/>, className: 'arrow-prev'});
// const ArrowRight = Arrow({text: <i className="fa fa-arrow-right fa-1x" aria-hidden="true"/>, className: 'arrow-next'});

export default MblBrandCategory;
