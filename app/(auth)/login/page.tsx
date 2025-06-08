import LoginForm from './components/login-form';

export default function Page() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
      <div className="flex flex-col space-y-8 text-center">
        <h1 className="text-2xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-dark-500 dark:text-dark-400">
          Enter your email to sign in/create your account.
          <br />
          No password is required.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
