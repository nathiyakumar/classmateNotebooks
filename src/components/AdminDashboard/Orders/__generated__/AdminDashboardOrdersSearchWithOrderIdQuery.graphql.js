/**
 * @flow
 * @relayHash 793537bd71feb7211b1c903135ceb8ca
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PaymentChargeStatusEnum = "AUTHORIZED" | "CAPTURED" | "COD" | "FAILED" | "FULLY_CHARGED" | "FULLY_REFUNDED" | "NOT_CHARGED" | "PARTIALLY_CHARGED" | "PARTIALLY_REFUNDED" | "%future added value";
export type ShippingShippingStatus = "APPROVED" | "AWB_ASSIGNED" | "CANCELLATION_REQUESTED" | "CANCELLED" | "DELAYED" | "DELIVERED" | "DISAPPROVED" | "IN_TRANSIT" | "IN_TRANSIT_EN_ROUTE" | "LABEL_GENERATED" | "LOST" | "MANIFEST_GENERATED" | "NEW" | "OUT_FOR_DELIVERY" | "OUT_FOR_PICKUP" | "PACKING" | "PENDING" | "PICKUP_ERROR" | "PICKUP_EXCEPTION" | "PICKUP_GENERATED" | "PICKUP_QUEUED" | "PICKUP_RESCHEDULED" | "PICKUP_SCHEDULED" | "PRINTING" | "PROCESSING" | "READY_TO_SHIP" | "RTO_ACKNOWLEDGED" | "RTO_DELIVERED" | "RTO_INITIATED" | "SHIPPED" | "UNDELIVERED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type AdminDashboardOrdersSearchWithOrderIdQueryVariables = {|
  orderId: string
|};
export type AdminDashboardOrdersSearchWithOrderIdQueryResponse = {|
  +searchWithOrderIdAdmin: ?$ReadOnlyArray<?{|
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
  |}>
|};
export type AdminDashboardOrdersSearchWithOrderIdQuery = {|
  variables: AdminDashboardOrdersSearchWithOrderIdQueryVariables,
  response: AdminDashboardOrdersSearchWithOrderIdQueryResponse,
|};
*/


/*
query AdminDashboardOrdersSearchWithOrderIdQuery(
  $orderId: String!
) {
  searchWithOrderIdAdmin(orderId: $orderId) {
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "String!",
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingStatus",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "total",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "userEmail",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v11 = {
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
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "chargeStatus",
      "args": null,
      "storageKey": null
    }
  ]
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productName",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productSku",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mobileNumber",
  "args": null,
  "storageKey": null
},
v16 = {
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
            (v3/*: any*/),
            (v2/*: any*/)
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
    "name": "AdminDashboardOrdersSearchWithOrderIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "searchWithOrderIdAdmin",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingType",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "order",
                "storageKey": null,
                "args": null,
                "concreteType": "OrdersType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shippingAddress",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Address",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/)
                    ]
                  },
                  (v10/*: any*/),
                  (v11/*: any*/)
                ]
              },
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "vendor",
                "storageKey": null,
                "args": null,
                "concreteType": "VendorType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v15/*: any*/)
                    ]
                  }
                ]
              },
              (v16/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminDashboardOrdersSearchWithOrderIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "searchWithOrderIdAdmin",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingType",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "order",
                "storageKey": null,
                "args": null,
                "concreteType": "OrdersType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "shippingAddress",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Address",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v2/*: any*/)
                    ]
                  },
                  (v10/*: any*/),
                  (v11/*: any*/)
                ]
              },
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "vendor",
                "storageKey": null,
                "args": null,
                "concreteType": "VendorType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "vendor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "UserType",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v15/*: any*/),
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v16/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AdminDashboardOrdersSearchWithOrderIdQuery",
    "id": null,
    "text": "query AdminDashboardOrdersSearchWithOrderIdQuery(\n  $orderId: String!\n) {\n  searchWithOrderIdAdmin(orderId: $orderId) {\n    id\n    shippingStatus\n    lines {\n      id\n      order {\n        id\n        orderId\n        created\n        total\n        userEmail\n        shippingAddress {\n          firstName\n          phone\n          id\n        }\n        status\n        payments {\n          gateway\n          id\n          chargeStatus\n        }\n      }\n      productName\n      productSku\n      quantity\n      vendor {\n        id\n        vendor {\n          firstName\n          mobileNumber\n          id\n        }\n      }\n      lineShipping(first: 100) {\n        edges {\n          node {\n            shippingStatus\n            id\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7182e738e7a784369fd6ac9cb73a87f4';
module.exports = node;
