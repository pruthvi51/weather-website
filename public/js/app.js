
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?location='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'Please enter a valid Address!'
                messageTwo.textContent = ''
            }
            else{
                messageOne.textContent = 'At '+data.address
                messageTwo.textContent = data.forecast
            }
        })
    })
})
