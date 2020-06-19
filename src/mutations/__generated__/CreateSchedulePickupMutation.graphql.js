/**
 * @flow
 * @relayHash 778bf4deeb1c83bfa2d8713006fd4497
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateSchedulePickupMutationVariables = {|
  orderId: string
|};
export type CreateSchedulePickupMutationResponse = {|
  +createSchedulePickup: ?{|
    +message: ?string,
    +isPickedUp: ?boolean,
  |}
|};
export type CreateSchedulePickupMutation = {|
  variables: CreateSchedulePickupMutationVariables,
  response: CreateSchedulePickupMutationResponse,
|};
*/


/*
mutation CreateSchedulePickupMutation(
  $orderId: ID!
) {
  createSchedulePickup(orderId: $orderId) {
    message
    isPickedUp
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createSchedulePickup",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      }
    ],
    "concreteType": "CreateSchedulePickup",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isPickedUp",
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
    "name": "CreateSchedulePickupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateSchedulePickupMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateSchedulePickupMutation",
    "id": null,
    "text": "mutation CreateSchedulePickupMutation(\n  $orderId: ID!\n) {\n  createSchedulePickup(orderId: $orderId) {\n    message\n    isPickedUp\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '52459b08bdcc1ff7011e628fb5329122';
module.exports = node;
