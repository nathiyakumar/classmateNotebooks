/**
 * @flow
 * @relayHash 95f441799862282462c4cc9210049ca7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteProductVariantImagesMutationVariables = {|
  imageId: $ReadOnlyArray<?string>
|};
export type DeleteProductVariantImagesMutationResponse = {|
  +deleteVariantImage: ?{|
    +message: ?string
  |}
|};
export type DeleteProductVariantImagesMutation = {|
  variables: DeleteProductVariantImagesMutationVariables,
  response: DeleteProductVariantImagesMutationResponse,
|};
*/


/*
mutation DeleteProductVariantImagesMutation(
  $imageId: [ID]!
) {
  deleteVariantImage(imageId: $imageId) {
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
    "name": "deleteVariantImage",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "imageId",
        "variableName": "imageId"
      }
    ],
    "concreteType": "DeleteProductVariantImage",
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
    "name": "DeleteProductVariantImagesMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteProductVariantImagesMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteProductVariantImagesMutation",
    "id": null,
    "text": "mutation DeleteProductVariantImagesMutation(\n  $imageId: [ID]!\n) {\n  deleteVariantImage(imageId: $imageId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1d977ba78c0f8415ddc3f19285fe25be';
module.exports = node;
