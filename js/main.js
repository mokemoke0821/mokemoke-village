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
        const href = link.getAttribute('href');

        // 実際のページへのリンクの場合はそのまま遷移
        if (href === '#home') {
            e.preventDefault();
            // ホーム（現在のページ）にいるのでスクロールだけ
            document.querySelector('.village-map').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (href === '#music') {
            e.preventDefault();
            window.location.href = 'piano.html';
        } else if (href === '#game') {
            e.preventDefault();
            window.location.href = 'games.html';
        } else if (href === '#board') {
            e.preventDefault();
            window.location.href = 'board.html';
        }

        // アクティブクラスの切り替え
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
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
            // アニメーション後にページ遷移
            navigateToHouse(house);
        }, 500);
    });

    // ホバー時の効果音（オプション）
    building.addEventListener('mouseenter', () => {
        // 効果音を再生する処理をここに追加可能
    });
});

// 掲示板のクリック処理
const bulletinBoard = document.querySelector('.bulletin-board');
if (bulletinBoard) {
    bulletinBoard.addEventListener('click', () => {
        bulletinBoard.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            bulletinBoard.style.animation = '';
            window.location.href = 'board.html';
        }, 500);
    });
}

// 家への遷移処理
function navigateToHouse(house) {
    if (house === 'music') {
        window.location.href = 'piano.html';
    } else if (house === 'game') {
        window.location.href = 'games.html';
    }
}

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

// もけもけメッセージ表示関数
function showMokemokeMessage(mokemoke) {
    const messages = [
        'こんにちは！',
        'いい天気だね〜',
        'また遊びに来てね！',
        'もけもけ〜♪',
        '村へようこそ！',
        '音楽の家で曲を聴こう♪',
        'ゲームの家で遊ぼう！',
        '掲示板をチェックしてね📋'
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
        border: 2px solid var(--pixel-border);
        box-shadow: 3px 3px 0px var(--pixel-border);
        font-size: 14px;
        font-family: var(--font-main);
        white-space: nowrap;
        animation: fadeInOut 3s ease;
        z-index: 1000;
    `;

    mokemoke.appendChild(bubble);

    // 3秒後に削除
    setTimeout(() => {
        if (bubble.parentElement) {
            bubble.remove();
        }
    }, 3000);
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
        15%, 85% { opacity: 1; transform: translateX(-50%) translateY(0); }
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