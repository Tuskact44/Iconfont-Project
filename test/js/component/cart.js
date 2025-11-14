// 1. 初始化购物车数据（localStorage）
function getCartData() {
  return JSON.parse(localStorage.getItem('iconCart')) || [];
}

// 2. 保存购物车数据
function saveCartData(cart) {
  localStorage.setItem('iconCart', JSON.stringify(cart));
  syncCartCount(); // 同步导航栏购物车数量
}

// 3. 渲染购物车列表
function renderCartList() {
  const cart = getCartData();
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const selectAllBtn = document.getElementById('select-all');
  const batchDeleteBtn = document.getElementById('batch-delete');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="empty-cart">
        <img src="../assets/images/empty-cart.png" alt="空购物车">
        <p>购物车是空的~快去添加图标吧！</p>
        <a href="index.html" class="btn-go-shopping">去选图标</a>
      </div>
    `;
    cartTotal.innerHTML = '<span>合计：</span>¥0.00';
    selectAllBtn.disabled = true;
    batchDeleteBtn.disabled = true;
    checkoutBtn.disabled = true;
    return;
  }

  // 渲染购物车项
  let totalPrice = 0;
  cartList.innerHTML = cart.map((item, index) => {
    const itemPrice = 2; // 模拟单价：2元/个图标
    totalPrice += itemPrice * item.quantity;
    return `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-select">
          <input type="checkbox" class="item-select" checked>
        </div>
        <div class="cart-item-icon">
          <img src="${item.thumbnail}" alt="${item.name}">
          <a href="icon-detail.html?id=${item.id}" class="item-name">${item.name}</a>
        </div>
        <div class="cart-item-format">${item.format}</div>
        <div class="cart-item-size">${item.size}px</div>
        <div class="cart-item-price">¥${itemPrice.toFixed(2)}</div>
        <div class="cart-item-quantity">
          <button class="quantity-minus" data-index="${index}">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1">
          <button class="quantity-plus" data-index="${index}">+</button>
        </div>
        <div class="cart-item-total">¥${(itemPrice * item.quantity).toFixed(2)}</div>
        <div class="cart-item-delete">
          <button class="btn-delete-item" data-index="${index}">删除</button>
        </div>
      </div>
    `;
  }).join('');

  // 渲染合计金额
  cartTotal.innerHTML = `<span>合计：</span>¥${totalPrice.toFixed(2)}`;

  // 启用按钮
  selectAllBtn.disabled = false;
  batchDeleteBtn.disabled = false;
  checkoutBtn.disabled = false;

  // 绑定购物车操作事件（数量修改/删除/选择）
  bindCartItemEvents();
}

// 4. 结算功能
document.getElementById('checkout-btn').addEventListener('click', () => {
  const cart = getCartData();
  if (cart.length === 0) return;

  // 生成随机订单号
  const orderId = 'ICON' + Date.now() + Math.floor(Math.random() * 1000);
  // 清空购物车
  saveCartData([]);
  // 显示结算成功弹窗
  document.getElementById('checkout-modal').style.display = 'block';
  document.getElementById('order-id').textContent = orderId;
  // 重新渲染购物车
  renderCartList();
});

// 5. 页面加载时渲染购物车
window.addEventListener('load', renderCartList);