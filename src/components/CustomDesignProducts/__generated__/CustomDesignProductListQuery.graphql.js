/**
 * @flow
 * @relayHash 3da5f19e84e89890c5c676f74de92e04
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomDesignProductListQueryVariables = {|
  isAvailable?: ?boolean
|};
export type CustomDesignProductListQueryResponse = {|
  +licensedDesignBooks: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +isAvailable: boolean,
    +thumbnailUrl: ?string,
    +category: {|
      +id: string,
      +name: string,
    |},
  |}>
|};
export type CustomDesignProductListQuery = {|
  variables: CustomDesignProductListQueryVariables,
  response: CustomDesignProductListQueryResponse,
|};
*/


/*
query CustomDesignProductListQuery(
  $isAvailable: Boolean
) {
  licensedDesignBooks(isAvailable: $isAvailable) {
    id
    name
    isAvailable
    thumbnailUrl
    category {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "isAvailable",
    "type": "Boolean",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "licensedDesignBooks",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "isAvailable",
        "variableName": "isAvailable"
      }
    ],
    "concreteType": "LicensedDesignBooksType",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isAvailable",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "thumbnailUrl",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "category",
        "storageKey": null,
        "args": null,
        "concreteType": "LicensedDesignBooksCategoryType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CustomDesignProductListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomDesignProductListQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CustomDesignProductListQuery",
    "id": null,
    "text": "query CustomDesignProductListQuery(\n  $isAvailable: Boolean\n) {\n  licensedDesignBooks(isAvailable: $isAvailable) {\n    id\n    name\n    isAvailable\n    thumbnailUrl\n    category {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c08fd53de0b48daa1d7b00546d8e819c';
module.exports = node;
