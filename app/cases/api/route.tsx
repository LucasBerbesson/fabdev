export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    const res = await fetch(`https://backoffice.fabdev.fr/api/cases/`, {
        cache: 'no-store',
    })
    const data = await res.json()

    return Response.json(data, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
    })
}
