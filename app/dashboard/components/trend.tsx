import BaseTrend from '@/components/trend';

type TrendProps = {
    type: 'Income' | 'Expense' | 'Investment' | 'Saving',
}
export default async function Trend({type}: TrendProps){
    const response = await fetch(`${process.env.API_URL}/trend/${type}`);
    const {amount, prevAmount} = await response.json();

    return (
        <BaseTrend type={type} amount={amount} prevAmount={prevAmount}/>

    )
}