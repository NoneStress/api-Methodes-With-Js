async function getUsers(){
    const response = await responseFunction('https://jsonplaceholder.typicode.com/users')

    return response
}

async function getUser(userId){
    try {
        const response = await responseFunction(`https://jsonplaceholder.typicode.com/users/${userId}`)

       return response;

    } catch (error) {
        
    }
}

async function getPosts(userId){
    try {
        const response = await responseFunction(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        
        return response
    } catch (error) {
        console.log(error.message)
    }
}

async function getTodos(userId){
    const response = await responseFunction(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    
    return response;
}

async function getAlbunm(userId){
    const response = await responseFunction(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    
    return response;
}

async function responseFunction(url){
    try {
        
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error('Somethimg went wrong');
        }
    
        return response.json();

    } catch (error) {
        console.log(error.message)
    }
}

async function dashboard (userId){
    const users = await getUsers();
    const currentUser = users.find(u => u.id === userId)

    const [user, posts, todos, albums] = await Promise.all(
        [
        getUser(currentUser.id),
        getPosts(currentUser.id), 
        getTodos(currentUser.id),
        getAlbunm(currentUser.id)
    ]);

    const tachesTerminee = todos.filter( t => t.completed === true)

    const pourcentageTachesTermainee = (tachesTerminee.length)/(todos.length)
    
    const postLePlusLong = posts.reduce((prev, curr) => {
        if(prev.body.length > curr.body.length){
            return prev;
        } else {
            return curr;
        }
    } , posts[0] ) // Retourne un objet et valeur voulue est objet.title

    const sortedAlbum = [...albums].sort((a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base'}));


    console.log(`================ DASHBOARD ================

Nom : ${user.name}

Email : ${user.email}

Nombre de posts : ${posts.length}

Nombre de todos : ${todos.length}

Nombre d'albums : ${albums.length}

Premier post :
${posts[0].title}

Premier album :
${albums[0].title}

Tâches terminées : ${tachesTerminee.length}/20

Pourcentage de tâches terminées: ${pourcentageTachesTermainee} %

Post le plus long : ${postLePlusLong.title}

album classee par ordre alphabetique : 
`)

for (const element of sortedAlbum) {
    console.log(`✔️   id ::: ${element.id}\n`)
}

}



dashboard(1)