/**
 * @flow
 * @relayHash e02f8b7709d81e270bc5bf127e90303d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteProductVariantMutationVariables = {|
  productVariantId: $ReadOnlyArray<?string>
|};
export type DeleteProductVariantMutationResponse = {|
  +deleteProductVariant: ?{|
    +message: ?string
  |}
|};
export type DeleteProductVariantMutation = {|
  variables: DeleteProductVariantMutationVariables,
  response: DeleteProductVariantMutationResponse,
|};
*/


/*
mutation DeleteProductVariantMutation(
  $productVariantId: [ID]!
) {
  deleteProductVariant(productVariantId: $productVariantId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productVariantId",
    "type": "[ID]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteProductVariant",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "productVariantId",
        "variableName": "productVariantId"
      }
    ],
    "concreteType": "DeleteProductVariant",
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
    "name": "DeleteProductVariantMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteProductVariantMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteProductVariantMutation",
    "id": null,
    "text": "mutation DeleteProductVariantMutation(\n  $productVariantId: [ID]!\n) {\n  deleteProductVariant(productVariantId: $productVariantId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '237e4f3e00d17ff06717efdbd551fbb6';
module.exports = node;
