/**
 * @flow
 * @relayHash 7eb327dc1bb327b0ec4ebcef0b1105fc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomerCreateStateListQueryVariables = {||};
export type CustomerCreateStateListQueryResponse = {|
  +getStates: ?$ReadOnlyArray<?{|
    +name: string,
    +stateAbbr: string,
  |}>
|};
export type CustomerCreateStateListQuery = {|
  variables: CustomerCreateStateListQueryVariables,
  response: CustomerCreateStateListQueryResponse,
|};
*/


/*
query CustomerCreateStateListQuery {
  getStates {
    name
    stateAbbr
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stateAbbr",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CustomerCreateStateListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getStates",
        "storageKey": null,
        "args": null,
        "concreteType": "StatesType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomerCreateStateListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getStates",
        "storageKey": null,
        "args": null,
        "concreteType": "StatesType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CustomerCreateStateListQuery",
    "id": null,
    "text": "query CustomerCreateStateListQuery {\n  getStates {\n    name\n    stateAbbr\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4948c0c68cb3cb2b493b5f6d09d70f53';
module.exports = node;
