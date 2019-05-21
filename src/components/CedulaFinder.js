const axios = require('axios/index');

export function makeServerQuery(license){
    return axios.get("/search", {
        params:{
            fl:'*,score',
            rows: 1,
            wt: 'json',
            q: license,
        }
    });
}

export function getLicenseInfo(license){
    return makeServerQuery(license).then(res => {
        return res.data.response.docs[0];
    });
}


