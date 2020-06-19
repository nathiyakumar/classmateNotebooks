/**
 * @flow
 * @relayHash e293172571c50b26994a612eba999a7d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DesignDataWorkType = "ART" | "PHOTOGRAPHY" | "%future added value";
export type WorkTypeEnum = "Art" | "Photography" | "%future added value";
export type DesignContestUserDesignListQueryVariables = {|
  workType?: ?WorkTypeEnum
|};
export type DesignContestUserDesignListQueryResponse = {|
  +userDesignsDataList: ?$ReadOnlyArray<?{|
    +id: string,
    +designTitle: ?string,
    +workType: DesignDataWorkType,
    +isRulesAccepted: boolean,
    +designedImage: string,
    +isFeatured: boolean,
    +isSelected: boolean,
    +created: any,
  |}>
|};
export type DesignContestUserDesignListQuery = {|
  variables: DesignContestUserDesignListQueryVariables,
  response: DesignContestUserDesignListQueryResponse,
|};
*/


/*
query DesignContestUserDesignListQuery(
  $workType: WorkTypeEnum
) {
  userDesignsDataList(workType: $workType) {
    id
    designTitle
    workType
    isRulesAccepted
    designedImage
    isFeatured
    isSelected
    created
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "workType",
    "type": "WorkTypeEnum",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "userDesignsDataList",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "workType",
        "variableName": "workType"
      }
    ],
    "concreteType": "DesignDataType",
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
        "name": "designTitle",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "workType",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isRulesAccepted",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "designedImage",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isFeatured",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isSelected",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "created",
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
    "name": "DesignContestUserDesignListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DesignContestUserDesignListQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "DesignContestUserDesignListQuery",
    "id": null,
    "text": "query DesignContestUserDesignListQuery(\n  $workType: WorkTypeEnum\n) {\n  userDesignsDataList(workType: $workType) {\n    id\n    designTitle\n    workType\n    isRulesAccepted\n    designedImage\n    isFeatured\n    isSelected\n    created\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0faf34935c68e421fc0ea0bdef08bebd';
module.exports = node;
