/**
 * @flow
 * @relayHash e994340317cafa01efb11075c49530bb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateCheckoutAddPromocodeMutationVariables = {|
  checkoutId: string,
  promocode: string,
|};
export type CreateCheckoutAddPromocodeMutationResponse = {|
  +checkoutAddPromocode: ?{|
    +message: ?string,
    +checkout: ?{|
      +voucherCode: ?string,
      +discountAmount: ?number,
      +subtotalPrice: ?number,
      +totalPrice: ?number,
      +isShippingRequired: boolean,
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
      +checkoutQuantity: ?number,
      +shippingPrice: ?number,
      +discountName: ?string,
    |},
  |}
|};
export type CreateCheckoutAddPromocodeMutation = {|
  variables: CreateCheckoutAddPromocodeMutationVariables,
  response: CreateCheckoutAddPromocodeMutationResponse,
|};
*/


/*
mutation CreateCheckoutAddPromocodeMutation(
  $checkoutId: ID!
  $promocode: String!
) {
  checkoutAddPromocode(checkoutId: $checkoutId, promocode: $promocode) {
    message
    checkout {
      voucherCode
      discountAmount
      subtotalPrice
      totalPrice
      isShippingRequired
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
      checkoutQuantity
      shippingPrice
      discountName
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "checkoutId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "promocode",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "checkoutId",
    "variableName": "checkoutId"
  },
  {
    "kind": "Variable",
    "name": "promocode",
    "variableName": "promocode"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "voucherCode",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountAmount",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "subtotalPrice",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalPrice",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isShippingRequired",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sku",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "costPrice",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "priceOverride",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": [
    (v8/*: any*/),
    (v11/*: any*/)
  ]
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "checkoutQuantity",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingPrice",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountName",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCheckoutAddPromocodeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutAddPromocode",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutAddPromoCode",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": null,
                "args": null,
                "concreteType": "CheckoutLineType",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "variant",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductVariantType",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": [
                          (v15/*: any*/)
                        ]
                      },
                      (v16/*: any*/),
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
                              (v11/*: any*/)
                            ]
                          },
                          (v17/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutAddPromocodeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutAddPromocode",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutAddPromoCode",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
            "concreteType": "CheckoutType",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": null,
                "args": null,
                "concreteType": "CheckoutLineType",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "variant",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductVariantType",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": [
                          (v15/*: any*/),
                          (v8/*: any*/)
                        ]
                      },
                      (v16/*: any*/),
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
                              (v11/*: any*/),
                              (v8/*: any*/)
                            ]
                          },
                          (v17/*: any*/),
                          (v8/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutAddPromocodeMutation",
    "id": null,
    "text": "mutation CreateCheckoutAddPromocodeMutation(\n  $checkoutId: ID!\n  $promocode: String!\n) {\n  checkoutAddPromocode(checkoutId: $checkoutId, promocode: $promocode) {\n    message\n    checkout {\n      voucherCode\n      discountAmount\n      subtotalPrice\n      totalPrice\n      isShippingRequired\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          sku\n          name\n          price\n          costPrice\n          priceOverride\n          images {\n            url\n            id\n          }\n          stockQuantity\n          product {\n            productType {\n              name\n              id\n            }\n            category {\n              id\n              name\n            }\n            id\n          }\n        }\n      }\n      checkoutQuantity\n      shippingPrice\n      discountName\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fdf3b95ef30ffe419e583cc334804510';
module.exports = node;
