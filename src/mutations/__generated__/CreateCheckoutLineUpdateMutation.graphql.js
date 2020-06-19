/**
 * @flow
 * @relayHash 8d49d303c6be6a26a996a1c4c047c64e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutLineInput = {|
  quantity: number,
  variantId?: ?string,
|};
export type CreateCheckoutLineUpdateMutationVariables = {|
  checkoutId: string,
  lines?: ?$ReadOnlyArray<?CheckoutLineInput>,
|};
export type CreateCheckoutLineUpdateMutationResponse = {|
  +checkoutLineUpdate: ?{|
    +checkout: ?{|
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
            |}
          |},
        |},
      |}>,
      +subtotalPrice: ?number,
      +totalPrice: ?number,
      +checkoutQuantity: ?number,
      +voucherCode: ?string,
      +shippingPrice: ?number,
      +discountName: ?string,
      +discountAmount: ?number,
    |}
  |}
|};
export type CreateCheckoutLineUpdateMutation = {|
  variables: CreateCheckoutLineUpdateMutationVariables,
  response: CreateCheckoutLineUpdateMutationResponse,
|};
*/


/*
mutation CreateCheckoutLineUpdateMutation(
  $checkoutId: ID!
  $lines: [CheckoutLineInput]
) {
  checkoutLineUpdate(checkoutId: $checkoutId, lines: $lines) {
    checkout {
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
            id
          }
        }
      }
      subtotalPrice
      totalPrice
      checkoutQuantity
      voucherCode
      shippingPrice
      discountName
      discountAmount
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
    "name": "lines",
    "type": "[CheckoutLineInput]",
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
    "name": "lines",
    "variableName": "lines"
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
  "kind": "ScalarField",
  "alias": null,
  "name": "subtotalPrice",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalPrice",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "checkoutQuantity",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "voucherCode",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingPrice",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountName",
  "args": null,
  "storageKey": null
},
v17 = {
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
    "name": "CreateCheckoutLineUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutLineUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutLineUpdate",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
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
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutLineUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutLineUpdate",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutLineUpdate",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "checkout",
            "storageKey": null,
            "args": null,
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
                          (v2/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutLineUpdateMutation",
    "id": null,
    "text": "mutation CreateCheckoutLineUpdateMutation(\n  $checkoutId: ID!\n  $lines: [CheckoutLineInput]\n) {\n  checkoutLineUpdate(checkoutId: $checkoutId, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          sku\n          name\n          price\n          costPrice\n          priceOverride\n          images {\n            url\n            id\n          }\n          stockQuantity\n          product {\n            productType {\n              name\n              id\n            }\n            id\n          }\n        }\n      }\n      subtotalPrice\n      totalPrice\n      checkoutQuantity\n      voucherCode\n      shippingPrice\n      discountName\n      discountAmount\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fcf91bcb9537e595bf242942ac3afc38';
module.exports = node;
