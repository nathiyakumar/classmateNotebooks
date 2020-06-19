/**
 * @flow
 * @relayHash 2ca2edada0cb447d696b61a2f9d55eb5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsEditCollectionListQueryVariables = {||};
export type ProductsEditCollectionListQueryResponse = {|
  +listOfCollections: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type ProductsEditCollectionListQuery = {|
  variables: ProductsEditCollectionListQueryVariables,
  response: ProductsEditCollectionListQueryResponse,
|};
*/


/*
query ProductsEditCollectionListQuery {
  listOfCollections {
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
    "name": "listOfCollections",
    "storageKey": null,
    "args": null,
    "concreteType": "CollectionType",
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
    "name": "ProductsEditCollectionListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsEditCollectionListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsEditCollectionListQuery",
    "id": null,
    "text": "query ProductsEditCollectionListQuery {\n  listOfCollections {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd85ffe0b085f2947fdc7ec88bea238d1';
module.exports = node;
