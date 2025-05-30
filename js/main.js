// ローディング処理
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1500);
});

// ナビゲーションの処理
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // アクティブクラスの切り替え
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // ページ内容の更新（将来の実装用）
        const target = link.getAttribute('href').substring(1);
        updateContent(target);
    });
});

// 建物のクリック処理
const buildings = document.querySelectorAll('.building');
buildings.forEach(building => {
    building.addEventListener('click', () => {
        const house = building.dataset.house;
        
        // アニメーション効果
        building.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            building.style.animation = '';
        }, 500);
        
        // 将来のページ遷移用
        console.log(`${house}の家がクリックされました`);
        showHouseContent(house);
    });
    
    // ホバー時の効果音（オプション）
    building.addEventListener('mouseenter', () => {
        // 効果音を再生する処理をここに追加可能
    });
});

// 掲示板のクリック処理
const bulletinBoard = document.querySelector('.bulletin-board');
bulletinBoard.addEventListener('click', () => {
    bulletinBoard.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        bulletinBoard.style.animation = '';
    }, 500);
    
    console.log('掲示板がクリックされました');
    showBoardContent();
});

// もけもけキャラクターのインタラクション
const mokemokeResidents = document.querySelectorAll('.mokemoke-resident');
mokemokeResidents.forEach(mokemoke => {
    mokemoke.addEventListener('click', () => {
        mokemoke.style.animation = 'jump 0.5s ease';
        setTimeout(() => {
            mokemoke.style.animation = 'float 3s ease-in-out infinite';
        }, 500);
        
        // ランダムなメッセージを表示
        showMokemokeMessage(mokemoke);
    });
});

// コンテンツ更新関数（将来の実装用）
function updateContent(section) {
    console.log(`${section}セクションに切り替え`);
    // ここに各セクションのコンテンツを動的に読み込む処理を追加
}

// 家のコンテンツ表示関数（将来の実装用）
function showHouseContent(house) {
    if (house === 'music') {
        console.log('音楽の家のコンテンツを表示');
        // 音楽リストの表示処理
    } else if (house === 'game') {
        console.log('ゲームの家のコンテンツを表示');
        // ゲームサマリーの表示処理
    }
}

// 掲示板コンテンツ表示関数（将来の実装用）
function showBoardContent() {
    console.log('掲示板の詳細を表示');
    // 掲示板の詳細表示処理
}

// もけもけメッセージ表示関数
function showMokemokeMessage(mokemoke) {
    const messages = [
        'こんにちは！',
        'いい天気だね〜',
        'また遊びに来てね！',
        'もけもけ〜♪',
        '村へようこそ！'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // メッセージバブルを作成
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = randomMessage;
    bubble.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 8px 16px;
        border-radius: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-size: 14px;
        white-space: nowrap;
        animation: fadeInOut 2s ease;
    `;
    
    mokemoke.appendChild(bubble);
    
    // 2秒後に削除
    setTimeout(() => {
        bubble.remove();
    }, 2000);
}

// アニメーション用のCSS追加
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-30px); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
`;
document.head.appendChild(style);

// パフォーマンス最適化: Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 要素の監視開始
buildings.forEach(building => {
    animationObserver.observe(building);
});

// ページ離脱時の処理
window.addEventListener('beforeunload', () => {
    // 必要に応じてクリーンアップ処理を追加
});

console.log('もけもけの村へようこそ！🌱');