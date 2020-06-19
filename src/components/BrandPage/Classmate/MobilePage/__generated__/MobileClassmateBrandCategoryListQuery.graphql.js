/**
 * @flow
 * @relayHash a9efcddb87c324b6efdfc5606efb1ae3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MobileClassmateBrandCategoryListQueryVariables = {||};
export type MobileClassmateBrandCategoryListQueryResponse = {|
  +catalogueCategoryList: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +subCategories: ?$ReadOnlyArray<?{|
      +id: ?string,
      +name: ?string,
    |}>,
  |}>
|};
export type MobileClassmateBrandCategoryListQuery = {|
  variables: MobileClassmateBrandCategoryListQueryVariables,
  response: MobileClassmateBrandCategoryListQueryResponse,
|};
*/


/*
query MobileClassmateBrandCategoryListQuery {
  catalogueCategoryList {
    id
    name
    subCategories {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "catalogueCategoryList",
    "storageKey": null,
    "args": null,
    "concreteType": "CatalogueCategory",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "subCategories",
        "storageKey": null,
        "args": null,
        "concreteType": "CatalogueSubCategory",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MobileClassmateBrandCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MobileClassmateBrandCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MobileClassmateBrandCategoryListQuery",
    "id": null,
    "text": "query MobileClassmateBrandCategoryListQuery {\n  catalogueCategoryList {\n    id\n    name\n    subCategories {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'feee9e3b49d2aed3a66e338e9a7b9a36';
module.exports = node;
