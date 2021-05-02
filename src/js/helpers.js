import {TIMEOUT_SEC} from './config.js'

const timeout = function(s) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject(new Error(`Request took too long! Timeout after ${s} second(s)`))
        }, s * 1000);
    });
};

export const AJAX = async function(url, uploadData = undefined) {
    try {
        const fetchURL = uploadData ? fetch(url,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData),
        }) : fetch(url);
        const res = await Promise.race([fetch(fetchURL), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if(!res.ok) throw new Error(`${data.message}, ${data.error} (${res.status})`);
        return data;
    } catch(err) {
        throw err;
    }
}

export const getJSON = async function(url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if(!res.ok) throw new Error(`${data.message}, ${data.error} (${res.status})`);
        return data;
    } catch(err) {
        throw err;
    }
}

export const sendJSON = async function(url, uploadData) {
    try {
        const fetchURL = fetch(url,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData),
        });
        const res = await Promise.race([fetchURL, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if(!res.ok) throw new Error(`${data.message}, ${data.error} (${res.status})`);
        return data;
    } catch(err) {
        throw err;
    }
}