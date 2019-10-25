'use strict';

const twit = require('twit');
const config = require('./config');

const Twitter = new twit(config);

const findSpaniards = function() {
    
    Twitter.get('friends/list', function(err, data) {
        if (!err) {
            const result = data.users.filter(data => data.name.includes('🇪🇸'));
            blockSpaniards(result);
        }
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

const blockSpaniards =  function(result) {
    result.forEach(element => {
        console.log(element.name);
        Twitter.post('blocks/create', {screen_name: element.screen_name}, function(err, data) {
            if(!err) {
                console.log(`User ${element.screen_name} have been blocked!`);
            } else {
                console.log('Something went wrong while BLOCKING...');
            }
        })
    });
    
}

findSpaniards();