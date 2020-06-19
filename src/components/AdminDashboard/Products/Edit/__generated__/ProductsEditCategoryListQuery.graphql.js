/**
 * @flow
 * @relayHash c9eb291d2b2fe161ffd3429d58c8db9b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsEditCategoryListQueryVariables = {||};
export type ProductsEditCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +branding: boolean,
  |}>
|};
export type ProductsEditCategoryListQuery = {|
  variables: ProductsEditCategoryListQueryVariables,
  response: ProductsEditCategoryListQueryResponse,
|};
*/


/*
query ProductsEditCategoryListQuery {
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
    "name": "ProductsEditCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsEditCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsEditCategoryListQuery",
    "id": null,
    "text": "query ProductsEditCategoryListQuery {\n  categorys {\n    id\n    name\n    branding\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '280fe940a1c079a858c08d87d93e2690';
module.exports = node;
