/**
 * @flow
 * @relayHash f5963641bebc96cc8280c06bec2569fd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteCategoryMutationVariables = {|
  categoryId?: ?$ReadOnlyArray<?string>
|};
export type DeleteCategoryMutationResponse = {|
  +deleteCategory: ?{|
    +message: ?string
  |}
|};
export type DeleteCategoryMutation = {|
  variables: DeleteCategoryMutationVariables,
  response: DeleteCategoryMutationResponse,
|};
*/


/*
mutation DeleteCategoryMutation(
  $categoryId: [ID]
) {
  deleteCategory(categoryId: $categoryId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "categoryId",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteCategory",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      }
    ],
    "concreteType": "DeleteCategory",
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
    "name": "DeleteCategoryMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteCategoryMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteCategoryMutation",
    "id": null,
    "text": "mutation DeleteCategoryMutation(\n  $categoryId: [ID]\n) {\n  deleteCategory(categoryId: $categoryId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a8020e93e1856627d533d9bf80717198';
module.exports = node;
