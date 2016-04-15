export class IndexedDbHelper {
    private _idbSupported: boolean = false;
    private _db;
    private _c_DEFAULT_STORE = "people";
    private _c_DB_NAME = "test_v2";

	constructor() {
		this.onPageLoad();
	}

	onPageLoad() {
		var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        if (indexedDB) {
            console.log("db found");
            this._idbSupported = indexedDB;
        }

        var openReq = indexedDB.open(this._c_DB_NAME, 2);
        openReq.onupgradeneeded = (e) => {
            console.log("upgrading");
            var thisDb = e.target.result;

            if (!thisDb.objectStoreNames.contains(this._c_DEFAULT_STORE)) {
                thisDb.createObjectStore(this._c_DEFAULT_STORE);
            }
        }
        openReq.onsuccess = (e) => {
            console.log("Success");
            this._db = e.target.result;

            // this.savePerson();
            // this.getByKey(1);
            // this.deleteByKey(1);
        }
        openReq.onerror = (e) => {
            console.log("Error");
            console.dir(e);
        }
	}

	getByKey(key, storeName=this._c_DEFAULT_STORE) {
        var transaction = this._db.transaction([storeName], "readonly");
        var store = transaction.objectStore(storeName);
        var obj = store.get(1);

        obj.onsuccess = (e) => console.log(e.target.result);
    }

	add(content, key, storeName=this._c_DEFAULT_STORE) {
        var transaction = this._db.transaction([storeName], "readwrite");
        var store = transaction.objectStore(storeName);
        var req = store.add(content, key);
        req.onerror = (e) => console.log("Error", e.target.error.name);
        req.onsuccess = (e) => console.log("save complete");
    }

    putByKey(content, key, storeName=this._c_DEFAULT_STORE) {
    	var transaction = this._db.transaction([storeName], "readwrite");
        var store = transaction.objectStore(storeName);
        var req = store.put(content, key);
        req.onerror = (e) => console.log("Error", e.target.error.name);
        req.onsuccess = (e) => console.log("update complete");
    }

    deleteByKey(key, storeName=this._c_DEFAULT_STORE) {
		var transaction = this._db.transaction([storeName], "readwrite");
        var store = transaction.objectStore(storeName);
        var req = store.delete(key);
        req.onerror = (e) => console.log("Error", e.target.error.name);
        req.onsuccess = (e) => console.log("delete complete");
    }
}