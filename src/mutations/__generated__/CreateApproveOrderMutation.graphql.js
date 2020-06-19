/**
 * @flow
 * @relayHash 6655cc6f460375af45ef9c63979e0d76
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ApprovalEnum = "APPROVED" | "DISAPPROVED" | "%future added value";
export type CreateApproveOrderMutationVariables = {|
  orderId?: ?string,
  orderItemId?: ?string,
  status?: ?ApprovalEnum,
|};
export type CreateApproveOrderMutationResponse = {|
  +approveOrder: ?{|
    +order: ?{|
      +id: string,
      +orderId: ?string,
      +payments: ?$ReadOnlyArray<?{|
        +id: string
      |}>,
      +created: any,
      +escalateTime: ?any,
      +hasCustomizable: ?boolean,
      +status: ?string,
      +lines: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
            +id: string,
            +productName: string,
            +productSku: string,
            +quantity: number,
            +unitPriceNet: number,
            +unitPriceGross: number,
            +unitPrice: number,
            +taxRate: number,
            +vendor: ?{|
              +vendor: ?{|
                +firstName: string
              |}
            |},
          |}
        |}>
      |},
    |}
  |}
|};
export type CreateApproveOrderMutation = {|
  variables: CreateApproveOrderMutationVariables,
  response: CreateApproveOrderMutationResponse,
|};
*/


/*
mutation CreateApproveOrderMutation(
  $orderId: ID
  $orderItemId: ID
  $status: ApprovalEnum
) {
  approveOrder(orderId: $orderId, orderItemId: $orderItemId, status: $status) {
    order {
      id
      orderId
      payments {
        id
      }
      created
      escalateTime
      hasCustomizable
      status
      lines(first: 10) {
        edges {
          node {
            id
            productName
            productSku
            quantity
            unitPriceNet
            unitPriceGross
            unitPrice
            taxRate
            vendor {
              vendor {
                firstName
                id
              }
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
    "name": "orderId",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderItemId",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "status",
    "type": "ApprovalEnum",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "orderId",
    "variableName": "orderId"
  },
  {
    "kind": "Variable",
    "name": "orderItemId",
    "variableName": "orderItemId"
  },
  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status"
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
  "kind": "LinkedField",
  "alias": null,
  "name": "payments",
  "storageKey": null,
  "args": null,
  "concreteType": "PaymentType",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ]
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
  "name": "escalateTime",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "hasCustomizable",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productName",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productSku",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPriceNet",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPriceGross",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unitPrice",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxRate",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateApproveOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "approveOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ApproveOrder",
        "plural": false,
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
              (v8/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": "lines(first:10)",
                "args": (v9/*: any*/),
                "concreteType": "OrderLineTypeConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineTypeEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "OrderLineType",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
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
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "vendor",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "UserType",
                                "plural": false,
                                "selections": [
                                  (v17/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      }
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
    "name": "CreateApproveOrderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "approveOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ApproveOrder",
        "plural": false,
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
              (v8/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": "lines(first:10)",
                "args": (v9/*: any*/),
                "concreteType": "OrderLineTypeConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineTypeEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "OrderLineType",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
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
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "vendor",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "UserType",
                                "plural": false,
                                "selections": [
                                  (v17/*: any*/),
                                  (v2/*: any*/)
                                ]
                              },
                              (v2/*: any*/)
                            ]
                          }
                        ]
                      }
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
  "params": {
    "operationKind": "mutation",
    "name": "CreateApproveOrderMutation",
    "id": null,
    "text": "mutation CreateApproveOrderMutation(\n  $orderId: ID\n  $orderItemId: ID\n  $status: ApprovalEnum\n) {\n  approveOrder(orderId: $orderId, orderItemId: $orderItemId, status: $status) {\n    order {\n      id\n      orderId\n      payments {\n        id\n      }\n      created\n      escalateTime\n      hasCustomizable\n      status\n      lines(first: 10) {\n        edges {\n          node {\n            id\n            productName\n            productSku\n            quantity\n            unitPriceNet\n            unitPriceGross\n            unitPrice\n            taxRate\n            vendor {\n              vendor {\n                firstName\n                id\n              }\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f15f508f6af4cbe0b16ac99649d22556';
module.exports = node;
