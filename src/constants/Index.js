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

const LEAD_STATUS = {
    new: 'new',
    contacted: 'contacted',
    qualified: 'qualified',
    lost: 'lost'
};

const ROLE = {
    admin: "admin",
    representative: "representative",
    manager:"manager"
};

const snackbarVariant = {
    success : "success",
    error : "error",
    warning : "warning",
    info : "info",
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
    Config, SOURCE_TYPE, LEAD_STATUS, ROLE, snackbarVariant,
    setLocalStorage, getLocalStorage, removeLocalStorage
}