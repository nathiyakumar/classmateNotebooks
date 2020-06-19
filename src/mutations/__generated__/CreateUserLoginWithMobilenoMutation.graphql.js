/**
 * @flow
 * @relayHash 32808353448269cf17ae11377918c940
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserLoginWithMobilenoMutationVariables = {|
  mobileNumber: string
|};
export type CreateUserLoginWithMobilenoMutationResponse = {|
  +userLoginWithMobile: ?{|
    +mobileNumber: ?string
  |}
|};
export type CreateUserLoginWithMobilenoMutation = {|
  variables: CreateUserLoginWithMobilenoMutationVariables,
  response: CreateUserLoginWithMobilenoMutationResponse,
|};
*/


/*
mutation CreateUserLoginWithMobilenoMutation(
  $mobileNumber: String!
) {
  userLoginWithMobile(mobileNumber: $mobileNumber) {
    mobileNumber
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "mobileNumber",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "userLoginWithMobile",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "mobileNumber",
        "variableName": "mobileNumber"
      }
    ],
    "concreteType": "UserLoginWithMobile",
    "plural": false,
    "selections": [
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
    "name": "CreateUserLoginWithMobilenoMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateUserLoginWithMobilenoMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateUserLoginWithMobilenoMutation",
    "id": null,
    "text": "mutation CreateUserLoginWithMobilenoMutation(\n  $mobileNumber: String!\n) {\n  userLoginWithMobile(mobileNumber: $mobileNumber) {\n    mobileNumber\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '95ae8530547de696161680acf240b35f';
module.exports = node;
