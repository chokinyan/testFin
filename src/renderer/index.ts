// Accéder à l'API exposée par le preload script
const electronAPI = (window as any).electronAPI;

// Exemple d'utilisation de l'API
electronAPI.sendMessage('message', 'Hello from Renderer!');
electronAPI.onMessage('reply', (event: any, data: any) => {
  console.log('Received reply:', data);
});