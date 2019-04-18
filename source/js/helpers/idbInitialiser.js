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

        objectStore = db.createObjectStore(idbConst.IDB_TBL_EXERCISE, { keyPath: "logDate" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_WORKOUT_DATA, { keyPath: "firstWorkoutId" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_DASHBOARD, { keyPath: "type" });
        
        objectStore = db.createObjectStore(idbConst.IDB_TBL_BODY_LOGDATES, { keyPath: "type" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_STATS, { keyPath: "type" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_BADGES, { keyPath: "type" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_PROGRESS, { keyPath: "type" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_CALENDER, { keyPath: "type" });

        objectStore = db.createObjectStore(idbConst.IDB_TBL_EXERCISE_DATA, { keyPath: "type" });    

        objectStore = db.createObjectStore(idbConst.IDB_TBL_USER_PROGRAM, { keyPath: "type" });    

        objectStore = db.createObjectStore(idbConst.IDB_TBL_FITNESS, { keyPath: "type" });  
                
        objectStore = db.createObjectStore(idbConst.IDB_TBL_PROFILE, { keyPath: "type" });  
        
        
    } catch (error) { console.log("IDB init Error : ", error); }
}