/**
 * @flow
 * @relayHash db1e8c71b3363c9b4a4ba6264d6fdc87
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DesignContestUploadImagePageIsProfessionUpdatedQueryVariables = {||};
export type DesignContestUploadImagePageIsProfessionUpdatedQueryResponse = {|
  +isProfessionUpdated: ?boolean
|};
export type DesignContestUploadImagePageIsProfessionUpdatedQuery = {|
  variables: DesignContestUploadImagePageIsProfessionUpdatedQueryVariables,
  response: DesignContestUploadImagePageIsProfessionUpdatedQueryResponse,
|};
*/


/*
query DesignContestUploadImagePageIsProfessionUpdatedQuery {
  isProfessionUpdated
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isProfessionUpdated",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DesignContestUploadImagePageIsProfessionUpdatedQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DesignContestUploadImagePageIsProfessionUpdatedQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "DesignContestUploadImagePageIsProfessionUpdatedQuery",
    "id": null,
    "text": "query DesignContestUploadImagePageIsProfessionUpdatedQuery {\n  isProfessionUpdated\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5261ef3965d079837a028935a4781e3c';
module.exports = node;
