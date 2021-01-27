




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const about = document.querySelector('#about')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    console.log(search.value)

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        //console.log(response)



        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }

        })
    })

})


