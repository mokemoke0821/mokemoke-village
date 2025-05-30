// ========================================
// 🍔 ハンバーガーメニュー機能 - 統一実装
// ========================================

class MobileMenu {
    constructor() {
        this.menuToggle = null;
        this.nav = null;
        this.overlay = null;
        this.body = document.body;
        this.isOpen = false;
        this.isInitialized = false;

        this.init();
    }

    init() {
        // DOM要素の取得を確実に行う
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.main-nav');
        this.overlay = document.querySelector('.mobile-overlay');

        console.log('🍔 MobileMenu初期化開始');
        console.log('Menu Toggle:', this.menuToggle);
        console.log('Navigation:', this.nav);
        console.log('Overlay:', this.overlay);

        if (!this.menuToggle || !this.nav || !this.overlay) {
            console.error('❌ 必要な要素が見つかりません');
            return;
        }

        this.setupEventListeners();
        this.setupMobileStyles();
        this.isInitialized = true;
        console.log('✅ MobileMenu初期化完了');
    }

    setupEventListeners() {
        // メニューボタンクリック
        this.menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 メニューボタンクリック');
            this.toggle();
        });

        // オーバーレイクリック
        this.overlay.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🌫️ オーバーレイクリック');
            this.close();
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                console.log('⌨️ ESCキーでメニューを閉じる');
                this.close();
            }
        });

        // ナビリンククリックでメニューを閉じる
        const navLinks = this.nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // モバイルメニューが開いている場合のみ処理
                if (window.innerWidth <= 768 && this.isOpen) {
                    console.log('🔗 ナビリンククリックでメニューを閉じる');
                    // メニューを閉じる（遷移は自然に任せる）
                    setTimeout(() => {
                        this.close();
                    }, 100); // 少し遅延させて確実な遷移を保証
                }
            });
        });

        // リサイズ時の処理
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                console.log('📏 リサイズでメニューを閉じる');
                this.close();
            }
        });
    }

    setupMobileStyles() {
        // モバイル用CSSが確実に適用されるよう強制設定
        if (window.innerWidth <= 768) {
            // ハンバーガーメニューボタンを表示
            this.menuToggle.style.display = 'flex';

            // ナビゲーションの初期状態を設定
            this.nav.style.position = 'fixed';
            this.nav.style.top = '0';
            this.nav.style.right = '-280px';
            this.nav.style.width = '280px';
            this.nav.style.height = '100vh';
            this.nav.style.zIndex = '1000';
            this.nav.style.transition = 'right 0.3s ease';
            this.nav.style.background = 'linear-gradient(135deg, #ffffff 0%, #e8f5e8 100%)';
            this.nav.style.boxShadow = '-4px 0 20px rgba(0, 0, 0, 0.15)';
            this.nav.style.paddingTop = '80px';
            this.nav.style.overflowY = 'auto';
        }
    }

    toggle() {
        console.log('🔄 メニュートグル - 現在の状態:', this.isOpen);
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        console.log('🟢 メニューを開く');
        this.isOpen = true;

        // ボタンのアクティブ状態
        this.menuToggle.classList.add('active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menuToggle.setAttribute('aria-label', 'メニューを閉じる');

        // ナビゲーションを表示
        this.nav.classList.add('active');
        this.nav.style.right = '0';

        // オーバーレイを表示
        this.overlay.classList.add('active');
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';

        // ボディスクロールを防ぐ
        this.body.classList.add('menu-open');
        this.body.style.overflow = 'hidden';

        // ナビリンクアニメーション
        this.animateNavLinks();
    }

    close() {
        console.log('🔴 メニューを閉じる');
        this.isOpen = false;

        // ボタンのアクティブ状態を解除
        this.menuToggle.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'メニューを開く');

        // ナビゲーションを隠す
        this.nav.classList.remove('active');
        this.nav.style.right = '-280px';

        // オーバーレイを隠す
        this.overlay.classList.remove('active');
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';

        // ボディスクロールを復元
        this.body.classList.remove('menu-open');
        this.body.style.overflow = '';
    }

    animateNavLinks() {
        const navLinks = this.nav.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            // アニメーションをリセット
            link.style.transform = 'translateX(20px)';
            link.style.opacity = '0';

            // 段階的にアニメーション
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.transform = 'translateX(0)';
                link.style.opacity = '1';
            }, index * 100);
        });
    }
}

// グローバル変数として保持
let mobileMenuInstance = null;

// ローディング処理
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1500);
});

// タッチイベントサポート関数（統一版への差し替え）
function addTouchSupport(element, clickHandler) {
    // 後方互換性のため、統一版を呼び出す
    if (clickHandler) {
        console.log('⚠️ 古いaddTouchSupport呼び出し - 統一版に変換');
        element.addEventListener('click', clickHandler);
    }
    addUniversalTouchSupport(element);
}

// ナビゲーションの処理を統一
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const handleNavigation = (e) => {
            const href = link.getAttribute('href');

            console.log('🔗 ナビリンククリック:', href);

            // モバイルメニューが開いている場合は閉じる
            if (mobileMenuInstance && mobileMenuInstance.isOpen) {
                console.log('📱 モバイルメニューを閉じる');
                mobileMenuInstance.close();
            }

            // アンカーリンク（#）の場合のみ特別処理
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId === 'home') {
                    e.preventDefault();
                    // ホームページにスクロール
                    const villageMap = document.querySelector('.village-map');
                    if (villageMap) {
                        villageMap.scrollIntoView({ behavior: 'smooth' });
                    }
                    return;
                }
            }

            // 通常のリンク（.html）の場合は自然な遷移を許可
            // preventDefault() は呼ばない

            // アクティブクラスの切り替え
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        };

        // 通常のクリックイベントも追加（より確実）
        link.addEventListener('click', handleNavigation);

        // タッチサポートを追加（補助的）
        addTouchSupport(link, handleNavigation);
    });
}

// 建物のクリック処理
const buildings = document.querySelectorAll('.building');

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
    console.log('📱 DOM読み込み完了 - 初期化開始');
    console.log('画面幅:', window.innerWidth);
    console.log('デバイス判定:', window.innerWidth <= 768 ? 'モバイル' : 'デスクトップ');
    console.log('現在のページ:', window.location.pathname);

    // モバイルメニューの初期化
    try {
        if (!mobileMenuInstance) {
            mobileMenuInstance = new MobileMenu();
            console.log('✅ MobileMenu インスタンス作成完了');
        }
    } catch (error) {
        console.error('❌ MobileMenu初期化エラー:', error);
    }

    // ナビゲーション処理の初期化（すべてのページで統一）
    initUniversalNavigation();
    console.log('🧭 統一ナビゲーション初期化完了');

    // ビューポート高さ調整（モバイル対応）
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();

    // リサイズ時のビューポート調整
    window.addEventListener('resize', () => {
        setViewportHeight();

        // モバイルメニューが初期化されている場合の処理
        if (mobileMenuInstance && mobileMenuInstance.isInitialized) {
            mobileMenuInstance.setupMobileStyles();
        }
    }, { passive: true });

    // タッチデバイス判定
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        console.log('📱 タッチデバイスとして認識');
    }

    // iOS Safari対応
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        console.log('🍎 iOS Safari対応を適用');
        // 仮想キーボード対応
        window.addEventListener('scroll', () => {
            if (document.activeElement &&
                (document.activeElement.tagName === 'INPUT' ||
                    document.activeElement.tagName === 'TEXTAREA')) {
                setTimeout(() => {
                    document.activeElement.scrollIntoView({
                        block: 'center',
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }, { passive: true });
    }

    // スムーズスクロール（アンカーリンク用）
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

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

    console.log('✅ 初期化処理完了');
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

// 統一ナビゲーション処理（全ページ対応）
function initUniversalNavigation() {
    console.log('🔗 統一ナビゲーション初期化開始');

    // すべてのナビリンクを取得
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('発見されたナビリンク数:', navLinks.length);

    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`リンク${index + 1}: ${href}`);

        // クリックイベントを追加
        link.addEventListener('click', (e) => {
            console.log('🔗 ナビリンククリック:', href);

            // モバイルメニューが開いている場合は閉じる
            if (mobileMenuInstance && mobileMenuInstance.isOpen) {
                console.log('📱 モバイルメニューを閉じる');
                mobileMenuInstance.close();
            }

            // アンカーリンク（#）の場合のみ特別処理
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId === 'home') {
                    e.preventDefault();
                    // ホームページにスクロール
                    const villageMap = document.querySelector('.village-map');
                    if (villageMap) {
                        villageMap.scrollIntoView({ behavior: 'smooth' });
                    }
                    return;
                }
            }

            // .htmlリンクの場合は自然な遷移を許可
            // preventDefault()は呼ばない

            // アクティブクラスの切り替え
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });

        // タッチサポートも追加
        addUniversalTouchSupport(link);
    });

    // 戻るボタンの処理も統一
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        console.log('🔙 戻るボタンが見つかりました');
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔙 戻るボタンクリック - index.htmlに遷移');
            window.location.href = 'index.html';
        });
        addUniversalTouchSupport(backBtn);
    }
}

// 統一タッチサポート（競合を避ける）
function addUniversalTouchSupport(element) {
    if (!element || element.hasAttribute('data-touch-initialized')) {
        return; // 既に初期化済みの場合は重複を避ける
    }

    element.setAttribute('data-touch-initialized', 'true');

    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    let touchHandled = false;

    // タッチ開始
    element.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        const touch = e.touches[0];
        touchStartPos = { x: touch.clientX, y: touch.clientY };
        touchHandled = false;
    }, { passive: true });

    // タッチ終了
    element.addEventListener('touchend', (e) => {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        // 短時間のタッチ（300ms以下）をタップとして処理
        if (touchDuration < 300 && !touchHandled) {
            const touch = e.changedTouches[0];
            const touchEndPos = { x: touch.clientX, y: touch.clientY };
            const distance = Math.sqrt(
                Math.pow(touchEndPos.x - touchStartPos.x, 2) +
                Math.pow(touchEndPos.y - touchStartPos.y, 2)
            );

            // 移動距離が小さい場合（15px以下）をタップとして処理
            if (distance < 15) {
                touchHandled = true;
                console.log('📱 統一タッチタップ検出');
                // タッチの場合は自然なクリックイベントに任せる
                element.click();
                e.preventDefault();
            }
        }
    }, { passive: false });
}