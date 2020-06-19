/**
 * @flow
 * @relayHash 00d08197b355d5fc73fc4a3a22a4256d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type shoppingCartQueryVariables = {|
  checkoutId?: ?string
|};
export type shoppingCartQueryResponse = {|
  +getCheckout: ?{|
    +id: string,
    +lines: ?$ReadOnlyArray<?{|
      +id: string,
      +quantity: number,
      +variant: ?{|
        +id: string,
        +sku: string,
        +name: string,
        +price: ?number,
        +costPrice: ?number,
        +priceOverride: ?number,
        +images: ?$ReadOnlyArray<?{|
          +url: string
        |}>,
        +stockQuantity: number,
        +product: {|
          +productType: {|
            +name: string
          |},
          +category: ?{|
            +id: string,
            +name: string,
          |},
        |},
      |},
    |}>,
    +shippingPrice: ?number,
    +subtotalPrice: ?number,
    +totalPrice: ?number,
    +checkoutQuantity: ?number,
    +voucherCode: ?string,
    +discountName: ?string,
    +discountAmount: ?number,
  |}
|};
export type shoppingCartQuery = {|
  variables: shoppingCartQueryVariables,
  response: shoppingCartQueryResponse,
|};
*/


/*
query shoppingCartQuery(
  $checkoutId: ID
) {
  getCheckout(checkoutId: $checkoutId) {
    id
    lines {
      id
      quantity
      variant {
        id
        sku
        name
        price
        costPrice
        priceOverride
        images {
          url
          id
        }
        stockQuantity
        product {
          productType {
            name
            id
          }
          category {
            id
            name
          }
          id
        }
      }
    }
    shippingPrice
    subtotalPrice
    totalPrice
    checkoutQuantity
    voucherCode
    discountName
    discountAmount
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "checkoutId",
    "type": "ID",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "checkoutId",
    "variableName": "checkoutId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sku",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "costPrice",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "priceOverride",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v5/*: any*/)
  ]
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingPrice",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "subtotalPrice",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalPrice",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "checkoutQuantity",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "voucherCode",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountName",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountAmount",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "shoppingCartQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getCheckout",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutLineType",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "variant",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductVariantType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "images",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "VariantImageType",
                    "plural": true,
                    "selections": [
                      (v9/*: any*/)
                    ]
                  },
                  (v10/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "product",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductsType",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "productType",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ProducttypeType",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/)
                        ]
                      },
                      (v11/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "shoppingCartQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "getCheckout",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lines",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutLineType",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "variant",
                "storageKey": null,
                "args": null,
                "concreteType": "ProductVariantType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "images",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "VariantImageType",
                    "plural": true,
                    "selections": [
                      (v9/*: any*/),
                      (v2/*: any*/)
                    ]
                  },
                  (v10/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "product",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductsType",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "productType",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ProducttypeType",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v2/*: any*/)
                        ]
                      },
                      (v11/*: any*/),
                      (v2/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "shoppingCartQuery",
    "id": null,
    "text": "query shoppingCartQuery(\n  $checkoutId: ID\n) {\n  getCheckout(checkoutId: $checkoutId) {\n    id\n    lines {\n      id\n      quantity\n      variant {\n        id\n        sku\n        name\n        price\n        costPrice\n        priceOverride\n        images {\n          url\n          id\n        }\n        stockQuantity\n        product {\n          productType {\n            name\n            id\n          }\n          category {\n            id\n            name\n          }\n          id\n        }\n      }\n    }\n    shippingPrice\n    subtotalPrice\n    totalPrice\n    checkoutQuantity\n    voucherCode\n    discountName\n    discountAmount\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c39cf598b54c14844b992b7c23a2b72c';
module.exports = node;
