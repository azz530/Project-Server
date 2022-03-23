const moment = require('moment');

function formatDate (dateStr,type){ //格式('yyyy-mm-dd')
    if(dateStr!=null&&type!=null){
        return moment(dateStr).format(type);
    } else {
        return;
    }
    
}

module.exports = {
    formatDate
}