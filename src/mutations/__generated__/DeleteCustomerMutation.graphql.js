/**
 * @flow
 * @relayHash 7643cc9133be6aa51feda7453a06687b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteCustomerMutationVariables = {|
  userId?: ?$ReadOnlyArray<?string>
|};
export type DeleteCustomerMutationResponse = {|
  +deleteUser: ?{|
    +message: ?string
  |}
|};
export type DeleteCustomerMutation = {|
  variables: DeleteCustomerMutationVariables,
  response: DeleteCustomerMutationResponse,
|};
*/


/*
mutation DeleteCustomerMutation(
  $userId: [ID]
) {
  deleteUser(userId: $userId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userId",
    "type": "[ID]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "DeleteUser",
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
    "name": "DeleteCustomerMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteCustomerMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteCustomerMutation",
    "id": null,
    "text": "mutation DeleteCustomerMutation(\n  $userId: [ID]\n) {\n  deleteUser(userId: $userId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc07fac1955e4da861eab79186d39cf4';
module.exports = node;
