/**
 * @flow
 * @relayHash bd342fe3d0565b5fe531e0d7206141a8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CategoriesCreateCategoryListQueryVariables = {||};
export type CategoriesCreateCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +branding: boolean,
  |}>
|};
export type CategoriesCreateCategoryListQuery = {|
  variables: CategoriesCreateCategoryListQueryVariables,
  response: CategoriesCreateCategoryListQueryResponse,
|};
*/


/*
query CategoriesCreateCategoryListQuery {
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
    "name": "CategoriesCreateCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CategoriesCreateCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CategoriesCreateCategoryListQuery",
    "id": null,
    "text": "query CategoriesCreateCategoryListQuery {\n  categorys {\n    id\n    name\n    branding\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd988af5df4dbb04f9ed36a7db6b8dce2';
module.exports = node;
