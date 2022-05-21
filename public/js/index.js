const btn = document.querySelector(".btn");
const responseListEl = document.querySelector(".responseList");
const promptTextEl = document.querySelector(".promptText");
const promptResponseEl = document.querySelector(".promptResponse");
let responses = 0;

const init = () =>{
  if(responses===0){
    responseListEl.style.display = "none";
  }else{
  responseListEl.style.display= "flex";
  }
}
const getResponse = ()=>
fetch('/api', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiCall = async () => {
  const userInput = document.querySelector(".form-control").value;
  event.preventDefault();
  // console.log(userInput)
  if (userInput.value === "") {
    alert("Please enter a prompt");
  } else {
    await fetch("/api", {
      method: "POST",
      headers: {
        "content-type":"application/json",
      },
      body: JSON.stringify({userInput}),
    });
  }
  responseListEl.style.display= "flex";
  promptTextEl.innerHTML = userInput;
  responses++
};

btn.addEventListener("click", apiCall);
init()