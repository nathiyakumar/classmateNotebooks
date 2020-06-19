/**
 * @flow
 * @relayHash 47dba3e0be24b7bad47e174e28a424b8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NavbarQueryVariables = {|
  checkoutId?: ?string
|};
export type NavbarQueryResponse = {|
  +getCheckout: ?{|
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
        +costPrice: ?number,
        +stockQuantity: number,
      |},
    |}>,
  |}
|};
export type NavbarQuery = {|
  variables: NavbarQueryVariables,
  response: NavbarQueryResponse,
|};
*/


/*
query NavbarQuery(
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
        priceOverride
        images {
          url
          id
        }
        costPrice
        stockQuantity
      }
    }
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
  "name": "costPrice",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "stockQuantity",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NavbarQuery",
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
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "images",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductImageType",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/)
                    ]
                  },
                  (v8/*: any*/),
                  (v9/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NavbarQuery",
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
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "images",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ProductImageType",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      (v2/*: any*/)
                    ]
                  },
                  (v8/*: any*/),
                  (v9/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NavbarQuery",
    "id": null,
    "text": "query NavbarQuery(\n  $checkoutId: ID\n) {\n  getCheckout(checkoutId: $checkoutId) {\n    id\n    lines {\n      id\n      quantity\n      variant {\n        id\n        sku\n        name\n        priceOverride\n        images {\n          url\n          id\n        }\n        costPrice\n        stockQuantity\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '90ff98e50b8a0c3f868bd27cc279477b';
module.exports = node;
