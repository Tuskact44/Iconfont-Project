// script.js
document.addEventListener('DOMContentLoaded', function() {
  // 1. 导航栏active切换
  initNavToggle();

  // 2. 搜索栏tab切换
  initSearchTabToggle();

  // 3. 平台介绍标签切换
  initIntroTabToggle();

  // 4. 视频卡片悬浮播放/暂停
  initVideoHoverControl();

  // 5. 回到顶部功能
  initBackToTop();

  // 6. 悬浮按钮显示/隐藏
  initFloatBtnScroll();

  // 7. 购物车弹窗控制
  initCartModal();

  // 8. 素材瀑布流按钮切换
  initMaterialTabToggle();
});

// 1. 导航栏切换
function initNavToggle() {
  const navItems = document.querySelectorAll('.nav-item');
  if (!navItems.length) return;

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// 2. 搜索栏tab切换
function initSearchTabToggle() {
  const searchTabs = document.querySelectorAll('.search-tab');
  if (!searchTabs.length) return;

  searchTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      searchTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// 3. 平台介绍标签切换
function initIntroTabToggle() {
  const introTabs = document.querySelectorAll('.intro-tab');
  if (!introTabs.length) return;

  introTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      introTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// 4. 视频卡片悬浮控制
function initVideoHoverControl() {
  const toolVideos = document.querySelectorAll('.tool-card video');
  if (!toolVideos.length) return;

  toolVideos.forEach(video => {
    // 视频需设置muted属性才能自动播放
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
  });
}

// 5. 回到顶部
function initBackToTop() {
  const backTopBtn = document.querySelector('.float-btn[title="回到顶部"]');
  if (!backTopBtn) return;

  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 6. 悬浮按钮滚动显示/隐藏
function initFloatBtnScroll() {
  const floatBtns = document.querySelectorAll('.float-btn');
  if (!floatBtns.length) return;

  const scrollThreshold = 200;
  // 初始隐藏
  floatBtns.forEach(btn => btn.style.display = 'none');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    floatBtns.forEach(btn => {
      btn.style.display = scrollTop > scrollThreshold ? 'flex' : 'none';
    });
  });
}

// 7. 购物车弹窗
function initCartModal() {
  const sidebarCartBtn = document.querySelector('.float-buttons .float-btn.first');
  const cartModalOverlay = document.querySelector('.cart-modal-overlay');
  const cartCloseBtn = document.querySelector('.cart-close');

  if (!sidebarCartBtn || !cartModalOverlay || !cartCloseBtn) return;

  const openModal = () => {
    cartModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    cartModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  sidebarCartBtn.addEventListener('click', openModal);
  cartCloseBtn.addEventListener('click', closeModal);
  
  // 点击遮罩关闭
  cartModalOverlay.addEventListener('click', (e) => {
    if (e.target === cartModalOverlay) closeModal();
  });
  
  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

// 8. 素材瀑布流按钮切换（核心功能）
function initMaterialTabToggle() {
  const materialTabs = document.querySelectorAll('.material-tab');
  if (!materialTabs.length) return;

  materialTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      materialTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
