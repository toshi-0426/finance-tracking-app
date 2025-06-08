import Link from 'next/link';
import Button from '../button';

export default function GetStartedButton() {
  return (
    <Link href="/login">
      <Button className="font-semibold">Get started</Button>
    </Link>
  );
}
