var request = require('request');


var post =  "https://api.telegram.org/TOKEN/sendMessage";
var get =   "https://api.telegram.org/TOKEN/getUpdates";
var gente = [25460135];

function getHour(){
    var d = new Date();
    var hours = d.getHours()+2;
    if(hours>23) {
        hours -= 24;
    }
    return hours;
}

function makeWord() {
    
    var d = new Date();
    var hours = getHour();
    
    var text = "it's " + hours + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes() +  "!";
    //if(hours>22 || hours<6) text += "\ngodormer!";
    switch(hours) {
        case 9:
            text += "\nfast, cook dat breakfast!";
            break;
        case 12:
            text += "\nmiddlewarez!";
            break;
        case 13:
            text += "\ndai, cook pranzo!"
            break;
        case 14:
            text += "\nremember to take out the trash!"
            break;
        case 16:
            text += "\ntake a break!"
            break;
        case 17:
            text += "\nmake marenda!"
            break;
        case 20:
            text += "\neverybody dance!"
            break;
        case 21:
            text += "\nholy ravioli!"
            break;
        case 22:
            text += "\nadventure time!"
            break;
        case 23:
            text += "\ngo dormer!"
            break;
    }
    return text;

    var conso = "bcdfghjklmnpqrstvwxyz";
    var vocali = "aeiou";
    for(var i = 0; i < 6; i++) {
        if(i % 2 == 0) text += conso.charAt(Math.floor(Math.random() * conso.length));
        else text += vocali.charAt(Math.floor(Math.random() * vocali.length));
    }
    return text;
}

function talk () {
    
    var d = new Date();
    var hours = getHour();
    
    if(hours >= 9 && hours <= 23){
        text = makeWord();
        
        console.log(text);
        for( i=0; i< gente.length; i++){
            var data = {'chat_id': gente[i], 'text': text};
            request
                .post(post, {form:data})
                .on('response', function(res){
                    //console.log(res);
                    //talk();
                })
                .on('error', function(err){
                    console.log(err);
                });
        }
    }
    
}

function check() {
    
    request
    .get(get)
    .on('response', function(response) {
        response.on('data', function (chunk) {
            console.log("\nchunk\n" + chunk);
            //console.log(chunk.result.message[0].chat.id);
            //console.log("\nLOL " + chunk[0].result);
        });
        
  });
}


function callEveryFullHour() {

    var now = new Date();
    var nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
    var difference = nextHour - now;

    console.log(difference/60000);

    setTimeout(function(){

        // code goes here
        
        var d = new Date();
        if( d.getMinutes() ==0){
            console.log("It's a full hour!");
            talk();
            callEveryFullHour();
        }
        else 
            callEveryFullHour();
        // var text = "it's " + d.getHours() + ":" + (d.getMinutes()<10?'0':'') + d.getMinutes() +  "!";

    }, difference);

}



callEveryFullHour();


//check();
//talk();
// setInterval(talk ,60*60*1000);
//setInterval(talk ,10);