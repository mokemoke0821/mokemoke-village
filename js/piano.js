// もけもけの村 - 音楽の家
// ピアノ曲リスト管理システム

class PianoManager {
  constructor() {
    this.songs = [];
    this.editingId = null;
    this.init();
  }

  init() {
    this.loadSongs();
    this.bindEvents();
    this.renderSongs();
    this.updateStats();
  }

  // ローカルストレージ関連
  loadSongs() {
    const saved = localStorage.getItem('mokemoke_piano_songs');
    this.songs = saved ? JSON.parse(saved) : [];
  }

  saveSongs() {
    localStorage.setItem('mokemoke_piano_songs', JSON.stringify(this.songs));
  }

  // イベントバインディング
  bindEvents() {
    // 戻るボタン
    document.querySelector('.back-btn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    // 曲追加ボタン
    document.getElementById('addSongBtn').addEventListener('click', () => {
      this.showModal();
    });

    // モーダル関連
    document.getElementById('closeModal').addEventListener('click', () => {
      this.hideModal();
    });

    document.getElementById('modalBackdrop').addEventListener('click', () => {
      this.hideModal();
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.hideModal();
    });

    // フォーム送信
    document.getElementById('songForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveSong();
    });

    // 検索・フィルター
    document.getElementById('searchInput').addEventListener('input', () => {
      this.renderSongs();
    });

    document.getElementById('difficultyFilter').addEventListener('change', () => {
      this.renderSongs();
    });

    // Escキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideModal();
      }
    });
  }

  // モーダル操作
  showModal(song = null) {
    const modal = document.getElementById('songModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('songForm');

    if (song) {
      // 編集モード
      title.textContent = '🎵 曲を編集';
      this.editingId = song.id;
      this.fillForm(song);
    } else {
      // 新規追加モード
      title.textContent = '♪ 新しい曲を追加';
      this.editingId = null;
      form.reset();
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // フォーカスを曲名入力欄に
    setTimeout(() => {
      document.getElementById('songTitle').focus();
    }, 100);
  }

  hideModal() {
    const modal = document.getElementById('songModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    this.editingId = null;
  }

  fillForm(song) {
    document.getElementById('songTitle').value = song.title;
    document.getElementById('songDifficulty').value = song.difficulty;
    document.getElementById('songGenre').value = song.genre || '';
    document.getElementById('songComposer').value = song.composer || '';
    document.getElementById('songNotes').value = song.notes || '';
  }

  // CRUD操作
  saveSong() {
    const title = document.getElementById('songTitle').value.trim();
    const difficulty = document.getElementById('songDifficulty').value;
    const genre = document.getElementById('songGenre').value.trim();
    const composer = document.getElementById('songComposer').value.trim();
    const notes = document.getElementById('songNotes').value.trim();

    if (!title || !difficulty) {
      alert('曲名と難易度は必須です！');
      return;
    }

    const songData = {
      title,
      difficulty,
      genre,
      composer,
      notes,
      createdAt: new Date().toISOString()
    };

    if (this.editingId) {
      // 編集
      const index = this.songs.findIndex(s => s.id === this.editingId);
      if (index !== -1) {
        songData.id = this.editingId;
        songData.createdAt = this.songs[index].createdAt;
        songData.updatedAt = new Date().toISOString();
        this.songs[index] = songData;
      }
    } else {
      // 新規追加
      songData.id = Date.now().toString();
      this.songs.push(songData);
    }

    this.saveSongs();
    this.renderSongs();
    this.updateStats();
    this.hideModal();

    // 成功メッセージ
    this.showMessage(this.editingId ? '曲が更新されました！' : '新しい曲が追加されました！');
  }

  deleteSong(id) {
    if (confirm('この曲を削除しますか？')) {
      this.songs = this.songs.filter(s => s.id !== id);
      this.saveSongs();
      this.renderSongs();
      this.updateStats();
      this.showMessage('曲が削除されました。');
    }
  }

  // 表示・レンダリング
  renderSongs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const difficultyFilter = document.getElementById('difficultyFilter').value;

    let filteredSongs = this.songs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchTerm) ||
        (song.genre && song.genre.toLowerCase().includes(searchTerm)) ||
        (song.composer && song.composer.toLowerCase().includes(searchTerm));

      const matchesDifficulty = difficultyFilter === 'all' || song.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });

    // 新しい順にソート
    filteredSongs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const songList = document.getElementById('songList');
    const emptyState = document.getElementById('emptyState');

    if (filteredSongs.length === 0) {
      songList.innerHTML = '';
      emptyState.style.display = this.songs.length === 0 ? 'block' : 'none';
      if (this.songs.length > 0 && filteredSongs.length === 0) {
        songList.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-icon">🔍</div>
                        <h3>検索結果が見つかりません</h3>
                        <p>検索条件を変更してみてください。</p>
                    </div>
                `;
      }
    } else {
      emptyState.style.display = 'none';
      songList.innerHTML = filteredSongs.map(song => this.createSongCard(song)).join('');
    }
  }

  createSongCard(song) {
    const difficultyEmoji = {
      '初級': '🟢',
      '中級': '🟡',
      '上級': '🔴'
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('ja-JP');
    };

    return `
            <div class="song-card" data-id="${song.id}">
                <div class="song-header">
                    <h3 class="song-title">${this.escapeHtml(song.title)}</h3>
                    <div class="song-actions">
                        <button class="edit-btn" onclick="pianoManager.editSong('${song.id}')">
                            ✏️ 編集
                        </button>
                        <button class="delete-btn" onclick="pianoManager.deleteSong('${song.id}')">
                            🗑️ 削除
                        </button>
                    </div>
                </div>
                
                <div class="song-info">
                    <span class="difficulty ${song.difficulty}">
                        ${difficultyEmoji[song.difficulty]} ${song.difficulty}
                    </span>
                    ${song.genre ? `<span class="genre">🎭 ${this.escapeHtml(song.genre)}</span>` : ''}
                    ${song.composer ? `<span class="composer">🎼 ${this.escapeHtml(song.composer)}</span>` : ''}
                </div>
                
                ${song.notes ? `
                    <div class="song-notes">
                        <strong>📝 メモ:</strong>
                        <p>${this.escapeHtml(song.notes)}</p>
                    </div>
                ` : ''}
                
                <div class="song-meta">
                    <small>📅 ${formatDate(song.createdAt)}</small>
                    ${song.updatedAt ? `<small>✏️ ${formatDate(song.updatedAt)}</small>` : ''}
                </div>
            </div>
        `;
  }

  editSong(id) {
    const song = this.songs.find(s => s.id === id);
    if (song) {
      this.showModal(song);
    }
  }

  updateStats() {
    document.getElementById('songCount').textContent = this.songs.length;
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
let pianoManager;
document.addEventListener('DOMContentLoaded', () => {
  pianoManager = new PianoManager();
  console.log('🎹 音楽の家へようこそ！');
}); 