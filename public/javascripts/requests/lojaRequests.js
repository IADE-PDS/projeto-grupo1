


async function getAllLojas(){
	try {
		const response = await fetch(`/api/lojas`);
		
		result = await response.json();
		if(response.status == 200){
			console.log(result);
		}

		return { status: response.status, lojas: result };
	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}

async function getLojaByProduct(){
	try {
		const productId = window.location.pathname.split('/').pop();
		const response = await fetch(`/api/lojas/produto/`+productId);
		
		result = await response.json();
		if(response.status == 200){
			console.log(result);
		}

		return { status: response.status, lojas: result };
	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}