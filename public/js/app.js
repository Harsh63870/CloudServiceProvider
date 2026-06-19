const API_URL = '/api/posts';

const createForm = document.getElementById('createForm');
const imageInput = document.getElementById('image');
const preview = document.getElementById('preview');
const postsGrid = document.getElementById('postsGrid');
const postCount = document.getElementById('postCount');
const toast = document.getElementById('toast');

document.addEventListener('DOMContentLoaded', loadPosts);

postsGrid.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit');
    const deleteBtn = e.target.closest('.btn-delete');

    if (editBtn) {
        editCaption(editBtn.dataset.id, editBtn.dataset.caption);
    } else if (deleteBtn) {
        deletePost(deleteBtn.dataset.id);
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.classList.remove('hidden');
    } else {
        preview.classList.add('hidden');
    }
});

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = createForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Upload ho rahi hai...';

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('caption', document.getElementById('caption').value);

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Upload fail ho gaya');

        showToast(data.message || 'Post ban gayi!', 'success');
        createForm.reset();
        preview.classList.add('hidden');
        loadPosts();
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Upload & Post';
    }
});

async function loadPosts() {
    postsGrid.innerHTML = '<p class="loading">Posts load ho rahi hain...</p>';

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Posts load nahi hui');

        const posts = data.data || [];
        postCount.textContent = `${posts.length} posts`;

        if (posts.length === 0) {
            postsGrid.innerHTML = '<p class="empty-msg">Abhi koi post nahi hai. Pehli post upload karo!</p>';
            return;
        }

        postsGrid.innerHTML = posts.map((post) => `
            <article class="post-card" data-id="${post._id}">
                <img src="${post.image}" alt="Post image">
                <div class="post-body">
                    <p class="post-caption">${escapeHtml(post.caption)}</p>
                    <p class="post-date">${formatDate(post.createdAt)}</p>
                    <div class="post-actions">
                        <button class="btn btn-edit" data-id="${post._id}" data-caption="${escapeAttr(post.caption)}">Edit</button>
                        <button class="btn btn-delete" data-id="${post._id}">Delete</button>
                    </div>
                </div>
            </article>
        `).join('');
    } catch (err) {
        postsGrid.innerHTML = `<p class="empty-msg">${err.message}</p>`;
    }
}

async function editCaption(id, currentCaption) {
    const newCaption = prompt('Naya caption likho:', currentCaption);
    if (!newCaption || !newCaption.trim()) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ caption: newCaption.trim() }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Update fail');

        showToast(data.message || 'Update ho gaya!', 'success');
        loadPosts();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function deletePost(id) {
    if (!confirm('Yeh post delete karni hai?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Delete fail');

        showToast(data.message || 'Delete ho gayi!', 'success');
        loadPosts();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeAttr(text) {
    return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('hi-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');

    setTimeout(() => toast.classList.add('hidden'), 3000);
}
