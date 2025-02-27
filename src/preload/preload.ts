import { contextBridge, ipcRenderer } from 'electron';

// Expose des APIs au renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel: string, data: any) => ipcRenderer.send(channel, data),
  onMessage: (channel: string, callback: (event: any, data: any) => void) =>
    ipcRenderer.on(channel, callback),
});