const axios = require('axios/index');

export function makeServerQuery(license){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = "http://search.sep.gob.mx/solr/cedulasCore/select?'";

    return axios.get(proxy+url, {
        params:{
            fl:'*,score',
            rows: 1,
            wt: 'json',
            q: license,
        },
        crossDomain: true,
    });
}

export function getLicenseInfo(license){
    return makeServerQuery(license).then(res => {
        console.log(res);
        return res.data.response.docs[0];
    });
}


