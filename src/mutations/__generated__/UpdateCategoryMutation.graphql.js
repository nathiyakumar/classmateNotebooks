/**
 * @flow
 * @relayHash ddcea908d826b832df346c7569716f6f
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
export type UpdateCategoryMutationVariables = {|
  categoryId: string,
  input: CategoryInput,
|};
export type UpdateCategoryMutationResponse = {|
  +updateCategory: ?{|
    +category: ?{|
      +id: string,
      +name: string,
    |}
  |}
|};
export type UpdateCategoryMutation = {|
  variables: UpdateCategoryMutationVariables,
  response: UpdateCategoryMutationResponse,
|};
*/


/*
mutation UpdateCategoryMutation(
  $categoryId: ID!
  $input: CategoryInput!
) {
  updateCategory(categoryId: $categoryId, input: $input) {
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
    "name": "categoryId",
    "type": "ID!",
    "defaultValue": null
  },
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
    "name": "updateCategory",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateCategory",
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
    "name": "UpdateCategoryMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateCategoryMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateCategoryMutation",
    "id": null,
    "text": "mutation UpdateCategoryMutation(\n  $categoryId: ID!\n  $input: CategoryInput!\n) {\n  updateCategory(categoryId: $categoryId, input: $input) {\n    category {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1339fe9f79f607ba6c4460eeb7963451';
module.exports = node;
