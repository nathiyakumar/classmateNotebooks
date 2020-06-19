/**
 * @flow
 * @relayHash d662cb7fc9296c16da5ec5ed5eeb6426
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
export type UpdateAttributeMutationVariables = {|
  id: string,
  input?: ?AttributesInput,
|};
export type UpdateAttributeMutationResponse = {|
  +updateAttribute: ?{|
    +attributes: ?{|
      +id: string,
      +slug: string,
      +name: string,
    |},
    +message: ?string,
  |}
|};
export type UpdateAttributeMutation = {|
  variables: UpdateAttributeMutationVariables,
  response: UpdateAttributeMutationResponse,
|};
*/


/*
mutation UpdateAttributeMutation(
  $id: ID!
  $input: AttributesInput
) {
  updateAttribute(id: $id, input: $input) {
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
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
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
    "name": "updateAttribute",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateAttribute",
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
    "name": "UpdateAttributeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateAttributeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateAttributeMutation",
    "id": null,
    "text": "mutation UpdateAttributeMutation(\n  $id: ID!\n  $input: AttributesInput\n) {\n  updateAttribute(id: $id, input: $input) {\n    attributes {\n      id\n      slug\n      name\n    }\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '76819696a5c54103f8cf94a6b362a31d';
module.exports = node;
