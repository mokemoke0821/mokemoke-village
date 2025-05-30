// もけもけの村 - 村の掲示板
// 投稿管理システム

class BoardManager {
  constructor() {
    this.posts = [];
    this.deletingPostId = null;
    this.init();
  }

  init() {
    this.loadPosts();
    this.bindEvents();
    this.renderPosts();
    this.updateStats();
  }

  // ローカルストレージ関連
  loadPosts() {
    const saved = localStorage.getItem('mokemoke_board_posts');
    this.posts = saved ? JSON.parse(saved) : [];
  }

  savePosts() {
    localStorage.setItem('mokemoke_board_posts', JSON.stringify(this.posts));
  }

  // イベントバインディング
  bindEvents() {
    // 戻るボタン
    document.querySelector('.back-btn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    // 投稿フォーム
    document.getElementById('postForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitPost();
    });

    // 文字数カウント
    document.getElementById('postContent').addEventListener('input', (e) => {
      this.updateCharCount(e.target.value.length);
    });

    // フォームクリア
    document.getElementById('clearForm').addEventListener('click', () => {
      this.clearForm();
    });

    // 全削除ボタン
    document.getElementById('clearAllPosts').addEventListener('click', () => {
      this.confirmClearAll();
    });

    // 削除確認モーダル
    document.getElementById('confirmDelete').addEventListener('click', () => {
      this.deletePost(this.deletingPostId);
      this.hideDeleteModal();
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
      this.hideDeleteModal();
    });

    document.getElementById('deleteModalBackdrop').addEventListener('click', () => {
      this.hideDeleteModal();
    });

    // Escキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideDeleteModal();
      }
    });

    // 投稿者名を保存（簡単なUX改善）
    const savedAuthor = localStorage.getItem('mokemoke_board_author');
    if (savedAuthor) {
      document.getElementById('authorName').value = savedAuthor;
    }

    document.getElementById('authorName').addEventListener('change', (e) => {
      localStorage.setItem('mokemoke_board_author', e.target.value);
    });
  }

  // 投稿処理
  submitPost() {
    const author = document.getElementById('authorName').value.trim();
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    if (!author || !title || !content) {
      alert('すべての項目を入力してください！');
      return;
    }

    if (content.length > 500) {
      alert('メッセージは500文字以内で入力してください！');
      return;
    }

    const post = {
      id: Date.now().toString(),
      author: author,
      title: title,
      content: content,
      createdAt: new Date().toISOString()
    };

    this.posts.unshift(post); // 新しい投稿を先頭に追加
    this.savePosts();
    this.renderPosts();
    this.updateStats();
    this.clearForm();

    // 成功メッセージ
    this.showMessage('投稿が追加されました！ 🎉');

    // 投稿後は投稿一覧にスクロール
    document.querySelector('.posts-header').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // フォームクリア
  clearForm() {
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    this.updateCharCount(0);
    document.getElementById('postTitle').focus();
  }

  // 文字数更新
  updateCharCount(count) {
    const charCountElement = document.getElementById('charCount');
    charCountElement.textContent = count;

    if (count > 450) {
      charCountElement.style.color = 'var(--retro-red)';
    } else if (count > 300) {
      charCountElement.style.color = 'var(--orange)';
    } else {
      charCountElement.style.color = 'var(--text-light)';
    }
  }

  // 削除関連
  confirmDeletePost(postId) {
    this.deletingPostId = postId;
    this.showDeleteModal();
  }

  deletePost(postId) {
    this.posts = this.posts.filter(post => post.id !== postId);
    this.savePosts();
    this.renderPosts();
    this.updateStats();
    this.showMessage('投稿が削除されました。');
  }

  confirmClearAll() {
    if (this.posts.length === 0) {
      alert('削除する投稿がありません。');
      return;
    }

    if (confirm(`すべての投稿（${this.posts.length}件）を削除しますか？\n\n⚠️ この操作は元に戻せません。`)) {
      this.posts = [];
      this.savePosts();
      this.renderPosts();
      this.updateStats();
      this.showMessage('すべての投稿が削除されました。');
    }
  }

  // モーダル操作
  showDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  hideDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    this.deletingPostId = null;
  }

  // 表示・レンダリング
  renderPosts() {
    const postsContainer = document.getElementById('postsContainer');
    const emptyState = document.getElementById('emptyState');

    if (this.posts.length === 0) {
      postsContainer.innerHTML = '';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      postsContainer.innerHTML = this.posts.map(post => this.createPostCard(post)).join('');
    }
  }

  createPostCard(post) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return '今日 ' + date.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (diffDays === 2) {
        return '昨日 ' + date.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } else {
        return date.toLocaleDateString('ja-JP') + ' ' +
          date.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
          });
      }
    };

    return `
            <div class="post-item" data-id="${post.id}">
                <div class="post-header">
                    <div class="post-title-area">
                        <h3 class="post-title">${this.escapeHtml(post.title)}</h3>
                        <div class="post-meta">
                            <span class="post-author">👤 ${this.escapeHtml(post.author)}</span>
                            <span class="post-date">📅 ${formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                    <button class="delete-post-btn" onclick="boardManager.confirmDeletePost('${post.id}')" title="投稿を削除">
                        ✕
                    </button>
                </div>
                
                <div class="post-content">
                    <p>${this.escapeHtml(post.content).replace(/\n/g, '<br>')}</p>
                </div>
                
                <div class="post-footer">
                    <small class="post-id">ID: ${post.id.slice(-8)}</small>
                </div>
            </div>
        `;
  }

  updateStats() {
    document.getElementById('postCount').textContent = this.posts.length;

    // 全削除ボタンの表示制御
    const clearAllBtn = document.getElementById('clearAllPosts');
    clearAllBtn.style.display = this.posts.length > 0 ? 'inline-block' : 'none';
  }

  showMessage(message) {
    // 簡単なトースト通知
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            border: 3px solid var(--pixel-border);
            box-shadow: 3px 3px 0px var(--pixel-border);
            font-family: var(--font-main);
            font-weight: bold;
            z-index: 10000;
            animation: slideInOut 3s ease;
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ユーティリティ: 投稿数取得
  getPostCount() {
    return this.posts.length;
  }

  // ユーティリティ: 特定作者の投稿数取得
  getPostCountByAuthor(author) {
    return this.posts.filter(post => post.author === author).length;
  }
}

// アニメーションCSS追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInOut {
        0% { transform: translateX(100%); opacity: 0; }
        15%, 85% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
    
    .post-item {
        animation: fadeInUp 0.3s ease;
    }
    
    @keyframes fadeInUp {
        0% { 
            opacity: 0; 
            transform: translateY(20px); 
        }
        100% { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
`;
document.head.appendChild(style);

// 初期化
let boardManager;
document.addEventListener('DOMContentLoaded', () => {
  boardManager = new BoardManager();
  console.log('�� 村の掲示板へようこそ！');
}); 