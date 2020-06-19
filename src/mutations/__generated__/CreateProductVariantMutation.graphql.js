/**
 * @flow
 * @relayHash 08944ead8336cd1f1ecd0cbe9a0f743a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductVariantInput = {|
  costPrice?: ?number,
  attributes?: ?any,
  quantity?: ?number,
  priceOverride?: ?number,
  sku?: ?string,
|};
export type CreateProductVariantMutationVariables = {|
  input?: ?ProductVariantInput,
  product: string,
|};
export type CreateProductVariantMutationResponse = {|
  +createProductVariant: ?{|
    +singleProduct: ?{|
      +id: string,
      +name: string,
    |},
    +message: ?string,
  |}
|};
export type CreateProductVariantMutation = {|
  variables: CreateProductVariantMutationVariables,
  response: CreateProductVariantMutationResponse,
|};
*/


/*
mutation CreateProductVariantMutation(
  $input: ProductVariantInput
  $product: ID!
) {
  createProductVariant(input: $input, product: $product) {
    singleProduct {
      id
      name
    }
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ProductVariantInput",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "product",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createProductVariant",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      },
      {
        "kind": "Variable",
        "name": "product",
        "variableName": "product"
      }
    ],
    "concreteType": "CreateProductVariant",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleProduct",
        "storageKey": null,
        "args": null,
        "concreteType": "NewProductVariantType",
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
      },
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
    "name": "CreateProductVariantMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateProductVariantMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateProductVariantMutation",
    "id": null,
    "text": "mutation CreateProductVariantMutation(\n  $input: ProductVariantInput\n  $product: ID!\n) {\n  createProductVariant(input: $input, product: $product) {\n    singleProduct {\n      id\n      name\n    }\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf350df9308c953e2b403527559d2a70';
module.exports = node;
