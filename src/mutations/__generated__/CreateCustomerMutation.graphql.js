/**
 * @flow
 * @relayHash 2547f9b36eb697b3892eff42bc5a2aeb
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
export type CreateCustomerMutationVariables = {|
  firstName: string,
  lastName?: ?string,
  mobileNumber: string,
  email: string,
  address?: ?AddressInput,
|};
export type CreateCustomerMutationResponse = {|
  +addCustomer: ?{|
    +user: ?{|
      +id: string,
      +email: string,
    |}
  |}
|};
export type CreateCustomerMutation = {|
  variables: CreateCustomerMutationVariables,
  response: CreateCustomerMutationResponse,
|};
*/


/*
mutation CreateCustomerMutation(
  $firstName: String!
  $lastName: String
  $mobileNumber: String!
  $email: String!
  $address: AddressInput
) {
  addCustomer(firstName: $firstName, lastName: $lastName, mobileNumber: $mobileNumber, email: $email, address: $address) {
    user {
      id
      email
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "firstName",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "lastName",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "mobileNumber",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "address",
    "type": "AddressInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "addCustomer",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "address",
        "variableName": "address"
      },
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "firstName",
        "variableName": "firstName"
      },
      {
        "kind": "Variable",
        "name": "lastName",
        "variableName": "lastName"
      },
      {
        "kind": "Variable",
        "name": "mobileNumber",
        "variableName": "mobileNumber"
      }
    ],
    "concreteType": "AddCustomer",
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
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
    "name": "CreateCustomerMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCustomerMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCustomerMutation",
    "id": null,
    "text": "mutation CreateCustomerMutation(\n  $firstName: String!\n  $lastName: String\n  $mobileNumber: String!\n  $email: String!\n  $address: AddressInput\n) {\n  addCustomer(firstName: $firstName, lastName: $lastName, mobileNumber: $mobileNumber, email: $email, address: $address) {\n    user {\n      id\n      email\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '23a51818fc6650b54df3d599f22f0ac0';
module.exports = node;
