
import _ from 'lodash'
import base64url from 'base64url'

export default {




    encodeBase64(where) {
        if(!where) return base64url.encode(JSON.stringify([]));
        return base64url.encode(JSON.stringify(where))
    },

    decodeBase64(base64String) {
        if(!base64String) return null;
        return JSON.parse(base64url.decode(base64String));
    },

    
  

};
