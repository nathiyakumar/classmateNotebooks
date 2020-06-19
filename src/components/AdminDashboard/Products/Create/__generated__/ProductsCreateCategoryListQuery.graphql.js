/**
 * @flow
 * @relayHash 9889e168e07484ed37a429807d9d9653
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsCreateCategoryListQueryVariables = {||};
export type ProductsCreateCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +branding: boolean,
  |}>
|};
export type ProductsCreateCategoryListQuery = {|
  variables: ProductsCreateCategoryListQueryVariables,
  response: ProductsCreateCategoryListQueryResponse,
|};
*/


/*
query ProductsCreateCategoryListQuery {
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
    "name": "ProductsCreateCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsCreateCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsCreateCategoryListQuery",
    "id": null,
    "text": "query ProductsCreateCategoryListQuery {\n  categorys {\n    id\n    name\n    branding\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f4b03ef903c610a638a2714f5eafd0cb';
module.exports = node;
