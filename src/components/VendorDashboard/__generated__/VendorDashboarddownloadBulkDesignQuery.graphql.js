/**
 * @flow
 * @relayHash 14067c66027871bd12af8403d9174a65
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VendorDashboarddownloadBulkDesignQueryVariables = {|
  orderId?: ?$ReadOnlyArray<?string>
|};
export type VendorDashboarddownloadBulkDesignQueryResponse = {|
  +pdfBulkDownload: ?$ReadOnlyArray<?{|
    +orderId: ?string,
    +pdf: ?any,
  |}>
|};
export type VendorDashboarddownloadBulkDesignQuery = {|
  variables: VendorDashboarddownloadBulkDesignQueryVariables,
  response: VendorDashboarddownloadBulkDesignQueryResponse,
|};
*/


/*
query VendorDashboarddownloadBulkDesignQuery(
  $orderId: [ID]
) {
  pdfBulkDownload(orderId: $orderId) {
    orderId
    pdf
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "pdfBulkDownload",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      }
    ],
    "concreteType": "BulkPdf",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "orderId",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "pdf",
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
    "name": "VendorDashboarddownloadBulkDesignQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VendorDashboarddownloadBulkDesignQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VendorDashboarddownloadBulkDesignQuery",
    "id": null,
    "text": "query VendorDashboarddownloadBulkDesignQuery(\n  $orderId: [ID]\n) {\n  pdfBulkDownload(orderId: $orderId) {\n    orderId\n    pdf\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd88a6926558d75642f650583a0e924dd';
module.exports = node;
