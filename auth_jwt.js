
let persons = [];// Ходимлар Маълумотлар базаси

isLogged();
let _token = `Bearer ${localStorage.getItem('token')}`
//syncFromLocale();// Locale storage dan malumotlarni persons bazasiga o'qib olish
loadPersonsFromApi();
class PageOptions {// sahifalash uchun sozlash clasi

    constructor(page, pageSize) {
        this.page = page;
        this.pageSize = pageSize;
    }

}
class Sequence {// uuid unikal raqamlash
    constructor(value) {
        this.value = value;
    }
    next() {
        return this.value++;
    }
}
const seq = new Sequence(1);

const pageOptions = new PageOptions(1, 10);// 
class Person {
    id = 0;
    constructor(firstName, lastName, age, dayOfBirth, address, avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.dayOfBirth = dayOfBirth;
        this.address = address;
        this.avatar = avatar;
        this.id = uuidv4()
    }
}
class Address {
    constructor(region, city, addressLine1) {
        this.regionId = region.id;
        this.regionName = region.text;
        this.addressLine1 = addressLine1;
    }
}
function uuidv4() {// GUID generator - unikalniy ID 
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

console.log(uuidv4());
// viloyat lar ruyxati API

const regions = [ //Viloyatlar ro`yxati
    { id: 1, text: 'Toshkent' },
    { id: 2, text: 'Samarqand' },
    { id: 3, text: 'Andijon' }
];
const regionId = document.getElementById('regionId'); //select elementini tanlash
regions.forEach((region) => {
    const opt = document.createElement('option');
    opt.value = region.id;
    opt.text = region.text;
    regionId.appendChild(opt)
})
const btnSave = document.getElementById('btnSave');
btnSave.addEventListener('click', (e) => {// click event
    save();
    console.log(persons)
    loadTable();
});
//css
const table_body = document.getElementById('mytable');
function loadTable() {
    table_body.innerHTML = '';
    //sahifalash
    const start = (pageOptions.page - 1) * pageOptions.pageSize;
    const pagedPersons = persons.filter(a=>a!=null).slice(start, start + pageOptions.pageSize)
    pagedPersons.forEach((e, i) => {
        table_body.innerHTML += addRow(e, i + 1);
    })
}

function editItem(id) {
    //persons find item
    const item = persons.find(a => a.id === id);
    if (item) {
        console.log(item)
        //form elemntlariga valuelarni set qilish 
        const myForm = document.forms.myForm;
        myForm.elements.personId.value = id;//identificator
        myForm.elements.age.value = item.age;
        myForm.elements.firstName.value = item.firstName;
        myForm.elements.lastName.value = item.lastName;
        myForm.elements.regionId.value = item.address?.regionId;
        myForm.elements.addressLine1.value = item.address?.addressLine1;
        myForm.elements.dayOfBirth.value = item.dayOfBirth;
        myForm.elements.avatar.value = item.avatar;
        openModal();
    }

}
function addNew() {
    clear();
    openModal();
}
function deleteItem(id) {
    // const item = persons.find(a => a.id === id);
    // const index = persons.indexOf(item);
    // console.log(item)
    // const removedItem = persons.splice(index, 1);
    //console.log(removedItem);
    fetch('http://localhost:3000/persons/' + id, { method: 'DELETE', headers: { "Content-Type": "application/json", "Authorization": _token } }).then(a => {
        loadPersonsFromApi();
    })
    // saveToLocale();
    // loadTable();
}
function selectRow(e) {
    console.log(e)
    const tr = document.getElementById('tr_' + e);
    const trs = document.querySelectorAll('.person-row-selected');
    Array.from(trs).forEach((e) => {
        e.classList.remove('person-row-selected');
    })
    tr.classList.add('person-row-selected');

}
function addRow(item, index) {
    return ` <tr id='tr_${index}'  onclick="selectRow(${index})">
    <td>${index}</td>
    <td><img src="${item.avatar}" width="36"></td>
    <td>${item.lastName}</td>
    <td>${item.firstName}</td>
    <td>${item.age}</td>
    <td>${item.dayOfBirth}</td>
    <td>${item.address?.regionId}</td>
    <td>
        <button   data-id=${item.id} class="btn btn-primary edit-item"  onclick="editItem('${item.id}')">
            <i class="icon-edit"></i>
        </button>
        <button onclick="deleteItem('${item.id}')" class="btn btn-danger">
            <i class="icon-trash"></i>
        </button>
    </td>

</tr>`;
}

function saveAndClose() {
    //  save();
    close();
    //  loadTable();
}
function save() {
    //edit or add

    const myForm = document.forms.myForm;
    const personId = myForm.elements.personId.value;

    //form values
    const age = myForm.elements.age.value;
    const firstName = myForm.elements.firstName.value;
    const lastName = myForm.elements.lastName.value;
    const regionId = myForm.elements.regionId.value;
    const region = regions.find(a => a.id == regionId);
    const addressLine1 = myForm.elements.addressLine1.value;
    const dayOfBirth = myForm.elements.dayOfBirth.value;
    const avatar = myForm.elements.avatar.value;
    if (personId) {
        // edit
        const _item = persons.find(a => a.id == personId);
        _item.age = age;
        _item.firstName = firstName;
        _item.lastName = lastName;
        _item.dayOfBirth = dayOfBirth;
        _item.avatar = avatar;
        // _item.address?.regionId = region.id;
        // _item.address?.regionName = region.text;

        updatePerson(personId, _item);
    }
    else {
        //add

        const newItem = new Person(firstName, lastName, age,
            dayOfBirth,
            new Address(region, '', addressLine1),avatar);
        saveToServer(newItem).then();

        persons.push(newItem);
    }
    clear();
    // saveToLocale();
}
async function saveToServer(newItem) {
    const resp = await fetch('http://localhost:3000/persons',
        { method: "POST", body: JSON.stringify(newItem), headers: { "Content-Type": "application/json", "Authorization": _token } });
    console.log(await resp.json())
}
async function updatePerson(id, editItem) {
    const resp = await fetch('http://localhost:3000/persons/' + id,
        { method: "PUT", body: JSON.stringify(editItem), headers: { "Content-Type": "application/json", "Authorization": _token } });
    loadPersonsFromApi();
    close();
}
async function loadPersonsFromApi() {
    const resp = await fetch('http://localhost:3000/persons',
        { method: "GET", headers: { "Content-Type": "application/json", "Authorization": _token } });
    const _persons = await resp.json();
    persons = [..._persons];
    loadTable();
    drawPagination();
}
function closeModal() {
    close();
}
function close() {

    var myModal = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModal)
    modal.hide();

}
function clear() {
    const myForm = document.forms.myForm;
    myForm.reset();

}
function openModal() {

    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
}
function saveToLocale() {
    localStorage.setItem('persons', JSON.stringify(persons));
}
function syncFromLocale() {
    const personsString = localStorage.getItem('persons');
    if (personsString) {
        const _persons = JSON.parse(personsString);
        if (Array.isArray(_persons)) {
            persons = [..._persons];
        }
    }
}
loadTable();

function addInitData() {
    for (let index = 1; index < 26; index++) {

        const newItem = new Person('firstName' + index, 'lastName' + index, 30, '2000-01-01', new Address({ id: 1, text: 'Toshkent' }, '', 'addressLine1 Info'));
        persons.push(newItem);
    }
    saveToLocale()
}
//addInitData()
loadTable()
function drawPagination() {
    const pagination = document.querySelector('.pagination');

    const next = `
<li class="page-item" >
    <a class="page-link" href="javascript:(0);" aria-label="Next" onclick="next()">
        <span aria-hidden="true">&raquo;</span>
    </a>
</li>`;
    let numbers = ``;
    const pageCount = Math.ceil((persons.length / pageOptions.pageSize));
    const prev = `<li class="page-item">
<a class="page-link" href="javascript:(0);" aria-label="Previous"  onclick="prev()">
    <span aria-hidden="true">&laquo;</span>
</a>
</li>
`;
    console.log(pageOptions.page);
    for (let index = 0; index < pageCount; index++) {
        const pageNumber = index + 1;
        numbers += `<li class="page-item ${pageNumber == pageOptions.page ? 'active' : ''}"><a class="page-link" href="javascript:(0);" onclick="onPageChanged(${pageNumber})">${pageNumber}</a></li>`;
    }
    pagination.innerHTML = prev + numbers + next;
}
drawPagination();
function onPageChanged(number) {
    console.log(number)
    pageOptions.page = number;
    loadTable();
    drawPagination();
}
function prev() {
    console.log('prev', persons.length)
    if (pageOptions.page > 1) {
        pageOptions.page -= 1;
        loadTable();
        drawPagination();
    }
}
function next() {
    const pageCount = Math.ceil((persons.length / pageOptions.pageSize));
    console.log('next', persons.length)
    if (pageOptions.page < pageCount) {
        pageOptions.page += 1;
        loadTable();
        drawPagination();
    }
}
function isLogged() {
    //localet storage ga token 

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "login.html";
    }
}
//upload file
const avatar = document.getElementById("avatar");
const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
const uploadImage = async (event) => {
    const file = event.target.files[0];
    console.log(file)
    const base64 = await convertBase64(file);
    console.log(base64);
    avatar.src = base64;
    const myForm = document.forms.myForm;
    myForm.elements.avatar.value = base64;

};
const myFile = document.getElementById('myFile');
myFile.addEventListener('change', (e) => {
    uploadImage(e);
});
