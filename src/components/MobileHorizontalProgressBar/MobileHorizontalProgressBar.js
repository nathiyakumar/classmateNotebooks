import React from "react";
import './MobileHorizontalProgressBar.css';
import {withStyles} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

class MobileHorizontalProgressBar extends React.Component{

    state = {
        stepValue: 0,
        completed:0
    }

    componentDidMount() {

        this.updateStepValue(this.props);

    }
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any){
        this.updateStepValue(nextProps);

    }

    updateStepValue = (props) => {
        let oneStepvalue = (100 / 6)*(props.step);

        this.setState({
            stepValue: oneStepvalue,
            completed:props.completed
        })
    }


    render() {
        const PrestoSlider = withStyles({
            root: {
                color: '#52af77',
                height: 10,
            },
            thumb: {
                display: 'none'
            },
            active: {},
            track: {
                height: 10,
                borderRadius: 6,
            },
            rail: {
                height: 10,
                borderRadius: 6,
                color: 'gray',
            },
        })(Slider);
        return (
            <div>
                <footer className="footer">
                    <PrestoSlider disabled valueLabelDisplay="auto" aria-label="pretto slider"
                                  defaultValue={this.state.stepValue}/>
                    <span>
                        <span className='question'>Completed {this.state.completed}/6</span>
                        <span className='question' style={{float: 'right'}}>{Math.round(this.state.stepValue)}%</span>
                        </span>
                </footer>
            </div>
        );
    }
}

export default MobileHorizontalProgressBar;
