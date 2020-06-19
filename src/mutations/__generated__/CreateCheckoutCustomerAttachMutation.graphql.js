/**
 * @flow
 * @relayHash dfd6f6226b31777ed37bd5049c4fdf23
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateCheckoutCustomerAttachMutationVariables = {|
  checkoutId: string,
  customerId: string,
|};
export type CreateCheckoutCustomerAttachMutationResponse = {|
  +checkoutCustomerAttach: ?{|
    +message: ?string,
    +checkout: ?{|
      +user: ?{|
        +id: string
      |},
      +token: any,
      +email: string,
      +id: string,
    |},
  |}
|};
export type CreateCheckoutCustomerAttachMutation = {|
  variables: CreateCheckoutCustomerAttachMutationVariables,
  response: CreateCheckoutCustomerAttachMutationResponse,
|};
*/


/*
mutation CreateCheckoutCustomerAttachMutation(
  $checkoutId: ID!
  $customerId: ID!
) {
  checkoutCustomerAttach(checkoutId: $checkoutId, customerId: $customerId) {
    message
    checkout {
      user {
        id
      }
      token
      email
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "checkoutId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "customerId",
    "type": "ID!",
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
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "checkoutCustomerAttach",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "checkoutId",
        "variableName": "checkoutId"
      },
      {
        "kind": "Variable",
        "name": "customerId",
        "variableName": "customerId"
      }
    ],
    "concreteType": "CheckoutCustomerAttach",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkout",
        "storageKey": null,
        "args": null,
        "concreteType": "CheckoutType",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "UserType",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "token",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          (v1/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCheckoutCustomerAttachMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutCustomerAttachMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutCustomerAttachMutation",
    "id": null,
    "text": "mutation CreateCheckoutCustomerAttachMutation(\n  $checkoutId: ID!\n  $customerId: ID!\n) {\n  checkoutCustomerAttach(checkoutId: $checkoutId, customerId: $customerId) {\n    message\n    checkout {\n      user {\n        id\n      }\n      token\n      email\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4a8175d6fc952385b448ed28cf0c1ad8';
module.exports = node;
