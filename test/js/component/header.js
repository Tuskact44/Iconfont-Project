// 1. 搜索联想提示（监听输入事件）
const searchInput = document.getElementById('search-input');
const searchSuggest = document.getElementById('search-suggest');
const iconData = window.mockIconData; // 从mock-data.js获取模拟图标数据

searchInput.addEventListener('input', (e) => {
  const key = e.target.value.trim().toLowerCase();
  if (!key) {
    searchSuggest.style.display = 'none';
    return;
  }
  // 匹配图标名称/标签包含关键词的结果
  const matchIcons = iconData.filter(icon => 
    icon.name.toLowerCase().includes(key) || 
    icon.tags.some(tag => tag.includes(key))
  ).slice(0, 5); // 最多显示5条联想结果

  if (matchIcons.length === 0) {
    searchSuggest.innerHTML = '<div class="no-suggest">暂无匹配结果</div>';
  } else {
    let suggestHtml = matchIcons.map(icon => `
      <a href="icon-detail.html?id=${icon.id}" class="suggest-item">
        <img src="${icon.thumbnail}" alt="${icon.name}">
        <span>${icon.name}</span>
        <span class="author">${icon.author}</span>
      </a>
    `).join('');
    searchSuggest.innerHTML = suggestHtml;
  }
  searchSuggest.style.display = 'block';
});

// 2. 同步购物车数量（从localStorage获取）
function syncCartCount() {
  const cart = JSON.parse(localStorage.getItem('iconCart')) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}
// 页面加载时同步
window.addEventListener('load', syncCartCount);