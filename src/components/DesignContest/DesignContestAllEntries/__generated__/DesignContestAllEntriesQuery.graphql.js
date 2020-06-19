/**
 * @flow
 * @relayHash 57e31e97619f65999c920f8f4861ca1a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DesignDataWorkType = "ART" | "PHOTOGRAPHY" | "%future added value";
export type DesignContestAllEntriesQueryVariables = {||};
export type DesignContestAllEntriesQueryResponse = {|
  +allDesignsDataList: ?$ReadOnlyArray<?{|
    +id: string,
    +designTitle: ?string,
    +workType: DesignDataWorkType,
    +isRulesAccepted: boolean,
    +designedImage: string,
    +isFeatured: boolean,
    +isSelected: boolean,
    +created: any,
  |}>
|};
export type DesignContestAllEntriesQuery = {|
  variables: DesignContestAllEntriesQueryVariables,
  response: DesignContestAllEntriesQueryResponse,
|};
*/


/*
query DesignContestAllEntriesQuery {
  allDesignsDataList {
    id
    designTitle
    workType
    isRulesAccepted
    designedImage
    isFeatured
    isSelected
    created
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "allDesignsDataList",
    "storageKey": null,
    "args": null,
    "concreteType": "DesignDataType",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "designTitle",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "workType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isRulesAccepted",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "designedImage",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isFeatured",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isSelected",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "created",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DesignContestAllEntriesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DesignContestAllEntriesQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "DesignContestAllEntriesQuery",
    "id": null,
    "text": "query DesignContestAllEntriesQuery {\n  allDesignsDataList {\n    id\n    designTitle\n    workType\n    isRulesAccepted\n    designedImage\n    isFeatured\n    isSelected\n    created\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '25fd0b56a69459e388ab1e2c887417a0';
module.exports = node;
