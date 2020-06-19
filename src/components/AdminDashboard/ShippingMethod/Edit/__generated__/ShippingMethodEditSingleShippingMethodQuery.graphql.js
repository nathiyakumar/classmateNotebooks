/**
 * @flow
 * @relayHash e344a3f6592bacb94c9dfdbbe9aa47fa
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingMethodTypeEnum = "BOTH" | "PRICE" | "PRODUCT_TYPE_BASED" | "WEIGHT" | "%future added value";
export type ShippingMethodEditSingleShippingMethodQueryVariables = {|
  shippingMethodId: string
|};
export type ShippingMethodEditSingleShippingMethodQueryResponse = {|
  +singleShippingMethod: ?{|
    +name: string,
    +productTypes: any,
    +price: number,
    +type: ?ShippingMethodTypeEnum,
    +shippingZone: {|
      +id: string,
      +name: string,
    |},
    +charges: number,
    +gstInPercent: ?number,
  |}
|};
export type ShippingMethodEditSingleShippingMethodQuery = {|
  variables: ShippingMethodEditSingleShippingMethodQueryVariables,
  response: ShippingMethodEditSingleShippingMethodQueryResponse,
|};
*/


/*
query ShippingMethodEditSingleShippingMethodQuery(
  $shippingMethodId: ID!
) {
  singleShippingMethod(shippingMethodId: $shippingMethodId) {
    name
    productTypes
    price
    type
    shippingZone {
      id
      name
    }
    charges
    gstInPercent
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "shippingMethodId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "shippingMethodId",
    "variableName": "shippingMethodId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "productTypes",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "price",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "shippingZone",
  "storageKey": null,
  "args": null,
  "concreteType": "ShippingZoneType",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v2/*: any*/)
  ]
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "charges",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "gstInPercent",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ShippingMethodEditSingleShippingMethodQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleShippingMethod",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingMethodType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingMethodEditSingleShippingMethodQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleShippingMethod",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingMethodType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ShippingMethodEditSingleShippingMethodQuery",
    "id": null,
    "text": "query ShippingMethodEditSingleShippingMethodQuery(\n  $shippingMethodId: ID!\n) {\n  singleShippingMethod(shippingMethodId: $shippingMethodId) {\n    name\n    productTypes\n    price\n    type\n    shippingZone {\n      id\n      name\n    }\n    charges\n    gstInPercent\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6b8b6037d65f6d065aac8074daa34d12';
module.exports = node;
