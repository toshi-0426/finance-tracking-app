import GetStartedButton from './get-started-button';

export default function Hero() {
  return (
    <section className="mt-4">
      <div className="container space-y-4">
        <h1 className="text-4xl font-bold text-center">
          Simple Finance Management
        </h1>
        <p className="text-gray-400 text-center text-md">
          Track your income, expenses, investments, and savings with a clean,
          intuitive interface.
        </p>
        <div className="flex justify-center my-10">
          <GetStartedButton />
        </div>
      </div>
    </section>
  );
}
