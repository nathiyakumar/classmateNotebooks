/**
 * @flow
 * @relayHash 627eb41d0b3fb69e4607fba61b97e6c7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CollectionsCreateProductsListQueryVariables = {||};
export type CollectionsCreateProductsListQueryResponse = {|
  +listOfProducts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type CollectionsCreateProductsListQuery = {|
  variables: CollectionsCreateProductsListQueryVariables,
  response: CollectionsCreateProductsListQueryResponse,
|};
*/


/*
query CollectionsCreateProductsListQuery {
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
    "name": "CollectionsCreateProductsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsCreateProductsListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionsCreateProductsListQuery",
    "id": null,
    "text": "query CollectionsCreateProductsListQuery {\n  listOfProducts {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '61c9a34a73ce209bda64d345bc862725';
module.exports = node;
