// ==========================================
// ایلام زیبا - اتصال به Supabase
// ==========================================

const SUPABASE_URL =
  "https://wxtxbhdqlyhkrwvacrhq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Ymb2QRMx8OkadUGyZoSifQ_l1-TTvW4";

let supabaseClient = null;


// ==========================================
// بارگذاری کتابخانه Supabase
// ==========================================

const supabaseScript = document.createElement("script");

supabaseScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = function () {

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("✅ Supabase connected");
};

supabaseScript.onerror = function () {

  console.error("❌ Supabase library failed to load");
};

document.head.appendChild(supabaseScript);


// ==========================================
// فرم تماس با ما
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const msg = document.getElementById("contactMsg");

    if (!supabaseClient) {

      msg.textContent =
        "⏳ اتصال به سرور هنوز آماده نیست. چند ثانیه صبر کنید و دوباره امتحان کنید.";

      return;
    }


    const formData = new FormData(contactForm);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");


    if (!name || !message) {

      msg.textContent =
        "⚠️ لطفاً نام و پیام را وارد کنید.";

      return;
    }


    msg.textContent = "⏳ در حال ارسال پیام...";


    try {

      const { error } = await supabaseClient
  .from("Contact")
  .insert([
    {
      name: name,
      email: email || null,
      message: message
    }
  ]);


      if (error) {

        console.error("Supabase Error:", error);

        msg.textContent =
          "❌ خطای Supabase: " +
          error.message;

        return;
      }


      console.log("Message saved:", data);

      msg.textContent =
        "✅ پیام شما با موفقیت ارسال شد.";

      contactForm.reset();

    } catch (err) {

      console.error("Unexpected Error:", err);

      msg.textContent =
        "❌ خطای غیرمنتظره: " +
        err.message;
    }

  });

}
