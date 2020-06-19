import React from 'react';
import Media from 'react-media';
import { small_screen } from '../../variables';
import PaperkraftBrandCommonPage from './PaperkraftBrandCommonPage';
import MblPaperkraftCommonPage from './Mobile/MblPaperkraftCommonPage';
import MetaWrapper from "../../Meta/MetaWrapper";
// import ReactGA from 'react-ga';

class PaperkraftBrandPageIndex extends React.Component{

    componentDidMount(){

        // ReactGA.initialize('UA-57376375-16');
        // ReactGA.event({
        //     'page_title' : 'Define Your Style with Paperkraft Signature Series Notebooks & Diaries',
        //     'page_path': window.location.pathname
        // });
    }

    componentWillMount(){
        // ReactGA.set({
        //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        //     title: "Define Your Style with Paperkraft Signature Series Notebooks & Diaries"
        // });
        //
        // ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div>
                <MetaWrapper
                    meta={{
                        description: "Choose unique notebooks from Paperkraft with a wide range of options like Green impression series for professionals and Signature series for creative professionals.",
                        title: "Define Your Style with Paperkraft Signature Series Notebooks & Diaries",
                    }}
                >
                <Media query={{maxWidth:small_screen}} render={() =>
                    (
                        <MblPaperkraftCommonPage />
                    )}
                />
                <Media query={{minWidth:small_screen}} render={() =>
                    (
                        <PaperkraftBrandCommonPage />
                    )}
                />
                </MetaWrapper>
            </div>
        );
    }

}

export default PaperkraftBrandPageIndex;
