const login = document.getElementById("loginbtn"); 
const usernamebox = document.getElementById('usernamebox');
const passwordbox = document.getElementById('passwordbox');

login.addEventListener('click',function(){
    var usernamewritten =false;
    var passwordwritten = false;
    console.log(usernamebox);
    if(usernamebox.value==""){
        usernamebox.style.border = "3px solid red";
    }else{
        usernamewritten = true;
        usernamebox.style.border = "3px solid green";
    }
    if(passwordbox.value==""){
        passwordbox.style.border = "3px solid red";
    }else{
        passwordwritten = true;
        passwordbox.style.border = "3px solid green";
    }
    const form =  this.parentElement;
    if(usernamewritten==true && passwordwritten==true){
       // window.location = form.action;
    }
});