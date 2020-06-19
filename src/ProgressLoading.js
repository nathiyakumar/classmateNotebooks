import React from "react";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class ProgressLoading extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            percentage :0,
            response : this.props.response
        }

    }

    componentDidMount() {

        let timeleft = 0;

        if(this.state.response === true){
            timeleft = 58
        }
        else{
            timeleft = 0
        }
            let self = this;

            let downloadTimer = setInterval(function () {
                timeleft++;

                if (timeleft === 61){
                    clearInterval(downloadTimer);

                }

                else{

                        var percent = Math.round( (timeleft*100) / 60);

                        self.setState({
                            percentage : percent
                        })
                        //
                        // self.setState({
                        //     percentage : 100
                        // })


                }
            },1000);


    }


    render() {

        return (
            <div style={{width:'60vw',display:' block',
                margin: '0 auto'}}>
                <Progress type="circle"
                    percent={this.state.percentage}
                />

            </div>
        );
    }

}


export default ProgressLoading
