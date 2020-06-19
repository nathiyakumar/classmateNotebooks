/**
 * @flow
 * @relayHash fab0a0c76adb447d8e2f218c4453005f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DesignsDesktopNotebookSkuQueryVariables = {|
  size?: ?string,
  bindingType?: ?string,
  pages?: ?string,
  rulingType?: ?string,
|};
export type DesignsDesktopNotebookSkuQueryResponse = {|
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
export type DesignsDesktopNotebookSkuQuery = {|
  variables: DesignsDesktopNotebookSkuQueryVariables,
  response: DesignsDesktopNotebookSkuQueryResponse,
|};
*/


/*
query DesignsDesktopNotebookSkuQuery(
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
    "name": "DesignsDesktopNotebookSkuQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DesignsDesktopNotebookSkuQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "DesignsDesktopNotebookSkuQuery",
    "id": null,
    "text": "query DesignsDesktopNotebookSkuQuery(\n  $size: String\n  $bindingType: String\n  $pages: String\n  $rulingType: String\n) {\n  notebookSku(size: $size, bindingType: $bindingType, pages: $pages, rulingType: $rulingType) {\n    id\n    SKU\n    size\n    pages\n    bindingType\n    rulingType\n    MRP\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd6ff236c7a1812aab699529d95bf348e';
module.exports = node;
