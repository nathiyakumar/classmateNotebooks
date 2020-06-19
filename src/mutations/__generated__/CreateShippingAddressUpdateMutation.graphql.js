/**
 * @flow
 * @relayHash cbd713b167329298974b36cc0a71a4c3
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
export type CreateShippingAddressUpdateMutationVariables = {|
  checkoutId: string,
  shippingAddress?: ?AddressInput,
|};
export type CreateShippingAddressUpdateMutationResponse = {|
  +checkoutShippingAddressUpdate: ?{|
    +message: ?string,
    +checkout: ?{|
      +shippingAddress: ?{|
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
export type CreateShippingAddressUpdateMutation = {|
  variables: CreateShippingAddressUpdateMutationVariables,
  response: CreateShippingAddressUpdateMutationResponse,
|};
*/


/*
mutation CreateShippingAddressUpdateMutation(
  $checkoutId: ID!
  $shippingAddress: AddressInput
) {
  checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
    message
    checkout {
      shippingAddress {
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
    "name": "shippingAddress",
    "type": "AddressInput",
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
    "name": "shippingAddress",
    "variableName": "shippingAddress"
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
    "name": "CreateShippingAddressUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutShippingAddressUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutShippingAddressUpdate",
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
                "name": "shippingAddress",
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
    "name": "CreateShippingAddressUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutShippingAddressUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutShippingAddressUpdate",
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
                "name": "shippingAddress",
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
    "name": "CreateShippingAddressUpdateMutation",
    "id": null,
    "text": "mutation CreateShippingAddressUpdateMutation(\n  $checkoutId: ID!\n  $shippingAddress: AddressInput\n) {\n  checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {\n    message\n    checkout {\n      shippingAddress {\n        firstName\n        lastName\n        companyName\n        phone\n        city\n        postalCode\n        id\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a3bd0c0b2149f012fdc2428b73cda1a2';
module.exports = node;
