/**
 * @flow
 * @relayHash 18cb1f2a00fa7e8ab5b8e4180074f694
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsCreateCollectionListQueryVariables = {||};
export type ProductsCreateCollectionListQueryResponse = {|
  +listOfCollections: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type ProductsCreateCollectionListQuery = {|
  variables: ProductsCreateCollectionListQueryVariables,
  response: ProductsCreateCollectionListQueryResponse,
|};
*/


/*
query ProductsCreateCollectionListQuery {
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
    "name": "ProductsCreateCollectionListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsCreateCollectionListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductsCreateCollectionListQuery",
    "id": null,
    "text": "query ProductsCreateCollectionListQuery {\n  listOfCollections {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f4c81c72d4dd3b4b0af46fb03e9bb133';
module.exports = node;
