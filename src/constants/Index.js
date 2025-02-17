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

const formattedDate_yyyy_mm_dd = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
};

const formattedDate_mm_dd_yyyy = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
};

const convertDateIntoFormat = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

export {
    Config, SOURCE_TYPE, LEAD_STATUS, ROLE, snackbarVariant,
    setLocalStorage, getLocalStorage, removeLocalStorage, convertDateIntoFormat, formattedDate_mm_dd_yyyy, formattedDate_yyyy_mm_dd
}