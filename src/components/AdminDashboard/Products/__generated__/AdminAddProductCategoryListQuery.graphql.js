/**
 * @flow
 * @relayHash 8238104bf9dc4c2fbe13c576c9933247
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminAddProductCategoryListQueryVariables = {||};
export type AdminAddProductCategoryListQueryResponse = {|
  +categorys: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type AdminAddProductCategoryListQuery = {|
  variables: AdminAddProductCategoryListQueryVariables,
  response: AdminAddProductCategoryListQueryResponse,
|};
*/


/*
query AdminAddProductCategoryListQuery {
  categorys {
    id
    name
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AdminAddProductCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminAddProductCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminAddProductCategoryListQuery",
    "id": null,
    "text": "query AdminAddProductCategoryListQuery {\n  categorys {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e05317fc7eeebf07c02e36d7afcc21ec';
module.exports = node;
