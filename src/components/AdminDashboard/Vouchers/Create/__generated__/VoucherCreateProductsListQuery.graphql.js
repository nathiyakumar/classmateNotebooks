/**
 * @flow
 * @relayHash bb43d8ac48eb704dda3793f089daad92
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VoucherCreateProductsListQueryVariables = {||};
export type VoucherCreateProductsListQueryResponse = {|
  +listOfProducts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type VoucherCreateProductsListQuery = {|
  variables: VoucherCreateProductsListQueryVariables,
  response: VoucherCreateProductsListQueryResponse,
|};
*/


/*
query VoucherCreateProductsListQuery {
  listOfProducts {
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
    "name": "listOfProducts",
    "storageKey": null,
    "args": null,
    "concreteType": "ProductsType",
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
    "name": "VoucherCreateProductsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VoucherCreateProductsListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VoucherCreateProductsListQuery",
    "id": null,
    "text": "query VoucherCreateProductsListQuery {\n  listOfProducts {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '634521791200804c25b83a611ad8fa47';
module.exports = node;
