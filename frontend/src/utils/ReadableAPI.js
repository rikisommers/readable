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




  // ALL  ------------------------------------------------------------------------------------------





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

  
  



  export const getPostsByCat = (category) =>
    fetch(`${api}/`+ category +`/posts`, { headers })
      .then(res => res.json())
      .then(data => data)
  






  // POST ------------------------------------------------------------------------------------------

  // Todo : add GET POST BY ID

  export const addPost = (obj) => 
    
    fetch(`${api}/posts`, { 
      method:'POST',
      headers : headers,
      body: JSON.stringify(obj)
    }).then(
      res => res.json(),
      error => console.log('An error occurred', error)
    )



  export const editPost = (postId, post) => 
    fetch(`${api}/posts/:` + postId, { 
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(post)
    }).then(
      res => res.json(),
      error => console.log('An error occurred',this.res)
    )
   


  export const deletePost = (postId) => 
    fetch(`${api}/posts/` + postId, {
      method: 'DELETE',
      headers: headers
    }).then(
      console.log('deleted a post from api')
    )



  export const setCurrentPost = (postId) => 
    fetch(`${api}/posts` + postId, { 
      method:'POST',
      headers: headers,
      body: JSON.stringify(postId)
      //body: JSON.stringify(updatedPost)
    }).then(
      res => res,
      console.log('set current post'),
      error => console.log('An error occurred', error)
    )



  export const votePost = (id, vote) => {
      
      // remove trim - unecessary
      id = id.trim();
      vote = vote.trim();
      return fetch(`${api}/posts/${id}`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({option:vote})})
      .then(res => res.json());

  }






  // COMMENTS ------------------------------------------------------------------------------------------


    export const getComments = (postId) =>
      fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(res => res.json())
      .then(data => data);





    export const addComment = (obj) => 
      
      fetch(`${api}/comments`, { 
        method:'POST',
        headers: headers,
        body: JSON.stringify(obj)
      }).then(
        res => res.json(),
        error => console.log('An error occurred', error)
      )



    export const deleteComment = (commentId) => 
      fetch(`${api}/comments/` + commentId, {
        method: 'DELETE',
        headers: headers
      }).then(
        console.log('deleted a comment from api')
      )


    
  


    export const editComment = (commentId, comment) => 
      fetch(`${api}/comments/:` + commentId, { 
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(comment)
      }).then(
        res => res.json(),
        error => console.log('An error occurred',this.res)
      )

    
    
      export const voteComment = (commentId, vote) => {

        return fetch(`${api}/comments/${commentId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({option:vote})})
        .then(res => res.json());

    }

  

