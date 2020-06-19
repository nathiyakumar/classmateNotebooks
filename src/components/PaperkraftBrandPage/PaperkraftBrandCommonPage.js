import React from "react";
import PaperkraftBrandPage from "./PaperkraftBrandPage";

import PaperkraftBrandCategorypage from "./PaperkraftBrandcategorypage";
import Navbar from "../NavBar/Navbar";

class PaperkraftBrandCommonPage  extends React.Component{

    constructor(props){
        super(props);
        this.state={

            Paperkraftcategory : [
                {id: 1, name: 'Signature Colour Series', Price: "₹275", image: 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft1.png', desc:"Paperkraft Signature notebooks make a statement event without writing a word!" ,
                    backgroundColor :"#2d1d54"},
                {id: 2, name: 'Signature Series', Price: "₹275", image: 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft2.png' , desc:"Paperkraft Signature notebooks make a statement event without writing a word!" ,backgroundColor :"#1D5054"},
                {id: 3, name: 'Green Impression Notebooks', Price: "₹275", image: 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkarft3.png', desc:"Paperkraft Signature notebooks make a statement event without writing a word!" ,backgroundColor :"#21541D"},
                {id: 4, name: 'Expression Series', Price: "₹115", image: 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft4.png', desc: "Paperkraft Signature notebooks make a statement event without writing a word!" ,backgroundColor :"#1D5054"},
                {id: 5, name: 'Seasons Gifting Series', Price: "₹10", image: 'https://cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com/live/assets/front/paperkraft5.png' ,desc: "Paperkraft Signature notebooks make a statement event without writing a word!" , backgroundColor :"#541D54"}
            ],
            selectedCategoryId : 0,
            CategoryPgage : false,
        };
        this.goPaperkraftPage = this.goPaperkraftPage.bind(this)

    }
    goPaperkraftPage(e , SelectedId){
        this.setState({
            CategoryPgage : true,
            selectedCategoryId : SelectedId,
        })
    }
    render() {
        return(
            <div>
                <Navbar />
                {
                    this.state.CategoryPgage ?
                        <PaperkraftBrandCategorypage selectedId ={this.state.selectedCategoryId} categories = {this.state.Paperkraftcategory} GotoCategoryPage={this.goPaperkraftPage}/>
                        :
                        <PaperkraftBrandPage   GotoCategoryPage={this.goPaperkraftPage} categories = {this.state.Paperkraftcategory} />
                }

            </div>
        )
    }

}


export default  PaperkraftBrandCommonPage
