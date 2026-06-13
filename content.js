(function () {
  function isLoginPage() {
    return (
      document.getElementById("loginForm") &&
      document.getElementById("user_id") &&
      document.getElementById("password")
    );
  }

  function createButton() {
    if (document.getElementById("erp-autofill-btn")) {
      return;
    }

    const btn = document.createElement("button");

    btn.id = "erp-autofill-btn";

    btn.innerText = "Auto Fill ERP";

    btn.style.position = "fixed";

    btn.style.top = "20px";

    btn.style.right = "20px";

    btn.style.zIndex = "99999";

    btn.style.padding = "10px 16px";

    btn.style.background = "#1976d2";

    btn.style.color = "white";

    btn.style.border = "none";

    btn.style.borderRadius = "6px";

    btn.style.cursor = "pointer";

    btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

    btn.onclick = autofillERP;

    document.body.appendChild(btn);
  }

  function normalizeQuestion(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ");
  }

  function findAnswer(questionMap, currentQuestion) {
    const normalizedCurrent = normalizeQuestion(currentQuestion);

    for (const key in questionMap) {
      if (normalizeQuestion(key) === normalizedCurrent) {
        return questionMap[key];
      }
    }

    return null;
  }

  function autofillERP() {
    chrome.storage.local.get(["roll", "password", "questions"], (data) => {
      const btn = document.getElementById("erp-autofill-btn");

      if (btn) {
        btn.remove();
      }

      const userBox = document.getElementById("user_id");

      const passBox = document.getElementById("password");

      if (!userBox || !passBox) {
        return;
      }

      userBox.value = data.roll || "";

      passBox.value = data.password || "";

      userBox.dispatchEvent(
        new Event("blur", {
          bubbles: true,
        }),
      );

      waitForQuestion(data.questions || {});
    });
  }

  function waitForQuestion(questionMap) {
    let attempts = 0;

    const interval = setInterval(() => {
      attempts++;

      const label = document.getElementById("question");

      if (!label) return;

      const q = label.innerText.trim();

      if (!q) return;

      const answer = findAnswer(questionMap, q);

      if (answer) {
        const answerBox = document.getElementById("answer");

        if (answerBox) {
          answerBox.value = answer;

          answerBox.dispatchEvent(
            new Event("input", {
              bubbles: true,
            }),
          );
        }

        clearInterval(interval);

        setTimeout(() => {
          const otpBtn = document.getElementById("getotp");

          if (otpBtn) {
            otpBtn.click();
          }

          setTimeout(() => {
            const otpBox = document.getElementById("email_otp1");

            if (otpBox) {
              otpBox.focus();
            }
          }, 1000);
        }, 500);
      }

      if (attempts > 50) {
        clearInterval(interval);
      }
    }, 300);
  }

  if (isLoginPage()) {
    createButton();
  }
})();
