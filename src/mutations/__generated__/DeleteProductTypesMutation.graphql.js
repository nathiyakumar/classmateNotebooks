/**
 * @flow
 * @relayHash abb2ac9550d784081b8a48f65c59f61b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteProductTypesMutationVariables = {|
  prdTypeIds?: ?$ReadOnlyArray<?string>
|};
export type DeleteProductTypesMutationResponse = {|
  +deleteProductType: ?{|
    +message: ?string
  |}
|};
export type DeleteProductTypesMutation = {|
  variables: DeleteProductTypesMutationVariables,
  response: DeleteProductTypesMutationResponse,
|};
*/


/*
mutation DeleteProductTypesMutation(
  $prdTypeIds: [ID]
) {
  deleteProductType(prdTypeIds: $prdTypeIds) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "prdTypeIds",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteProductType",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "prdTypeIds",
        "variableName": "prdTypeIds"
      }
    ],
    "concreteType": "DeleteProductType",
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
    "name": "DeleteProductTypesMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteProductTypesMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteProductTypesMutation",
    "id": null,
    "text": "mutation DeleteProductTypesMutation(\n  $prdTypeIds: [ID]\n) {\n  deleteProductType(prdTypeIds: $prdTypeIds) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c4235e30b763cbc3cae041f5114c57e9';
module.exports = node;
