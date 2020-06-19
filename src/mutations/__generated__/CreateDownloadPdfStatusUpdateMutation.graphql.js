/**
 * @flow
 * @relayHash 7ddd06305a4f3081aca691e8f58da2df
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateDownloadPdfStatusUpdateMutationVariables = {|
  designId: string,
  orderId: string,
|};
export type CreateDownloadPdfStatusUpdateMutationResponse = {|
  +downloadPdfStatusUpdate: ?{|
    +message: ?string
  |}
|};
export type CreateDownloadPdfStatusUpdateMutation = {|
  variables: CreateDownloadPdfStatusUpdateMutationVariables,
  response: CreateDownloadPdfStatusUpdateMutationResponse,
|};
*/


/*
mutation CreateDownloadPdfStatusUpdateMutation(
  $designId: String!
  $orderId: ID!
) {
  downloadPdfStatusUpdate(orderId: $orderId, designId: $designId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "designId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "downloadPdfStatusUpdate",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "designId",
        "variableName": "designId"
      },
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      }
    ],
    "concreteType": "DownloadPDFStatusUpdate",
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
    "name": "CreateDownloadPdfStatusUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateDownloadPdfStatusUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateDownloadPdfStatusUpdateMutation",
    "id": null,
    "text": "mutation CreateDownloadPdfStatusUpdateMutation(\n  $designId: String!\n  $orderId: ID!\n) {\n  downloadPdfStatusUpdate(orderId: $orderId, designId: $designId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '57f221ec9d8d9bd0b73ef866c261f743';
module.exports = node;
