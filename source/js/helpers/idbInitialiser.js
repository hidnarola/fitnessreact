import * as idbConst from "../constants/idb";

export default function initIDBSchema(event) {
    try {
        const db = event.target.result;
        let objectStore = db.createObjectStore(idbConst.IDB_TBL_BODY_MEASUREMENT, { keyPath: "_id" });
        objectStore.createIndex("logDate", "logDate", { unique: false });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_BODY_FAT, { keyPath: "_id" });
        objectStore.createIndex("logDate", "logDate", { unique: false });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_BODY_PP, { keyPath: "_id" });
        objectStore.createIndex("date", "date", { unique: false });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_STATS, { keyPath: "type" });
    } catch (error) { console.log("IDB init Error : ", error); }
}