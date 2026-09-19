const SUPABASE_URL =
  "https://wxtxbhdqlyhkrwvacrhq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Ymb2QRMx8OkadUGyZoSifQ_l1-TTvV4";

let supabaseClient = null;

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


// ===============================
// فرم تماس
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const msg = document.getElementById("contactMsg");

    if (!supabaseClient) {
      msg.textContent =
        "⏳ لطفاً چند لحظه صبر کنید و دوباره امتحان کنید.";
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

    msg.textContent = "⏳ در حال ارسال...";

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
          "❌ خطای Supabase: " + error.message;

        return;
      }

      msg.textContent =
        "✅ پیام شما با موفقیت ارسال شد.";

      contactForm.reset();

    } catch (error) {

      console.error("Unexpected Error:", error);

      msg.textContent =
        "❌ خطای غیرمنتظره: " + error.message;
    }

  });
}
