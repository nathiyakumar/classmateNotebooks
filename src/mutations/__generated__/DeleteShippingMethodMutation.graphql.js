/**
 * @flow
 * @relayHash b36cc944c4b001f5dae5b01c91d2012d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteShippingMethodMutationVariables = {|
  shippingMethodIds?: ?$ReadOnlyArray<?string>
|};
export type DeleteShippingMethodMutationResponse = {|
  +deleteShippingMethod: ?{|
    +message: ?string
  |}
|};
export type DeleteShippingMethodMutation = {|
  variables: DeleteShippingMethodMutationVariables,
  response: DeleteShippingMethodMutationResponse,
|};
*/


/*
mutation DeleteShippingMethodMutation(
  $shippingMethodIds: [ID]
) {
  deleteShippingMethod(shippingMethodIds: $shippingMethodIds) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "shippingMethodIds",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteShippingMethod",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "shippingMethodIds",
        "variableName": "shippingMethodIds"
      }
    ],
    "concreteType": "ShippingMethodDelete",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
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
    "name": "DeleteShippingMethodMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteShippingMethodMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteShippingMethodMutation",
    "id": null,
    "text": "mutation DeleteShippingMethodMutation(\n  $shippingMethodIds: [ID]\n) {\n  deleteShippingMethod(shippingMethodIds: $shippingMethodIds) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '91999c0ed9af2e872a8b20b88873c4e6';
module.exports = node;
