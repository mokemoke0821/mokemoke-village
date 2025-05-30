// もけもけの村 - 村の掲示板
// コミュニティ投稿管理システム

// タッチイベントサポート関数
function addTouchSupport(element, clickHandler) {
  let touchStartTime = 0;
  let touchStartPos = { x: 0, y: 0 };

  // タッチ開始
  element.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    const touch = e.touches[0];
    touchStartPos = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  // タッチ終了
  element.addEventListener('touchend', (e) => {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;

    // 短時間のタッチ（500ms以下）をタップとして処理
    if (touchDuration < 500) {
      const touch = e.changedTouches[0];
      const touchEndPos = { x: touch.clientX, y: touch.clientY };
      const distance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.x, 2) +
        Math.pow(touchEndPos.y - touchStartPos.y, 2)
      );

      // 移動距離が小さい場合（15px以下）をタップとして処理
      if (distance < 15) {
        clickHandler(e);
      }
    }
  }, { passive: true });

  // 通常のクリックイベントも追加（デスクトップ対応）
  element.addEventListener('click', (e) => {
    // タッチデバイスでない場合のみクリックイベントを処理
    if (!('ontouchstart' in window)) {
      clickHandler(e);
    }
  });
}

// モバイル対応のビューポート管理
function initMobileSupport() {
  // ビューポート高さ調整
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 画面回転・リサイズ対応
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, { passive: true });

  // iOS Safariの仮想キーボード対応
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    window.addEventListener('scroll', () => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        setTimeout(() => {
          document.activeElement.scrollIntoView({ block: 'center' });
        }, 300);
      }
    }, { passive: true });
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  initMobileSupport();
});

// サンプルデータ定数
const SAMPLE_BOARD_POSTS = [
  {
    id: "sample_p1",
    author: "もけもけ村長",
    title: "🎉 もけもけの村へようこそ！",
    content: "みなさん、もけもけの村にお越しいただきありがとうございます！\n\nここは配信者の皆さんが、ピアノ曲の管理やボードゲームの情報整理、そして視聴者の皆さんとの交流を楽しむためのコミュニティスペースです。\n\n各お家を探索して、素敵な音楽やゲームを発見してくださいね♪",
    createdAt: "2024-03-15T09:15:00.000Z"
  },
  {
    id: "sample_p2",
    author: "ピアニスト見習い",
    title: "🎹 今日の練習報告",
    content: "エリーゼのためにを3時間練習しました！\n最初は指がもつれてましたが、だんだんスムーズに弾けるようになってきました。\n\n次は月光ソナタに挑戦してみたいと思います。おすすめの練習方法があったら教えてください！",
    createdAt: "2024-03-15T14:22:00.000Z"
  },
  {
    id: "sample_p3",
    author: "ボドゲ愛好家",
    title: "🎲 週末ゲーム会レポート",
    content: "昨日友達とカタンを4人でプレイしました！\n\n序盤は資源が全然集まらなくてヒヤヒヤでしたが、中盤以降の交渉戦で大逆転！港の活用がカギでした。\n\nやっぱりボードゲームは仲間とワイワイやるのが一番楽しいですね～",
    createdAt: "2024-03-15T16:45:00.000Z"
  },
  {
    id: "sample_p4",
    author: "新人配信者",
    title: "📹 配信デビューしました！",
    content: "昨日ついにピアノ配信デビューしました！\n\n緊張しすぎて最初の曲で指が震えちゃいましたが、チャットで温かいコメントをたくさんもらえて感動でした😭\n\nもけもけの村の曲リストも参考にさせてもらってます。ありがとうございます！",
    createdAt: "2024-03-15T19:30:00.000Z"
  },
  {
    id: "sample_p5",
    author: "ゲーム配信者",
    title: "🎮 ボードゲーム配信のコツ",
    content: "ボードゲーム配信を始めて半年が経ちました。\n\n最初はルール説明が難しくて視聴者さんを置いてけぼりにしちゃってましたが、事前にサマリーを用意することで格段に分かりやすくなりました！\n\nもけもけの村のゲーム情報、とても参考になってます✨",
    createdAt: "2024-03-15T21:10:00.000Z"
  },
  {
    id: "sample_p6",
    author: "リスナーさん",
    title: "💕 いつもありがとうございます",
    content: "配信者の皆さん、いつも素敵な配信をありがとうございます！\n\n毎日仕事で疲れて帰ってきても、ピアノの音色を聞いていると心が癒されます。\n\nこれからも応援してるので、お体に気をつけて配信がんばってください🎵",
    createdAt: "2024-03-15T22:55:00.000Z"
  }
];

class BoardManager {
  constructor() {
    this.posts = [];
    this.deletingPostId = null;
    this.init();
  }

  init() {
    this.initializeSampleData();
    this.loadPosts();
    this.bindEvents();
    this.renderPosts();
    this.updateStats();
  }

  // サンプルデータ初期化（初回訪問時のみ）
  initializeSampleData() {
    const existingPosts = localStorage.getItem('mokemoke_board_posts');

    // 初回訪問時のみサンプルデータを挿入
    if (!existingPosts || existingPosts === '[]') {
      localStorage.setItem('mokemoke_board_posts', JSON.stringify(SAMPLE_BOARD_POSTS));

      // サンプルデータ読み込み通知
      setTimeout(() => {
        this.showMessage('📝 サンプル投稿を読み込みました！初回訪問ありがとうございます📋');
      }, 1000);
    }
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
  console.log('📋 村の掲示板へようこそ！');
}); 