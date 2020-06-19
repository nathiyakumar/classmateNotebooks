/**
 * @flow
 * @relayHash fd2791a00c28ef09ecefdae0876dfaf8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateCheckoutEmailUpdateMutationVariables = {|
  checkoutId: string,
  emailId: string,
|};
export type CreateCheckoutEmailUpdateMutationResponse = {|
  +checkoutEmailUpdate: ?{|
    +message: ?string,
    +checkout: ?{|
      +email: string,
      +token: any,
    |},
  |}
|};
export type CreateCheckoutEmailUpdateMutation = {|
  variables: CreateCheckoutEmailUpdateMutationVariables,
  response: CreateCheckoutEmailUpdateMutationResponse,
|};
*/


/*
mutation CreateCheckoutEmailUpdateMutation(
  $checkoutId: ID!
  $emailId: String!
) {
  checkoutEmailUpdate(checkoutId: $checkoutId, emailId: $emailId) {
    message
    checkout {
      email
      token
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
    "name": "emailId",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "checkoutId",
    "variableName": "checkoutId"
  },
  {
    "kind": "Variable",
    "name": "emailId",
    "variableName": "emailId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "token",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCheckoutEmailUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutEmailUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckOutEmailUpdate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutEmailUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutEmailUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckOutEmailUpdate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutEmailUpdateMutation",
    "id": null,
    "text": "mutation CreateCheckoutEmailUpdateMutation(\n  $checkoutId: ID!\n  $emailId: String!\n) {\n  checkoutEmailUpdate(checkoutId: $checkoutId, emailId: $emailId) {\n    message\n    checkout {\n      email\n      token\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '82f80ea54f6b48c9414d9bb978a1fa0a';
module.exports = node;
