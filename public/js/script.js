console.log('script loaded.......')
fetch('http://localhost:3000/employee').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})