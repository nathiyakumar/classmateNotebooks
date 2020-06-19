/**
 * @flow
 * @relayHash e116adf802447af7f6a53eaf2b94a919
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CollectionsListQueryVariables = {||};
export type CollectionsListQueryResponse = {|
  +listOfCollections: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +isPublished: boolean,
    +products: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +name: string
        |}
      |}>
    |},
  |}>
|};
export type CollectionsListQuery = {|
  variables: CollectionsListQueryVariables,
  response: CollectionsListQueryResponse,
|};
*/


/*
query CollectionsListQuery {
  listOfCollections {
    id
    name
    isPublished
    products(first: 10) {
      edges {
        node {
          name
          id
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isPublished",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "listOfCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "CollectionType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "products",
            "storageKey": "products(first:10)",
            "args": (v3/*: any*/),
            "concreteType": "ProductsTypeConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductsTypeEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductsType",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "listOfCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "CollectionType",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "products",
            "storageKey": "products(first:10)",
            "args": (v3/*: any*/),
            "concreteType": "ProductsTypeConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductsTypeEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductsType",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v0/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionsListQuery",
    "id": null,
    "text": "query CollectionsListQuery {\n  listOfCollections {\n    id\n    name\n    isPublished\n    products(first: 10) {\n      edges {\n        node {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f9095643114a71a3cd546f36886f1f6c';
module.exports = node;
