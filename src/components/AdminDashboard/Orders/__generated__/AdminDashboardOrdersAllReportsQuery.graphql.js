/**
 * @flow
 * @relayHash b5969a082b53694c4419a5a62a4cc6c1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AdminDashboardOrdersAllReportsQueryVariables = {||};
export type AdminDashboardOrdersAllReportsQueryResponse = {|
  +reportsTaskIds: ?$ReadOnlyArray<?{|
    +id: string,
    +taskId: ?string,
    +reportName: ?string,
    +isGenerated: boolean,
    +url: ?string,
    +dateRange: ?string,
    +createdOn: any,
  |}>
|};
export type AdminDashboardOrdersAllReportsQuery = {|
  variables: AdminDashboardOrdersAllReportsQueryVariables,
  response: AdminDashboardOrdersAllReportsQueryResponse,
|};
*/


/*
query AdminDashboardOrdersAllReportsQuery {
  reportsTaskIds {
    id
    taskId
    reportName
    isGenerated
    url
    dateRange
    createdOn
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "reportsTaskIds",
    "storageKey": null,
    "args": null,
    "concreteType": "GeneratedReportsType",
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
        "name": "taskId",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "reportName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isGenerated",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "url",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "dateRange",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "createdOn",
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
    "name": "AdminDashboardOrdersAllReportsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AdminDashboardOrdersAllReportsQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AdminDashboardOrdersAllReportsQuery",
    "id": null,
    "text": "query AdminDashboardOrdersAllReportsQuery {\n  reportsTaskIds {\n    id\n    taskId\n    reportName\n    isGenerated\n    url\n    dateRange\n    createdOn\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c1d187ca3f917c2c6aaf038ff84335b9';
module.exports = node;
