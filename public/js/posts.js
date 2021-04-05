// Create post
const newPostFormHandler = async (event) =>
    event.preventDefault();



// Comment on post
const commentFormHandler = async (event) =>
    event.preventDefault();

const comment = document.querySelector('#comment-field').value.trim();

if (comment) {

    const response = await fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/posts/:id')
    } else {
        alert(response.statusText);
    }
}


document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostFormHandler);

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);