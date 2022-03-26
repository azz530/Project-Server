const moment = require('moment');

function formatDate (dateStr,type){ //格式('yyyy-mm-dd')
    if(dateStr!=null&&type!=null){
        return moment(dateStr).format(type);
    } else {
        return;
    }
    
}
function addDate (oldDate,days,type){
    if((oldDate!==null||oldDate!=='')&&(days!==null||days!=='')&&(type!==''||type!==null)){
        let newDate = moment(oldDate).add(days,type).toDate();
        console.log(newDate);
        return newDate; 
    } else {
        return;
    }
}

module.exports = {
    formatDate,addDate
}