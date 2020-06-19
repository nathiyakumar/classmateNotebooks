/**
 * @flow
 * @relayHash 58e3e0d5ccecd499ed2615f06878d2f4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingShippingStatus = "APPROVED" | "AWB_ASSIGNED" | "CANCELLATION_REQUESTED" | "CANCELLED" | "DELAYED" | "DELIVERED" | "DISAPPROVED" | "IN_TRANSIT" | "IN_TRANSIT_EN_ROUTE" | "LABEL_GENERATED" | "LOST" | "MANIFEST_GENERATED" | "NEW" | "OUT_FOR_DELIVERY" | "OUT_FOR_PICKUP" | "PACKING" | "PENDING" | "PICKUP_ERROR" | "PICKUP_EXCEPTION" | "PICKUP_GENERATED" | "PICKUP_QUEUED" | "PICKUP_RESCHEDULED" | "PICKUP_SCHEDULED" | "PRINTING" | "PROCESSING" | "READY_TO_SHIP" | "RTO_ACKNOWLEDGED" | "RTO_DELIVERED" | "RTO_INITIATED" | "SHIPPED" | "UNDELIVERED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type VendorDashboardSearchWithOrderIdQueryVariables = {|
  orderId: string
|};
export type VendorDashboardSearchWithOrderIdQueryResponse = {|
  +searchWithOrderIdVendor: ?$ReadOnlyArray<?{|
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
  |}>
|};
export type VendorDashboardSearchWithOrderIdQuery = {|
  variables: VendorDashboardSearchWithOrderIdQueryVariables,
  response: VendorDashboardSearchWithOrderIdQueryResponse,
|};
*/


/*
query VendorDashboardSearchWithOrderIdQuery(
  $orderId: String!
) {
  searchWithOrderIdVendor(orderId: $orderId) {
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
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "approvedDate",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "myTotal",
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
  "kind": "LinkedField",
  "alias": null,
  "name": "vendorLines",
  "storageKey": null,
  "args": null,
  "concreteType": "OrderLineType",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
v11 = {
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
            (v2/*: any*/),
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
    "name": "VendorDashboardSearchWithOrderIdQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "searchWithOrderIdVendor",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/),
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
              (v10/*: any*/)
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
                  (v8/*: any*/)
                ]
              }
            ]
          },
          (v11/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "VendorDashboardSearchWithOrderIdQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "searchWithOrderIdVendor",
        "storageKey": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/),
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
              (v10/*: any*/)
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
                  (v8/*: any*/),
                  (v2/*: any*/)
                ]
              },
              (v2/*: any*/)
            ]
          },
          (v11/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "VendorDashboardSearchWithOrderIdQuery",
    "id": null,
    "text": "query VendorDashboardSearchWithOrderIdQuery(\n  $orderId: String!\n) {\n  searchWithOrderIdVendor(orderId: $orderId) {\n    order {\n      id\n      orderId\n      created\n      approvedDate\n      myTotal\n      userEmail\n      shippingAddress {\n        firstName\n        phone\n        id\n      }\n      vendorLines {\n        id\n        productName\n        productSku\n        quantity\n      }\n    }\n    vendor {\n      vendor {\n        firstName\n        id\n      }\n      id\n    }\n    lineShipping(first: 10) {\n      edges {\n        node {\n          id\n          vendorProductTypeIsCustomizable\n          shippingStatus\n          dimensions\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9b5069e3a605256c93a76ef13140ab83';
module.exports = node;
