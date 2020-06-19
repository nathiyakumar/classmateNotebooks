import React from "react";
import {withRouter} from 'react-router-dom';

class NotFound extends React.Component{


    componentDidMount(){

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                NotFound
            </div>
        );
    }

}
export default withRouter(NotFound);
