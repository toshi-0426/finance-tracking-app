
const features = [
    { title: 'Clear Overview', description: 'See your financial summary at a glance with four categories.' },
    { title: 'Quick Entry', description: 'Add transactions in seconds and edit them later with intuitive forms.' },
    { title: 'Period Tracking', description: 'Compare your spending across different time periods to identify trends and patterns.' },
    { title: 'Smart Categories', description: 'Organize your transactions with intuitive categories and visual indicators.' },
]

export default function Feature () {
    return (
        <section className="my-10 p-10">
            <div className="container mx-auto px-20">
                <h1 className="text-4xl font-bold text-center mb-4">Effortless Fincance Management</h1>
                <div className="grid grid-rows-1 gap-8">
                    {features.map(feature => (
                        <div key={feature.title} className="text-center p-6">
                            <div className="text-2xl font-semibold mb-3">{feature.title}</div>
                            <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}