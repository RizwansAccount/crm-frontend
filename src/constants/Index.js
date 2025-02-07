const serverUrl = "http://localhost:5000/crm/";

const Config = {
    serverUrl: serverUrl,
    serverApiUrl: serverUrl + 'api/',

    userToken: 'user-token',
};

const SOURCE_TYPE = {
    lead : "Lead",
    contact : "Contact"
};

const setLocalStorage =(key, data)=> {
    if(key && data) {
        localStorage.setItem(key, data);
    }
};

const getLocalStorage=(key)=>{
    if(key) {
        return localStorage.getItem(key);
    }
};

const removeLocalStorage =(key)=> {
    if(key) {
        return localStorage.removeItem(key);
    }
};

export {
    Config, SOURCE_TYPE,
    setLocalStorage, getLocalStorage, removeLocalStorage
}