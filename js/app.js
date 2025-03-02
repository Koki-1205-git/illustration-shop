document.addEventListener('DOMContentLoaded', function() {
    // ギャラリーアイテムのデータ
    const galleryItems = [
        {
            id: 1,
            title: 'ファンタジーの世界',
            artist: '佐藤 花子',
            price: '¥12,000',
            image: 'https://via.placeholder.com/400x300',
            category: 'digital'
        },
        {
            id: 2,
            title: '青い惑星',
            artist: '田中 太郎',
            price: '¥8,500',
            image: 'https://via.placeholder.com/400x300',
            category: 'digital'
        },
        {
            id: 3,
            title: '夕暮れの街',
            artist: '鈴木 一郎',
            price: '¥15,000',
            image: 'https://via.placeholder.com/400x300',
            category: 'traditional'
        },
        {
            id: 4,
            title: '謎の少女',
            artist: '高橋 実',
            price: '¥9,800',
            image: 'https://via.placeholder.com/400x300',
            category: 'character'
        },
        {
            id: 5,
            title: '春の庭',
            artist: '伊藤 美咲',
            price: '¥11,200',
            image: 'https://via.placeholder.com/400x300',
            category: 'traditional'
        },
        {
            id: 6,
            title: 'サイバーパンク',
            artist: '渡辺 健太',
            price: '¥13,500',
            image: 'https://via.placeholder.com/400x300',
            category: 'digital'
        },
        {
            id: 7,
            title: 'ヒーローズ',
            artist: '山田 隆',
            price: '¥9,000',
            image: 'https://via.placeholder.com/400x300',
            category: 'character'
        },
        {
            id: 8,
            title: '古き良き時代',
            artist: '小林 和子',
            price: '¥10,500',
            image: 'https://via.placeholder.com/400x300',
            category: 'traditional'
        }
    ];

    // アーティストのデータ
    const artists = [
        {
            id: 1,
            name: '佐藤 花子',
            specialty: 'デジタルアート',
            bio: '10年以上のデジタルアート経験を持つイラストレーター。ファンタジーとSF作品を得意とする。',
            image: 'https://via.placeholder.com/300x300'
        },
        {
            id: 2,
            name: '田中 太郎',
            specialty: '風景画',
            bio: '自然をテーマにした作品を多く手がける。水彩からデジタルまで幅広い技法を使いこなす。',
            image: 'https://via.placeholder.com/300x300'
        },
        {
            id: 3,
            name: '鈴木 一郎',
            specialty: '伝統的日本画',
            bio: '伝統的な日本画の技法を現代的な題材に応用し、独自のスタイルを確立している。',
            image: 'https://via.placeholder.com/300x300'
        },
        {
            id: 4,
            name: '高橋 実',
            specialty: 'キャラクターデザイン',
            bio: 'アニメや漫画のキャラクターデザインを得意とする。独特の表現力で人気を集めている。',
            image: 'https://via.placeholder.com/300x300'
        }
    ];

    // ギャラリーアイテムを表示する関数
    function renderGalleryItems(items) {
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.innerHTML = '';

        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.dataset.category = item.category;

            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-artist">${item.artist}</p>
                    <p class="gallery-item-price">${item.price}</p>
                </div>
                <div class="gallery-item-overlay">
                    <a href="#" class="gallery-item-btn" data-id="${item.id}">詳細を見る</a>
                </div>
            `;

            galleryContainer.appendChild(galleryItem);
        });

        // 詳細ボタンのイベントリスナーを追加
        document.querySelectorAll('.gallery-item-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const itemId = this.dataset.id;
                alert(`作品ID: ${itemId} の詳細ページは開発中です。`);
            });
        });
    }

    // アーティストを表示する関数
    function renderArtists(artistList) {
        const artistsContainer = document.querySelector('.artists-container');
        artistsContainer.innerHTML = '';

        artistList.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');

            artistCard.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}" class="artist-img">
                <div class="artist-info">
                    <h3 class="artist-name">${artist.name}</h3>
                    <p class="artist-specialty">${artist.specialty}</p>
                    <p class="artist-bio">${artist.bio}</p>
                    <a href="#" class="artist-link" data-id="${artist.id}">作品を見る</a>
                </div>
            `;

            artistsContainer.appendChild(artistCard);
        });

        // アーティストリンクのイベントリスナーを追加
        document.querySelectorAll('.artist-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const artistId = this.dataset.id;
                // アーティストの作品をフィルタリング
                const artistWorks = galleryItems.filter(item => {
                    const artistName = artists.find(a => a.id == artistId).name;
                    return item.artist === artistName;
                });
                renderGalleryItems(artistWorks);
                
                // ギャラリーセクションにスクロール
                document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
                
                // フィルターボタンのアクティブ状態をリセット
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            });
        });
    }

    // フィルターボタンのイベントリスナーを設定
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.dataset.filter;
                
                // アクティブクラスを切り替え
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // フィルタリング
                if (filterValue === 'all') {
                    renderGalleryItems(galleryItems);
                } else {
                    const filteredItems = galleryItems.filter(item => item.category === filterValue);
                    renderGalleryItems(filteredItems);
                }
            });
        });
    }
    
    // もっと見るボタンの機能（デモ用）
    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more');
        loadMoreBtn.addEventListener('click', function() {
            alert('追加の作品は現在準備中です。');
        });
    }
    
    // お問い合わせフォームの送信処理
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // フォームデータの取得
                const formData = {
                    name: this.querySelector('#name').value,
                    email: this.querySelector('#email').value,
                    subject: this.querySelector('#subject').value,
                    message: this.querySelector('#message').value
                };
                
                // ここで実際のメール送信処理を行う（サーバーサイドのコード必要）
                console.log('送信されたデータ:', formData);
                
                // 送信完了メッセージ
                alert('お問い合わせありがとうございます。運営チームより折り返しご連絡いたします。');
                
                // フォームのリセット
                this.reset();
            });
        }
    }
    
    // ニュースレター登録フォームの処理
    function setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('input[type="email"]').value;
                
                // ここで実際の処理を行う（サーバーサイドのコード必要）
                console.log('登録メールアドレス:', email);
                
                // 登録完了メッセージ
                alert('ニュースレターにご登録いただきありがとうございます！');
                
                // フォームのリセット
                this.reset();
            });
        }
    }
    
    // カートアイコンのクリックイベント
    function setupCartIcon() {
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('カート機能は開発中です。');
            });
        }
    }
    
    // ログインボタンのクリックイベント
    function setupLoginBtn() {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('ログイン機能は開発中です。');
            });
        }
    }
    
    // スムーズスクロール
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') { // '#'だけの場合は処理しない
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // 初期化関数
    function init() {
        renderGalleryItems(galleryItems);
        renderArtists(artists);
        setupFilters();
        setupLoadMore();
        setupContactForm();
        setupNewsletterForm();
        setupCartIcon();
        setupLoginBtn();
        setupSmoothScroll();
    }

    // ページ読み込み時に初期化を実行
    init();
});