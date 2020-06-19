/**
 * @flow
 * @relayHash 545fc866393db15fdf492c661876b3fb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingMethodTypeEnum = "BOTH" | "PRICE" | "PRODUCT_TYPE_BASED" | "WEIGHT" | "%future added value";
export type ShippingPriceInput = {|
  name?: ?string,
  type?: ?ShippingMethodTypeEnum,
  productTypes?: ?ShippingProductTypesInput,
  price?: ?number,
  gstInPercent?: ?number,
  charges?: ?number,
  shippingZone?: ?string,
  minimumOrderPrice?: ?number,
  maximumOrderPrice?: ?number,
  minimumOrderWeight?: ?number,
  maximumOrderWeight?: ?number,
|};
export type ShippingProductTypesInput = {|
  customized: boolean,
  nonCustomized: boolean,
|};
export type CreateShippingMethodMutationVariables = {|
  input: ShippingPriceInput
|};
export type CreateShippingMethodMutationResponse = {|
  +createShippingMethod: ?{|
    +shippingMethod: ?{|
      +id: string,
      +name: string,
    |}
  |}
|};
export type CreateShippingMethodMutation = {|
  variables: CreateShippingMethodMutationVariables,
  response: CreateShippingMethodMutationResponse,
|};
*/


/*
mutation CreateShippingMethodMutation(
  $input: ShippingPriceInput!
) {
  createShippingMethod(input: $input) {
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
    "type": "ShippingPriceInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createShippingMethod",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ShippingMethodCreate",
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
    "name": "CreateShippingMethodMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateShippingMethodMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateShippingMethodMutation",
    "id": null,
    "text": "mutation CreateShippingMethodMutation(\n  $input: ShippingPriceInput!\n) {\n  createShippingMethod(input: $input) {\n    shippingMethod {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '52e5b0628fd6e04d734058363a002b41';
module.exports = node;
