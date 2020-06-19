/**
 * @flow
 * @relayHash 9fc6f76c2c01ee4a89b2df1b778ca514
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CollectionEditSingleCollectionQueryVariables = {|
  collectionId?: ?string
|};
export type CollectionEditSingleCollectionQueryResponse = {|
  +singleCollection: ?{|
    +id: string,
    +name: string,
    +description: string,
    +seoTitle: string,
    +seoDescription: string,
    +slug: string,
    +backgroundImage: ?string,
    +backgroundImageAlt: string,
    +isPublished: boolean,
    +publicationDate: ?any,
    +products: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +name: string,
          +id: string,
        |}
      |}>
    |},
  |}
|};
export type CollectionEditSingleCollectionQuery = {|
  variables: CollectionEditSingleCollectionQueryVariables,
  response: CollectionEditSingleCollectionQueryResponse,
|};
*/


/*
query CollectionEditSingleCollectionQuery(
  $collectionId: ID
) {
  singleCollection(collectionId: $collectionId) {
    id
    name
    description
    seoTitle
    seoDescription
    slug
    backgroundImage
    backgroundImageAlt
    isPublished
    publicationDate
    products(first: 3) {
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
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "collectionId",
    "type": "ID",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "singleCollection",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "collectionId",
        "variableName": "collectionId"
      }
    ],
    "concreteType": "CollectionType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "seoTitle",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "seoDescription",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "slug",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "backgroundImage",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "backgroundImageAlt",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isPublished",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "publicationDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": "products(first:3)",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 3
          }
        ],
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
                  (v2/*: any*/),
                  (v1/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionEditSingleCollectionQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionEditSingleCollectionQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionEditSingleCollectionQuery",
    "id": null,
    "text": "query CollectionEditSingleCollectionQuery(\n  $collectionId: ID\n) {\n  singleCollection(collectionId: $collectionId) {\n    id\n    name\n    description\n    seoTitle\n    seoDescription\n    slug\n    backgroundImage\n    backgroundImageAlt\n    isPublished\n    publicationDate\n    products(first: 3) {\n      edges {\n        node {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '34cbdfdcaed1e61bcd09fd1608f3c7ae';
module.exports = node;
