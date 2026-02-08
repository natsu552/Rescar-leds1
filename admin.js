import { supabase } from './supabase.js';

// ELEMENTOS
const productsList = document.getElementById('products-list');
const editPanel = document.getElementById('edit-panel');
const closePanelBtn = document.getElementById('close-panel');
const editForm = document.getElementById('edit-form');

const editName = document.getElementById('edit-name');
const editPrice = document.getElementById('edit-price');
const editOldPrice = document.getElementById('edit-old-price');
const editPromoActive = document.getElementById('edit-promo-active');
const editImages = document.getElementById('edit-images');

let currentProductId = null;

// =====================
// CARREGAR PRODUTOS
// =====================
async function loadProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erro ao carregar produtos:', error);
        return;
    }

    productsList.innerHTML = '';

    data.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <h3>${product.name}</h3>
            <span class="product-price">
                R$ ${Number(product.price || 0).toFixed(2)}
            </span>
            ${product.promo_active ? '<small style="color:#FF7700;">🔥 Em Promoção</small>' : ''}
        `;

        card.onclick = () => openPanel(product);
        productsList.appendChild(card);
    });
}

// =====================
// ABRIR PAINEL
// =====================
function openPanel(product) {
    currentProductId = product.id;

    editName.value = product.name || '';
    editPrice.value = product.price || '';
    editOldPrice.value = product.old_price || '';
    editPromoActive.checked = product.promo_active || false;
    editImages.value = (product.images || []).join(',');

    editPanel.style.transform = 'translateX(0)';
}

// =====================
// FECHAR PAINEL
// =====================
closePanelBtn.onclick = () => {
    editPanel.style.transform = 'translateX(100%)';
};

// =====================
// SALVAR ALTERAÇÕES
// =====================
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentProductId) return;

    const updatedProduct = {
        name: editName.value,
        price: Number(editPrice.value),
        old_price: editOldPrice.value ? Number(editOldPrice.value) : null,
        promo_active: editPromoActive.checked,
        images: editImages.value
            ? editImages.value.split(',').map(i => i.trim())
            : []
    };

    const { error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', currentProductId);

    if (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar produto!');
        return;
    }

    alert('Produto atualizado com sucesso!');
    editPanel.style.transform = 'translateX(100%)';
    loadProducts();
});

// =====================
// INICIALIZAÇÃO
// =====================
loadProducts();