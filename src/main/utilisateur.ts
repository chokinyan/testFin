export class User{
}

export function checkUser(_event : Electron.IpcMainInvokeEvent,password : string, user : string) : boolean{
    if(user == "test" && password == "test"){
        return true;
    }
    return false;
}