

var type_of_call;

function getLocationRegister() {
    type_of_call = "register";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}


function getLocationLogin() {
    type_of_call = "login";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //alert(`Latitude: ${latitude}\nLongitude: ${longitude}`);
    gpslocation = ""+longitude+" "+latitude;

    //alert(type_of_call);
    if(type_of_call=="register"){
        register(gpslocation);
    }else if(type_of_call=="login"){
        login(gpslocation);
    }
    
}