/**
 * @flow
 * @relayHash 9ef8829a889ab779bff6de4f48b9cd05
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateProductVariantImagesMutationVariables = {|
  productVariantId: string,
  variantImageId: $ReadOnlyArray<?string>,
|};
export type UpdateProductVariantImagesMutationResponse = {|
  +uploadVariantImage: ?{|
    +message: ?string
  |}
|};
export type UpdateProductVariantImagesMutation = {|
  variables: UpdateProductVariantImagesMutationVariables,
  response: UpdateProductVariantImagesMutationResponse,
|};
*/


/*
mutation UpdateProductVariantImagesMutation(
  $productVariantId: ID!
  $variantImageId: [ID]!
) {
  uploadVariantImage(productVariantId: $productVariantId, variantImageId: $variantImageId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productVariantId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "variantImageId",
    "type": "[ID]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "uploadVariantImage",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "productVariantId",
        "variableName": "productVariantId"
      },
      {
        "kind": "Variable",
        "name": "variantImageId",
        "variableName": "variantImageId"
      }
    ],
    "concreteType": "UploadProductVariantImages",
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
    "name": "UpdateProductVariantImagesMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateProductVariantImagesMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateProductVariantImagesMutation",
    "id": null,
    "text": "mutation UpdateProductVariantImagesMutation(\n  $productVariantId: ID!\n  $variantImageId: [ID]!\n) {\n  uploadVariantImage(productVariantId: $productVariantId, variantImageId: $variantImageId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c3f4941471f14abb1b651acdf9e491d3';
module.exports = node;
