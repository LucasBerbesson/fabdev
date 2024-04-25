export async function GET() {
    const res = await fetch(`https://backoffice.fabdev.fr/api/articles/`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()

    return Response.json(data)
}
