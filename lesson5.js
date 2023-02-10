


// // Генератор
// function* Sequence() {
//     yield 1;
//     yield 2;
//     yield 3;
// }
// myMassiv = ['Apple', 'Sumsung'];
// console.log(myMassiv)
// const mySequence = Sequence();
// // console.log(mySequence.next())
// // console.log(mySequence.next())
// // console.log(mySequence.next())
// // console.log(mySequence.next())
// for (const iterator of myMassiv) {
//     console.log(iterator)
// }
// for (const iterator of mySequence) {
//     console.log(iterator)
// }
// const customMassiv = {
//     0: 'Apple',
//     1: 'Sumsung'
// }
// // console.log(customMassiv)
// // for (const iterator of customMassiv) {
// //     console.log(iterator)
// // }

// let range = {
//     from: 1,
//     to: 5,
//     [Symbol.iterator]() {
//         return {
//             current: this.from,
//             last: this.to,
//             next() {
//                 if (this.current <= this.last) {
//                     return { done: false, value: this.current++ };
//                 }
//                 else {
//                     return { done: true }
//                 }
//             }
//         }
//     }
// }
// for (const iterator of range) {
//     console.log(`test- ${iterator}`)
// }
//DOM
console.log(document)

const myDiv = document.getElementById('myDiv');
// myDiv.textContent='<strong>test text content</strong>'
// myDiv.innerHTML='<strong>test text content</strong>'
// const myH1=document.createElement('h1');
// myH1.style='font-weight:600'
// const mySpan=document.createElement('span')
// mySpan.innerText='this is span'
// mySpan.style='color:red'
// myH1.appendChild(mySpan)
// myDiv.innerHTML=myH1.innerHTML
console.log(myDiv)
//queyry selector
class Person {
    constructor(firstName, lastName, age, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;

    }
}
class Address {
    constructor(city, district, addressLine1) {
        this.city = city;
        this.district = district;
        this.addressLine1 = addressLine1;
    }
}

let persons = [];
const myQuery = document.querySelectorAll('.li-item')
const myQuery2 = document.querySelector('.li-item')
console.log(myQuery2.innerHTML)
// console.log(myQuery.length)
// for (const iterator of myQuery) {
//     console.log(iterator)
// }

// const myBtn = document.getElementById('myBtn');
// myBtn.addEventListener('click', (e) => {
//     console.log(e);
//     const age = document.getElementById('age');
//     const firstName = document.getElementById('firstName');
//     console.log(firstName.value)
// });
const myBtn2 = document.getElementById('myBtn2');
myBtn2.addEventListener('click', (e) => {
    const myForm = document.forms.myForm;
    const age = myForm.elements.age.value;
    const firstName = myForm.elements.firstName.value;
    persons.push(new Person(firstName,'',age))
    console.log(persons)
});
//css
