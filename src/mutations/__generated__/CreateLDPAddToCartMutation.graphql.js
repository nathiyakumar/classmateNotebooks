/**
 * @flow
 * @relayHash 0af920bc9308b2e8ab08219f659123be
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateLDPAddToCartMutationVariables = {|
  checkoutId: string,
  licensedDesignBookIds: any,
  specification: any,
|};
export type CreateLDPAddToCartMutationResponse = {|
  +licensedDesignUserData: ?{|
    +checkout: ?{|
      +id: string,
      +lines: ?$ReadOnlyArray<?{|
        +id: string,
        +quantity: number,
        +variant: ?{|
          +id: string,
          +sku: string,
          +name: string,
          +costPrice: ?number,
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
      +subtotalPrice: ?number,
      +totalPrice: ?number,
      +checkoutQuantity: ?number,
    |}
  |}
|};
export type CreateLDPAddToCartMutation = {|
  variables: CreateLDPAddToCartMutationVariables,
  response: CreateLDPAddToCartMutationResponse,
|};
*/


/*
mutation CreateLDPAddToCartMutation(
  $checkoutId: String!
  $licensedDesignBookIds: JSONString!
  $specification: JSONString!
) {
  licensedDesignUserData(checkoutId: $checkoutId, licensedDesignBookIds: $licensedDesignBookIds, specification: $specification) {
    checkout {
      id
      lines {
        id
        quantity
        variant {
          id
          sku
          name
          costPrice
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
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "licensedDesignBookIds",
    "type": "JSONString!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "specification",
    "type": "JSONString!",
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
    "name": "licensedDesignBookIds",
    "variableName": "licensedDesignBookIds"
  },
  {
    "kind": "Variable",
    "name": "specification",
    "variableName": "specification"
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
  "name": "costPrice",
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateLDPAddToCartMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "licensedDesignUserData",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "LicensedDesignUserData",
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
                          },
                          (v9/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateLDPAddToCartMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "licensedDesignUserData",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "LicensedDesignUserData",
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
                          (v9/*: any*/),
                          (v2/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateLDPAddToCartMutation",
    "id": null,
    "text": "mutation CreateLDPAddToCartMutation(\n  $checkoutId: String!\n  $licensedDesignBookIds: JSONString!\n  $specification: JSONString!\n) {\n  licensedDesignUserData(checkoutId: $checkoutId, licensedDesignBookIds: $licensedDesignBookIds, specification: $specification) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          sku\n          name\n          costPrice\n          images {\n            url\n            id\n          }\n          stockQuantity\n          product {\n            productType {\n              name\n              id\n            }\n            category {\n              id\n              name\n            }\n            id\n          }\n        }\n      }\n      subtotalPrice\n      totalPrice\n      checkoutQuantity\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '71e97694667ef89a0f3d741974068905';
module.exports = node;
