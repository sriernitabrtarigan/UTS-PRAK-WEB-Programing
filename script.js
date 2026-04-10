function pesanSekarang() {
  document.getElementById('menu').scrollIntoView({
    behavior: 'smooth',
  });
}

// ✅ VALIDASI FORM
const form = document.getElementById('registerForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const telepon = document.getElementById('telepon');

  let valid = true;

  // reset error
  document.querySelectorAll('.error').forEach((el) => (el.innerText = ''));

  if (nama.value.length < 3) {
    nama.nextElementSibling.innerText = 'Nama minimal 3 karakter';
    valid = false;
  }

  if (!email.value.includes('@')) {
    email.nextElementSibling.innerText = 'Email tidak valid';
    valid = false;
  }

  if (password.value.length < 6) {
    password.nextElementSibling.innerText = 'Password minimal 6 karakter';
    valid = false;
  }

  if (telepon.value.length < 10) {
    telepon.nextElementSibling.innerText = 'No telepon tidak valid';
    valid = false;
  }

  if (valid) {
    alert('Registrasi berhasil! 🎉');
    form.reset();
  }
});

// ✨ ANIMASI CARD PAS SCROLL
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  cards.forEach((card) => {
    const posisi = card.getBoundingClientRect().top;
    const tinggiLayar = window.innerHeight;

    if (posisi < tinggiLayar - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});

// ambil elemen
const addBtn = document.getElementById('addItem');
const itemList = document.getElementById('itemList');
const totalText = document.getElementById('orderTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

let total = 0;

// ➕ TAMBAH ITEM
addBtn.addEventListener('click', () => {
  const nama = document.getElementById('itemName').value;
  const harga = parseInt(document.getElementById('itemHarga').value);

  if (nama === '' || isNaN(harga)) {
    alert('Isi nama dan harga dulu!');
    return;
  }

  // buat list baru
  const li = document.createElement('li');
  li.innerHTML = `
    ${nama} - Rp ${harga.toLocaleString()}
    <button class="delete-btn">Hapus</button>
  `;

  // tombol hapus
  li.querySelector('.delete-btn').addEventListener('click', () => {
    total -= harga;
    updateTotal();
    li.remove();
  });

  // tambah ke list
  itemList.appendChild(li);

  // update total
  total += harga;
  updateTotal();

  // reset input
  document.getElementById('itemName').value = '';
  document.getElementById('itemHarga').value = '';
});

// 🔄 UPDATE TOTAL
function updateTotal() {
  totalText.innerHTML = '<b>Total: Rp ' + total.toLocaleString() + '</b>';
}

// 💳 CHECKOUT
checkoutBtn.addEventListener('click', () => {
  if (total === 0) {
    alert('Belum ada pesanan!');
  } else {
    alert('Total pembayaran: Rp ' + total.toLocaleString() + '\nTerima kasih sudah memesan 😄');
  }
});

document.querySelectorAll('.card').forEach((card) => {
  let count = 0;

  const minus = card.querySelector('.minus');
  const plus = card.querySelector('.plus');
  const jumlah = card.querySelector('.jumlah');

  plus.addEventListener('click', () => {
    count++;
    jumlah.textContent = count;
  });

  minus.addEventListener('click', () => {
    if (count > 0) {
      count--;
      jumlah.textContent = count;
    }
  });
});
