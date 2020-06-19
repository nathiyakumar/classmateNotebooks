/**
 * @flow
 * @relayHash 745289a3c56aed3755d651b32a1aec09
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateCreateInvoiceMutationVariables = {|
  orderIds?: ?$ReadOnlyArray<?string>
|};
export type CreateCreateInvoiceMutationResponse = {|
  +createInvoice: ?{|
    +message: ?string,
    +invoice: ?$ReadOnlyArray<?{|
      +invoiceUrl: ?string
    |}>,
  |}
|};
export type CreateCreateInvoiceMutation = {|
  variables: CreateCreateInvoiceMutationVariables,
  response: CreateCreateInvoiceMutationResponse,
|};
*/


/*
mutation CreateCreateInvoiceMutation(
  $orderIds: [ID]
) {
  createInvoice(orderIds: $orderIds) {
    message
    invoice {
      invoiceUrl
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderIds",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createInvoice",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "orderIds",
        "variableName": "orderIds"
      }
    ],
    "concreteType": "CreateInvoice",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "invoice",
        "storageKey": null,
        "args": null,
        "concreteType": "BulkInvoiceDownload",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "invoiceUrl",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCreateInvoiceMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCreateInvoiceMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCreateInvoiceMutation",
    "id": null,
    "text": "mutation CreateCreateInvoiceMutation(\n  $orderIds: [ID]\n) {\n  createInvoice(orderIds: $orderIds) {\n    message\n    invoice {\n      invoiceUrl\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e8b46ce96c90affa2e67e7d6ad1d6d81';
module.exports = node;
