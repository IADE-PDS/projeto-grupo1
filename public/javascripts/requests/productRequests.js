


async function getAllProducts() {
	try {

	let searchQuery = document.getElementById("pesquisa").value;

	  const response = await fetch(`/api/produtos?search=${searchQuery}`);
	  result = await response.json();
	  if (response.status === 200) { 	
		console.log(result);
	  }
	  return { status: response.status, produtos: result };
	} catch (err) {
	  console.log(err);
	  return { err: err };
	}
  }
  


  


async function getProduct(){

	try{
		const productId = window.location.pathname.split('/').pop();

		console.log(productId);
		const response = await fetch('/api/produtos/'+productId);

		result = await response.json();
		if(response.status == 200){
			console.log(result);
		}

		return { status: response.status, produto: result };


	} catch (err) {
		// Treat 500 errors here
		console.log(err);
		return { err: err };
	}
}

async function getPredefinedProducts(){
	try {
		
		  const response = await fetch('/api/produtos/predef');
		  result = await response.json();
		  if (response.status === 200) { 	
			console.log(result);
		  }
		  return { status: response.status, produtos: result };
		} catch (err) {
		  console.log(err);
		  return { err: err };
		}
}