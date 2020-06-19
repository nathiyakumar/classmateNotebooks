/**
 * @flow
 * @relayHash 83d9202cb49fcca509a5e31acd30d1c3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AttributesInput = {|
  slug?: ?string,
  name?: ?string,
  values?: ?$ReadOnlyArray<?AttributeValueInput>,
  productType?: ?string,
  productVariantType?: ?string,
|};
export type AttributeValueInput = {|
  value?: ?string,
  attribute?: ?string,
|};
export type CreateAttributeMutationVariables = {|
  input?: ?AttributesInput
|};
export type CreateAttributeMutationResponse = {|
  +createAttribute: ?{|
    +attributes: ?{|
      +id: string,
      +slug: string,
      +name: string,
    |},
    +message: ?string,
  |}
|};
export type CreateAttributeMutation = {|
  variables: CreateAttributeMutationVariables,
  response: CreateAttributeMutationResponse,
|};
*/


/*
mutation CreateAttributeMutation(
  $input: AttributesInput
) {
  createAttribute(input: $input) {
    attributes {
      id
      slug
      name
    }
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "AttributesInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createAttribute",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateAttribute",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "attributes",
        "storageKey": null,
        "args": null,
        "concreteType": "AttributesType",
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
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
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
    "name": "CreateAttributeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateAttributeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateAttributeMutation",
    "id": null,
    "text": "mutation CreateAttributeMutation(\n  $input: AttributesInput\n) {\n  createAttribute(input: $input) {\n    attributes {\n      id\n      slug\n      name\n    }\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7b02a74b0bb6b97afee347a255f23e2b';
module.exports = node;
