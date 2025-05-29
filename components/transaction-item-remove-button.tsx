'use client'

import { useState } from "react";
import Button from "./button";
import { Loader, Trash2 } from "lucide-react";
import { deleteTransaction } from "@/lib/actions";


type TransactionItemRemoveButtonProps = {
    id: string,
    onRemoved: (id: string) => void;
}

export default function TransactionItemRemoveButton({ id, onRemoved }: TransactionItemRemoveButtonProps) {
    const [loading, setLoading] = useState(false);
    const [conformed, setComformed] = useState(false);
    console.log(id);

    const handleClick = async () => {
        if (!conformed) {
            setComformed(!conformed);
            return
        }
        try {
            setLoading(true);
            await deleteTransaction(id);
            // notify the parent
            onRemoved(id);
        } finally {
            setLoading(false);
        }
        
    }

    return <Button key={id}
                    variant={ !conformed ? 'ghost' : 'danger' }
                    size="xs"
                    className="border"
                    aria-disabled={loading}
                    onClick={handleClick}
            >
        {!loading && <Trash2 className="w-4 h-4"/>}
        {loading && <Loader className="w-4 h-4 animate-spin"/>}
    </Button>
}