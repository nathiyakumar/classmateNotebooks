/**
 * @flow
 * @relayHash 661249fdce31818897cca3d28844da43
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateCheckoutLineDeleteMutationVariables = {|
  checkoutId: string,
  lines?: ?$ReadOnlyArray<?string>,
|};
export type CreateCheckoutLineDeleteMutationResponse = {|
  +checkoutLineDelete: ?{|
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
export type CreateCheckoutLineDeleteMutation = {|
  variables: CreateCheckoutLineDeleteMutationVariables,
  response: CreateCheckoutLineDeleteMutationResponse,
|};
*/


/*
mutation CreateCheckoutLineDeleteMutation(
  $checkoutId: ID!
  $lines: [ID]
) {
  checkoutLineDelete(checkoutId: $checkoutId, lines: $lines) {
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
    "type": "[ID]",
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
  "name": "priceOverride",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "subtotalPrice",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalPrice",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "checkoutQuantity",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "voucherCode",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingPrice",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "discountName",
  "args": null,
  "storageKey": null
},
v16 = {
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
    "name": "CreateCheckoutLineDeleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutLineDelete",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutLineDelete",
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
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/)
                        ]
                      },
                      (v9/*: any*/),
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
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutLineDeleteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutLineDelete",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutLineDelete",
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
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/),
                          (v2/*: any*/)
                        ]
                      },
                      (v9/*: any*/),
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
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutLineDeleteMutation",
    "id": null,
    "text": "mutation CreateCheckoutLineDeleteMutation(\n  $checkoutId: ID!\n  $lines: [ID]\n) {\n  checkoutLineDelete(checkoutId: $checkoutId, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          sku\n          name\n          price\n          priceOverride\n          images {\n            url\n            id\n          }\n          stockQuantity\n          product {\n            productType {\n              name\n              id\n            }\n            id\n          }\n        }\n      }\n      subtotalPrice\n      totalPrice\n      checkoutQuantity\n      voucherCode\n      shippingPrice\n      discountName\n      discountAmount\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5a138d274948a83daa53160fa6b8b8e0';
module.exports = node;
