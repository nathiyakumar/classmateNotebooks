import * as React from "react";
import { META_DEFAULTS } from "../Core/config";

export type MetaContextInterface  = {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    type?: string;
    custom?: [];
}

export const { Provider, Consumer } = React.createContext(
    META_DEFAULTS
);
