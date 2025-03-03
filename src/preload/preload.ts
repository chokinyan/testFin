import { contextBridge, ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld("connection",{
  connection : (user: string, password: string) => ipcRenderer.invoke("connect-user",password, user),
});