const SUPABASE_URL = 'https://wxtxbhdqlyhkrwvacrhq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Ymb2QRMx8OkadUGyZoSifQ_l1-TTvW4';

document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(this));

  const response = await fetch(`${SUPABASE_URL}/rest/v1/Contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });

  const msg = document.getElementById('msg');

  if (response.ok) {
    msg.textContent = 'اطلاعات با موفقیت ارسال شد.';
    this.reset();
  } else {
    msg.textContent = 'خطا در ارسال اطلاعات.';
    console.error(await response.text());
  }
});
