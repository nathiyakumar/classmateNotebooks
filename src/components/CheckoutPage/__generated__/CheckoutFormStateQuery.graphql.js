/**
 * @flow
 * @relayHash 60e5dd6f7d7cc5ab7dd9dfd4c4cb6cd3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutFormStateQueryVariables = {||};
export type CheckoutFormStateQueryResponse = {|
  +getStates: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +stateAbbr: string,
  |}>
|};
export type CheckoutFormStateQuery = {|
  variables: CheckoutFormStateQueryVariables,
  response: CheckoutFormStateQueryResponse,
|};
*/


/*
query CheckoutFormStateQuery {
  getStates {
    id
    name
    stateAbbr
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getStates",
    "storageKey": null,
    "args": null,
    "concreteType": "StatesType",
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
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "stateAbbr",
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
    "name": "CheckoutFormStateQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CheckoutFormStateQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CheckoutFormStateQuery",
    "id": null,
    "text": "query CheckoutFormStateQuery {\n  getStates {\n    id\n    name\n    stateAbbr\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd4c17a2115b1f0c41cf29ca993d2ae7a';
module.exports = node;
