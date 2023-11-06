async function requestRegister(email,name,password, localizacao) {
	try {
		alert("sending regist data");
		alert(localizacao);
		const xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/users/');
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function() {
			let msgDOM = document.getElementById("msg");
			if (xhr.status === 200) {
				// Handle the successful response
				console.log('Request successful:', xhr.responseText);
				alert("Conta criada com sucesso!");
				window.open("/", "_self");
				
			} else {
				// Handle the error response
				console.log('Request failed:', xhr.status);
				msgDOM.textContent = "Não foi possível criar a conta.";
				
			}
		};
		xhr.onerror = function() {
		// Handle the request error
		console.log('Request error');
		};
		xhr.send(JSON.stringify({
			username: name,
			password: password,
			email: email,
			location: localizacao,
		}));
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		// We only need to send if the user registered or not
		
	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}





async function requestLogin(name, password) {
	try {
		const response = await fetch(`/api/users/auth`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				username: name,
				password: password,
			})
		});
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		// We only need to send if the user logged or not since the token will be in the cookie
		return { successful: response.status == 200 };
	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}

async function requestLogout() {
	try {
		const response = await fetch(`/api/users/auth`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
		});
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		// We only need to send if the user logged or not since the token will be in the cookie
		return { successful: response.status == 200 };
	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}

async function requestProfile() {
	try {
		const response = await fetch(`/api/users/auth`);
		var result = await response.json();
		return { successful: response.status == 200, unauthenticated: response.status == 401, user: result };
	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}
