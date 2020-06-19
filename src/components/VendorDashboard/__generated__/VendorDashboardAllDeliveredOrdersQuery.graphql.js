/**
 * @flow
 * @relayHash 252b092c2ad22cab4267a25e8332f73c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingShippingStatus = "APPROVED" | "AWB_ASSIGNED" | "CANCELLATION_REQUESTED" | "CANCELLED" | "DELAYED" | "DELIVERED" | "DISAPPROVED" | "IN_TRANSIT" | "IN_TRANSIT_EN_ROUTE" | "LABEL_GENERATED" | "LOST" | "MANIFEST_GENERATED" | "NEW" | "OUT_FOR_DELIVERY" | "OUT_FOR_PICKUP" | "PACKING" | "PENDING" | "PICKUP_ERROR" | "PICKUP_EXCEPTION" | "PICKUP_GENERATED" | "PICKUP_QUEUED" | "PICKUP_RESCHEDULED" | "PICKUP_SCHEDULED" | "PRINTING" | "PROCESSING" | "READY_TO_SHIP" | "RTO_ACKNOWLEDGED" | "RTO_DELIVERED" | "RTO_INITIATED" | "SHIPPED" | "UNDELIVERED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type SortValueEnum = "ASCENDING" | "DESCENDING" | "%future added value";
export type VendorDashboardAllDeliveredOrdersQueryVariables = {|
  end: number,
  paginationValue?: ?number,
  sortOrder?: ?SortValueEnum,
|};
export type VendorDashboardAllDeliveredOrdersQueryResponse = {|
  +ordersBasedOnVendorDelivered: ?{|
    +pageRange: ?number,
    +totalRecordCount: ?number,
    +orderData: ?$ReadOnlyArray<?{|
      +order: {|
        +id: string,
        +orderId: ?string,
        +created: any,
        +approvedDate: ?any,
        +myTotal: ?number,
        +userEmail: ?string,
        +shippingAddress: ?{|
          +firstName: string,
          +phone: string,
        |},
        +vendorLines: $ReadOnlyArray<?{|
          +id: string,
          +productName: string,
          +productSku: string,
          +quantity: number,
        |}>,
      |},
      +vendor: ?{|
        +vendor: ?{|
          +firstName: string
        |}
      |},
      +lineShipping: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
            +id: string,
            +vendorProductTypeIsCustomizable: ?boolean,
            +shippingStatus: ShippingShippingStatus,
            +dimensions: ?any,
          |}
        |}>
      |},
    |}>,
  |}
|};
export type VendorDashboardAllDeliveredOrdersQuery = {|
  variables: VendorDashboardAllDeliveredOrdersQueryVariables,
  response: VendorDashboardAllDeliveredOrdersQueryResponse,
|};
*/


/*
query VendorDashboardAllDeliveredOrdersQuery(
  $end: Int!
  $paginationValue: Int
  $sortOrder: SortValueEnum
) {
  ordersBasedOnVendorDelivered(end: $end, paginationValue: $paginationValue, sortOrder: $sortOrder) {
    pageRange
    totalRecordCount
    orderData {
      order {
        id
        orderId
        created
        approvedDate
        myTotal
        userEmail
        shippingAddress {
          firstName
          phone
          id
        }
        vendorLines {
          id
          productName
          productSku
          quantity
        }
      }
      vendor {
        vendor {
          firstName
          id
        }
        id
      }
      lineShipping(first: 10) {
        edges {
          node {
            id
            vendorProductTypeIsCustomizable
            shippingStatus
            dimensions
          }
        }
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "end",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "paginationValue",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sortOrder",
    "type": "SortValueEnum",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "end",
    "variableName": "end"
  },
  {
    "kind": "Variable",
    "name": "paginationValue",
    "variableName": "paginationValue"
  },
  {
    "kind": "Variable",
    "name": "sortOrder",
    "variableName": "sortOrder"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "pageRange",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalRecordCount",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "approvedDate",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "myTotal",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "userEmail",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "vendorLines",
  "storageKey": null,
  "args": null,
  "concreteType": "OrderLineType",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "productName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "productSku",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "quantity",
      "args": null,
      "storageKey": null
    }
  ]
},
v13 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "lineShipping",
  "storageKey": "lineShipping(first:10)",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 10
    }
  ],
  "concreteType": "ShippingTypeConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ShippingTypeEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "ShippingType",
          "plural": false,
          "selections": [
            (v4/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "vendorProductTypeIsCustomizable",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shippingStatus",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "dimensions",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "VendorDashboardAllDeliveredOrdersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ordersBasedOnVendorDelivered",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "OrderPaginationResponse",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderData",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "order",
                "storageKey": null,
                "args": null,
                "concreteType": "OrdersType",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shippingAddress",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Address",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ]
                  },
                  (v12/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "vendor",
                "storageKey": null,
                "args": null,
                "concreteType": "VendorType",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/)
                    ]
                  }
                ]
              },
              (v13/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "VendorDashboardAllDeliveredOrdersQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ordersBasedOnVendorDelivered",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "OrderPaginationResponse",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderData",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "order",
                "storageKey": null,
                "args": null,
                "concreteType": "OrdersType",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shippingAddress",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Address",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v4/*: any*/)
                    ]
                  },
                  (v12/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "vendor",
                "storageKey": null,
                "args": null,
                "concreteType": "VendorType",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v4/*: any*/)
                    ]
                  },
                  (v4/*: any*/)
                ]
              },
              (v13/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "VendorDashboardAllDeliveredOrdersQuery",
    "id": null,
    "text": "query VendorDashboardAllDeliveredOrdersQuery(\n  $end: Int!\n  $paginationValue: Int\n  $sortOrder: SortValueEnum\n) {\n  ordersBasedOnVendorDelivered(end: $end, paginationValue: $paginationValue, sortOrder: $sortOrder) {\n    pageRange\n    totalRecordCount\n    orderData {\n      order {\n        id\n        orderId\n        created\n        approvedDate\n        myTotal\n        userEmail\n        shippingAddress {\n          firstName\n          phone\n          id\n        }\n        vendorLines {\n          id\n          productName\n          productSku\n          quantity\n        }\n      }\n      vendor {\n        vendor {\n          firstName\n          id\n        }\n        id\n      }\n      lineShipping(first: 10) {\n        edges {\n          node {\n            id\n            vendorProductTypeIsCustomizable\n            shippingStatus\n            dimensions\n          }\n        }\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5e7ac6244ca5e07f9e4612426ebe093c';
module.exports = node;
