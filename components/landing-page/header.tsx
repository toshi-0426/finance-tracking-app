import GetStartedButton from './get-started-button';

type HeaderProps = {
  className?: string;
};
export default function Header({ className }: HeaderProps) {
  return (
    <header className={`${className} flex justify-between`}>
      <div className="text-xl hover:underline hover:underline-offset-8 decoration-2">
        Finance Tracker
      </div>
      <GetStartedButton />
    </header>
  );
}
