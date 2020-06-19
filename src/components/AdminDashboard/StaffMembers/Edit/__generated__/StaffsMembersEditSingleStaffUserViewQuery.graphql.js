/**
 * @flow
 * @relayHash 70f0426bacfe319b61006521557479bf
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StaffsMembersEditSingleStaffUserViewQueryVariables = {|
  userId: string
|};
export type StaffsMembersEditSingleStaffUserViewQueryResponse = {|
  +singleStaffUserView: ?{|
    +id: string,
    +firstName: string,
    +lastName: ?string,
    +email: string,
    +isAdmin: boolean,
    +mobileNumber: string,
  |}
|};
export type StaffsMembersEditSingleStaffUserViewQuery = {|
  variables: StaffsMembersEditSingleStaffUserViewQueryVariables,
  response: StaffsMembersEditSingleStaffUserViewQueryResponse,
|};
*/


/*
query StaffsMembersEditSingleStaffUserViewQuery(
  $userId: ID!
) {
  singleStaffUserView(userId: $userId) {
    id
    firstName
    lastName
    email
    isAdmin
    mobileNumber
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
    "name": "singleStaffUserView",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
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
        "name": "firstName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "lastName",
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
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isAdmin",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "mobileNumber",
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
    "name": "StaffsMembersEditSingleStaffUserViewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "StaffsMembersEditSingleStaffUserViewQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "StaffsMembersEditSingleStaffUserViewQuery",
    "id": null,
    "text": "query StaffsMembersEditSingleStaffUserViewQuery(\n  $userId: ID!\n) {\n  singleStaffUserView(userId: $userId) {\n    id\n    firstName\n    lastName\n    email\n    isAdmin\n    mobileNumber\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '94dc2f081aa7f64e9b8785522b602762';
module.exports = node;
