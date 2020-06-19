/**
 * @flow
 * @relayHash d6b7039032ed4bdca43729a8fa76bb5d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileSingleProductPageCheckPincodeQueryVariables = {|
  pincode?: ?number
|};
export type MobileSingleProductPageCheckPincodeQueryResponse = {|
  +checkPincodeAvailability: ?{|
    +pincode: ?number,
    +isAvailable: ?boolean,
  |}
|};
export type MobileSingleProductPageCheckPincodeQuery = {|
  variables: MobileSingleProductPageCheckPincodeQueryVariables,
  response: MobileSingleProductPageCheckPincodeQueryResponse,
|};
*/


/*
query MobileSingleProductPageCheckPincodeQuery(
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
    "name": "MobileSingleProductPageCheckPincodeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileSingleProductPageCheckPincodeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MobileSingleProductPageCheckPincodeQuery",
    "id": null,
    "text": "query MobileSingleProductPageCheckPincodeQuery(\n  $pincode: Int\n) {\n  checkPincodeAvailability(pincode: $pincode) {\n    pincode\n    isAvailable\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '13b5aabca8213169a60442aa963b7fc2';
module.exports = node;
