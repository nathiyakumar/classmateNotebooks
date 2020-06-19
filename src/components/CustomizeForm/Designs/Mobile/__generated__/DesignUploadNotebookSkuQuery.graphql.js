/**
 * @flow
 * @relayHash 6ba6513daa903aec4048669f43909932
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DesignUploadNotebookSkuQueryVariables = {|
  size?: ?string,
  bindingType?: ?string,
  pages?: ?string,
  rulingType?: ?string,
|};
export type DesignUploadNotebookSkuQueryResponse = {|
  +notebookSku: ?$ReadOnlyArray<?{|
    +id: string,
    +SKU: string,
    +size: string,
    +pages: string,
    +bindingType: string,
    +rulingType: string,
    +MRP: number,
  |}>
|};
export type DesignUploadNotebookSkuQuery = {|
  variables: DesignUploadNotebookSkuQueryVariables,
  response: DesignUploadNotebookSkuQueryResponse,
|};
*/


/*
query DesignUploadNotebookSkuQuery(
  $size: String
  $bindingType: String
  $pages: String
  $rulingType: String
) {
  notebookSku(size: $size, bindingType: $bindingType, pages: $pages, rulingType: $rulingType) {
    id
    SKU
    size
    pages
    bindingType
    rulingType
    MRP
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "size",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "bindingType",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "pages",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "rulingType",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "notebookSku",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "bindingType",
        "variableName": "bindingType"
      },
      {
        "kind": "Variable",
        "name": "pages",
        "variableName": "pages"
      },
      {
        "kind": "Variable",
        "name": "rulingType",
        "variableName": "rulingType"
      },
      {
        "kind": "Variable",
        "name": "size",
        "variableName": "size"
      }
    ],
    "concreteType": "CustomizerNoteSKUType",
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
        "name": "SKU",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "size",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "pages",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "bindingType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "rulingType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "MRP",
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
    "name": "DesignUploadNotebookSkuQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DesignUploadNotebookSkuQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "DesignUploadNotebookSkuQuery",
    "id": null,
    "text": "query DesignUploadNotebookSkuQuery(\n  $size: String\n  $bindingType: String\n  $pages: String\n  $rulingType: String\n) {\n  notebookSku(size: $size, bindingType: $bindingType, pages: $pages, rulingType: $rulingType) {\n    id\n    SKU\n    size\n    pages\n    bindingType\n    rulingType\n    MRP\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7f5ce69c9b13a391577dad938bcd975e';
module.exports = node;
