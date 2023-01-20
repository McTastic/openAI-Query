const btn = document.querySelector(".btn");
const responseListEl = document.querySelector(".responseList");
const promptTextEl = document.querySelector(".promptText");
const promptResponseEl = document.querySelector(".responseText");
let responses = 0;

const init = () => {
  if (responses === 0) {
    responseListEl.style.display = "none";
  } else {
    responseListEl.style.display = "flex";
  }
};
const getResponse = () => {
  fetch("/api").then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        // console.log(res.data.output);
        promptResponseEl.innerHTML = `<p>${res.data.output}</p>`
      })
  );
};

const apiCall = async () => {
  const prompt = document.querySelector(".form-control").value;
  event.preventDefault();
  // console.log(userInput)
  if (prompt.value === "") {
    alert("Please enter a prompt");
  } else {
    await fetch("/api", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
  }
  responseListEl.style.display = "flex";
  promptTextEl.innerHTML = prompt;
  getResponse();
  responses++;
};

btn.addEventListener("click", apiCall);
init();
