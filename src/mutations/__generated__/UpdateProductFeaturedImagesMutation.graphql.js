/**
 * @flow
 * @relayHash ca5d7de7e9beb465ef7e64c4f0219e4f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateProductFeaturedImagesMutationVariables = {|
  productId: string,
  imageId: string,
|};
export type UpdateProductFeaturedImagesMutationResponse = {|
  +setFeaturedImage: ?{|
    +message: ?string
  |}
|};
export type UpdateProductFeaturedImagesMutation = {|
  variables: UpdateProductFeaturedImagesMutationVariables,
  response: UpdateProductFeaturedImagesMutationResponse,
|};
*/


/*
mutation UpdateProductFeaturedImagesMutation(
  $productId: ID!
  $imageId: ID!
) {
  setFeaturedImage(productId: $productId, imageId: $imageId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "imageId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setFeaturedImage",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "imageId",
        "variableName": "imageId"
      },
      {
        "kind": "Variable",
        "name": "productId",
        "variableName": "productId"
      }
    ],
    "concreteType": "SetFeaturedImage",
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
    "name": "UpdateProductFeaturedImagesMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateProductFeaturedImagesMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateProductFeaturedImagesMutation",
    "id": null,
    "text": "mutation UpdateProductFeaturedImagesMutation(\n  $productId: ID!\n  $imageId: ID!\n) {\n  setFeaturedImage(productId: $productId, imageId: $imageId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fdc69e4d31467db94dbf4c6ca5b5913f';
module.exports = node;
