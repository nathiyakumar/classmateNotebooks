/**
 * @flow
 * @relayHash 3381fe5d9207d1a2b317859c871b9a10
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ClassmateBrandListCategoryListQueryVariables = {||};
export type ClassmateBrandListCategoryListQueryResponse = {|
  +catalogueCategoryList: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +subCategories: ?$ReadOnlyArray<?{|
      +id: ?string,
      +name: ?string,
    |}>,
  |}>
|};
export type ClassmateBrandListCategoryListQuery = {|
  variables: ClassmateBrandListCategoryListQueryVariables,
  response: ClassmateBrandListCategoryListQueryResponse,
|};
*/


/*
query ClassmateBrandListCategoryListQuery {
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
    "name": "ClassmateBrandListCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ClassmateBrandListCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ClassmateBrandListCategoryListQuery",
    "id": null,
    "text": "query ClassmateBrandListCategoryListQuery {\n  catalogueCategoryList {\n    id\n    name\n    subCategories {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'af3d5990dccb838c4a9097b9c1a13ded';
module.exports = node;
