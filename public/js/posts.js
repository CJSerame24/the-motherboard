// Create post


// Comment on post



document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostFormHandler);

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);