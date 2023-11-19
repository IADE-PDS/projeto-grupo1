async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let name = document.getElementById("Email").value;
        let pass = document.getElementById("palavraPasse").value;
        let result = await requestLogin(name,pass);
        if (result.err) {
            msgDOM.textContent = "Ocorreu um erro: " + result.err;
        } else if (!result.successful) {
            msgDOM.textContent = "Email ou palavra-passe incorreto";    
        } else {
            msgDOM.textContent = "Login bem sucedido!";    
            window.location.pathname = "/mostrar.html";
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "Ocorreu um erro: " + err;
    } 
}