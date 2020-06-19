/**
 * @flow
 * @relayHash 7de163b9f0a95f819e9f1553396c1981
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ClassmateBrandCategoryListQueryVariables = {||};
export type ClassmateBrandCategoryListQueryResponse = {|
  +catalogueCategoryList: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +backgroundImage: ?string,
    +categoryIcon: ?string,
    +subCategories: ?$ReadOnlyArray<?{|
      +id: ?string,
      +name: ?string,
    |}>,
  |}>
|};
export type ClassmateBrandCategoryListQuery = {|
  variables: ClassmateBrandCategoryListQueryVariables,
  response: ClassmateBrandCategoryListQueryResponse,
|};
*/


/*
query ClassmateBrandCategoryListQuery {
  catalogueCategoryList {
    id
    name
    backgroundImage
    categoryIcon
    subCategories {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "catalogueCategoryList",
    "storageKey": null,
    "args": null,
    "concreteType": "CatalogueCategory",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "backgroundImage",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "categoryIcon",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "subCategories",
        "storageKey": null,
        "args": null,
        "concreteType": "CatalogueSubCategory",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ClassmateBrandCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ClassmateBrandCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ClassmateBrandCategoryListQuery",
    "id": null,
    "text": "query ClassmateBrandCategoryListQuery {\n  catalogueCategoryList {\n    id\n    name\n    backgroundImage\n    categoryIcon\n    subCategories {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1e7854bc67edc46304244f5be51ec184';
module.exports = node;
