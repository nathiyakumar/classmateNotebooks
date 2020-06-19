/**
 * @flow
 * @relayHash dbf9f448e2fbe6ed0f4d113834893423
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutFormQueryVariables = {||};
export type CheckoutFormQueryResponse = {|
  +getStates: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +stateAbbr: string,
  |}>
|};
export type CheckoutFormQuery = {|
  variables: CheckoutFormQueryVariables,
  response: CheckoutFormQueryResponse,
|};
*/


/*
query CheckoutFormQuery {
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
    "name": "CheckoutFormQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CheckoutFormQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CheckoutFormQuery",
    "id": null,
    "text": "query CheckoutFormQuery {\n  getStates {\n    id\n    name\n    stateAbbr\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '149a66dae185d7440d9c54891c415adb';
module.exports = node;
