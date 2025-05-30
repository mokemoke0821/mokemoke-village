// ========================================
// 🍔 ハンバーガーメニュー機能
// ========================================

class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.main-nav');
        this.overlay = document.querySelector('.mobile-overlay');
        this.body = document.body;
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.menuToggle) return;

        // イベントリスナー設定
        this.menuToggle.addEventListener('click', () => this.toggle());
        this.overlay.addEventListener('click', () => this.close());

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // ナビリンククリックでメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.close();
                }
            });
        });

        // リサイズ時の処理
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.menuToggle.classList.add('active');
        this.nav.classList.add('active');
        this.overlay.classList.add('active');
        this.body.classList.add('menu-open');

        // アクセシビリティ
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menuToggle.setAttribute('aria-label', 'メニューを閉じる');

        // フォーカス管理
        this.trapFocus();
    }

    close() {
        this.isOpen = false;
        this.menuToggle.classList.remove('active');
        this.nav.classList.remove('active');
        this.overlay.classList.remove('active');
        this.body.classList.remove('menu-open');

        // アクセシビリティ
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'メニューを開く');
    }

    trapFocus() {
        const focusableElements = this.nav.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // 最初の要素にフォーカス
        firstElement.focus();

        this.nav.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// ローディング処理
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1500);
});

// タッチイベントサポート関数
function addTouchSupport(element, clickHandler) {
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };

    // タッチ開始
    element.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        const touch = e.touches[0];
        touchStartPos = { x: touch.clientX, y: touch.clientY };
        e.preventDefault(); // スクロール防止
    }, { passive: false });

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

            // 移動距離が小さい場合（10px以下）をタップとして処理
            if (distance < 10) {
                clickHandler(e);
            }
        }
        e.preventDefault();
    }, { passive: false });

    // 通常のクリックイベントも追加（デスクトップ対応）
    element.addEventListener('click', (e) => {
        // タッチデバイスでない場合のみクリックイベントを処理
        if (!('ontouchstart' in window)) {
            clickHandler(e);
        }
    });
}

// ナビゲーションの処理
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    const handleNavigation = (e) => {
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
    };

    // タッチサポートを追加
    addTouchSupport(link, handleNavigation);
});

// 建物のクリック処理
const buildings = document.querySelectorAll('.building');
buildings.forEach(building => {
    const handleBuildingClick = () => {
        const house = building.dataset.house;

        // アニメーション効果
        building.style.animation = 'bounce 0.5s ease';

        setTimeout(() => {
            building.style.animation = '';
            // アニメーション後にページ遷移
            navigateToHouse(house);
        }, 500);
    };

    // タッチサポートを追加
    addTouchSupport(building, handleBuildingClick);

    // ホバー時の効果音（デスクトップのみ）
    if (!('ontouchstart' in window)) {
        building.addEventListener('mouseenter', () => {
            // 効果音を再生する処理をここに追加可能
        });
    }
});

// 掲示板のクリック処理
const bulletinBoard = document.querySelector('.bulletin-board');
if (bulletinBoard) {
    const handleBoardClick = () => {
        bulletinBoard.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            bulletinBoard.style.animation = '';
            window.location.href = 'board.html';
        }, 500);
    };

    // タッチサポートを追加
    addTouchSupport(bulletinBoard, handleBoardClick);
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
    const handleMokemokeClick = () => {
        mokemoke.style.animation = 'jump 0.5s ease';
        setTimeout(() => {
            mokemoke.style.animation = 'float 3s ease-in-out infinite';
        }, 500);

        // ランダムなメッセージを表示
        showMokemokeMessage(mokemoke);
    };

    // タッチサポートを追加
    addTouchSupport(mokemoke, handleMokemokeClick);
});

// スクロール位置の管理（モバイル対応）
let ticking = false;
function updateScrollPosition() {
    // スクロール関連の処理
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
}, { passive: true });

// ビューポート変更時の処理
window.addEventListener('resize', () => {
    // 画面回転やサイズ変更時の処理
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}, { passive: true });

// 初期ビューポート設定
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

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
        pointer-events: none;
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
    
    /* タッチフィードバック */
    .building:active,
    .nav-link:active,
    .mokemoke-resident:active,
    .bulletin-board:active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }
    
    /* モバイル専用スタイル */
    @media (max-width: 480px) {
        .message-bubble {
            font-size: 12px !important;
            padding: 6px 12px !important;
            max-width: 150px;
            word-wrap: break-word;
            white-space: normal !important;
        }
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

// ========================================
// 🚀 初期化とスムーズスクロール
// ========================================

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // モバイルメニュー初期化
    new MobileMenu();

    // スムーズスクロール（アンカーリンク用）
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // タッチ最適化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// ========================================
// 📱 タッチ最適化
// ========================================

// タッチフィードバック
document.addEventListener('touchstart', (e) => {
    if (e.target.matches('.nav-link, .building, button')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.matches('.nav-link, .building, button')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// パフォーマンス最適化
const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// スクロールイベント最適化
let ticking2 = false;
const handleScroll2 = () => {
    if (!ticking2) {
        requestAnimationFrame(() => {
            // スクロール関連の処理をここに追加
            ticking2 = false;
        });
        ticking2 = true;
    }
};

window.addEventListener('scroll', handleScroll2);

// ページ離脱時の処理
window.addEventListener('beforeunload', () => {
    // 必要に応じてクリーンアップ処理を追加
});

console.log('もけもけの村へようこそ！🌱 (ハンバーガーメニュー対応版)');