/**
 * @flow
 * @relayHash f773dc46ca5295e14c16e526ee96284c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RefreshTokenMutationVariables = {|
  token: string
|};
export type RefreshTokenMutationResponse = {|
  +refreshToken: ?{|
    +token: ?string,
    +payload: ?any,
  |}
|};
export type RefreshTokenMutation = {|
  variables: RefreshTokenMutationVariables,
  response: RefreshTokenMutationResponse,
|};
*/


/*
mutation RefreshTokenMutation(
  $token: String!
) {
  refreshToken(token: $token) {
    token
    payload
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "token",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "refreshToken",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Refresh",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "payload",
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
    "name": "RefreshTokenMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "RefreshTokenMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "RefreshTokenMutation",
    "id": null,
    "text": "mutation RefreshTokenMutation(\n  $token: String!\n) {\n  refreshToken(token: $token) {\n    token\n    payload\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd0ef7b3f808cc19915157b89aabccf82';
module.exports = node;
