


export const metadata = {
    'title': 'Edit Transaction'
}

export default async function Page({
    params,
}: {
    params: Promise<{id: string}>
} ) {
    
    return (
        <> 
            {params}
        </>
    )
}