/**
 * @flow
 * @relayHash b29d5ca8daa51b52ca1fbe8b5b290571
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddressInput = {|
  firstName?: ?string,
  lastName?: ?string,
  companyName?: ?string,
  addressLine1?: ?string,
  addressLine2?: ?string,
  city?: ?string,
  area?: ?string,
  postalCode?: ?number,
  country?: ?string,
  state?: ?string,
  phone?: ?string,
|};
export type CreateBillingAddressUpdateMutationVariables = {|
  checkoutId: string,
  billingAddress?: ?AddressInput,
|};
export type CreateBillingAddressUpdateMutationResponse = {|
  +checkoutBillingAddressUpdate: ?{|
    +message: ?string,
    +checkout: ?{|
      +billingAddress: ?{|
        +firstName: string,
        +lastName: string,
        +companyName: string,
        +phone: string,
        +city: string,
        +postalCode: number,
      |}
    |},
  |}
|};
export type CreateBillingAddressUpdateMutation = {|
  variables: CreateBillingAddressUpdateMutationVariables,
  response: CreateBillingAddressUpdateMutationResponse,
|};
*/


/*
mutation CreateBillingAddressUpdateMutation(
  $checkoutId: ID!
  $billingAddress: AddressInput
) {
  checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $billingAddress) {
    message
    checkout {
      billingAddress {
        firstName
        lastName
        companyName
        phone
        city
        postalCode
        id
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
    "name": "checkoutId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "billingAddress",
    "type": "AddressInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "billingAddress",
    "variableName": "billingAddress"
  },
  {
    "kind": "Variable",
    "name": "checkoutId",
    "variableName": "checkoutId"
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
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "companyName",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "postalCode",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateBillingAddressUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutBillingAddressUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckOutBillingAddressUpdate",
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "billingAddress",
                "storageKey": null,
                "args": null,
                "concreteType": "Address",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
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
    "name": "CreateBillingAddressUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutBillingAddressUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckOutBillingAddressUpdate",
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "billingAddress",
                "storageKey": null,
                "args": null,
                "concreteType": "Address",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ]
              },
              (v9/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateBillingAddressUpdateMutation",
    "id": null,
    "text": "mutation CreateBillingAddressUpdateMutation(\n  $checkoutId: ID!\n  $billingAddress: AddressInput\n) {\n  checkoutBillingAddressUpdate(checkoutId: $checkoutId, billingAddress: $billingAddress) {\n    message\n    checkout {\n      billingAddress {\n        firstName\n        lastName\n        companyName\n        phone\n        city\n        postalCode\n        id\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '265ec62931fffebc3fd4a49506c81e13';
module.exports = node;
