/**
 * @flow
 * @relayHash 2f589ee0d2c73d218b324a5bb340bf6d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoriesEditCategoryListQueryVariables = {||};
export type CategoriesEditCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +branding: boolean,
  |}>
|};
export type CategoriesEditCategoryListQuery = {|
  variables: CategoriesEditCategoryListQueryVariables,
  response: CategoriesEditCategoryListQueryResponse,
|};
*/


/*
query CategoriesEditCategoryListQuery {
  categorys {
    id
    name
    branding
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "categorys",
    "storageKey": null,
    "args": null,
    "concreteType": "CategoryType",
    "plural": true,
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
    "name": "CategoriesEditCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CategoriesEditCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CategoriesEditCategoryListQuery",
    "id": null,
    "text": "query CategoriesEditCategoryListQuery {\n  categorys {\n    id\n    name\n    branding\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ac1ce04976dd8d1862c686370e24ac7c';
module.exports = node;
