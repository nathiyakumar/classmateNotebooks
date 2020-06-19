/**
 * @flow
 * @relayHash 38e85cbab2231951c3c4d6d3927a80cd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SingleProductPageCheckPincodeQueryVariables = {|
  pincode?: ?number
|};
export type SingleProductPageCheckPincodeQueryResponse = {|
  +checkPincodeAvailability: ?{|
    +pincode: ?number,
    +isAvailable: ?boolean,
  |}
|};
export type SingleProductPageCheckPincodeQuery = {|
  variables: SingleProductPageCheckPincodeQueryVariables,
  response: SingleProductPageCheckPincodeQueryResponse,
|};
*/


/*
query SingleProductPageCheckPincodeQuery(
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
    "name": "SingleProductPageCheckPincodeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SingleProductPageCheckPincodeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SingleProductPageCheckPincodeQuery",
    "id": null,
    "text": "query SingleProductPageCheckPincodeQuery(\n  $pincode: Int\n) {\n  checkPincodeAvailability(pincode: $pincode) {\n    pincode\n    isAvailable\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a3499da5dc4fa0787ecd3dec8bf17b93';
module.exports = node;
