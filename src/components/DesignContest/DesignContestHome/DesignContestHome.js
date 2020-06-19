import React from 'react';
import './DesignContestHome.css';
import DesignContestHeaders from "../DesignContestHeader/DesignContestHeader";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from "@material-ui/core/CardContent";
import AddIcon from '@material-ui/icons/Add';
import Media from "react-media";
import {small_screen} from "../../../variables";
import MobileDesignContestHeader from "../DesignContestHeader/MobileDesignContestHeader";
import IconButton from "@material-ui/core/IconButton";
import Popup from "../Popup";
import AuthContext from "../../AuthProvider/auth-context";

class DesignContestHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setshowPopup: false
        }
    }

    openLoginForm = () => {

        this.setState({
            setshowPopup: true
        })

    }
    closeLoginForm = () => {
        this.setState({
            setshowPopup: false
        })

    }
    openDesignUploadPage=()=>{
        this.props.history.push('design-contest-upload');

    }

    render() {
        return (
            <AuthContext.Consumer>

                {AuthProviderData => {
                    const {logged_in, user_details} = AuthProviderData;
                    return (
                        <div>
                            <Media query={{maxWidth: small_screen}} render={() =>
                                (
                                    <MobileDesignContestHeader/>
                                )}
                            />
                            <Media query={{minWidth: small_screen}} render={() =>
                                (
                                    <DesignContestHeaders/>
                                )}
                            />
                            <div className="design_contest_home_page">
                                <div className="image-box__overlay"></div>
                                <div className="contest_home_content">
                                    <p className="classmate_title">Classmate's</p>
                                    <h1>Weekly Design Challenge</h1>

                                    {logged_in ?
                                        <button className="submit_btn" onClick={this.openDesignUploadPage} >REGISTER TO
                                            PARTICIPATE
                                        </button> :
                                        <button className="submit_btn" onClick={this.openLoginForm}>REGISTER TO
                                            PARTICIPATE
                                        </button>
                                    }

                                </div>
                                <div className="contest_home_body_content">
                                    <div className="challege_content"><h4>This Week's Challenge 💪</h4>
                                        <p>We announce challenges weekly once so you can show off your skill, gain
                                            exposure and get
                                            recognition among the community. Explore our open challenge and submit your
                                            work!</p>
                                    </div>
                                    <div>
                                        <div style={{
                                            display: ' flex',
                                            alignItems: ' center',
                                            flexDirection: ' column'
                                        }}>
                                            <div className="border_content"><h2>Nature's Beauty</h2>
                                                <p>Photography & Art</p></div>
                                            {logged_in ?
                                                <button className="submit_btn" onClick={this.openDesignUploadPage}>SUBMIT YOUR
                                                    WORK
                                                </button> :
                                                <button className="submit_btn" onClick={this.openLoginForm}>SUBMIT YOUR
                                                    WORK
                                                </button>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="design-contest-second-section">
                                <h2>How it Works</h2>
                                <Grid container spacing={1} style={{marginTop: '30px'}}>
                                    <Grid item xs={4}>
                                        <div className="workStep">
                                            <span className="count-work">1</span>
                                            <h4 style={{margin: '0px'}}>Design</h4>
                                            <p>Start designing based on topic. You can either go for artwork or
                                                photography.</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="workStep">
                                            <span className="count-work">2</span>
                                            <h4 style={{margin: '0px'}}>Upload Design</h4>
                                            <p>Select category to upload your design</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="workStep">
                                            <span className="count-work">3</span>
                                            <h4 style={{margin: '0px'}}>Get Recognized</h4>
                                            <p>Stand a chance to get featured on our top picks.</p>
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                            <div className="design-contest-third-section">
                                <h2 style={{textAlign: 'center'}}>Contest Rules</h2>
                                <p>Following are the big no-no’s, the things that are legal requirements pretty much no
                                    matter where
                                    you live:</p>
                                <ul>
                                    <li>You absolutely cannot charge a fee to enter your promotion. Charging a fee
                                        causes your
                                        promotion to become a lottery, which is a very different (and much more highly
                                        regulated)
                                        legal entity. You also can’t require your winners to pay for shipment of their
                                        prizes,
                                        though they are responsible for their own taxes.
                                    </li>
                                    <li>If you are running a sweepstake, you
                                        absolutely must choose your winner randomly. Additionally, these people are
                                        ineligible to
                                        enter: your family, anyone who lives at your address, any of your employees or
                                        contractors,
                                        your sponsor, and your sponsor’s employees or contractors.
                                    </li>
                                    <li>For U.S.-based bloggers, you
                                        cannot run a promotion involving any of the following industries: tobacco,
                                        alcohol,
                                        gasoline, dairy, insurance, and financial institutes. Special requirements apply
                                        to these
                                        industries, and usually the cost of running a promotion won’t justify the time
                                        you would
                                        spend on it.
                                    </li>
                                    <li>You cannot extend an entry deadline. You must stick to your first stated
                                        entry deadline, even if you don’t get many entries or you feel the promotion
                                        wasn’t
                                        successful enough. By running your promotion and stating an entry deadline, you
                                        have entered
                                        into a binding contract with your initial entrants.
                                    </li>
                                    <li>If you get no entries at all, then you
                                        should end the first promotion and start a second one, not continue the first
                                        one.
                                    </li>
                                    <li>You
                                        must accept all valid entries. This is stricter than you may think, with the
                                        benefit of the
                                        doubt going to your participants. For example, your sweepstakes entrants are
                                        asked to go to
                                        a sponsor’s website and name a favorite product in order to be entered into your
                                        promotion.
                                        They leave a comment that simply says, “I don’t know, enter me anyway.” That is
                                        a valid
                                        entry.
                                    </li>
                                    <li>Conversely, if you state that there is only one entry per person and you find
                                        that
                                        a person violated that rule, that is not a valid entry.
                                    </li>

                                </ul>
                            </div>
                            <div className="design-contest-fourth-section">
                                <h2 style={{textAlign: 'center'}}>FAQ</h2>
                                <ExpansionPanel style={{
                                    width: '50vw',
                                    margin: '10px 0px',
                                    border: 'none',
                                    backgroundColor: '#F5F5F5'
                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<AddIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography style={{fontWeight: "bold"}}>What is Classmate Design
                                            Contest?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel style={{
                                    width: '50vw',
                                    margin: '10px 0px',
                                    border: 'none',
                                    backgroundColor: '#F5F5F5'
                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<AddIcon/>}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography style={{fontWeight: "bold"}}>What is Classmate Design
                                            Contest?</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel style={{
                                    width: '50vw',
                                    margin: '10px 0px',
                                    border: 'none',
                                    backgroundColor: '#F5F5F5'
                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<AddIcon/>}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                    >
                                        <Typography style={{fontWeight: "bold"}}>What is Classmate Design
                                            Contest?</Typography>
                                    </ExpansionPanelSummary>
                                </ExpansionPanel>
                            </div>
                            {this.state.setshowPopup ?
                                <Popup closeLoginForm={this.closeLoginForm}/>
                                : null
                            }
                        </div>
                    )
                }
                }
            </AuthContext.Consumer>
        );
    }
}

export default DesignContestHome
