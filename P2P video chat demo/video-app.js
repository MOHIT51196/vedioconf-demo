var container;

window.addEventListener('load', function(){
    connect();
});

function connect(){
    console.log('called connect');
    easyRTC.setLoggedInListener(convertToButtons);
    easyRTC.initManaged('audioVideo', 'user-video', ['frnd-video'], function(){});
}

function covertToButtons(contactList){
    
    container = document.getElementById('contact-list');
    while(container.hasChildNodes()){
        container.removeChild(container.lastChild);
    }
    
    contactList.forEach(function(contact){
        var button = document.createElement('BUTTON');
        button.addEventListener('click', function(easyrtcid){
            return performCall(easyrtcid);
        })[contact];
       
        var label = document.createTextNode(contact);
        button.appendChild(label);
        container.appendChild(button);
    });

}

function performCall( peerEasyRTCId ){
    easyRTC.hangUpAll();
    
    var success = function(){};
    
    var failure = function(error_message){
        console.log(error_message);
        alert(error_message);
    };
    
    easyRTC.call(peerEasyRTCId, success, failure, null);
}

