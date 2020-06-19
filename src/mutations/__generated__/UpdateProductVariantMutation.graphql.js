/**
 * @flow
 * @relayHash c8b84a3f9daf12109efc926ef630a69b
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
export type UpdateProductVariantMutationVariables = {|
  input?: ?ProductVariantInput,
  productVariantId: string,
|};
export type UpdateProductVariantMutationResponse = {|
  +updateProductVariant: ?{|
    +message: ?string
  |}
|};
export type UpdateProductVariantMutation = {|
  variables: UpdateProductVariantMutationVariables,
  response: UpdateProductVariantMutationResponse,
|};
*/


/*
mutation UpdateProductVariantMutation(
  $input: ProductVariantInput
  $productVariantId: ID!
) {
  updateProductVariant(input: $input, productVariantId: $productVariantId) {
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
    "name": "productVariantId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateProductVariant",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      },
      {
        "kind": "Variable",
        "name": "productVariantId",
        "variableName": "productVariantId"
      }
    ],
    "concreteType": "UpdateProductVariant",
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
    "name": "UpdateProductVariantMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateProductVariantMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateProductVariantMutation",
    "id": null,
    "text": "mutation UpdateProductVariantMutation(\n  $input: ProductVariantInput\n  $productVariantId: ID!\n) {\n  updateProductVariant(input: $input, productVariantId: $productVariantId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2bc7a968c0acccdbb8e23bb01126da35';
module.exports = node;
