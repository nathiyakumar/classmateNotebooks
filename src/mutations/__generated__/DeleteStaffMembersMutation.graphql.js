/**
 * @flow
 * @relayHash cc24a95d08eaa4fc84e35ae6f653e14a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteStaffMembersMutationVariables = {|
  userIds?: ?$ReadOnlyArray<?string>
|};
export type DeleteStaffMembersMutationResponse = {|
  +deleteStaffMember: ?{|
    +message: ?string
  |}
|};
export type DeleteStaffMembersMutation = {|
  variables: DeleteStaffMembersMutationVariables,
  response: DeleteStaffMembersMutationResponse,
|};
*/


/*
mutation DeleteStaffMembersMutation(
  $userIds: [ID]
) {
  deleteStaffMember(userIds: $userIds) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userIds",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteStaffMember",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userIds",
        "variableName": "userIds"
      }
    ],
    "concreteType": "DeleteStaffMember",
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
    "name": "DeleteStaffMembersMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteStaffMembersMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteStaffMembersMutation",
    "id": null,
    "text": "mutation DeleteStaffMembersMutation(\n  $userIds: [ID]\n) {\n  deleteStaffMember(userIds: $userIds) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f0eba90bd60ac882e0574dfc53f96132';
module.exports = node;
