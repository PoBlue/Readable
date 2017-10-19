const backEndLink = 'http://localhost:3001';
const headers = {
    'Authorization': 'witcher_mo',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getCategories = () =>
    fetch(`${backEndLink}/categories`, { headers: headers })
        .then((res) => res.json() )
        .then((data) => data.categories);

export const getCategoryPosts = (categorieName) =>{
    return fetch(`${backEndLink}/${categorieName}/posts`
        , {headers: headers})
        .then((res) => res.json() )}

export const getPosts = () =>
    fetch(`${backEndLink}/posts`
        , {headers: headers})
        .then((res) => res.json() )

export const createPost = (body) =>
  fetch(`${backEndLink}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const getPostDetail = (postId) =>
  fetch(`${backEndLink}/posts/${postId}`, { headers })
    .then(res => res.json())

export const votePost = (post, isUp) => {
  const vote = isUp? "upVote" : "downVote";
  const body = {"option": vote};

  return fetch(`${backEndLink}/posts/${post.id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const updatePost = (post, body) =>
  fetch(`${backEndLink}/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const deletePost = (post) =>
  fetch(`${backEndLink}/posts/${post.id}`, {
    method: 'DELETE',
    headers: headers,
  }).then(res => res.json())

export const getComments = (post) =>{
  return fetch(`${backEndLink}/posts/${post.id}/comments`, { headers })
    .then(res => res.json())
}

export const createComment = (body) =>
  fetch(`${backEndLink}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const voteComment = (comment, isUp) => {
  const vote = isUp? "upVote" : "downVote";
  const body = {"option": vote};

  return fetch(`${backEndLink}/comments/${comment.id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const getCommentDetail = (comment) =>
  fetch(`${backEndLink}/comments/${comment.id}`, { headers })
    .then(res => res.json())

//MARK: 用 new comment 代替 body
export const updateComment = (comment, body) =>
  fetch(`${backEndLink}/comments/${comment.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const deleteComment = (comment) =>
  fetch(`${backEndLink}/comments/${comment.id}`, {
    method: 'DELETE',
    headers: headers,
  }).then(res => res.json())