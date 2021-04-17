function fetchJson(url, options){
    let headers = {'Content-Type': 'application/json'};

    if(options && options.headers){
        headers = {...options.headers, ...headers};

        delete options.headers;
    }

    return fetch(url, Object.assign({
        credentials: 'same-origin',
        headers: headers
    }, options))
    .then(checkStatus)
    .then(response => {
        return response.text()
            .then(text => text ? JSON.parse(text) : '')
    })
}

/**
 * Check fetch status code
 * 
 * @returns exception
 */
function checkStatus(response){
    if (response.status >= 200 && response.status < 400) {
        return response;
    }
    
    const error = new Error(response.statusText);
    error.response = response;
    throw error
}

/**
 * Returns a Promise object with the rep logs data
 * 
 * @returns {Promise<Response>}
 */
export function getRepLogs(){
    return fetchJson('/reps')
        .then(data => data.items);
}

/**
 * Deletes rep log
 * 
 * @param {integer} id 
 */
export function deleteRepLog(id){
    return fetchJson(`/reps/${id}`, {method: 'DELETE'});
}

/**
 * Creates a rep log
 * 
 * @param {*} repLog
 * @returns {Prmise<Response>}
 */
export function createRepLog(repLog){
    return fetchJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog)
    })
}