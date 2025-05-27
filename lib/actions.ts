'use server'

import { revalidateTag } from "next/cache"


export async function purseTransctionListCache() {
    revalidateTag('transaction-list')
}