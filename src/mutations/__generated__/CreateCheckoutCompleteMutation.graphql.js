/**
 * @flow
 * @relayHash 511eeeb658d6c5d5023a5a65cfb5e45b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateCheckoutCompleteMutationVariables = {|
  checkoutId: string,
  gateway: string,
|};
export type CreateCheckoutCompleteMutationResponse = {|
  +checkoutComplete: ?{|
    +order: ?{|
      +id: string,
      +created: any,
      +total: ?number,
      +userEmail: ?string,
      +orderId: ?string,
      +shippingPrice: number,
      +shippingAddress: ?{|
        +firstName: string,
        +phone: string,
      |},
      +lines: ?{|
        +edges: $ReadOnlyArray<?{|
          +node: ?{|
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
          |}
        |}>
      |},
      +user: ?{|
        +email: string,
        +mobileNumber: string,
        +firstName: string,
      |},
    |},
    +payment: ?{|
      +id: string,
      +total: ?number,
      +paymentOrderId: ?string,
    |},
  |}
|};
export type CreateCheckoutCompleteMutation = {|
  variables: CreateCheckoutCompleteMutationVariables,
  response: CreateCheckoutCompleteMutationResponse,
|};
*/


/*
mutation CreateCheckoutCompleteMutation(
  $checkoutId: ID!
  $gateway: String!
) {
  checkoutComplete(checkoutId: $checkoutId, gateway: $gateway) {
    order {
      id
      created
      total
      userEmail
      orderId
      shippingPrice
      shippingAddress {
        firstName
        phone
        id
      }
      lines(first: 100) {
        edges {
          node {
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
        }
      }
      user {
        email
        mobileNumber
        firstName
        id
      }
    }
    payment {
      id
      total
      paymentOrderId
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
    "name": "gateway",
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
    "name": "gateway",
    "variableName": "gateway"
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
  "name": "created",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "total",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "userEmail",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "orderId",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingPrice",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "quantity",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sku",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "costPrice",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "priceOverride",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "category",
  "storageKey": null,
  "args": null,
  "concreteType": "CategoryType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v13/*: any*/)
  ]
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mobileNumber",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "payment",
  "storageKey": null,
  "args": null,
  "concreteType": "PaymentType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "paymentOrderId",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCheckoutCompleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutComplete",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutComplete",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "order",
            "storageKey": null,
            "args": null,
            "concreteType": "OrdersType",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "shippingAddress",
                "storageKey": null,
                "args": null,
                "concreteType": "Address",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": "lines(first:100)",
                "args": (v10/*: any*/),
                "concreteType": "OrderLineTypeConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineTypeEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "OrderLineType",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v11/*: any*/),
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
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "images",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "VariantImageType",
                                "plural": true,
                                "selections": [
                                  (v17/*: any*/)
                                ]
                              },
                              (v18/*: any*/),
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
                                      (v13/*: any*/)
                                    ]
                                  },
                                  (v19/*: any*/)
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "UserType",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v8/*: any*/)
                ]
              }
            ]
          },
          (v22/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCheckoutCompleteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "checkoutComplete",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CheckoutComplete",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "order",
            "storageKey": null,
            "args": null,
            "concreteType": "OrdersType",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "shippingAddress",
                "storageKey": null,
                "args": null,
                "concreteType": "Address",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lines",
                "storageKey": "lines(first:100)",
                "args": (v10/*: any*/),
                "concreteType": "OrderLineTypeConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineTypeEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "OrderLineType",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v11/*: any*/),
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
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "images",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "VariantImageType",
                                "plural": true,
                                "selections": [
                                  (v17/*: any*/),
                                  (v2/*: any*/)
                                ]
                              },
                              (v18/*: any*/),
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
                                      (v13/*: any*/),
                                      (v2/*: any*/)
                                    ]
                                  },
                                  (v19/*: any*/),
                                  (v2/*: any*/)
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "UserType",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v8/*: any*/),
                  (v2/*: any*/)
                ]
              }
            ]
          },
          (v22/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCheckoutCompleteMutation",
    "id": null,
    "text": "mutation CreateCheckoutCompleteMutation(\n  $checkoutId: ID!\n  $gateway: String!\n) {\n  checkoutComplete(checkoutId: $checkoutId, gateway: $gateway) {\n    order {\n      id\n      created\n      total\n      userEmail\n      orderId\n      shippingPrice\n      shippingAddress {\n        firstName\n        phone\n        id\n      }\n      lines(first: 100) {\n        edges {\n          node {\n            id\n            quantity\n            variant {\n              id\n              sku\n              name\n              price\n              costPrice\n              priceOverride\n              images {\n                url\n                id\n              }\n              stockQuantity\n              product {\n                productType {\n                  name\n                  id\n                }\n                category {\n                  id\n                  name\n                }\n                id\n              }\n            }\n          }\n        }\n      }\n      user {\n        email\n        mobileNumber\n        firstName\n        id\n      }\n    }\n    payment {\n      id\n      total\n      paymentOrderId\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '731b287c88fa606025eb60266f6d83e7';
module.exports = node;
