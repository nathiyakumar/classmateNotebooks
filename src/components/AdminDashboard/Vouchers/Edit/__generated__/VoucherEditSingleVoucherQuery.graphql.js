/**
 * @flow
 * @relayHash 1c9e97bd50dd5c678d42622c88734bb1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VoucherEditSingleVoucherQueryVariables = {|
  voucherId: string
|};
export type VoucherEditSingleVoucherQueryResponse = {|
  +singleVoucher: ?{|
    +id: string,
    +name: ?string,
    +code: string,
    +usageLimit: ?number,
    +startDate: any,
    +endDate: ?any,
    +discountValueType: ?string,
    +applyOncePerOrder: boolean,
    +discountValue: number,
    +minAmountSpent: number,
    +maxDiscountValue: number,
    +type: ?string,
    +isActive: boolean,
    +products: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
    +categories: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
    +collections: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
  |}
|};
export type VoucherEditSingleVoucherQuery = {|
  variables: VoucherEditSingleVoucherQueryVariables,
  response: VoucherEditSingleVoucherQueryResponse,
|};
*/


/*
query VoucherEditSingleVoucherQuery(
  $voucherId: ID!
) {
  singleVoucher(voucherId: $voucherId) {
    id
    name
    code
    usageLimit
    startDate
    endDate
    discountValueType
    applyOncePerOrder
    discountValue
    minAmountSpent
    maxDiscountValue
    type
    isActive
    products(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
    categories(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
    collections(first: 10) {
      edges {
        node {
          id
          name
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
    "name": "voucherId",
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
  (v1/*: any*/),
  (v2/*: any*/)
],
v5 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "singleVoucher",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "voucherId",
        "variableName": "voucherId"
      }
    ],
    "concreteType": "VouchersType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "code",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "usageLimit",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "startDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "endDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "discountValueType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "applyOncePerOrder",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "discountValue",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "minAmountSpent",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "maxDiscountValue",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "type",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isActive",
        "args": null,
        "storageKey": null
      },
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
                "selections": (v4/*: any*/)
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "categories",
        "storageKey": "categories(first:10)",
        "args": (v3/*: any*/),
        "concreteType": "CategoryTypeConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "CategoryTypeEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "CategoryType",
                "plural": false,
                "selections": (v4/*: any*/)
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "collections",
        "storageKey": "collections(first:10)",
        "args": (v3/*: any*/),
        "concreteType": "CollectionTypeConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "CollectionTypeEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "CollectionType",
                "plural": false,
                "selections": (v4/*: any*/)
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
    "name": "VoucherEditSingleVoucherQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "VoucherEditSingleVoucherQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "VoucherEditSingleVoucherQuery",
    "id": null,
    "text": "query VoucherEditSingleVoucherQuery(\n  $voucherId: ID!\n) {\n  singleVoucher(voucherId: $voucherId) {\n    id\n    name\n    code\n    usageLimit\n    startDate\n    endDate\n    discountValueType\n    applyOncePerOrder\n    discountValue\n    minAmountSpent\n    maxDiscountValue\n    type\n    isActive\n    products(first: 10) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    categories(first: 10) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    collections(first: 10) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cb95998880357baa0439b11d6ca9373f';
module.exports = node;
