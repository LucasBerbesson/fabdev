export async function GET() {
    const res = await fetch(`https://backoffice.fabdev.fr/api/cases/`, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',       // Additional no-cache directive
        },
    })
    const data = await res.json()

    return Response.json(data)
}
