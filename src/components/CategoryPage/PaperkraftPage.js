import React from "react";
import './PaperkraftPage.css';
import Navbar from "../NavBar/Navbar";
import BannerCarousel from '../BannerCarousel/BannerCarousel';

import {Container} from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DesktopFooter from "../Footer/footer";




const Banner1 = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/PK_Desktop.png";
const Banner2 = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Signature-Color-desktop.jpg";
const Banner3 = "https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/Green-Impression-desktop.jpg";
const image1 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252020-a.jpg';
const image2 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252014-a.jpg';
const image3 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252013-a.jpg';
const image4 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252019-a.jpg';
const image5 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252018-a.jpg';
const image6 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252011-a.jpg';
const image7 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252005-a_1.jpg';
const image8 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/2252003-a.jpg';
const image9 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/216_x_148.jpg';
const image10 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/sl_49_notepad_2250069_2_.jpg';
const image11 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraft-unruled-100-pages-soft-hard-cover-notepad-2250035.jpg';
const image13 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/st_02250070_outer.jpg';
const image14 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/signature_series_big_green_1.jpg';
const image15 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/signature_series_big_blue_1.jpg';
const image16 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pu_2254006.jpg';
const image17 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/pu_2254001.jpg';
const image18 = 'https://cdn.classmateshop.co.in/live/Front-Assets/FrontEnd/paperkraft_hard_pu_series_black_1.jpg';


class PaperkraftPage extends React.Component {

    state = {
        products: [
            {
                'src': image1,
                'name': 'Paperkraft Expression Series 1 Subject Wiro (148 X 105) - 176 Pages - Single Line - Soft/Hard Cover',
                'price': '₹65.00'
            },
            {
                'src': image2,
                'name': 'Paperkraft Expression Series 1 Subject Full Bound (194 X 158) - 192 Pages - Unruled - Hard Cover',
                'price': '₹110.00'
            },
            {
                'src': image3,
                'name': 'Paperkraft Expression Series 1 Subject Full Bound (194 X 158) - 192 Pages - Single Line - Hard Cover',
                'price': '₹110.00'
            },
            {
                'src': image4,
                'name': 'Paperkraft Expression Series 1 Subject Wiro (210 x 148) 192 Pages - Single Line - Wiro',
                'price': '₹125.00'
            },


            {
                'src': image5,
                'name': 'Paperkraft Expression Series 1 Subject Wiro (194 X 158) - 192 Pages - Single Line - Soft/Hard Cove',
                'price': '₹125.00'
            },
            {
                'src': image6,
                'name': 'Paperkraft Expression Series 1 Subject Quarter Bound (210 X 148) - 224 Pages - Single Line - Hard Cover',
                'price': '₹130.00'
            },
            {
                'src': image7,
                'name': 'Paperkraft Expression Series 5 Subject Quarter Bound (210 X 148) - 400 Pages - Single Line - Hard Cover',
                'price': '₹195.00'
            },
            {
                'src': image8,
                'name': 'Paperkraft Expression Series 5 Subject Quarter Bound (243 X 182) - 400 Pages - Single Line - Hard Cover',
                'price': '₹250.00'
            },


            {
                'src': image9,
                'name': 'Paperkraft Green Impression Series 1 Subject (216 X 148) - 160 Pages - Single Line - Soft Cover',
                'price': '₹100.00'
            },
            {
                'src': image9,
                'name': 'Paperkraft Green Impression Series 1 Subject (250 X 176) - 160 Pages - Single Line - Soft Cover',
                'price': '₹135.00'
            },
            {
                'src': image9,
                'name': 'Paperkraft Green Impression Series 5 Subject (250 X 176) - 300 Pages - Single Line - Soft Cover',
                'price': '₹185.00'
            },
            {
                'src': image9,
                'name': 'Paperkraft Green Impression Series 5 Subject (216 X 148) - 300 Pages - Single Line - Soft Cover',
                'price': '₹155.00'
            },


            {
                'src': image13,
                'name': 'Paperkraft Notepad (148 X 210 ) - 80 Pages - Ruled - Soft/Hard Cover',
                'price': '₹10.00'
            },
            {
                'src': image10,
                'name': 'Paperkraft Notepad (148 X 210 ) - 80 Pages - Unruled - Soft/Hard Cover',
                'price': '₹20.00'
            },
            {
                'src': image11,
                'name': 'Paperkraft Notepad (148 X 210) - 80 Pages - Single Line - Soft/Hard Cover',
                'price': '₹20.00'
            },
            {
                'src': image14,
                'name': 'Paperkraft Signature Colour Series - Black Cover with Green Pages (165 X 95) 160 Pages - Unruled - Center Sewn And Perfect Bound',
                'price': '₹275.00'
            },


            {
                'src': image15,
                'name': 'Paperkraft Signature Colour Series Soft PU Black Cover with Blue Pages (165 X 95) 160 Pages - Unruled - Center Sewn And Perfect Bound',
                'price': '₹275.00'
            },
            {
                'src': image14,
                'name': 'Paperkraft Signature Colour Series Soft PU Black Cover with Green Pages (210 X 145) 160 Pages - Unruled - Center Sewn And Perfect Bound',
                'price': '₹395.00'
            },
            {
                'src': image15,
                'name': 'Paperkraft Signature Colour Series Soft PU Black Cover with Blue pages (210 X 145) 160 Pages - Unruled - Center Sewn And Perfect Bound',
                'price': '₹395.00'
            },
            {
                'src': image16,
                'name': 'Paperkraft Signature Series Hard PU Yellow Cover with White Page (165 X 95) - 160 Pages - Unruled - PU Cover',
                'price': '₹275.00'
            },


            {
                'src': image17,
                'name': 'Paperkraft Signature Series Hard PU Black Cover with White Pages & Small (165 X 95) - 160 Pages - Unruled - PU Cover',
                'price': '₹275.00'
            },
            {
                'src': image17,
                'name': 'Paperkraft Signature Series Soft PU Black Cover with White Pages (210 X 145) 160 Pages - Unruled - Center Sewn And Perfect Bound',
                'price': '₹395.00'
            },
            {
                'src': image18,
                'name': 'Paperkraft Signature Series Hard PU Black Cover With White Pages With Band (210 X 133) 240 Pages - Ruled - Center Sewn And Perfect Bound',
                'price': '₹500.00'
            },
            {
                'src': image18,
                'name': 'Paperkraft Signature Series Hard PU Black Cover With White Pages With Band (210 X 133) 240 Pages - Square - 0.5 mm - Center Sewn And Perfect Bound',
                'price': '₹500.00'
            }
        ]
    }

    render() {
        return (
            <div>
                <Navbar/>
                <BannerCarousel>
                    <img src={Banner1} alt="Banner1" style={{width: '100%'}}/>
                    <img src={Banner2} alt="Banner1" style={{width: '100%'}}/>
                    <img src={Banner3} alt="Banner1" style={{width: '100%'}}/>
                </BannerCarousel>

                <Container maxWidth={"xl"} className="product_list_container">
                    <div>
                        <Box component="div" className="products-list__products__grid">
                            {
                                this.state.products.map((item, index) => {
                                    return (
                                        <Box component="div" className="product-list-item" key={index}>
                                            <Box component="div" className="product-list-item__image">
                                                <img src={item.src} alt="products"/>
                                            </Box>
                                            <Box component="div" className="product-list-item__action">
                                                <div>
                                                    <Typography className="product-list-item__title"
                                                                variant="h6">{item.name}</Typography>
                                                    <Typography className="product-list-item__price"
                                                                paragraph>{item.price}</Typography>
                                                </div>
                                            </Box>
                                        </Box>
                                    );
                                })
                            }

                        </Box>

                    </div>
                </Container>
                <DesktopFooter/>
            </div>
        );
    }
}

export default PaperkraftPage;
