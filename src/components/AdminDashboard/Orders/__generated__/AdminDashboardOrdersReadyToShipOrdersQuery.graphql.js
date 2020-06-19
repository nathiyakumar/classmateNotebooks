/**
 * @flow
 * @relayHash d61760a00ad6b0d41589e87f1e8570d9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PaymentChargeStatusEnum = "AUTHORIZED" | "CAPTURED" | "COD" | "FAILED" | "FULLY_CHARGED" | "FULLY_REFUNDED" | "NOT_CHARGED" | "PARTIALLY_CHARGED" | "PARTIALLY_REFUNDED" | "%future added value";
export type ShippingShippingStatus = "APPROVED" | "AWB_ASSIGNED" | "CANCELLATION_REQUESTED" | "CANCELLED" | "DELAYED" | "DELIVERED" | "DISAPPROVED" | "IN_TRANSIT" | "IN_TRANSIT_EN_ROUTE" | "LABEL_GENERATED" | "LOST" | "MANIFEST_GENERATED" | "NEW" | "OUT_FOR_DELIVERY" | "OUT_FOR_PICKUP" | "PACKING" | "PENDING" | "PICKUP_ERROR" | "PICKUP_EXCEPTION" | "PICKUP_GENERATED" | "PICKUP_QUEUED" | "PICKUP_RESCHEDULED" | "PICKUP_SCHEDULED" | "PRINTING" | "PROCESSING" | "READY_TO_SHIP" | "RTO_ACKNOWLEDGED" | "RTO_DELIVERED" | "RTO_INITIATED" | "SHIPPED" | "UNDELIVERED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type SortValueEnum = "ASCENDING" | "DESCENDING" | "%future added value";
export type AdminDashboardOrdersReadyToShipOrdersQueryVariables = {|
  end: number,
  paginationValue?: ?number,
  sortOrder?: ?SortValueEnum,
|};
export type AdminDashboardOrdersReadyToShipOrdersQueryResponse = {|
  +adminReadyToShipOrdersLines: ?{|
    +pageRange: ?number,
    +totalRecordCount: ?number,
    +orderData: ?$ReadOnlyArray<?{|
      +id: string,
      +shippingStatus: ShippingShippingStatus,
      +lines: ?$ReadOnlyArray<?{|
        +id: string,
        +order: {|
          +id: string,
          +orderId: ?string,
          +created: any,
          +total: ?number,
          +userEmail: ?string,
          +shippingAddress: ?{|
            +firstName: string,
            +phone: string,
          |},
          +status: ?string,
          +payments: ?$ReadOnlyArray<?{|
            +gateway: string,
            +id: string,
            +chargeStatus: PaymentChargeStatusEnum,
          |}>,
        |},
        +productName: string,
        +productSku: string,
        +quantity: number,
        +vendor: ?{|
          +id: string,
          +vendor: ?{|
            +firstName: string,
            +mobileNumber: string,
          |},
        |},
        +lineShipping: ?{|
          +edges: $ReadOnlyArray<?{|
            +node: ?{|
              +shippingStatus: ShippingShippingStatus,
              +id: string,
            |}
          |}>
        |},
      |}>,
    |}>,
  |}
|};
export type AdminDashboardOrdersReadyToShipOrdersQuery = {|
  variables: AdminDashboardOrdersReadyToShipOrdersQueryVariables,
  response: AdminDashboardOrdersReadyToShipOrdersQueryResponse,
|};
*/


/*
query AdminDashboardOrdersReadyToShipOrdersQuery(
  $end: Int!
  $paginationValue: Int
  $sortOrder: SortValueEnum
) {
  adminReadyToShipOrdersLines(end: $end, paginationValue: $paginationValue, sortOrder: $sortOrder) {
    pageRange
    totalRecordCount
    orderData {
      id
      shippingStatus
      lines {
        id
        order {
          id
          orderId
          created
          total
          userEmail
          shippingAddress {
            firstName
            phone
            id
          }
          status
          payments {
            gateway
            id
            chargeStatus
          }
        }
        productName
        productSku
        quantity
        vendor {
          id
          vendor {
            firstName
            mobileNumber
            id
          }
        }
        lineShipping(first: 100) {
          edges {
            node {
              shippingStatus
              id
            }
          }
        }
      }
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
  "name": "shippingStatus",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "total",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "payments",
  "storageKey": null,
  "args": null,
  "concreteType": "PaymentType",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "gateway",
      "args": null,
      "storageKey": null
    },
    (v4/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "chargeStatus",
      "args": null,
      "storageKey": null
    }
  ]
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productName",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productSku",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mobileNumber",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "lineShipping",
  "storageKey": "lineShipping(first:100)",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 100
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
            (v5/*: any*/),
            (v4/*: any*/)
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
    "name": "AdminDashboardOrdersReadyToShipOrdersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "adminReadyToShipOrdersLines",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingPaginationResponse",
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
            "concreteType": "ShippingType",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": null,
                "args": null,
                "concreteType": "OrderLineType",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
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
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ]
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "VendorType",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                          (v17/*: any*/)
                        ]
                      }
                    ]
                  },
                  (v18/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminDashboardOrdersReadyToShipOrdersQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "adminReadyToShipOrdersLines",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingPaginationResponse",
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
            "concreteType": "ShippingType",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": null,
                "args": null,
                "concreteType": "OrderLineType",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
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
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ]
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "VendorType",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                          (v17/*: any*/),
                          (v4/*: any*/)
                        ]
                      }
                    ]
                  },
                  (v18/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AdminDashboardOrdersReadyToShipOrdersQuery",
    "id": null,
    "text": "query AdminDashboardOrdersReadyToShipOrdersQuery(\n  $end: Int!\n  $paginationValue: Int\n  $sortOrder: SortValueEnum\n) {\n  adminReadyToShipOrdersLines(end: $end, paginationValue: $paginationValue, sortOrder: $sortOrder) {\n    pageRange\n    totalRecordCount\n    orderData {\n      id\n      shippingStatus\n      lines {\n        id\n        order {\n          id\n          orderId\n          created\n          total\n          userEmail\n          shippingAddress {\n            firstName\n            phone\n            id\n          }\n          status\n          payments {\n            gateway\n            id\n            chargeStatus\n          }\n        }\n        productName\n        productSku\n        quantity\n        vendor {\n          id\n          vendor {\n            firstName\n            mobileNumber\n            id\n          }\n        }\n        lineShipping(first: 100) {\n          edges {\n            node {\n              shippingStatus\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0a38f39e28e46d2a8e99fc1d492c16b5';
module.exports = node;
