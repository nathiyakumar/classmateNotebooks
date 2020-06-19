import {
    Environment,
    Network,
    RecordSource,
    Store,
    QueryResponseCache,
} from 'relay-runtime';
import { isEmpty } from 'lodash'
import {api} from './serviceApi';

const oneMinute = 60 * 1000 * 10;
const cache = new QueryResponseCache({ size: 1024, ttl: oneMinute });

function fetchQuery(
    operation,
    variables,
    cacheConfig,
    uploadables,

) {
    const queryID = operation.text;
    const isMutation = operation.operationKind === 'mutation';
    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig && cacheConfig.force;

    const fromCache = cache.get(queryID, variables);
    if (isQuery && fromCache !== null && !forceFetch) {
        return fromCache;
    }

    let token = localStorage.getItem('user_token');

    let requestVariables;

    if(token && token !== ""){
         requestVariables = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'JWT '+token                
            }
        }
    } else {

         requestVariables = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }
    }

    let body;
    if (!isEmpty(uploadables)) {
        if (!window.FormData) {
            throw new Error('Uploading files without `FormData` not supported.')
        }

        const formData = new FormData();
        formData.append('query', operation.text);
        formData.append('variables', JSON.stringify(variables));

        uploadables.map((file,index) => {
            let image_name = file.image_name;
            if(file.is_empty_image === false){
                formData.append(image_name, uploadables[index])
            }

        });

        body = formData
    } else {
        requestVariables.headers['Content-Type'] = 'application/json'

        body = JSON.stringify({
            query: operation.text,
            variables
        })
    }

    return fetch(
        api,
        {
            ...requestVariables,
            body
        }
    ).then(response => {
        return response.json();
    }).then(json => {
        // Update cache on queries
        if (isQuery && json) {
            cache.set(queryID, variables, json);
        }
        // Clear cache on mutations
        if (isMutation) {
            cache.clear();
        }

        return json;
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});
export default environment;
