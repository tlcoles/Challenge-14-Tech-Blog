const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    console.log(title, content);
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('New post created!');
        document.location.replace('/dashboard');

      } else {
        alert('Failed to create post');
      }
    }
  };
    
  document
    .querySelector('#new-blogpost-form')
    .addEventListener('submit', newFormHandler);