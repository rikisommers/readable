const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
'Accept': 'application/json',
'Content-Type': 'application/json',
'Authorization': token
}


// API.getPosts
// server endpoint:  GET /posts
// export const getPosts = () => {
//     fetch(`${api}/posts`, { headers }).then(res => res.json()).then(data => data)
// }
export const getPosts = () =>
fetch(`${api}/posts`, { headers })
  .then(
    res => res.json(),
    error => console.log('An error occurred', error)
  )
  



// API.getCategories
// server endpoint:  GET /categories
// export const getCategories = () => {
//     fetch(`${api}/categories`, { headers }).then(res => res.json()).then(data => data.categories)
// }
export const getCategories = () =>
fetch(`${api}/categories`, { headers })
  .then(
    res => res.json().then(data => data.categories),
    error => console.log('An error occurred', error)
  ).then(
    console.log('got cats from api')
  )

// API.getCategoryPosts
// API.detelePost
