import { GitHub } from '@mui/icons-material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Link
      href="https://github.com/toshi-0426/finance-tracking-app"
      className="flex items-center space-x-2 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHub />
      <span>GitHub</span>
    </Link>
  );
}
