/**
 * @flow
 * @relayHash 21e2531a5694c552e0dd8aae02f6ebf0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CollectionInput = {|
  name: string,
  slug?: ?string,
  publicationDate?: ?string,
  isPublished?: ?boolean,
  products?: ?$ReadOnlyArray<?string>,
  backgroundImage?: ?any,
  backgroundImageAlt?: ?string,
  description?: ?string,
  descriptionJson?: ?any,
  seoTitle?: ?string,
  seoDescription?: ?string,
|};
export type UpdateCollectionMutationVariables = {|
  collectionId: string,
  input: CollectionInput,
|};
export type UpdateCollectionMutationResponse = {|
  +updateCollection: ?{|
    +collection: ?{|
      +id: string,
      +name: string,
    |}
  |}
|};
export type UpdateCollectionMutation = {|
  variables: UpdateCollectionMutationVariables,
  response: UpdateCollectionMutationResponse,
|};
*/


/*
mutation UpdateCollectionMutation(
  $collectionId: ID!
  $input: CollectionInput!
) {
  updateCollection(collectionId: $collectionId, input: $input) {
    collection {
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
    "name": "collectionId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CollectionInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateCollection",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "collectionId",
        "variableName": "collectionId"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateCollection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "collection",
        "storageKey": null,
        "args": null,
        "concreteType": "CollectionType",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UpdateCollectionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateCollectionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateCollectionMutation",
    "id": null,
    "text": "mutation UpdateCollectionMutation(\n  $collectionId: ID!\n  $input: CollectionInput!\n) {\n  updateCollection(collectionId: $collectionId, input: $input) {\n    collection {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '74d4fffb2826eb75d35e277f21fce2a5';
module.exports = node;
