/**
 * @flow
 * @relayHash c087347b913c3df5dc7b684923d0b6a6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteAttributeMutationVariables = {|
  attributesList?: ?$ReadOnlyArray<?string>
|};
export type DeleteAttributeMutationResponse = {|
  +deleteAttribute: ?{|
    +message: ?string
  |}
|};
export type DeleteAttributeMutation = {|
  variables: DeleteAttributeMutationVariables,
  response: DeleteAttributeMutationResponse,
|};
*/


/*
mutation DeleteAttributeMutation(
  $attributesList: [ID]
) {
  deleteAttribute(attributesList: $attributesList) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "attributesList",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteAttribute",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "attributesList",
        "variableName": "attributesList"
      }
    ],
    "concreteType": "DeleteAttribute",
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
    "name": "DeleteAttributeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteAttributeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteAttributeMutation",
    "id": null,
    "text": "mutation DeleteAttributeMutation(\n  $attributesList: [ID]\n) {\n  deleteAttribute(attributesList: $attributesList) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f0a3bf2d66873b1b5ccf802799be9931';
module.exports = node;
