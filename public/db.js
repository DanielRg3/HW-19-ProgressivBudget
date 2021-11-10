let db;
let budgetVersion;

const request = indexedDB.open("BudgetDB", budgetVersion || 1);

request.onupgradeneeded = function(e) {
    const db = e.target.result
    db.createObjectStore("pending", {autoIncrement: true})
};

request.onerror = function(e) {
    console.log(`Somenthing has go wrong ${e.target.errorCode}`)
};

request.onsuccess = function(e) {
    db=e.target.result;
    if(navigator.onLine) {
        checkDatabase();
    };
};

function checkDatabase() {
    let transaction = db.transaction(['BudgetStore'], 'readwrite');
    const store = transaction.createObjectStore('BudgetStore');
    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if(getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Concept-Type" : "appliation/json"
                }
            }).then((response) => response.json())
            .then((res) => {
                if(res.lenth !== 0) {
                    transaction = db.transaction(['BudgetStore'], 'readwrite');
                    const currentStore = transaction.objectStore("BudgetStore");
                    currentStore.clear();
                }
            })
        }
    }
}

window.addEventListener("online", checkDatabase);