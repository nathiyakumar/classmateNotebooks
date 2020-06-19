import React from "react";
import './QuantityCarousel.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



class QuantityCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.children,
            current: 0,
            isNext: true
        };

        this.handlerPrev = this.handlerPrev.bind(this);
        this.handlerNext = this.handlerNext.bind(this);
        this.goToHistoryClick = this.goToHistoryClick.bind(this);
    }

    handlerPrev() {
        let index = this.state.current,
            length = this.state.items.length;

        if( index < 1 ) {
            index = length;
        }

        index = index - 1;

        this.setState({
            current: index,
            isNext: false
        });
    }

    handlerNext() {
        let index = this.state.current,
            length = this.state.items.length - 1;

        if( index === length ) {
            index = -1;
        }

        index = index + 1;

        this.setState({
            current: index,
            isNext: true
        });
    }

    goToHistoryClick( curIndex, index ) {
        let next = (curIndex < index);
        this.setState({
            current: index,
            isNext: next
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            items: nextProps.children,
        })
    }

    render(){
        let index = this.state.current,
            isnext = this.state.isNext,
            carousel_content = this.state.items[index];

        return (
            <div className="design_carousel">
                <div className={"carousel-"+this.props.size}>
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: isnext ? 'enter-next' : 'enter-prev',
                            enterActive: 'enter-active',
                            leave: 'leave',
                            leaveActive: isnext ? 'leave-active-next' : 'leave-active-prev'
                        }}
                         transitionEnterTimeout={500} transitionAppearTimeout={500} transitionLeaveTimeout={500}
                    >
                        <div className={"carousel_slide_"+this.props.size} key={index}>
                            {carousel_content}
                        </div>
                    </ReactCSSTransitionGroup>
                    {/*<button className="carousel_control carousel_control__prev" onClick={this.handlerPrev}><span></span></button>*/}
                    {/*<button className="carousel_control carousel_control__next" onClick={this.handlerNext}><span></span></button>*/}
                    {
                        this.props.CarouselIndicatorType === "carousel" && this.state.items.length > 1?
                            (<div className={"carousel_history_"+this.props.size}>
                                <div>
                                <History
                                    current={this.state.current}
                                    items={this.state.items}
                                    changeSilde={this.goToHistoryClick}
                                />
                                </div>
                            </div>): null
                    }

                </div>
            </div>
        )
    }
}

export default QuantityCarousel;

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let current = this.props.current;
        let items = this.props.items.map( (el, index) => {
            let name = (index === current) ? 'active' : '';
            return (
                <li key={index}>
                    <button className={name} onClick={() => this.props.changeSilde(current, index)}/>
                </li>
            )
        });

        return (
            <ul>{items}</ul>
        )
    }
}

