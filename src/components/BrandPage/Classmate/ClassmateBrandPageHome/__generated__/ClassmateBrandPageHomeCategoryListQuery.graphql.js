/**
 * @flow
 * @relayHash deebd8ded86050ba3630aeae8eb1d1b9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ClassmateBrandPageHomeCategoryListQueryVariables = {||};
export type ClassmateBrandPageHomeCategoryListQueryResponse = {|
  +catalogueCategoryList: ?$ReadOnlyArray<?{|
    +id: ?string,
    +name: ?string,
    +backgroundImage: ?string,
  |}>
|};
export type ClassmateBrandPageHomeCategoryListQuery = {|
  variables: ClassmateBrandPageHomeCategoryListQueryVariables,
  response: ClassmateBrandPageHomeCategoryListQueryResponse,
|};
*/


/*
query ClassmateBrandPageHomeCategoryListQuery {
  catalogueCategoryList {
    id
    name
    backgroundImage
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "catalogueCategoryList",
    "storageKey": null,
    "args": null,
    "concreteType": "CatalogueCategory",
    "plural": true,
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "backgroundImage",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ClassmateBrandPageHomeCategoryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ClassmateBrandPageHomeCategoryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "ClassmateBrandPageHomeCategoryListQuery",
    "id": null,
    "text": "query ClassmateBrandPageHomeCategoryListQuery {\n  catalogueCategoryList {\n    id\n    name\n    backgroundImage\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '581d13ae1f2750a42e474bb95c0ab070';
module.exports = node;
