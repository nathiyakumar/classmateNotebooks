import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";
// import ReactGA from "react-ga";


const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    return (
    <MetaConsumer>
        {({ title, description, image, type, url, custom }) => {
            // ReactGA.set({
            //     location: `${window.location.origin}${window.location.pathname}${window.location.search}`,
            //     title: title
            // });
            //
            // ReactGA.pageview(window.location.pathname);
            // ReactGA.set( {
            //     title: title
            // });
            // ReactGA.pageview(window.location.pathname);
            return (
                <>
                    <Helmet
                        title={title}
                        meta={[
                            { name: "description", content: description },
                            { property: "og:url", content: url },
                            { property: "og:type", content: type },
                            { property: "og:image", content: image },
                            ...custom,
                        ]}

                    />
                    {children}
                </>
            )
        }}
    </MetaConsumer>
)};

export default Consumer;
