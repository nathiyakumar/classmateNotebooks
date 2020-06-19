/**
 * @flow
 * @relayHash e8b802fdee370e42a99c2455c39f8689
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CollectionEditProductsListQueryVariables = {||};
export type CollectionEditProductsListQueryResponse = {|
  +listOfProducts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type CollectionEditProductsListQuery = {|
  variables: CollectionEditProductsListQueryVariables,
  response: CollectionEditProductsListQueryResponse,
|};
*/


/*
query CollectionEditProductsListQuery {
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
    "name": "CollectionEditProductsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionEditProductsListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionEditProductsListQuery",
    "id": null,
    "text": "query CollectionEditProductsListQuery {\n  listOfProducts {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '801db52b039622c3fcc854f5061220c9';
module.exports = node;
