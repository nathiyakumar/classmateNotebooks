/**
 * @flow
 * @relayHash 007f9a0d6789898629fe83858b046836
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoryInput = {|
  description?: ?string,
  descriptionJson?: ?any,
  name: string,
  slug?: ?string,
  parent?: ?string,
  isFeatured?: ?boolean,
  isActive?: ?boolean,
  branding?: ?boolean,
  seoTitle?: ?string,
  seoDescription?: ?string,
  backgroundImage?: ?any,
  backgroundImageAlt?: ?string,
|};
export type CreateCategoryMutationVariables = {|
  input: CategoryInput
|};
export type CreateCategoryMutationResponse = {|
  +createCategory: ?{|
    +category: ?{|
      +id: string,
      +name: string,
    |}
  |}
|};
export type CreateCategoryMutation = {|
  variables: CreateCategoryMutationVariables,
  response: CreateCategoryMutationResponse,
|};
*/


/*
mutation CreateCategoryMutation(
  $input: CategoryInput!
) {
  createCategory(input: $input) {
    category {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CategoryInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createCategory",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CategoryCreate",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "category",
        "storageKey": null,
        "args": null,
        "concreteType": "CategoryType",
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
            "name": "name",
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
    "name": "CreateCategoryMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCategoryMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCategoryMutation",
    "id": null,
    "text": "mutation CreateCategoryMutation(\n  $input: CategoryInput!\n) {\n  createCategory(input: $input) {\n    category {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4df0e33cf7b8c520c911873850f6fdce';
module.exports = node;
