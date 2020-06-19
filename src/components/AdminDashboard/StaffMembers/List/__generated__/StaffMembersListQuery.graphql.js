/**
 * @flow
 * @relayHash bc58f38a3a27d169076921fb09a3c769
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StaffMembersListQueryVariables = {||};
export type StaffMembersListQueryResponse = {|
  +listStaffUsers: ?$ReadOnlyArray<?{|
    +id: string,
    +isAdmin: boolean,
    +firstName: string,
    +email: string,
  |}>
|};
export type StaffMembersListQuery = {|
  variables: StaffMembersListQueryVariables,
  response: StaffMembersListQueryResponse,
|};
*/


/*
query StaffMembersListQuery {
  listStaffUsers {
    id
    isAdmin
    firstName
    email
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "listStaffUsers",
    "storageKey": null,
    "args": null,
    "concreteType": "UserType",
    "plural": true,
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
        "name": "isAdmin",
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
        "name": "email",
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
    "name": "StaffMembersListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "StaffMembersListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "StaffMembersListQuery",
    "id": null,
    "text": "query StaffMembersListQuery {\n  listStaffUsers {\n    id\n    isAdmin\n    firstName\n    email\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '70731d15ffde5f432acd3f3f2e9291e4';
module.exports = node;
