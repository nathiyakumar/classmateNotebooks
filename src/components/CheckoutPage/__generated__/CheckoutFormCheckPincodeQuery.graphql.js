/**
 * @flow
 * @relayHash 9fec33f9509eb76d643b05eaef750e36
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutFormCheckPincodeQueryVariables = {|
  pincode?: ?number
|};
export type CheckoutFormCheckPincodeQueryResponse = {|
  +checkPincodeAvailability: ?{|
    +pincode: ?number,
    +isAvailable: ?boolean,
  |}
|};
export type CheckoutFormCheckPincodeQuery = {|
  variables: CheckoutFormCheckPincodeQueryVariables,
  response: CheckoutFormCheckPincodeQueryResponse,
|};
*/


/*
query CheckoutFormCheckPincodeQuery(
  $pincode: Int
) {
  checkPincodeAvailability(pincode: $pincode) {
    pincode
    isAvailable
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pincode",
    "type": "Int",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "checkPincodeAvailability",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "pincode",
        "variableName": "pincode"
      }
    ],
    "concreteType": "PincodeAvailabilityType",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "pincode",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isAvailable",
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
    "name": "CheckoutFormCheckPincodeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CheckoutFormCheckPincodeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CheckoutFormCheckPincodeQuery",
    "id": null,
    "text": "query CheckoutFormCheckPincodeQuery(\n  $pincode: Int\n) {\n  checkPincodeAvailability(pincode: $pincode) {\n    pincode\n    isAvailable\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dcd2a196ac96014ddcee40ae7ff0acc8';
module.exports = node;
