/**
 * @flow
 * @relayHash 2a4c06c9a4e18e37c6ee2f6f3658d7c2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteCollectionMutationVariables = {|
  collectionId?: ?$ReadOnlyArray<?string>
|};
export type DeleteCollectionMutationResponse = {|
  +deleteCollection: ?{|
    +message: ?string
  |}
|};
export type DeleteCollectionMutation = {|
  variables: DeleteCollectionMutationVariables,
  response: DeleteCollectionMutationResponse,
|};
*/


/*
mutation DeleteCollectionMutation(
  $collectionId: [ID]
) {
  deleteCollection(collectionId: $collectionId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "collectionId",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteCollection",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "collectionId",
        "variableName": "collectionId"
      }
    ],
    "concreteType": "DeleteCollection",
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
    "name": "DeleteCollectionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteCollectionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteCollectionMutation",
    "id": null,
    "text": "mutation DeleteCollectionMutation(\n  $collectionId: [ID]\n) {\n  deleteCollection(collectionId: $collectionId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd146eff37a7bc13528efee5719ac7f10';
module.exports = node;
