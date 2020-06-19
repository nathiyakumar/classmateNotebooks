/**
 * @flow
 * @relayHash db71e7ad6ba78f7d73921d8bb40db6bd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PaymentChargeStatusEnum = "AUTHORIZED" | "CAPTURED" | "COD" | "FAILED" | "FULLY_CHARGED" | "FULLY_REFUNDED" | "NOT_CHARGED" | "PARTIALLY_CHARGED" | "PARTIALLY_REFUNDED" | "%future added value";
export type TransactionError = "TRANSACTIONERROR_DECLINED" | "TRANSACTIONERROR_EXPIRED" | "TRANSACTIONERROR_INCORRECT_ADDRESS" | "TRANSACTIONERROR_INCORRECT_CVV" | "TRANSACTIONERROR_INCORRECT_NUMBER" | "TRANSACTIONERROR_INCORRECT_ZIP" | "TRANSACTIONERROR_INVALID_CVV" | "TRANSACTIONERROR_INVALID_EXPIRY_DATE" | "TRANSACTIONERROR_INVALID_NUMBER" | "TRANSACTIONERROR_PROCESSING_ERROR" | "%future added value";
export type TransactionKind = "AUTHORIZED" | "CAPTURED" | "CONFIRM" | "REFUNDED" | "VOID" | "%future added value";
export type CreateUpdatePaymentMutationVariables = {|
  orderId: string,
  paymentId: string,
  response: any,
|};
export type CreateUpdatePaymentMutationResponse = {|
  +createPayment: ?{|
    +order: ?{|
      +id: string,
      +status: ?string,
      +isPaid: ?boolean,
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
        +paymentToken: string,
      |}>,
    |},
  |}
|};
export type CreateUpdatePaymentMutation = {|
  variables: CreateUpdatePaymentMutationVariables,
  response: CreateUpdatePaymentMutationResponse,
|};
*/


/*
mutation CreateUpdatePaymentMutation(
  $orderId: ID!
  $paymentId: ID!
  $response: JSONString!
) {
  createPayment(orderId: $orderId, paymentId: $paymentId, response: $response) {
    order {
      id
      status
      isPaid
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
        paymentToken
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
    "name": "response",
    "type": "JSONString!",
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
    "name": "createPayment",
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
        "name": "response",
        "variableName": "response"
      }
    ],
    "concreteType": "UpdatePayment",
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "paymentToken",
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
    "name": "CreateUpdatePaymentMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateUpdatePaymentMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v4/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateUpdatePaymentMutation",
    "id": null,
    "text": "mutation CreateUpdatePaymentMutation(\n  $orderId: ID!\n  $paymentId: ID!\n  $response: JSONString!\n) {\n  createPayment(orderId: $orderId, paymentId: $paymentId, response: $response) {\n    order {\n      id\n      status\n      isPaid\n    }\n    payment {\n      id\n      gateway\n      isActive\n      created\n      modified\n      token\n      chargeStatus\n      transactions {\n        id\n        created\n        token\n        kind\n        isSuccess\n        error\n        gatewayResponse\n        amount\n        paymentToken\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8f947888b55cbbf44a5999ee5d6e0b1f';
module.exports = node;
