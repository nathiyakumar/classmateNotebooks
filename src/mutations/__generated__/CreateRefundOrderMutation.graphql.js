/**
 * @flow
 * @relayHash d441e14ff38001364a5e34d0c378c4ee
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PaymentChargeStatusEnum = "AUTHORIZED" | "CAPTURED" | "COD" | "FAILED" | "FULLY_CHARGED" | "FULLY_REFUNDED" | "NOT_CHARGED" | "PARTIALLY_CHARGED" | "PARTIALLY_REFUNDED" | "%future added value";
export type TransactionError = "TRANSACTIONERROR_DECLINED" | "TRANSACTIONERROR_EXPIRED" | "TRANSACTIONERROR_INCORRECT_ADDRESS" | "TRANSACTIONERROR_INCORRECT_CVV" | "TRANSACTIONERROR_INCORRECT_NUMBER" | "TRANSACTIONERROR_INCORRECT_ZIP" | "TRANSACTIONERROR_INVALID_CVV" | "TRANSACTIONERROR_INVALID_EXPIRY_DATE" | "TRANSACTIONERROR_INVALID_NUMBER" | "TRANSACTIONERROR_PROCESSING_ERROR" | "%future added value";
export type TransactionKind = "AUTHORIZED" | "CAPTURED" | "CONFIRM" | "REFUNDED" | "VOID" | "%future added value";
export type CreateRefundOrderMutationVariables = {|
  orderId: string,
  paymentId: string,
  refundAmount: number,
|};
export type CreateRefundOrderMutationResponse = {|
  +createRefund: ?{|
    +order: ?{|
      +id: string,
      +status: ?string,
      +isPaid: ?boolean,
      +orderId: ?string,
    |},
    +payment: ?{|
      +id: string,
      +gateway: string,
      +isActive: boolean,
      +created: any,
      +modified: any,
      +token: string,
      +chargeStatus: PaymentChargeStatusEnum,
      +transactions: ?$ReadOnlyArray<?{|
        +id: string,
        +created: any,
        +token: string,
        +kind: ?TransactionKind,
        +isSuccess: boolean,
        +error: ?TransactionError,
        +gatewayResponse: any,
        +amount: ?number,
      |}>,
    |},
  |}
|};
export type CreateRefundOrderMutation = {|
  variables: CreateRefundOrderMutationVariables,
  response: CreateRefundOrderMutationResponse,
|};
*/


/*
mutation CreateRefundOrderMutation(
  $orderId: ID!
  $paymentId: ID!
  $refundAmount: Float!
) {
  createRefund(orderId: $orderId, paymentId: $paymentId, refundAmount: $refundAmount) {
    order {
      id
      status
      isPaid
      orderId
    }
    payment {
      id
      gateway
      isActive
      created
      modified
      token
      chargeStatus
      transactions {
        id
        created
        token
        kind
        isSuccess
        error
        gatewayResponse
        amount
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
    "name": "paymentId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "refundAmount",
    "type": "Float!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "token",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createRefund",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      },
      {
        "kind": "Variable",
        "name": "paymentId",
        "variableName": "paymentId"
      },
      {
        "kind": "Variable",
        "name": "refundAmount",
        "variableName": "refundAmount"
      }
    ],
    "concreteType": "CreateRefund",
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
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "status",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isPaid",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "orderId",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "payment",
        "storageKey": null,
        "args": null,
        "concreteType": "PaymentType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "gateway",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isActive",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "modified",
            "args": null,
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "chargeStatus",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "transactions",
            "storageKey": null,
            "args": null,
            "concreteType": "TransactionType",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "kind",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isSuccess",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "error",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "gatewayResponse",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "amount",
                "args": null,
                "storageKey": null
              }
            ]
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
    "name": "CreateRefundOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateRefundOrderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateRefundOrderMutation",
    "id": null,
    "text": "mutation CreateRefundOrderMutation(\n  $orderId: ID!\n  $paymentId: ID!\n  $refundAmount: Float!\n) {\n  createRefund(orderId: $orderId, paymentId: $paymentId, refundAmount: $refundAmount) {\n    order {\n      id\n      status\n      isPaid\n      orderId\n    }\n    payment {\n      id\n      gateway\n      isActive\n      created\n      modified\n      token\n      chargeStatus\n      transactions {\n        id\n        created\n        token\n        kind\n        isSuccess\n        error\n        gatewayResponse\n        amount\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1a8a45ef9ae8cd31c9a94057f841fa1e';
module.exports = node;
