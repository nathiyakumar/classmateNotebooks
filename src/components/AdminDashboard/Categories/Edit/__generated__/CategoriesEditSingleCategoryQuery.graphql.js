/**
 * @flow
 * @relayHash 4b59b2c7cb3710d774f8d56665eb2381
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoriesEditSingleCategoryQueryVariables = {|
  id: string
|};
export type CategoriesEditSingleCategoryQueryResponse = {|
  +category: ?{|
    +id: string,
    +name: string,
    +description: string,
    +seoTitle: string,
    +seoDescription: string,
    +parent: ?{|
      +id: string,
      +name: string,
    |},
    +backgroundImageUrl: ?string,
    +isActive: boolean,
    +branding: boolean,
  |}
|};
export type CategoriesEditSingleCategoryQuery = {|
  variables: CategoriesEditSingleCategoryQueryVariables,
  response: CategoriesEditSingleCategoryQueryResponse,
|};
*/


/*
query CategoriesEditSingleCategoryQuery(
  $id: ID!
) {
  category(id: $id) {
    id
    name
    description
    seoTitle
    seoDescription
    parent {
      id
      name
    }
    backgroundImageUrl
    isActive
    branding
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
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "category",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "CategoryType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "seoTitle",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "seoDescription",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "parent",
        "storageKey": null,
        "args": null,
        "concreteType": "CategoryType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "backgroundImageUrl",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isActive",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "branding",
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
    "name": "CategoriesEditSingleCategoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CategoriesEditSingleCategoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CategoriesEditSingleCategoryQuery",
    "id": null,
    "text": "query CategoriesEditSingleCategoryQuery(\n  $id: ID!\n) {\n  category(id: $id) {\n    id\n    name\n    description\n    seoTitle\n    seoDescription\n    parent {\n      id\n      name\n    }\n    backgroundImageUrl\n    isActive\n    branding\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8d40acca127ec68a3c0055a748038ba7';
module.exports = node;
