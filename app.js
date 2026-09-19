// ================================
// تنظیمات Supabase
// ================================

const SUPABASE_URL = "آدرس پروژه Supabase";
const SUPABASE_ANON_KEY = "کلید anon پروژه Supabase";


// ================================
// اتصال به Supabase
// ================================

const supabaseScript = document.createElement("script");

supabaseScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = () => {

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );


  // ================================
  // فرم تماس با ما
  // ================================

  const contactForm =
    document.getElementById("contactForm");

  const contactMsg =
    document.getElementById("contactMsg");


  if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

      event.preventDefault();

      contactMsg.textContent = "⏳ در حال ارسال پیام...";


      const formData =
        new FormData(contactForm);


      const name =
        formData.get("name");

      const phone =
        formData.get("phone");

      const email =
        formData.get("email");

      const subject =
        formData.get("subject");

      const message =
        formData.get("message");


      const { error } =
        await supabase
          .from("Contact")
          .insert([
            {
              name: name,
              phone: phone,
              email: email,
              subject: subject,
              message: message
            }
          ]);


      if (error) {

        console.error(error);

        contactMsg.textContent =
          "❌ ارسال پیام انجام نشد. دوباره تلاش کنید.";

        contactMsg.style.color = "red";

        return;
      }


      contactMsg.textContent =
        "✅ پیام شما با موفقیت ارسال شد.";

      contactMsg.style.color =
        "#08785f";


      contactForm.reset();

    });

  }


  // ================================
  // فرم نظرسنجی
  // ================================

  const surveyForm =
    document.getElementById("form");

  const surveyMsg =
    document.getElementById("msg");


  if (surveyForm) {

    surveyForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        surveyMsg.textContent =
          "⏳ در حال ثبت اطلاعات...";


        const formData =
          new FormData(surveyForm);


        const firstName =
          formData.get("firstName");

        const lastName =
          formData.get("lastName");

        const birthDate =
          formData.get("birthDate");

        const phone =
          formData.get("phone");

        const province =
          formData.get("province");

        const city =
          formData.get("city");

        const satisfaction =
          formData.get("satisfaction");


        const { error } =
          await supabase
            .from("Survey")
            .insert([
              {
                firstName: firstName,
                lastName: lastName,
                birthDate: birthDate || null,
                phone: phone,
                province: province,
                city: city,
                satisfaction: satisfaction
              }
            ]);


        if (error) {

          console.error(error);

          surveyMsg.textContent =
            "❌ ثبت اطلاعات انجام نشد.";

          surveyMsg.style.color =
            "red";

          return;
        }


        surveyMsg.textContent =
          "✅ اطلاعات با موفقیت ثبت شد.";

        surveyMsg.style.color =
          "#08785f";


        surveyForm.reset();

      }
    );

  }

};


// اضافه کردن کتابخانه Supabase به صفحه

document.head.appendChild(supabaseScript);
