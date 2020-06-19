/**
 * @flow
 * @relayHash 2029f1e4ba0266d38466aed50a1e8611
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateColorPickerMutationVariables = {|
  input: any,
  userDesignId?: ?string,
|};
export type CreateColorPickerMutationResponse = {|
  +imageUpload: ?{|
    +message: ?string,
    +userDesign: ?{|
      +id: string,
      +userDesignId: any,
    |},
  |}
|};
export type CreateColorPickerMutation = {|
  variables: CreateColorPickerMutationVariables,
  response: CreateColorPickerMutationResponse,
|};
*/


/*
mutation CreateColorPickerMutation(
  $input: JSONString!
  $userDesignId: String
) {
  imageUpload(input: $input, userDesignId: $userDesignId) {
    message
    userDesign {
      id
      userDesignId
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "JSONString!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "userDesignId",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "imageUpload",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      },
      {
        "kind": "Variable",
        "name": "userDesignId",
        "variableName": "userDesignId"
      }
    ],
    "concreteType": "ImageUpload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userDesign",
        "storageKey": null,
        "args": null,
        "concreteType": "UserDesignType",
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
            "name": "userDesignId",
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
    "name": "CreateColorPickerMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateColorPickerMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateColorPickerMutation",
    "id": null,
    "text": "mutation CreateColorPickerMutation(\n  $input: JSONString!\n  $userDesignId: String\n) {\n  imageUpload(input: $input, userDesignId: $userDesignId) {\n    message\n    userDesign {\n      id\n      userDesignId\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ba088ee362671b2f9156a8feda3037e3';
module.exports = node;
