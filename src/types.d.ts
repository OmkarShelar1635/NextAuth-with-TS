import { Connection } from "mongoose";
//You cannot assign a value inside declare global. means can not use = , use :
declare global {
    var mongoose : {
        conn: Connection | null,
        promise: Promise<Connection> | null
    }
}

export { }
//Without export {}, TypeScript gives an error because declare global can only be used inside a module.
//export{}="This file is a module, even though I'm not exporting anything."