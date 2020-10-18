let db;
const request = window.indexedDB.open("budget", 1);
// create a new db request for a "budget" database.

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("pending");
  objectStore.autoIncrement = true;
  // create object store called "pending" and set autoIncrement to true
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  pendingStore.add({ listID: "1", status: "pending" });

}

function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  const getAll = store.getAll();
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {

          
          // if successful, open a transaction on your pending db
            const transaction = db.transaction(["budget"], "readwrite");
            const pendingStore = transaction.objectStore("pending");
                 
          // Adds data to our objectStore
          // access your pending object store
          const getCursorRequest = pendingStore.openCursor();
          getCursorRequest.onsuccess = e => {
          const cursor = e.target.result;
          
          var myVar = e;
          console.log(e);
          }
          // clear all items in your store
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
