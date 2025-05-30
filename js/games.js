// もけもけの村 - ゲームの家
// ボードゲームサマリー管理システム

// サンプルデータ定数
const SAMPLE_BOARD_GAMES = [
  // 戦略ゲーム
  {
    id: "sample_g1",
    name: "カタン",
    category: "strategy",
    minPlayers: 3,
    maxPlayers: 4,
    time: 75,
    description: "資源を集めて島を開拓するボードゲームの名作。交渉と運のバランスが絶妙で、毎回違った展開を楽しめます。初心者から上級者まで幅広く愛される永遠の定番ゲームです。",
    summary: "最初は麦と羊の確保を優先しましょう。港を活用した交渉戦略が鍵となります。盗賊の使いどころが勝負の分かれ目。相手の資源状況を把握して効果的な交渉を心がけ、開発カードも積極的に活用していきましょう。",
    createdAt: "2024-01-10T14:30:00.000Z"
  },
  {
    id: "sample_g2",
    name: "宝石の煌き",
    category: "strategy",
    minPlayers: 2,
    maxPlayers: 4,
    time: 30,
    description: "宝石商となって宝石を集め、カードを購入していくエンジンビルドゲーム。シンプルなルールで奥が深く、短時間で遊べる戦略ゲームの傑作です。",
    summary: "序盤は安いカードでエンジンを構築することが重要。中盤以降は高得点カードを狙いましょう。貴族カードのボーナスも狙い目です。相手の動向を見ながら必要な宝石を先取りする戦略も効果的。",
    createdAt: "2024-01-15T10:15:00.000Z"
  },

  // 協力ゲーム  
  {
    id: "sample_g3",
    name: "パンデミック",
    category: "coop",
    minPlayers: 2,
    maxPlayers: 4,
    time: 45,
    description: "世界に蔓延する病原体を食い止める協力ゲーム。全員で勝利を目指すため、チームワークが重要。緊張感のある展開で、クリアできたときの達成感は格別です。",
    summary: "役職の特殊能力を最大活用しましょう。アウトブレイクの連鎖に注意が必要です。研究所の配置場所が戦略のポイント。全員で情報を共有し、効率的な行動計画を立てることが勝利への鍵となります。",
    createdAt: "2024-01-20T16:45:00.000Z"
  },
  {
    id: "sample_g4",
    name: "禁断の島",
    category: "coop",
    minPlayers: 2,
    maxPlayers: 4,
    time: 30,
    description: "沈みゆく島から宝物を回収して脱出する協力ゲーム。パンデミックより軽量で初心者にもおすすめ。ハラハラドキドキの展開が楽しめます。",
    summary: "序盤は宝物回収を優先しましょう。島が沈む前にヘリポートへの道筋を確保することが重要。チーム全体での連携と、緊急時のリスク管理が勝利のカギです。",
    createdAt: "2024-01-25T11:30:00.000Z"
  },

  // パーティゲーム
  {
    id: "sample_g5",
    name: "ディクシット",
    category: "party",
    minPlayers: 3,
    maxPlayers: 8,
    time: 30,
    description: "幻想的なイラストから連想したお題を当てる創造性ゲーム。正解しすぎても駄目な絶妙なバランス。想像力と表現力が試される芸術的なゲームです。",
    summary: "あいまいで詩的な表現を心がけましょう。全員が当てやすすぎず、誰も当てられなすぎない絶妙なラインを狙うのがコツ。相手の思考パターンを理解することも重要です。",
    createdAt: "2024-02-01T19:20:00.000Z"
  },
  {
    id: "sample_g6",
    name: "ワードウルフ",
    category: "party",
    minPlayers: 4,
    maxPlayers: 8,
    time: 10,
    description: "少数派のお題を持つウルフを見つける推理ゲーム。会話から相手のお題を探る心理戦。短時間で盛り上がれる定番パーティゲームです。",
    summary: "序盤は様子見で一般的な表現を使いましょう。中盤以降は積極的に質問して情報を集めることが重要。相手の反応や言葉の選び方に注目して推理を進めましょう。",
    createdAt: "2024-02-05T15:10:00.000Z"
  },

  // ファミリーゲーム
  {
    id: "sample_g7",
    name: "ブロックス",
    category: "family",
    minPlayers: 2,
    maxPlayers: 4,
    time: 20,
    description: "テトリスのようなピースを盤面に配置していく陣取りゲーム。シンプルで子供から大人まで楽しめる。ルールは簡単だが戦略性も高い名作です。",
    summary: "角と角で接続するルールを活用しましょう。相手の進路を妨害しつつ、自分の展開ルートを確保することが重要。大きなピースから使っていく戦略も効果的です。",
    createdAt: "2024-02-10T13:45:00.000Z"
  },
  {
    id: "sample_g8",
    name: "アズール",
    category: "family",
    minPlayers: 2,
    maxPlayers: 4,
    time: 30,
    description: "美しいタイルを使って壁面装飾を完成させるゲーム。見た目も美しく、戦略性も高い名作。タイルの配置パズルが楽しい傑作ボードゲームです。",
    summary: "相手が欲しがるタイルを取って嫌がらせも重要な戦略。完成ボーナスを狙いつつ、マイナス点を避けることが大切。長期的な視点でタイル配置を計画しましょう。",
    createdAt: "2024-02-15T17:30:00.000Z"
  },

  // カードゲーム
  {
    id: "sample_g9",
    name: "ラブレター",
    category: "card",
    minPlayers: 2,
    maxPlayers: 4,
    time: 5,
    description: "たった16枚のカードで遊ぶ推理ゲーム。短時間で何度も遊べる手軽さが魅力。シンプルながら奥深い心理戦が楽しめるミニマルデザインの傑作です。",
    summary: "相手の手札を推理しながら行動しましょう。兵士での当て外しリスクと、司祭での情報収集のバランスが重要。場に出たカードを記憶して、確率を計算することも大切です。",
    createdAt: "2024-02-20T12:00:00.000Z"
  },
  {
    id: "sample_g10",
    name: "ドミニオン",
    category: "strategy",
    minPlayers: 2,
    maxPlayers: 4,
    time: 30,
    description: "デッキ構築の元祖にして最高峰。毎回異なるカードセットで、無限の戦略が楽しめる。カードゲームに革命をもたらした歴史的名作です。",
    summary: "序盤は購入力アップ、中盤でアクション効率化、終盤は属州購入ラッシュが基本戦略。廃棄カードでデッキ圧縮も重要。カードの組み合わせを見極めて最適なエンジンを構築しましょう。",
    createdAt: "2024-02-25T20:15:00.000Z"
  }
];

class GameManager {
  constructor() {
    this.games = [];
    this.editingId = null;
    this.currentCategory = 'all';
    this.init();
  }

  init() {
    this.initializeSampleData();
    this.loadGames();
    this.bindEvents();
    this.renderGames();
    this.updateStats();
  }

  // サンプルデータ初期化（初回訪問時のみ）
  initializeSampleData() {
    const existingGames = localStorage.getItem('mokemoke_board_games');

    // 初回訪問時のみサンプルデータを挿入
    if (!existingGames || existingGames === '[]') {
      localStorage.setItem('mokemoke_board_games', JSON.stringify(SAMPLE_BOARD_GAMES));

      // サンプルデータ読み込み通知
      setTimeout(() => {
        this.showMessage('🎲 サンプルゲームを読み込みました！初回訪問ありがとうございます🎮');
      }, 1000);
    }
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
  console.log('ゲームの家へようこそ！');
}); 