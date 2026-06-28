// let add some data to https://fakestoreapi.com/products

async function addProduct(){
    try {
        const request = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                    "title":"Laptop",
                    "price":1200,
                    "category":"electronics"
                })
        })

        if(!request.ok){
            throw new Error('Something went wrong')
        }
        const addedProduct = await request.json()

        console.log(addedProduct)
    } catch (error) {
        console.log(error.message)
    }
}

addProduct()