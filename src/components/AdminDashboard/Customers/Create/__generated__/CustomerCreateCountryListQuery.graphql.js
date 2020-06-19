/**
 * @flow
 * @relayHash 3731dca8769f5f45507da23fea85dda8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomerCreateCountryListQueryVariables = {||};
export type CustomerCreateCountryListQueryResponse = {|
  +countriesList: ?$ReadOnlyArray<?{|
    +code: ?string,
    +country: ?string,
  |}>
|};
export type CustomerCreateCountryListQuery = {|
  variables: CustomerCreateCountryListQueryVariables,
  response: CustomerCreateCountryListQueryResponse,
|};
*/


/*
query CustomerCreateCountryListQuery {
  countriesList {
    code
    country
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "countriesList",
    "storageKey": null,
    "args": null,
    "concreteType": "CountryDisplay",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "code",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "country",
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
    "name": "CustomerCreateCountryListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomerCreateCountryListQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CustomerCreateCountryListQuery",
    "id": null,
    "text": "query CustomerCreateCountryListQuery {\n  countriesList {\n    code\n    country\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '00df9474c3a42c7bbd1345f0696aecec';
module.exports = node;
