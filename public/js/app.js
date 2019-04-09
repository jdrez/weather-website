console.log('Client Side JS file is loaded');
const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = ''

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = gitsearch.value
    messageTwo.textContent = 'Loading...'
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageTwo.textContent = ''
            messageOne.textContent = data.error
            return console.log(data.error)
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.forecast)
            console.log(data.location)
        }
    })})
})