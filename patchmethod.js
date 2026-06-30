async function patchProduct(productId, data){
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`,{
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json"
            },

            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("There is a Problem")
        }

        const contentType = response.headers.get("Content-Type")

        if (!contentType.includes('application/json')){
            throw new Error("Data type error")
        }

        const modifiedProduct = await response.json()

        return modifiedProduct;

    } catch (error) {
        console.log(error.message)
    }
}

async function main(){

    const id = 5;
    const modifiedValue = {
        price: 999.99
    } 

    try {
        const newProduct = await patchProduct(id,  modifiedValue)

        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const product = await response.json()

        console.log(`=============================== Patched Product ==============================
ID : ${newProduct.id}

Title : ${newProduct.title}

Price : ${newProduct.price}

Category : ${newProduct.category}

Description : ${newProduct.description}`)

            console.log(`============================ After patching Product ===========================
ID : ${product.id}

Title : ${product.title}

Price : ${product.price}

Category : ${product.category}

Description : ${product.description}`)
    } catch (error) {
        console.log(error.message)
    }
}


main()