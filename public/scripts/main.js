
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    messageOne.textContent = 'Loading ... ';
    messageTwo.textContent = '';

    const url2 = `/weather?address=${address}`;
    fetch(url2).then((res) => {

        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent =`error: ${data.error}`;
                return;
            }
     
            const { forecast, location } = data;
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
        })
     });
});