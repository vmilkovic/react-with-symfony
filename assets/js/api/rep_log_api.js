function fetchJson(url, options){
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
    .then(response => {
        return response.text()
            .then(text => text ? JSON.parse(text) : '')
    });
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
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}