/**
 * @flow
 * @relayHash e1a30e12496aeac8b193a49c984e8e49
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingPriceUpdateInput = {|
  name?: ?string,
  productTypes?: ?ShippingProductTypesInput,
  price?: ?number,
  gstInPercent?: ?number,
  charges?: ?number,
  minimumOrderPrice?: ?number,
  maximumOrderPrice?: ?number,
  minimumOrderWeight?: ?number,
  maximumOrderWeight?: ?number,
  shippingMethodId: string,
|};
export type ShippingProductTypesInput = {|
  customized: boolean,
  nonCustomized: boolean,
|};
export type UpdateShippingMethodMutationVariables = {|
  input: ShippingPriceUpdateInput
|};
export type UpdateShippingMethodMutationResponse = {|
  +updateShippingMethod: ?{|
    +shippingMethod: ?{|
      +id: string,
      +name: string,
    |}
  |}
|};
export type UpdateShippingMethodMutation = {|
  variables: UpdateShippingMethodMutationVariables,
  response: UpdateShippingMethodMutationResponse,
|};
*/


/*
mutation UpdateShippingMethodMutation(
  $input: ShippingPriceUpdateInput!
) {
  updateShippingMethod(input: $input) {
    shippingMethod {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ShippingPriceUpdateInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateShippingMethod",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ShippingMethodUpdate",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "shippingMethod",
        "storageKey": null,
        "args": null,
        "concreteType": "ShippingMethodType",
        "plural": false,
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
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UpdateShippingMethodMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateShippingMethodMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateShippingMethodMutation",
    "id": null,
    "text": "mutation UpdateShippingMethodMutation(\n  $input: ShippingPriceUpdateInput!\n) {\n  updateShippingMethod(input: $input) {\n    shippingMethod {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf95a38846b77368c27a651cd584326d';
module.exports = node;
