/**
 * @flow
 * @relayHash e4bb1c260b9509e4dfa9f128dd1db28c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateAddImagesToCartCustomiserMutationVariables = {|
  userDesignId: string,
  checkoutId: string,
  inputDictionary: any,
  specification: any,
|};
export type CreateAddImagesToCartCustomiserMutationResponse = {|
  +customizerData: ?{|
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
export type CreateAddImagesToCartCustomiserMutation = {|
  variables: CreateAddImagesToCartCustomiserMutationVariables,
  response: CreateAddImagesToCartCustomiserMutationResponse,
|};
*/


/*
mutation CreateAddImagesToCartCustomiserMutation(
  $userDesignId: String!
  $checkoutId: String!
  $inputDictionary: JSONString!
  $specification: JSONString!
) {
  customizerData(userDesignId: $userDesignId, checkoutId: $checkoutId, inputDictionary: $inputDictionary, specification: $specification) {
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
    "name": "userDesignId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "checkoutId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "inputDictionary",
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
    "name": "inputDictionary",
    "variableName": "inputDictionary"
  },
  {
    "kind": "Variable",
    "name": "specification",
    "variableName": "specification"
  },
  {
    "kind": "Variable",
    "name": "userDesignId",
    "variableName": "userDesignId"
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
    "name": "CreateAddImagesToCartCustomiserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customizerData",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CustomizerData",
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
    "name": "CreateAddImagesToCartCustomiserMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customizerData",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CustomizerData",
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
    "name": "CreateAddImagesToCartCustomiserMutation",
    "id": null,
    "text": "mutation CreateAddImagesToCartCustomiserMutation(\n  $userDesignId: String!\n  $checkoutId: String!\n  $inputDictionary: JSONString!\n  $specification: JSONString!\n) {\n  customizerData(userDesignId: $userDesignId, checkoutId: $checkoutId, inputDictionary: $inputDictionary, specification: $specification) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          id\n          sku\n          name\n          priceOverride\n          images {\n            url\n            id\n          }\n          stockQuantity\n          product {\n            productType {\n              name\n              id\n            }\n            id\n          }\n        }\n      }\n      subtotalPrice\n      totalPrice\n      checkoutQuantity\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cd3e9228d7809861e07d22b8accffefc';
module.exports = node;
