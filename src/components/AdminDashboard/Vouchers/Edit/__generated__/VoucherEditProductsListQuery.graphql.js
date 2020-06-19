/**
 * @flow
 * @relayHash 052cec2f20b345540b11b4cc8247bdc2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VoucherEditProductsListQueryVariables = {||};
export type VoucherEditProductsListQueryResponse = {|
  +listOfProducts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type VoucherEditProductsListQuery = {|
  variables: VoucherEditProductsListQueryVariables,
  response: VoucherEditProductsListQueryResponse,
|};
*/


/*
query VoucherEditProductsListQuery {
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
    "name": "VoucherEditProductsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VoucherEditProductsListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VoucherEditProductsListQuery",
    "id": null,
    "text": "query VoucherEditProductsListQuery {\n  listOfProducts {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5c6af9d0818711f74fcac3ef394da90d';
module.exports = node;
