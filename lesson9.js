console.log('fetch')
// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => response.json())
//     .then(json => console.log(json))

const person = {
    firstName: '',
    lastName: ''
}
// const personInfo = document.getElementById('person-info');
// person.firstName = 'Axmad'
// setTimeout(() => {
//     person.lastName = 'Olimov'
//     personInfo.innerHTML = JSON.stringify(person)
// }, 5000);
// personInfo.innerHTML = JSON.stringify(person)
// console.log('Start application')

// console.log('End application')
// fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST', headers: {
//         Authorization: 'Bearer gdusdisodfdsodpskddjf duifdoufoidfdfuid'
//     }
// }).then((response) => {
//     console.log(response)
// })
// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//     method: 'PUT',
//     headers: {
//         Authorization: 'Bearer gdusdisodfdsodpskddjf duifdoufoidfdfuid'
//     }, body: JSON.stringify(person)
// }).then((response) => {
//     console.log(response)
// })
 function f1(){
    throw new Error('Parameter is not a number!');
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('5 sekund o`tdi')
            resolve()
        }, 5000)
    
    });
    return p;
}

 function f2(){
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('3 sekund o`tdi')
            resolve()
        }, 3000)
    
    });
    return p2;
}


async function getPerons() {
    try {
        await f1();
    } catch (error) {
        console.log(error)
    }
  
    await f2();
}
getPerons().then();
///