/**
 * @flow
 * @relayHash 686a95586a8c9a10ed71d544097856d7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateManifestMutationVariables = {|
  orderId: string
|};
export type CreateManifestMutationResponse = {|
  +createManifest: ?{|
    +message: ?string,
    +invoices: ?{|
      +invoiceUrl: ?string,
      +manifestUrl: ?string,
      +labelUrl: ?string,
    |},
  |}
|};
export type CreateManifestMutation = {|
  variables: CreateManifestMutationVariables,
  response: CreateManifestMutationResponse,
|};
*/


/*
mutation CreateManifestMutation(
  $orderId: ID!
) {
  createManifest(orderId: $orderId) {
    message
    invoices {
      invoiceUrl
      manifestUrl
      labelUrl
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "orderId",
    "variableName": "orderId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "invoiceUrl",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "manifestUrl",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "labelUrl",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateManifestMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createManifest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateManifest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "invoices",
            "storageKey": null,
            "args": null,
            "concreteType": "InvoicesType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateManifestMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createManifest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateManifest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "invoices",
            "storageKey": null,
            "args": null,
            "concreteType": "InvoicesType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateManifestMutation",
    "id": null,
    "text": "mutation CreateManifestMutation(\n  $orderId: ID!\n) {\n  createManifest(orderId: $orderId) {\n    message\n    invoices {\n      invoiceUrl\n      manifestUrl\n      labelUrl\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ad3db7c3117a0a67561790e62b8ffcdf';
module.exports = node;
