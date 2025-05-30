'use client'

import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Range({ defaultRange }: { defaultRange: string}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const range = searchParams.get('range') ?? defaultRange;

    const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams();
        params.set('range', e.target.value);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <DateRangeSelect value={range} onChange={handleChanges}/>      
    )
}