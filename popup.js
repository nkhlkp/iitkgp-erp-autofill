function loadData() {
  chrome.storage.local.get(["roll", "password", "questions"], (data) => {
    document.getElementById("roll").value = data.roll || "";

    document.getElementById("password").value = data.password || "";

    const q = data.questions || {};

    const keys = Object.keys(q);

    if (keys[0]) {
      document.getElementById("q1").value = keys[0];

      document.getElementById("a1").value = q[keys[0]];
    }

    if (keys[1]) {
      document.getElementById("q2").value = keys[1];

      document.getElementById("a2").value = q[keys[1]];
    }

    if (keys[2]) {
      document.getElementById("q3").value = keys[2];

      document.getElementById("a3").value = q[keys[2]];
    }
  });
}

function saveData() {
  const questions = {};

  const q1 = document.getElementById("q1").value.trim();

  const q2 = document.getElementById("q2").value.trim();

  const q3 = document.getElementById("q3").value.trim();

  if (q1) {
    questions[q1] = document.getElementById("a1").value;
  }

  if (q2) {
    questions[q2] = document.getElementById("a2").value;
  }

  if (q3) {
    questions[q3] = document.getElementById("a3").value;
  }

  chrome.storage.local.set(
    {
      roll: document.getElementById("roll").value,

      password: document.getElementById("password").value,

      questions,
    },
    () => {
      alert("Saved");
    },
  );
}

function toggleVisibility() {
  const show = document.getElementById("toggleVisibility").checked;

  const type = show ? "text" : "password";

  ["roll", "password", "q1", "a1", "q2", "a2", "q3", "a3"].forEach((id) => {
    const el = document.getElementById(id);

    if (el) {
      el.type = type;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  document.getElementById("saveBtn").addEventListener("click", saveData);

  document
    .getElementById("toggleVisibility")
    .addEventListener("change", toggleVisibility);
});
