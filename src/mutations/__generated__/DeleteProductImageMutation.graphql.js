/**
 * @flow
 * @relayHash 405078c657d57ec57a652d5d8c915f2f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteProductImageMutationVariables = {|
  imageId: $ReadOnlyArray<?string>
|};
export type DeleteProductImageMutationResponse = {|
  +deleteProductImages: ?{|
    +message: ?string
  |}
|};
export type DeleteProductImageMutation = {|
  variables: DeleteProductImageMutationVariables,
  response: DeleteProductImageMutationResponse,
|};
*/


/*
mutation DeleteProductImageMutation(
  $imageId: [ID]!
) {
  deleteProductImages(imageId: $imageId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "imageId",
    "type": "[ID]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteProductImages",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "imageId",
        "variableName": "imageId"
      }
    ],
    "concreteType": "DeleteProductImage",
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
    "name": "DeleteProductImageMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteProductImageMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteProductImageMutation",
    "id": null,
    "text": "mutation DeleteProductImageMutation(\n  $imageId: [ID]!\n) {\n  deleteProductImages(imageId: $imageId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6b3d22721244cdaeb8821e3f11e80088';
module.exports = node;
