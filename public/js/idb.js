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