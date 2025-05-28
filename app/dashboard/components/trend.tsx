import BaseTrend from '@/components/trend';
import { createClient } from '@/lib/supabase/server';

type TrendProps = {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving',
}
export default async function Trend({type}: TrendProps){
    const supabase = await createClient();
    const { data, error } = await supabase
        .rpc('calculate_total', {
            type_arg: type
        });
    
    if (error) throw new Error('Could not fetch the trend data')
    //else console.log(`${type}: ${data}`);

    const amount = data ?? 0;
    //const response = await fetch(`${process.env.API_URL}/trend/${type}`);
    //const {amount, prevAmount} = await response.json();

    return (
        <BaseTrend type={type} amount={amount} prevAmount={amount - 500}/>

    )
}