//creat varibale to hold db
let db;

//establish a connection to Indexdb database
const request = indexedDB.open('ibudgetwatcher', 1);

//this event will emit the database version changes
request.onupgradeneeded = function(event) {

    //save a refrence to the database
    const db = event.target.result;

    //create an object store (table) called `new_transaction` set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_transaction', {autoIncrement: true });
};

//upon a successful
request.onsuccess = function(event) {
    //when db is successfully created with its object store or simply established a connection, save refrence to a db in global variable
    db = event.target.result;

    //check if app is online, if yes run uploadTransaction() function to send all local db data to api
    if(navigatior.onLine){
        //uploadTransactions();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode)
};

//this  function will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    //access the object store for 'new_transaction'
    const budgetObjectStore = transaction.objectStore('new_transaction');

    //add record to your store with add method
    budgetObjectStore.add(record);
}