async function createUser(u){
    try {
        const reponse = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },

            body:JSON.stringify(u)
        })

        if(!reponse.ok){
            throw new Error('somthing went wrong')
        }
        
        const contentType = reponse.headers.get("Content-Type");
        
        if (!contentType.includes("application/json")){
            console.error(`the headers is ${reponse.headers.get('Content-Type')}`);
        }

        const createdUser = await reponse.json()
        
        return createdUser;


    } catch (error) {
        console.log(error.message)
    }
}

async function createUsers(us){
    try {
        const responses = await Promise.all(us.map( u => fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type':"application/json"
            },

            body: JSON.stringify(u),
        })))

        responses.forEach(response => {
        if (!response.ok) {
            throw new Error("Une erreur est survenue");
        }
        });


        const users = await Promise.all(responses.map(resp => resp.json()))

        return users;

    } catch (error) {
        console.log(error.message)
    }
}


const affichage = async () => {

    const user = {
                    name: "Nasser Yerbanga",
                    username: "Nasser",
                    email: "nasser@email.com",
                    phone: "06 12 34 56 78",
                    website: "nasser.dev",
                    address: {
                        street: "Rue Hassan II",
                        city: "Tangier",
                        zipcode: "90000"
                    },
                    company: {
                        name: "OpenAI Academy"
                    }
    }  
    

    const newUser = await createUser(user)

    console.log(`============= UTILISATEUR CREE =============

ID : ${newUser.id}

Nom : ${newUser.name}

Username : ${newUser.username}

Email : ${newUser.email}

Téléphone : ${newUser.phone}

Ville : ${newUser.address.city}

Entreprise : ${newUser.company.name}`)
}

const afficherTousLesAjouts = async () => {
    try {
        const us = [
            {
                name: "Nasser Yerbanga",
                username: "nasser",
                email: "nasser@email.com",
                phone: "+212 612345678",
                website: "nasser.dev",
                address: {
                street: "Rue Hassan II",
                city: "Tangier",
                zipcode: "90000"
                },
                company: {
                name: "OpenAI Academy"
                }
            },

            {
                name: "Sarah Johnson",
                username: "sarahj",
                email: "sarah.johnson@email.com",
                phone: "+33 612345678",
                website: "sarah.dev",
                address: {
                street: "Avenue Victor Hugo",
                city: "Paris",
                zipcode: "75016"
                },
                company: {
                name: "Tech Solutions"
                }
            },

            {
                name: "David Miller",
                username: "davidm",
                email: "david@email.com",
                phone: "+1 5145551234",
                website: "davidm.dev",
                address: {
                street: "Saint Catherine",
                city: "Montreal",
                zipcode: "H3B2Y5"
                },
                company: {
                name: "Maple Technologies"
                }
            },

            {
                name: "Emma Wilson",
                username: "emmaw",
                email: "emma@email.com",
                phone: "+44 7700123456",
                website: "emma.io",
                address: {
                street: "Oxford Street",
                city: "London",
                zipcode: "W1D1BS"
                },
                company: {
                name: "Cloud Vision"
                }
            },

            {
                name: "Carlos Rodriguez",
                username: "carlos",
                email: "carlos@email.com",
                phone: "+34 612345678",
                website: "carlos.dev",
                address: {
                street: "Gran Via",
                city: "Madrid",
                zipcode: "28013"
                },
                company: {
                name: "Iberia Systems"
                }
            },

            {
                name: "Yuki Tanaka",
                username: "yuki",
                email: "yuki@email.com",
                phone: "+81 9012345678",
                website: "yuki.jp",
                address: {
                street: "Shibuya",
                city: "Tokyo",
                zipcode: "1500002"
                },
                company: {
                name: "Tokyo Digital"
                }
            },

            {
                name: "Fatima Zahra",
                username: "fatima",
                email: "fatima@email.com",
                phone: "+212 661112233",
                website: "fatima.ma",
                address: {
                street: "Boulevard Mohammed V",
                city: "Casablanca",
                zipcode: "20000"
                },
                company: {
                name: "Morocco Tech"
                }
            },

            {
                name: "Ali Ben Salem",
                username: "ali",
                email: "ali@email.com",
                phone: "+216 22111222",
                website: "ali.tn",
                address: {
                street: "Avenue Habib Bourguiba",
                city: "Tunis",
                zipcode: "1000"
                },
                company: {
                name: "North Africa Software"
                }
            }
        ];
    
        const newUsers = await createUsers(us)
        console.log(newUsers)
        console.log(`============================== IMPORT USERS ==============================\n`)

        for (const user of newUsers) {
            console.log(`✔️   ${user.name} -> ID : (${user.id})\n`)
        }

        console.log(`==========================================================================\n`)

        console.log(`Nombre d'utilisateurs importés : ${newUsers.length}`)
    } catch (error) {
        console.log(error.message)
    }
}

afficherTousLesAjouts()


