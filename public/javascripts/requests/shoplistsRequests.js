
/*Comeca por pedir isto*/
async function requestUserShoplists() {
    try {
        const response = await fetch(`/api/shoplists/auth`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 shoplists: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}




async function requestUserShoplist(shlId) {
    try {
        const response = await fetch(`/api/shoplists/auth/${shlId}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 unauthenticated: response.status == 401,
                 shoplist: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}




async function requestProducts() {
    try {
        const response = await fetch(`/api/products`);
        var result = await response.json();
        return { successful: response.status == 200,
                 products: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestPurchaseItems(shopListId) {
    try {
        const response = await fetch(`/api/shoplists/auth/buy/${shopListId}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 result: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}


async function requestGetItems(shopListId) {
    try {
        const response = await fetch(`/api/shoplists/auth/${shopListId}`);
        var result = await response.json();
        return { successful: response.status == 200,
                 items: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}

async function requestAddItem(shopListId, prodId, quant, lojaId) {
    try {
        const response = await fetch(`/api/shoplists/auth/${shopListId}/items`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "POST",
          body: JSON.stringify({
            prodId: prodId, 
            quant: quant,
            lojaId: lojaId
          })
        });
     
        var result = await response.json();
        return { successful: response.status == 200,
            failure: response.status != 200,
            result: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}



async function requestCompras() {
    try {
        const response = await fetch(`/api/shoplists/bought`);
        var result = await response.json();
        return { successful: response.status == 200,
                 compras: result};
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
        return {err: err};
    }
}