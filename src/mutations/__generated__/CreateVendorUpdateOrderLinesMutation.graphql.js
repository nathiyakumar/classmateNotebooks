/**
 * @flow
 * @relayHash 2a1d8c59ff33e9cc052e7a76041efda0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingStatus = "APPROVED" | "CANCELLED" | "DELIVERED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "PACKING" | "PENDING" | "PROCESSING" | "RTO" | "SHIPPED" | "WAITING_FOR_APPROVAL" | "%future added value";
export type ShippingInput = {|
  shippingStatus?: ?ShippingStatus,
  shippingDate?: ?any,
  dispatchedQuantity?: ?number,
  pendingQuantity?: ?number,
  dimensions?: ?any,
  fulfilled?: ?FulfillmentInput,
|};
export type FulfillmentInput = {|
  fulfillmentOrder?: ?number,
  trackingNumber?: ?string,
  shippedQuantity?: ?number,
|};
export type CreateVendorUpdateOrderLinesMutationVariables = {|
  orderId: string,
  shippingType: string,
  shippingInput?: ?ShippingInput,
|};
export type CreateVendorUpdateOrderLinesMutationResponse = {|
  +updateOrderLines: ?{|
    +orderLines: ?$ReadOnlyArray<?{|
      +id: string,
      +vendor: ?{|
        +shipping: ?$ReadOnlyArray<?{|
          +lines: ?$ReadOnlyArray<?{|
            +id: string,
            +productName: string,
          |}>,
          +shipRocket: ?{|
            +edges: $ReadOnlyArray<?{|
              +node: ?{|
                +id: string
              |}
            |}>
          |},
        |}>
      |},
    |}>
  |}
|};
export type CreateVendorUpdateOrderLinesMutation = {|
  variables: CreateVendorUpdateOrderLinesMutationVariables,
  response: CreateVendorUpdateOrderLinesMutationResponse,
|};
*/


/*
mutation CreateVendorUpdateOrderLinesMutation(
  $orderId: ID!
  $shippingType: String!
  $shippingInput: ShippingInput
) {
  updateOrderLines(orderId: $orderId, shippingType: $shippingType, shippingInput: $shippingInput) {
    orderLines {
      id
      vendor {
        shipping(orderId: $orderId) {
          lines {
            id
            productName
          }
          shipRocket(first: 100) {
            edges {
              node {
                id
              }
            }
          }
          id
        }
        id
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
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "shippingType",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "shippingInput",
    "type": "ShippingInput",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "orderId",
  "variableName": "orderId"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "shippingInput",
    "variableName": "shippingInput"
  },
  {
    "kind": "Variable",
    "name": "shippingType",
    "variableName": "shippingType"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
  (v1/*: any*/)
],
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "lines",
  "storageKey": null,
  "args": null,
  "concreteType": "OrderLineType",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "productName",
      "args": null,
      "storageKey": null
    }
  ]
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "shipRocket",
  "storageKey": "shipRocket(first:100)",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 100
    }
  ],
  "concreteType": "ShipRocketTypeConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ShipRocketTypeEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "ShipRocketType",
          "plural": false,
          "selections": [
            (v3/*: any*/)
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
    "name": "CreateVendorUpdateOrderLinesMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateOrderLines",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateOrderLines",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderLines",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
                    "name": "shipping",
                    "storageKey": null,
                    "args": (v4/*: any*/),
                    "concreteType": "ShippingType",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ]
                  }
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
    "name": "CreateVendorUpdateOrderLinesMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateOrderLines",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateOrderLines",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderLines",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineType",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
                    "name": "shipping",
                    "storageKey": null,
                    "args": (v4/*: any*/),
                    "concreteType": "ShippingType",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v3/*: any*/)
                    ]
                  },
                  (v3/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateVendorUpdateOrderLinesMutation",
    "id": null,
    "text": "mutation CreateVendorUpdateOrderLinesMutation(\n  $orderId: ID!\n  $shippingType: String!\n  $shippingInput: ShippingInput\n) {\n  updateOrderLines(orderId: $orderId, shippingType: $shippingType, shippingInput: $shippingInput) {\n    orderLines {\n      id\n      vendor {\n        shipping(orderId: $orderId) {\n          lines {\n            id\n            productName\n          }\n          shipRocket(first: 100) {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'db3bdd8a18148c684d617372e0e90bf6';
module.exports = node;
