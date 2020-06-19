/**
 * @flow
 * @relayHash 8411743d6594069db9bbf9a588ddcbc1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HomeOrdersCountByDateQueryVariables = {|
  startDate?: ?string,
  endDate?: ?string,
|};
export type HomeOrdersCountByDateQueryResponse = {|
  +ordersCount: ?number,
  +shippedCount: ?{|
    +customized: ?number,
    +nonCustomized: ?number,
    +total: ?number,
  |},
  +disapprovedCount: ?number,
  +ordersTotalValue: ?number,
  +vendorsCount: ?{|
    +customized: ?number,
    +nonCustomized: ?number,
    +total: ?number,
  |},
  +deliveredCount: ?{|
    +customized: ?number,
    +nonCustomized: ?number,
    +total: ?number,
  |},
  +processingCount: ?{|
    +customized: ?number,
    +nonCustomized: ?number,
    +total: ?number,
  |},
  +printingCount: ?number,
  +waitingForApprovalCount: ?number,
  +paymentsPendingCount: ?number,
  +ordersIssueCount: ?{|
    +ordersCount: ?number,
    +orderNumbers: ?$ReadOnlyArray<?string>,
    +totalOrdersShippingZero: ?number,
  |},
  +awbOrdersIssueCount: ?{|
    +ordersCount: ?number,
    +orderNumbers: ?$ReadOnlyArray<?string>,
    +totalOrdersShippingZero: ?number,
  |},
  +approvedNoPdfCount: ?{|
    +ordersCount: ?number,
    +orderNumbers: ?$ReadOnlyArray<?string>,
    +totalOrdersShippingZero: ?number,
  |},
  +waitingForApprovalThumbnailNotGenerated: ?{|
    +ordersCount: ?number,
    +orderNumbers: ?$ReadOnlyArray<?string>,
    +totalOrdersShippingZero: ?number,
  |},
  +readyToShipNoLabel: ?{|
    +labelOrdersCount: ?number,
    +labelOrderNumbers: ?$ReadOnlyArray<?string>,
    +manifestOrdersCount: ?number,
    +manifestOrderNumbers: ?$ReadOnlyArray<?string>,
  |},
|};
export type HomeOrdersCountByDateQuery = {|
  variables: HomeOrdersCountByDateQueryVariables,
  response: HomeOrdersCountByDateQueryResponse,
|};
*/


/*
query HomeOrdersCountByDateQuery(
  $startDate: String
  $endDate: String
) {
  ordersCount(startDate: $startDate, endDate: $endDate)
  shippedCount(startDate: $startDate, endDate: $endDate) {
    customized
    nonCustomized
    total
  }
  disapprovedCount(startDate: $startDate, endDate: $endDate)
  ordersTotalValue(startDate: $startDate, endDate: $endDate)
  vendorsCount(startDate: $startDate, endDate: $endDate) {
    customized
    nonCustomized
    total
  }
  deliveredCount(startDate: $startDate, endDate: $endDate) {
    customized
    nonCustomized
    total
  }
  processingCount(startDate: $startDate, endDate: $endDate) {
    customized
    nonCustomized
    total
  }
  printingCount(startDate: $startDate, endDate: $endDate)
  waitingForApprovalCount(startDate: $startDate, endDate: $endDate)
  paymentsPendingCount(startDate: $startDate, endDate: $endDate)
  ordersIssueCount {
    ordersCount
    orderNumbers
    totalOrdersShippingZero
  }
  awbOrdersIssueCount {
    ordersCount
    orderNumbers
    totalOrdersShippingZero
  }
  approvedNoPdfCount {
    ordersCount
    orderNumbers
    totalOrdersShippingZero
  }
  waitingForApprovalThumbnailNotGenerated {
    ordersCount
    orderNumbers
    totalOrdersShippingZero
  }
  readyToShipNoLabel {
    labelOrdersCount
    labelOrderNumbers
    manifestOrdersCount
    manifestOrderNumbers
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "startDate",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "endDate",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "endDate",
    "variableName": "endDate"
  },
  {
    "kind": "Variable",
    "name": "startDate",
    "variableName": "startDate"
  }
],
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "customized",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "nonCustomized",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "total",
    "args": null,
    "storageKey": null
  }
],
v3 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "ordersCount",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "orderNumbers",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "totalOrdersShippingZero",
    "args": null,
    "storageKey": null
  }
],
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "ordersCount",
    "args": (v1/*: any*/),
    "storageKey": null
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "shippedCount",
    "storageKey": null,
    "args": (v1/*: any*/),
    "concreteType": "VendorOrdersDict",
    "plural": false,
    "selections": (v2/*: any*/)
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "disapprovedCount",
    "args": (v1/*: any*/),
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "ordersTotalValue",
    "args": (v1/*: any*/),
    "storageKey": null
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "vendorsCount",
    "storageKey": null,
    "args": (v1/*: any*/),
    "concreteType": "VendorOrdersDict",
    "plural": false,
    "selections": (v2/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deliveredCount",
    "storageKey": null,
    "args": (v1/*: any*/),
    "concreteType": "VendorOrdersDict",
    "plural": false,
    "selections": (v2/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "processingCount",
    "storageKey": null,
    "args": (v1/*: any*/),
    "concreteType": "VendorOrdersDict",
    "plural": false,
    "selections": (v2/*: any*/)
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "printingCount",
    "args": (v1/*: any*/),
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "waitingForApprovalCount",
    "args": (v1/*: any*/),
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "paymentsPendingCount",
    "args": (v1/*: any*/),
    "storageKey": null
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "ordersIssueCount",
    "storageKey": null,
    "args": null,
    "concreteType": "IssuesOrdersCount",
    "plural": false,
    "selections": (v3/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "awbOrdersIssueCount",
    "storageKey": null,
    "args": null,
    "concreteType": "IssuesOrdersCount",
    "plural": false,
    "selections": (v3/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "approvedNoPdfCount",
    "storageKey": null,
    "args": null,
    "concreteType": "IssuesOrdersCount",
    "plural": false,
    "selections": (v3/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "waitingForApprovalThumbnailNotGenerated",
    "storageKey": null,
    "args": null,
    "concreteType": "IssuesOrdersCount",
    "plural": false,
    "selections": (v3/*: any*/)
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "readyToShipNoLabel",
    "storageKey": null,
    "args": null,
    "concreteType": "LabelManifestOrdersCount",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "labelOrdersCount",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "labelOrderNumbers",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "manifestOrdersCount",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "manifestOrderNumbers",
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
    "name": "HomeOrdersCountByDateQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeOrdersCountByDateQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "HomeOrdersCountByDateQuery",
    "id": null,
    "text": "query HomeOrdersCountByDateQuery(\n  $startDate: String\n  $endDate: String\n) {\n  ordersCount(startDate: $startDate, endDate: $endDate)\n  shippedCount(startDate: $startDate, endDate: $endDate) {\n    customized\n    nonCustomized\n    total\n  }\n  disapprovedCount(startDate: $startDate, endDate: $endDate)\n  ordersTotalValue(startDate: $startDate, endDate: $endDate)\n  vendorsCount(startDate: $startDate, endDate: $endDate) {\n    customized\n    nonCustomized\n    total\n  }\n  deliveredCount(startDate: $startDate, endDate: $endDate) {\n    customized\n    nonCustomized\n    total\n  }\n  processingCount(startDate: $startDate, endDate: $endDate) {\n    customized\n    nonCustomized\n    total\n  }\n  printingCount(startDate: $startDate, endDate: $endDate)\n  waitingForApprovalCount(startDate: $startDate, endDate: $endDate)\n  paymentsPendingCount(startDate: $startDate, endDate: $endDate)\n  ordersIssueCount {\n    ordersCount\n    orderNumbers\n    totalOrdersShippingZero\n  }\n  awbOrdersIssueCount {\n    ordersCount\n    orderNumbers\n    totalOrdersShippingZero\n  }\n  approvedNoPdfCount {\n    ordersCount\n    orderNumbers\n    totalOrdersShippingZero\n  }\n  waitingForApprovalThumbnailNotGenerated {\n    ordersCount\n    orderNumbers\n    totalOrdersShippingZero\n  }\n  readyToShipNoLabel {\n    labelOrdersCount\n    labelOrderNumbers\n    manifestOrdersCount\n    manifestOrderNumbers\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dfc6020c9d6a2341a269532bb9854fff';
module.exports = node;
