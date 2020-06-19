import React from "react";
import './MblPaperkraftCategory.css';
import {Typography} from "@material-ui/core";



class MblPaperkraftcategory extends React.Component {
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
            <div className="MblPaperkraftCategoryBrandPage">

                <div className="PaperkraftbrandCategoryBanner"
                     style={{backgroundColor: SelectedCategory.backgroundColor}}>
                    <div>
                        <Typography className="PaperkraftCategoryBrandPageTitle"
                                    variant="h4">{SelectedCategory.name}</Typography>
                        <Typography className="PaperkraftCategoryBrandabout">{SelectedCategory.desc}</Typography>
                        <Typography className="PaperkraftCategoryBrandPageSubTitle">Starting
                            from <b>{SelectedCategory.Price}</b></Typography>
                        <img src={SelectedCategory.image} className="PaperkraftNotebookSeries" alt={"PaperkraftNotebookSeries"}/>
                        {/*<span className="CategorySec1Blob"/>*/}
                        <span style={{display: "block", marginTop: "20px", padding: '10px'}}>

                    </span>
                    </div>
                </div>

                <div style={{marginTop: '20px'}}>

                    {this.props.categories.map((item, index) => {

                        return <>
                            {this.props.selectedId !== item.id ?
                                <span style={{display: 'flex', cursor:"pointer"}} onClick={(event) => {
                                    this.props.GotoCategoryPage(event, item.id)
                                }}>
                                                <span className="PaperkraftProductbox"
                                                      style={{backgroundColor: item.backgroundColor}}/>

                                              <img src={item.image} className="PaperkraftcategoryImg" alt={"PaperkraftNotebookSeries"}/>
                                              <div style={{paddingTop: '35px'}}>
                                                 <Typography className="PaperkraftCayegoryName"
                                                             variant="h6">{item.name}</Typography>

                                                  <Typography
                                                      className="PaperkraftCayegoryPrice">Starting from {item.Price}</Typography>
                                              </div>
                                </span> : null
                            }
                        </>
                    })}

                </div>


            </div>
        )
    }

}


export default MblPaperkraftcategory
