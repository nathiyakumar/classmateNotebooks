/**
 * @flow
 * @relayHash d0b8d4aac1eec745d4a7b9ed3ba5262c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteProductMutationVariables = {|
  productId: $ReadOnlyArray<?string>
|};
export type DeleteProductMutationResponse = {|
  +deleteProduct: ?{|
    +message: ?string
  |}
|};
export type DeleteProductMutation = {|
  variables: DeleteProductMutationVariables,
  response: DeleteProductMutationResponse,
|};
*/


/*
mutation DeleteProductMutation(
  $productId: [ID]!
) {
  deleteProduct(productId: $productId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "productId",
    "type": "[ID]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteProduct",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "productId",
        "variableName": "productId"
      }
    ],
    "concreteType": "DeleteProduct",
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
    "name": "DeleteProductMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteProductMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteProductMutation",
    "id": null,
    "text": "mutation DeleteProductMutation(\n  $productId: [ID]!\n) {\n  deleteProduct(productId: $productId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8b770cdaffb2100cb8fe22d4a8a6c287';
module.exports = node;
