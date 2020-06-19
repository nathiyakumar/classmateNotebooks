/**
 * @flow
 * @relayHash 22b3bdf6bdcb915f52fd8fcd7dc6a1e7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductTypeTaxType = "FIXED" | "PERCENTAGE" | "%future added value";
export type ProductTypeEditQueryVariables = {|
  singleProductTypeId: string
|};
export type ProductTypeEditQueryResponse = {|
  +singleProductType: ?{|
    +id: string,
    +name: string,
    +weight: number,
    +taxType: ProductTypeTaxType,
    +taxRate: ?string,
    +isDigital: boolean,
    +isCustomizable: boolean,
    +isShippingRequired: boolean,
    +hasVariants: boolean,
    +productAttributes: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +slug: string,
        |}
      |}>
    |},
    +variantAttributes: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
          +slug: string,
        |}
      |}>
    |},
  |}
|};
export type ProductTypeEditQuery = {|
  variables: ProductTypeEditQueryVariables,
  response: ProductTypeEditQueryResponse,
|};
*/


/*
query ProductTypeEditQuery(
  $singleProductTypeId: ID!
) {
  singleProductType(singleProductTypeId: $singleProductTypeId) {
    id
    name
    weight
    taxType
    taxRate
    isDigital
    isCustomizable
    isShippingRequired
    hasVariants
    productAttributes(first: 10) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    variantAttributes(first: 10) {
      edges {
        node {
          id
          name
          slug
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
    "name": "singleProductTypeId",
    "type": "ID!",
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
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v4 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "AttributesTypeEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "AttributesType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
],
v5 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "singleProductType",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "singleProductTypeId",
        "variableName": "singleProductTypeId"
      }
    ],
    "concreteType": "ProducttypeType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "weight",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "taxType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "taxRate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isDigital",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isCustomizable",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isShippingRequired",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "hasVariants",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "productAttributes",
        "storageKey": "productAttributes(first:10)",
        "args": (v3/*: any*/),
        "concreteType": "AttributesTypeConnection",
        "plural": false,
        "selections": (v4/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "variantAttributes",
        "storageKey": "variantAttributes(first:10)",
        "args": (v3/*: any*/),
        "concreteType": "AttributesTypeConnection",
        "plural": false,
        "selections": (v4/*: any*/)
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProductTypeEditQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductTypeEditQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ProductTypeEditQuery",
    "id": null,
    "text": "query ProductTypeEditQuery(\n  $singleProductTypeId: ID!\n) {\n  singleProductType(singleProductTypeId: $singleProductTypeId) {\n    id\n    name\n    weight\n    taxType\n    taxRate\n    isDigital\n    isCustomizable\n    isShippingRequired\n    hasVariants\n    productAttributes(first: 10) {\n      edges {\n        node {\n          id\n          name\n          slug\n        }\n      }\n    }\n    variantAttributes(first: 10) {\n      edges {\n        node {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7528c3bf5236bfaf2aca8469885c1ddd';
module.exports = node;
