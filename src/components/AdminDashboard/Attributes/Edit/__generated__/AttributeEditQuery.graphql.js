/**
 * @flow
 * @relayHash f8bb97afbc665dc2dfc0be090e15c569
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AttributeEditQueryVariables = {|
  attributeId: string
|};
export type AttributeEditQueryResponse = {|
  +singleAttribute: ?{|
    +name: string,
    +slug: string,
    +values: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +name: string,
        |}
      |}>
    |},
  |}
|};
export type AttributeEditQuery = {|
  variables: AttributeEditQueryVariables,
  response: AttributeEditQueryResponse,
|};
*/


/*
query AttributeEditQuery(
  $attributeId: ID!
) {
  singleAttribute(attributeId: $attributeId) {
    name
    slug
    values(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "attributeId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "attributeId",
    "variableName": "attributeId"
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
  "name": "slug",
  "args": null,
  "storageKey": null
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
  "name": "values",
  "storageKey": "values(first:100)",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 100
    }
  ],
  "concreteType": "AttributeValueTypeConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "AttributeValueTypeEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "AttributeValueType",
          "plural": false,
          "selections": [
            (v4/*: any*/),
            (v2/*: any*/)
          ]
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AttributeEditQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleAttribute",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "AttributesType",
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
    "name": "AttributeEditQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "singleAttribute",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "AttributesType",
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
    "name": "AttributeEditQuery",
    "id": null,
    "text": "query AttributeEditQuery(\n  $attributeId: ID!\n) {\n  singleAttribute(attributeId: $attributeId) {\n    name\n    slug\n    values(first: 100) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8d1aef0e016da3be85fc862c9ee527e6';
module.exports = node;
