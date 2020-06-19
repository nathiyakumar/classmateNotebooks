/**
 * @flow
 * @relayHash 36669d0d466551fa4e4ccbb77a4c49c9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShippingMethodTypeEnum = "BOTH" | "PRICE" | "PRODUCT_TYPE_BASED" | "WEIGHT" | "%future added value";
export type ShippingZonePageGetSingleShippingZoneQueryVariables = {|
  id: string
|};
export type ShippingZonePageGetSingleShippingZoneQueryResponse = {|
  +shippingZone: ?{|
    +name: string,
    +countries: ?$ReadOnlyArray<?{|
      +code: ?string,
      +country: ?string,
    |}>,
    +shippingMethods: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +type: ?ShippingMethodTypeEnum,
    |}>,
  |}
|};
export type ShippingZonePageGetSingleShippingZoneQuery = {|
  variables: ShippingZonePageGetSingleShippingZoneQueryVariables,
  response: ShippingZonePageGetSingleShippingZoneQueryResponse,
|};
*/


/*
query ShippingZonePageGetSingleShippingZoneQuery(
  $id: ID!
) {
  shippingZone(id: $id) {
    name
    countries {
      code
      country
    }
    shippingMethods {
      id
      name
      type
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "kind": "LinkedField",
  "alias": null,
  "name": "countries",
  "storageKey": null,
  "args": null,
  "concreteType": "CountryDisplay",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "code",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "country",
      "args": null,
      "storageKey": null
    }
  ]
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "shippingMethods",
  "storageKey": null,
  "args": null,
  "concreteType": "ShippingMethodType",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ShippingZonePageGetSingleShippingZoneQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "shippingZone",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingZoneType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v5/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingZonePageGetSingleShippingZoneQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "shippingZone",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ShippingZoneType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v5/*: any*/),
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ShippingZonePageGetSingleShippingZoneQuery",
    "id": null,
    "text": "query ShippingZonePageGetSingleShippingZoneQuery(\n  $id: ID!\n) {\n  shippingZone(id: $id) {\n    name\n    countries {\n      code\n      country\n    }\n    shippingMethods {\n      id\n      name\n      type\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '20154d42f0eddec215943b47d14bb715';
module.exports = node;
