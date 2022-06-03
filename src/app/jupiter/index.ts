import JupiterApp from "./jupiter-app";

export default async () => {
    
    const jupiterApp = new JupiterApp();
    await jupiterApp.execute();
}
