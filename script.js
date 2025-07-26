document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const postForm = document.querySelector('.post-form');
    const blogForm = document.getElementById('blogForm');
    const postsContainer = document.getElementById('posts');

    // Load posts from localStorage
    let posts = JSON.parse(localStorage.getItem('blog-posts')) || [];
    renderPosts();

    newPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        postForm.classList.toggle('hidden');
    });

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        posts.unshift(newPost);
        localStorage.setItem('blog-posts', JSON.stringify(posts));
        
        blogForm.reset();
        postForm.classList.add('hidden');
        renderPosts();
    });

    function renderPosts() {
        postsContainer.innerHTML = posts.map(post => `
            <article class="post">
                <h2>${post.title}</h2>
                <div class="post-meta">
                    Published on ${post.date} at ${post.time}
                </div>
                <div class="post-content">
                    ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
            </article>
        `).join('');
    }

    // Add sample post if no posts exist
    if (posts.length === 0) {
        const samplePost = {
            id: Date.now(),
            title: "Welcome to My Blog!",
            content: "This is your first blog post. Click on 'New Post' to start writing your own content.\n\nYou can write multiple paragraphs and they will be formatted automatically.",
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
        posts.push(samplePost);
        localStorage.setItem('blog-posts', JSON.stringify(posts));
        renderPosts();
    }
});