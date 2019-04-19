"use strict";

function setCookie(name, value, expiry)
{
    var d = new Date();
    d.setTime(d.getTime() + (expiry*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires;
}

function LoginFN(username, password)
{	
PostFN({"username": ""+username+"", "password": ""+password+""},"http://localhost:3000/login");
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function GetCookies() {
    document.getElementById('usernameval').value = getCookie('Session');
}

function Register(username, password, confirm)
{	
if(!(password == confirm))
		{
		alert("Passwords do not match!");
		return "Passwords do not match!"
		}
	if(password.length < 8)
	{
		alert("Password must be longer than 8 characters!");
		return "Password must be longer than 8 characters!"
	}
PostFN({"username": ""+username+"", "password": ""+password+""},"http://localhost:5000/register");
}

function Send_Message(sender, recipient, message, cipher, CKEY)
{
PostFN({"sender": ""+sender+"", "recipient": ""+recipient+"", "message": ""+message+"", "cipher": ""+cipher+"", "CKEY": ""+CKEY+""},"http://localhost:5000/messages");
}

function Send_VigMessage(sender, recipient, message, cipher, CKEY)
{
PostFN({"sender": ""+sender+"", "recipient": ""+recipient+"", "message": ""+message+"", "cipher": ""+cipher+"", "CKEY": ""+CKEY+""},"http://localhost:5000/messages");
}

function PostFN(items, endpoint){
   $.ajax ({
    url: endpoint,
    type: "POST",
	xhrFields: {
        withCredentials: false
    },
	crossDomain: true,
    data: JSON.stringify(items),
    dataType: "json",
    contentType: "application/json; charset=utf-8",   
});
 }