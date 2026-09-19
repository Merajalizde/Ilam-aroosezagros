// ===============================
// ILAM BEAUTIFUL - SUPABASE
// ===============================

const SUPABASE_URL = "https://wxtxbhdqlyhkrwvacrhq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Ymb2QRMx8OkadUGyZoSifQ_l1-TTvV4";

let supabaseClient = null;


// -------------------------------
// Load Supabase
// -------------------------------

const supabaseScript = document.createElement("script");

supabaseScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = () => {

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("Supabase connected successfully");
};

supabaseScript.onerror = () => {
  console.error("Supabase library could not be loaded.");
};

document.head.appendChild(supabaseScript);


// -------------------------------
// Contact Form
// -------------------------------

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const msg = document.getElementById("contactMsg");

    if (!supabaseClient) {
      msg.textContent = "⏳ لطفاً چند لحظه صبر کنید و دوباره تلاش کنید.";
      return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    msg.textContent = "⏳ در حال ارسال...";

    const { error } = await supabaseClient
      .from("Contact")
      .insert([
        {
          name: name,
          email: email,
          message: message
        }
      ]);

    if (error) {

      console.error(error);

      msg.textContent =
        "❌ ارسال پیام انجام نشد. لطفاً دوباره تلاش کنید.";

      return;
    }

    msg.textContent =
      "✅ پیام شما با موفقیت ارسال شد.";

    contactForm.reset();

  });
}
