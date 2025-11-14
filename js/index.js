// 等待DOM完全加载后执行所有逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 1. 导航栏active切换
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 2. 搜索栏tab切换
  const searchTabs = document.querySelectorAll('.search-tab');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      searchTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 3. 平台介绍标签切换（使用指南/素材资产）
  const introTabs = document.querySelectorAll('.intro-tab');
  introTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      introTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      // 若需切换内容，可在此处添加DOM切换逻辑
    });
  });

  // 4. 视频卡片悬浮播放/暂停
  const toolVideos = document.querySelectorAll('.tool-card video');
  toolVideos.forEach(video => {
    video.addEventListener('mouseenter', function() {
      this.play();
    });
    video.addEventListener('mouseleave', function() {
      this.pause();
    });
  });

  // 5. 回到顶部功能
  const backTopBtn = document.querySelector('.float-btn[title="回到顶部"]');
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 6. 悬浮按钮显示/隐藏（滚动触发）
  const floatBtns = document.querySelectorAll('.float-btn');
  const scrollThreshold = 200; // 滚动阈值：300px

  // 初始隐藏悬浮按钮
  floatBtns.forEach(btn => {
    btn.style.display = 'none';
  });

  // 滚动监听控制显示/隐藏
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > scrollThreshold) {
      floatBtns.forEach(btn => {
        btn.style.display = 'flex'; // 显示按钮
      });
    } else {
      floatBtns.forEach(btn => {
        btn.style.display = 'none'; // 隐藏按钮
      });
    }
  });
});


    // 侧边栏购物车按钮点击弹出弹窗
document.addEventListener('DOMContentLoaded', function() {
  // 获取侧边栏购物车按钮（假设类名为"float-btn.first"）
  const sidebarCartBtn = document.querySelector('.float-buttons .float-btn.first');
  // 弹窗遮罩层
  const cartModalOverlay = document.querySelector('.cart-modal-overlay');
  // 弹窗关闭按钮
  const cartCloseBtn = document.querySelector('.cart-close');

  // 打开弹窗
  function openCartModal() {
    cartModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
  }

  // 关闭弹窗
  function closeCartModal() {
    cartModalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // 恢复背景滚动
  }

  // 侧边栏购物车按钮点击事件
  sidebarCartBtn.addEventListener('click', openCartModal);

  // 关闭按钮点击事件
  cartCloseBtn.addEventListener('click', closeCartModal);

  // 点击遮罩层空白处关闭弹窗
  cartModalOverlay.addEventListener('click', function(e) {
    if (e.target === cartModalOverlay) {
      closeCartModal();
    }
  });

  // ESC键关闭弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartModalOverlay.classList.contains('active')) {
      closeCartModal();
    }
  });
});