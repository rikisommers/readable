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


export const getCategories = () => 
fetch(`${api}/categories`, { headers })
  .then(
    res => res.json().then(data => data.categories),
    error => console.log('An error occurred', error)
  )


export const getPosts = () => 

  fetch(`${api}/posts`, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )


export const getPostById = (postId) => 
  
    fetch(`${api}/posts` + postId, { headers })
      .then(
        res => res.json(),
        error => console.log('An error occurred', error)
      )
  


  


export const getComments = (postId) =>
  
  fetch(`${api}/posts` + postId + '/comments', { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )




export const getComment = (commentId) => 
  
  fetch(`${api}/comments` + commentId, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )


export const addComment = (obj) => 
  
  fetch(`${api}/comments`, { 
    method:'POST',
    headers: headers,
    body: JSON.stringify(obj)
  }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  )






export const addPost = (obj) => 
  
  fetch(`${api}/posts`, { 
    method:'POST',
    headers : headers,
    body: JSON.stringify(obj)
  }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  )




export const editPost = (postId, updatedPost) => 
  fetch(`${api}/posts` + postId, { 
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(updatedPost)
  }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  )



export const deletePost = (postId) => 
  fetch(`${api}/posts` + postId, {
    method: 'DELETE',
    headers: headers
  })



// addPost - obj
// editPost - postId - updatedPost
// deletePost - postId
// addComment - obj
// getComment - commentId
// getComments - postId
// getPostById - postId
// getPosts
// getCategories