//
// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import Modal from 'react-modal';
// import SlidingPane from 'react-sliding-pane';
// import 'react-sliding-pane/dist/react-sliding-pane.css';
// import './SlidingPanel.css';
//
// import shoppingCart from "../shoppingCart/shoppingCart";
//
//
// class SlidingPanel extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isPaneOpen: false,
//             isPaneOpenLeft: false
//         };
//     }
//
//     componentWillMount(){
//         this.setState({
//             isPaneOpen:this.props.open
//         });
//     }
//
//     componentDidMount() {
//         Modal.setAppElement(this.el);
//         this.setState({
//             isPaneOpen:this.props.open
//         });
//     }
//     componentWillReceiveProps(nextProps, nextContext) {
//         this.setState({
//             isPaneOpen:nextProps.open
//         });
//     }
//
//     render() {
//         debugger
//         console.log(this.props)
//         return <div ref={ref => this.el = ref}>
//             {/* <button onClick={() => this.setState({ isPaneOpen: true })}>Click me to open right pane!</button> */}
//
//             <SlidingPane
//                 className={'some-custom-class'}
//                 overlayClassName='some-custom-overlay-class'
//                 isOpen={ this.state.isPaneOpen }
//                 title='YOUR CART(1 item)'
//                 width='25%'
//                 onRequestClose={ () => {
//
//                     // triggered on "<" on left top click or on outside click
//                     this.setState({
//                         isPaneOpen: false
//                     },() => {
//                         this.props.closeSlidingpanel();
//                     });
//
//                 } }>
//                  <shoppingCart />
//             </SlidingPane>
//
//         </div>;
//     }
// }
//
// export default SlidingPanel;





import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './SlidingPanel.css';

const CLOSE_TIMEOUT = 500;

export default function ReactSlidingPane({
 isOpen,
 title,
 subtitle,
 onRequestClose,
 onAfterOpen,
 children,
 className,
 overlayClassName,
 closeIcon,
 from = 'right',
 width}) {



    const directionClass = `slide-pane_from_${from}`;

    return <Modal
        className={ `slide-pane ${directionClass} ${className || ''}` }
        style={{
            content: { width: width || '100%' }
        }}
        overlayClassName={ `slide-pane__overlay ${overlayClassName || ''}`}
        closeTimeoutMS={ CLOSE_TIMEOUT }
        isOpen={ isOpen }
        onAfterOpen={ onAfterOpen }
        onRequestClose={ onRequestClose }
        contentLabel={ `Modal "${title || ''}"` }
        ariaHideApp={false}
    >
        <div className='slide-pane__header'>
            <div className='slide-pane__close' onClick={ onRequestClose }>
                { closeIcon ? closeIcon : <IconClose /> }
            </div>
            <div className='slide-pane__title-wrapper'>
                <h2 className='slide-pane__title'>{ title }</h2>
                <div className='slide-pane__subtitle'>{ subtitle }</div>
            </div>
        </div>
        <div className='slide-pane__content'>
            { children }
        </div>
    </Modal>;
}

ReactSlidingPane.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.any,
    subtitle: PropTypes.any,
    onRequestClose: PropTypes.func,
    onAfterOpen: PropTypes.func,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    from: PropTypes.oneOf(['left', 'right', 'bottom']),
    width: PropTypes.string,
    closeIcon: PropTypes.any
};

function IconClose() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 22'>
            <path fill='currentColor' fillRule='evenodd'
                  d='M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z' />
        </svg>
    );
}
