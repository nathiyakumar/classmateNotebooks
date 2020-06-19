/**
 * @flow
 * @relayHash d7d75d8df82ae4e7fc6dad045ab52aee
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StaffInput = {|
  firstName: string,
  lastName?: ?string,
  email: string,
  mobileNumber: string,
  isAdmin: boolean,
|};
export type UpdateStaffMemebersMutationVariables = {|
  userData?: ?StaffInput,
  userId: string,
|};
export type UpdateStaffMemebersMutationResponse = {|
  +updateStaffMember: ?{|
    +message: ?string
  |}
|};
export type UpdateStaffMemebersMutation = {|
  variables: UpdateStaffMemebersMutationVariables,
  response: UpdateStaffMemebersMutationResponse,
|};
*/


/*
mutation UpdateStaffMemebersMutation(
  $userData: StaffInput
  $userId: ID!
) {
  updateStaffMember(userData: $userData, userId: $userId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userData",
    "type": "StaffInput",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "userId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateStaffMember",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userData",
        "variableName": "userData"
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "UpdateStaffMember",
    "plural": false,
    "selections": [
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
    "name": "UpdateStaffMemebersMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateStaffMemebersMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateStaffMemebersMutation",
    "id": null,
    "text": "mutation UpdateStaffMemebersMutation(\n  $userData: StaffInput\n  $userId: ID!\n) {\n  updateStaffMember(userData: $userData, userId: $userId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1300278899384d73e18295ba438f28cb';
module.exports = node;
