/**
 * @flow
 * @relayHash e11a58acd994a226b584361d660dd23b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserMutationVariables = {|
  email: string,
  firstName: string,
  mobileNumber: string,
  password: string,
|};
export type CreateUserMutationResponse = {|
  +createUser: ?{|
    +user: ?{|
      +id: string,
      +dateOfBirth: ?any,
      +mobileNumber: string,
      +firstName: string,
    |},
    +otp: ?string,
  |}
|};
export type CreateUserMutation = {|
  variables: CreateUserMutationVariables,
  response: CreateUserMutationResponse,
|};
*/


/*
mutation CreateUserMutation(
  $email: String!
  $firstName: String!
  $mobileNumber: String!
  $password: String!
) {
  createUser(email: $email, firstName: $firstName, mobileNumber: $mobileNumber, password: $password) {
    user {
      id
      dateOfBirth
      mobileNumber
      firstName
    }
    otp
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "firstName",
    "type": "String!",
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
    "name": "password",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createUser",
    "storageKey": null,
    "args": [
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
        "name": "mobileNumber",
        "variableName": "mobileNumber"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "CreateUser",
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
            "name": "dateOfBirth",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "mobileNumber",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "firstName",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "otp",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateUserMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateUserMutation",
    "id": null,
    "text": "mutation CreateUserMutation(\n  $email: String!\n  $firstName: String!\n  $mobileNumber: String!\n  $password: String!\n) {\n  createUser(email: $email, firstName: $firstName, mobileNumber: $mobileNumber, password: $password) {\n    user {\n      id\n      dateOfBirth\n      mobileNumber\n      firstName\n    }\n    otp\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '80a7f8b0a8a47ef688e239290a7a7fb7';
module.exports = node;
