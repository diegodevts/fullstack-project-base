import ngrok from '@ngrok/ngrok' // if inside a module

export default async function () {
    // Establish connectivity
    const listener = await ngrok.forward({
        addr: 'http://localhost:3000',
        authtoken_from_env: true,
    })

    // Output ngrok url to console
    console.log(`Ingress established at: ${listener.url()}`)
}
