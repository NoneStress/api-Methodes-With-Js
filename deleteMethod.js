async function deleteProduct(productId){
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`,{
            method: 'DELETE'
            // headers: {
            //     "Content-Type":"application/json"
            // },

            // body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("There is a Problem")
        }


        const contentType = response.headers.get("Content-Type")

        // if (!contentType.includes('application/json')){
        //     throw new Error("Data type error")
        // }

        console.log(
            `Status : ${response.status}
Content-Type : ${response.headers.get("Content-Type")}`
        )
        const modifiedProduct = await response.json()

        return response;

    } catch (error) {
        console.log(error.message)
    }
}

async function main(){

    const id = 5;

    try {
        const deletedProduct = await deleteProduct(id)

        console.log(deletedProduct)

        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const product = await response.json()

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


