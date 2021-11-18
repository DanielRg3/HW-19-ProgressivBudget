const indexedDb = window.indexedDB;

let db;

const request = indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function(e) {
    let db = e.target.result
    db.createObjectStore("requestStore", {autoIncrement: true})
};

request.onerror = function(e) {
    console.log(`Somenthing has go wrong ${e.target.errorCode}`)
};

request.onsuccess = function(e) {
    db = e.target.result;
    if(navigator.onLine) {
        checkDatabase();
    };
};

function checkDatabase() {
    let transaction = db.transaction(['requestStore'], 'readwrite');
    const store = transaction.objectStore('requestStore');
    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if(getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type" : "application/json"
                }
            }).then((response) => response.json())
            .then((response) => {
                if(response.length !== 0) {
                    const transaction = db.transaction(['requestStore'], 'readwrite');
                    const currentStore = transaction.objectStore("requestStore");
                    currentStore.clear();
                }
            })
        }
    }
}

function saveRecord(transaction) {
    let request = db.transaction(['requestStore'], 'readwrite');
    const store = request.objectStore('requestStore');
    store.add(transaction);
}

window.addEventListener("online", checkDatabase);