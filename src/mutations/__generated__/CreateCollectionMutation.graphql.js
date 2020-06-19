/**
 * @flow
 * @relayHash 8c63645ee49e489f5b16d22b00345b64
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
export type CreateCollectionMutationVariables = {|
  input: CollectionInput
|};
export type CreateCollectionMutationResponse = {|
  +createCollection: ?{|
    +collection: ?{|
      +id: string,
      +name: string,
    |}
  |}
|};
export type CreateCollectionMutation = {|
  variables: CreateCollectionMutationVariables,
  response: CreateCollectionMutationResponse,
|};
*/


/*
mutation CreateCollectionMutation(
  $input: CollectionInput!
) {
  createCollection(input: $input) {
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
    "name": "input",
    "type": "CollectionInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createCollection",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateCollection",
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
    "name": "CreateCollectionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCollectionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateCollectionMutation",
    "id": null,
    "text": "mutation CreateCollectionMutation(\n  $input: CollectionInput!\n) {\n  createCollection(input: $input) {\n    collection {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4bb0cc06067cd07eb8fa4ac29d2d8028';
module.exports = node;
