// もけもけの村 - ゲームの家
// ボードゲームサマリー管理システム

class GameManager {
  constructor() {
    this.games = [];
    this.editingId = null;
    this.currentCategory = 'all';
    this.init();
  }

  init() {
    this.loadGames();
    this.bindEvents();
    this.renderGames();
    this.updateStats();
  }

  // ローカルストレージ関連
  loadGames() {
    const saved = localStorage.getItem('mokemoke_board_games');
    this.games = saved ? JSON.parse(saved) : [];
  }

  saveGames() {
    localStorage.setItem('mokemoke_board_games', JSON.stringify(this.games));
  }

  // イベントバインディング
  bindEvents() {
    // 戻るボタン
    document.querySelector('.back-btn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    // カテゴリフィルター
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        this.renderGames();
      });
    });

    // ゲーム追加ボタン
    document.getElementById('addGameBtn').addEventListener('click', () => {
      this.showGameModal();
    });

    // ゲーム編集モーダル関連
    document.getElementById('closeModal').addEventListener('click', () => {
      this.hideGameModal();
    });

    document.getElementById('modalBackdrop').addEventListener('click', () => {
      this.hideGameModal();
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.hideGameModal();
    });

    // ゲーム詳細モーダル関連
    document.getElementById('closeViewModal').addEventListener('click', () => {
      this.hideViewModal();
    });

    document.getElementById('closeViewModalBtn').addEventListener('click', () => {
      this.hideViewModal();
    });

    document.getElementById('viewModalBackdrop').addEventListener('click', () => {
      this.hideViewModal();
    });

    document.getElementById('editFromView').addEventListener('click', () => {
      const gameId = this.currentViewingId;
      this.hideViewModal();
      setTimeout(() => {
        this.editGame(gameId);
      }, 100);
    });

    // フォーム送信
    document.getElementById('gameForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveGame();
    });

    // Escキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideGameModal();
        this.hideViewModal();
      }
    });
  }

  // ゲーム編集モーダル操作
  showGameModal(game = null) {
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('gameForm');

    if (game) {
      // 編集モード
      title.textContent = '🎲 ゲームを編集';
      this.editingId = game.id;
      this.fillGameForm(game);
    } else {
      // 新規追加モード
      title.textContent = '🎲 新しいゲームを追加';
      this.editingId = null;
      form.reset();
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // フォーカスをゲーム名入力欄に
    setTimeout(() => {
      document.getElementById('gameName').focus();
    }, 100);
  }

  hideGameModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    this.editingId = null;
  }

  fillGameForm(game) {
    document.getElementById('gameName').value = game.name;
    document.getElementById('gameCategory').value = game.category;
    document.getElementById('gameMinPlayers').value = game.minPlayers || '';
    document.getElementById('gameMaxPlayers').value = game.maxPlayers || '';
    document.getElementById('gameTime').value = game.time || '';
    document.getElementById('gameDescription').value = game.description;
    document.getElementById('gameSummary').value = game.summary || '';
  }

  // ゲーム詳細モーダル操作
  showViewModal(game) {
    const modal = document.getElementById('viewModal');
    const title = document.getElementById('viewModalTitle');
    const content = document.getElementById('viewModalContent');

    this.currentViewingId = game.id;
    title.textContent = game.name;
    content.innerHTML = this.createGameDetailView(game);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  hideViewModal() {
    const modal = document.getElementById('viewModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    this.currentViewingId = null;
  }

  createGameDetailView(game) {
    const categoryLabels = {
      'strategy': '🧠 戦略',
      'coop': '🤝 協力',
      'party': '🎉 パーティ',
      'family': '👨‍👩‍👧‍👦 ファミリー',
      'card': '🃏 カード'
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ja-JP');
    };

    const playersText = this.getPlayersText(game.minPlayers, game.maxPlayers);
    const timeText = game.time ? `⏰ ${game.time}分` : '';

    return `
            <div class="game-detail-info">
                <div class="game-meta">
                    <span class="category-tag">${categoryLabels[game.category] || game.category}</span>
                    ${playersText ? `<span class="players-info">${playersText}</span>` : ''}
                    ${timeText ? `<span class="time-info">${timeText}</span>` : ''}
                </div>
                
                <div class="game-description">
                    <h3>📋 ゲーム説明</h3>
                    <p>${this.escapeHtml(game.description).replace(/\n/g, '<br>')}</p>
                </div>
                
                ${game.summary ? `
                    <div class="game-summary">
                        <h3>📝 サマリー・攻略のコツ</h3>
                        <div class="summary-content">${this.escapeHtml(game.summary).replace(/\n/g, '<br>')}</div>
                    </div>
                ` : ''}
                
                <div class="game-dates">
                    <small>📅 登録日: ${formatDate(game.createdAt)}</small>
                    ${game.updatedAt ? `<br><small>✏️ 更新日: ${formatDate(game.updatedAt)}</small>` : ''}
                </div>
            </div>
        `;
  }

  // CRUD操作
  saveGame() {
    const name = document.getElementById('gameName').value.trim();
    const category = document.getElementById('gameCategory').value;
    const minPlayers = parseInt(document.getElementById('gameMinPlayers').value) || null;
    const maxPlayers = parseInt(document.getElementById('gameMaxPlayers').value) || null;
    const time = parseInt(document.getElementById('gameTime').value) || null;
    const description = document.getElementById('gameDescription').value.trim();
    const summary = document.getElementById('gameSummary').value.trim();

    if (!name || !category || !description) {
      alert('ゲーム名、カテゴリ、ゲーム説明は必須です！');
      return;
    }

    if (minPlayers && maxPlayers && minPlayers > maxPlayers) {
      alert('最小人数は最大人数以下にしてください！');
      return;
    }

    const gameData = {
      name,
      category,
      minPlayers,
      maxPlayers,
      time,
      description,
      summary,
      createdAt: new Date().toISOString()
    };

    if (this.editingId) {
      // 編集
      const index = this.games.findIndex(g => g.id === this.editingId);
      if (index !== -1) {
        gameData.id = this.editingId;
        gameData.createdAt = this.games[index].createdAt;
        gameData.updatedAt = new Date().toISOString();
        this.games[index] = gameData;
      }
    } else {
      // 新規追加
      gameData.id = Date.now().toString();
      this.games.push(gameData);
    }

    this.saveGames();
    this.renderGames();
    this.updateStats();
    this.hideGameModal();

    // 成功メッセージ
    this.showMessage(this.editingId ? 'ゲームが更新されました！' : '新しいゲームが追加されました！');
  }

  deleteGame(id) {
    if (confirm('このゲームを削除しますか？')) {
      this.games = this.games.filter(g => g.id !== id);
      this.saveGames();
      this.renderGames();
      this.updateStats();
      this.showMessage('ゲームが削除されました。');
    }
  }

  editGame(id) {
    const game = this.games.find(g => g.id === id);
    if (game) {
      this.showGameModal(game);
    }
  }

  viewGame(id) {
    const game = this.games.find(g => g.id === id);
    if (game) {
      this.showViewModal(game);
    }
  }

  // 表示・レンダリング
  renderGames() {
    let filteredGames = this.games;

    if (this.currentCategory !== 'all') {
      filteredGames = this.games.filter(game => game.category === this.currentCategory);
    }

    // 新しい順にソート
    filteredGames.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const gamesGrid = document.getElementById('gamesGrid');
    const emptyState = document.getElementById('emptyState');

    if (filteredGames.length === 0) {
      gamesGrid.innerHTML = '';
      emptyState.style.display = this.games.length === 0 ? 'block' : 'none';
      if (this.games.length > 0 && filteredGames.length === 0) {
        gamesGrid.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-icon">🔍</div>
                        <h3>このカテゴリにはゲームがありません</h3>
                        <p>他のカテゴリを選択するか、新しいゲームを追加してみてください。</p>
                    </div>
                `;
      }
    } else {
      emptyState.style.display = 'none';
      gamesGrid.innerHTML = filteredGames.map(game => this.createGameCard(game)).join('');
    }
  }

  createGameCard(game) {
    const categoryLabels = {
      'strategy': '🧠 戦略',
      'coop': '🤝 協力',
      'party': '🎉 パーティ',
      'family': '👨‍👩‍👧‍👦 ファミリー',
      'card': '🃏 カード'
    };

    const playersText = this.getPlayersText(game.minPlayers, game.maxPlayers);
    const timeText = game.time ? `⏰ ${game.time}分` : '';

    return `
            <div class="game-card" data-id="${game.id}">
                <div class="game-card-header">
                    <h3 class="game-title">${this.escapeHtml(game.name)}</h3>
                    <span class="category-tag ${game.category}">${categoryLabels[game.category]}</span>
                </div>
                
                <div class="game-info">
                    ${playersText ? `<span class="players">${playersText}</span>` : ''}
                    ${timeText ? `<span class="time">${timeText}</span>` : ''}
                </div>
                
                <div class="game-description-preview">
                    <p>${this.truncateText(this.escapeHtml(game.description), 100)}</p>
                </div>
                
                <div class="game-actions">
                    <button class="view-btn" onclick="gameManager.viewGame('${game.id}')">
                        👁️ 詳細表示
                    </button>
                    <button class="edit-btn" onclick="gameManager.editGame('${game.id}')">
                        ✏️ 編集
                    </button>
                    <button class="delete-btn" onclick="gameManager.deleteGame('${game.id}')">
                        🗑️ 削除
                    </button>
                </div>
            </div>
        `;
  }

  getPlayersText(min, max) {
    if (!min && !max) return '';
    if (min && max) {
      if (min === max) return `👥 ${min}人`;
      return `👥 ${min}-${max}人`;
    }
    if (min) return `👥 ${min}人以上`;
    if (max) return `👥 ${max}人以下`;
    return '';
  }

  updateStats() {
    document.getElementById('gameCount').textContent = this.games.length;
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
}

// アニメーションCSS追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInOut {
        0% { transform: translateX(100%); opacity: 0; }
        15%, 85% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 初期化
let gameManager;
document.addEventListener('DOMContentLoaded', () => {
  gameManager = new GameManager();
  console.log('�� ゲームの家へようこそ！');
}); 