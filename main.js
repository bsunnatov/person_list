//console.log('JS')

// Obektlar
const person1 = Object.create({},
    {
        firstName: {
            value: 'Sobir',
            writable: true,
            configurable: true,
            enumerable: true
        },
        lastName: {
            value: 'Axmedov'
        },
        age: {
            value: 25
        },
        birtYear: {
            get() {
                return new Date().getFullYear() - this.age;
            }
        }

    });
//person1.age=24
//console.log(person1)
//
const person2 = {
    fisrtName: 'Jamolbek',
    age: 27,
    lastName: 'Ikromov'
}
for (const key in person1) {
    // console.log(key)
    // if (Object.hasOwnProperty.call(person1, key)) {
    //  const element = person1[key];
    //  console.log(element)

    // }
}
// person2.age = 28
// person2['age'] = 29
//console.log(person2)
let firstName = 'qwq';
function Person(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}
const p1 = new Person('Axmad', 'Tolipov', 25);
let p2 = new Person('Sobir', 'Toxirov', 25);
const p3 = {};
Object.assign(p3,p1)

p3.age=30
console.log(p1);
console.log(p3);
console.log(firstName);