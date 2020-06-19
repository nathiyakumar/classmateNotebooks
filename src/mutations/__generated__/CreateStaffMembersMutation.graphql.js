/**
 * @flow
 * @relayHash a1d4c8eb87f1320903c4c146b71a0252
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateStaffMembersMutationVariables = {|
  firstName: string,
  lastName?: ?string,
  mobileNumber: string,
  email: string,
|};
export type CreateStaffMembersMutationResponse = {|
  +addStaffMember: ?{|
    +user: ?{|
      +id: string
    |},
    +message: ?string,
  |}
|};
export type CreateStaffMembersMutation = {|
  variables: CreateStaffMembersMutationVariables,
  response: CreateStaffMembersMutationResponse,
|};
*/


/*
mutation CreateStaffMembersMutation(
  $firstName: String!
  $lastName: String
  $mobileNumber: String!
  $email: String!
) {
  addStaffMember(firstName: $firstName, lastName: $lastName, email: $email, mobileNumber: $mobileNumber) {
    user {
      id
    }
    message
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
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "addStaffMember",
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
        "name": "lastName",
        "variableName": "lastName"
      },
      {
        "kind": "Variable",
        "name": "mobileNumber",
        "variableName": "mobileNumber"
      }
    ],
    "concreteType": "AddStaffMember",
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
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
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
    "name": "CreateStaffMembersMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateStaffMembersMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateStaffMembersMutation",
    "id": null,
    "text": "mutation CreateStaffMembersMutation(\n  $firstName: String!\n  $lastName: String\n  $mobileNumber: String!\n  $email: String!\n) {\n  addStaffMember(firstName: $firstName, lastName: $lastName, email: $email, mobileNumber: $mobileNumber) {\n    user {\n      id\n    }\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '272e5dea5a76706660cdbcb768ba8b8c';
module.exports = node;
