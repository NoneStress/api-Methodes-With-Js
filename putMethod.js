async function updateProduct(productId, data){
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },

            body: JSON.stringify(data)
        })
        
        if(!response.ok){
            throw new Error("Something went WRONG !!!")
        }

        const contentType =  response.headers.get("Content-Type");

        if(!contentType.includes('application/json')){
            console.error("That's not the WAITED format of data")
        }

        console.log(`===================== Headers detail =====================

Server : ${response.headers.get('Server')}

Content-Type : ${response.headers.get('Content-Type')}

Date: ${response.headers.get('Date')}
            `)

        const updatedProduct = await response.json()

        return updatedProduct;

    } catch (error) {
        console.log(error.message)
    }
}


async function main(){
    try {
        const newProduct = {
            title: "Gaming Laptop",
            price: 1599.99,
            description: "RTX 5080 - 32GB RAM - Ryzen 9",
            image: "https://i.pravatar.cc",
            category: "electronics"
        }
        
        const id = 5

        const updatedProduct =  await updateProduct(id, newProduct )

        const reponse = await fetch(`https://fakestoreapi.com/products/${id}`)

        const produit = await reponse.json()


        console.log(`============= UPDATED PRODUCT =============

ID : ${updatedProduct.id}

Title : ${updatedProduct.title}

Price : ${updatedProduct.price}

Category : ${updatedProduct.category}

Description : ${updatedProduct.description}`)


 console.log(`============= AFTER UPDATING PRODUCT =============

ID : ${produit.id}

Title : ${produit.title}

Price : ${produit.price}

Category : ${produit.category}

Description : ${produit.category}`)

    } catch (error) {
        console.log(error.message)
    }
}

main()