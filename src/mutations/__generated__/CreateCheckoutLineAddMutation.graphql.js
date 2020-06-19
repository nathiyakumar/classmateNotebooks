/**
 * @flow
 * @relayHash 9015a75088504fec22ac32ef100c2ddc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CheckoutLineInput = {|
  quantity: number,
  variantId?: ?string,
|};
export type CreateCheckoutLineAddMutationVariables = {|
  checkoutId: string,
  lines?: ?$ReadOnlyArray<?CheckoutLineInput>,
|};
export type CreateCheckoutLineAddMutationResponse = {|
  +checkoutLineAdd: ?{|
    +checkout: ?{|
      +id: string,
      +lines: ?$ReadOnlyArray<?{|
        +id: string,
        +quantity: number,
        +variant: ?{|
          +id: string,
          +sku: string,
          +name: string,
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
    |}
  |}
|};
export type CreateCheckoutLineAddMutation = {|
  variables: CreateCheckoutLineAddMutationVariables,
  response: CreateCheckoutLineAddMutationResponse,
|};
*/


/*
mutation CreateCheckoutLineAddMutation(
  $checkoutId: ID!
  $lines: [CheckoutLineInput]
) {
  checkoutLineAdd(checkoutId: $checkoutId, lines: $lines) {
    checkout {
      id
      lines {
        id
        quantity
        variant {
          id
          sku
          name
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
  "name": "priceOverride",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "subtotalPrice",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalPrice",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "checkoutQuantity",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCheckoutLineAddMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutLineAdd",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutLineAdd",
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
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/)
                        ]
                      },
                      (v8/*: any*/),
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
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutLineAddMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutLineAdd",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutLineAdd",
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
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VariantImageType",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          (v2/*: any*/)
                        ]
                      },
                      (v8/*: any*/),
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
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutLineAddMutation",
    "id": null,
    "text": "mutation CreateCheckoutLineAddMutation(\n  $checkoutId: ID!\n  $lines: [CheckoutLineInput]\n) {\n  checkoutLineAdd(checkoutId: $checkoutId, lines: $lines) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          sku\n          name\n          priceOverride\n          images {\n            url\n            id\n          }\n          stockQuantity\n          product {\n            productType {\n              name\n              id\n            }\n            id\n          }\n        }\n      }\n      subtotalPrice\n      totalPrice\n      checkoutQuantity\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b40ed5c6dbee9ad40234058ce5c4fa9f';
module.exports = node;
