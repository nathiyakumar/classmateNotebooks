/**
 * @flow
 * @relayHash 26c8527efc1071ba6b7345d90ee2abbc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EnquiryTypeEnum = "business_inquiry" | "order_issue" | "%future added value";
export type CreateFeedbackMutationVariables = {|
  city: string,
  comment: string,
  country: string,
  email: string,
  name: string,
  phoneNumber: string,
  state: string,
  enquiryType: EnquiryTypeEnum,
  orderId?: ?string,
|};
export type CreateFeedbackMutationResponse = {|
  +createFeedback: ?{|
    +message: ?string
  |}
|};
export type CreateFeedbackMutation = {|
  variables: CreateFeedbackMutationVariables,
  response: CreateFeedbackMutationResponse,
|};
*/


/*
mutation CreateFeedbackMutation(
  $city: String!
  $comment: String!
  $country: String!
  $email: String!
  $name: String!
  $phoneNumber: String!
  $state: String!
  $enquiryType: EnquiryTypeEnum!
  $orderId: String
) {
  createFeedback(city: $city, comment: $comment, country: $country, email: $email, name: $name, phoneNumber: $phoneNumber, state: $state, enquiryType: $enquiryType, orderId: $orderId) {
    message
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "city",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "comment",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "country",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "phoneNumber",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "state",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "enquiryType",
    "type": "EnquiryTypeEnum!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "orderId",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createFeedback",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "city",
        "variableName": "city"
      },
      {
        "kind": "Variable",
        "name": "comment",
        "variableName": "comment"
      },
      {
        "kind": "Variable",
        "name": "country",
        "variableName": "country"
      },
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "enquiryType",
        "variableName": "enquiryType"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "orderId",
        "variableName": "orderId"
      },
      {
        "kind": "Variable",
        "name": "phoneNumber",
        "variableName": "phoneNumber"
      },
      {
        "kind": "Variable",
        "name": "state",
        "variableName": "state"
      }
    ],
    "concreteType": "CreateFeedback",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
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
    "name": "CreateFeedbackMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateFeedbackMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateFeedbackMutation",
    "id": null,
    "text": "mutation CreateFeedbackMutation(\n  $city: String!\n  $comment: String!\n  $country: String!\n  $email: String!\n  $name: String!\n  $phoneNumber: String!\n  $state: String!\n  $enquiryType: EnquiryTypeEnum!\n  $orderId: String\n) {\n  createFeedback(city: $city, comment: $comment, country: $country, email: $email, name: $name, phoneNumber: $phoneNumber, state: $state, enquiryType: $enquiryType, orderId: $orderId) {\n    message\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '22b39f073a5df3c336ad8d0e16b6917e';
module.exports = node;
