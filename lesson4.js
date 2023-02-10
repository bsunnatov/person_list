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
// persons.push(new Person('Asliddin', 'Elmonov', 30, new Address('Samarqand', 'Mizri Ulugbek', '4,45')));
// for (let index = 0; index < 20; index++) {
//     const age = Math.random() * 50 + 20;
//     const _age = Math.floor(age);
//     persons.push(new Person(`Asliddin-${index}`, `Elmonov-${index}`, _age, new Address('Samarqand', 'Mizri Ulugbek', '4,45')));
// }


// console.log(persons)

// const filter_persons = persons.filter(a => a.age < 30);
// console.log(filter_persons)
// //
//localStorage.setItem('persons',JSON.stringify(persons))
JSON.p
const persons_from_locale = localStorage.getItem('persons');
console.log(persons_from_locale)
if (persons_from_locale != null) {
    //console.log('JSON PARSE')
    const json = JSON.parse(persons_from_locale);
    persons = [...json];
    // console.log(persons)
    // console.log(persons[0].age)
}
else {
    console.log('Malumot topilmadi');
}
//
const [,firstPerson=new Person(), ,,,secondPerson, ...otherPersons] = [];
console.log(firstPerson)
