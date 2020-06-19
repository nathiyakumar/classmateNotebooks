import React from "react";
import './CategoryPage.css';
import Navbar from "../NavBar/Navbar";
import BannerCarousel from '../BannerCarousel/BannerCarousel';
import {fetchQuery} from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';
import environment from "../../Environment";
import {withRouter} from 'react-router-dom';
import ProductList from "../ProductsPage/ProductList";
import DesktopFooter from "../Footer/footer";

const LEP_banner1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP_banner1.jpg';
const LEP_banner2 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP_banner2.jpg';
const LEP_banner3 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP_banner3.jpg';
const LEP_banner4 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP_banner4.jpg';
const LEP_banner5 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP_banner5.jpg';
const LEP_banner6 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/LEP_banner6.jpg';

// import ReactGA from 'react-ga';


const getProductsByCategory = graphql`
  query CategoryPageQuery($id:ID!) {
    category(id:$id ){
        id
        name        
        products(first:100){
          edges{
            node{
              id
              name
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
        }
  }
  }
`;

class CategoryPage extends React.Component {

    state = {
        category_name: '',
        category_id: '',
        CategoryWiseProducts: {}
    }

    componentDidMount() {

        // ReactGA.initialize('UA-57376375-16');
        // ReactGA.event({
        //     'page_title' : 'Category Page',
        //     'page_path': window.location.pathname
        // });
    }


    componentWillMount() {

        this.getProductsByCategory(this.props);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getProductsByCategory(nextProps);
    }

    getProductsByCategory(props) {
        let category_id = props.match.params.category_id;
        let category_name = props.match.params.category_name;

        this.setState({
            category_name: category_name,
            category_id: category_id
        })


        const variables = {
            id: category_id,
        };

        fetchQuery(environment, getProductsByCategory, variables, {force: false})
            .then(data => {

                if (data.category !== null) {
                    this.setState({
                        CategoryWiseProducts: data.category
                    })
                }

            });
    }


    render() {
        return (
            <div>
                <Navbar/>
                <BannerCarousel>
                    <img src={LEP_banner1} alt="Banner1" style={{width: '100%'}}/>
                    <img src={LEP_banner2} alt="Banner1" style={{width: '100%'}}/>
                    <img src={LEP_banner3} alt="Banner1" style={{width: '100%'}}/>
                    <img src={LEP_banner4} alt="Banner1" style={{width: '100%'}}/>
                    <img src={LEP_banner5} alt="Banner1" style={{width: '100%'}}/>
                    <img src={LEP_banner6} alt="Banner1" style={{width: '100%'}}/>
                </BannerCarousel>
                {
                    this.state.CategoryWiseProducts.products ?
                        <ProductList products_list={this.state.CategoryWiseProducts}
                                     title={this.state.category_name}/> : null
                }

                <DesktopFooter/>
            </div>
        );
    }
}

export default withRouter(CategoryPage);
