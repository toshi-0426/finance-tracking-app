import Footer from '@/components/footer';
import AppDemo from '@/components/landing-page/app-demo';
import Feature from '@/components/landing-page/feature';
import GetStartedButton from '@/components/landing-page/get-started-button';
import Header from '@/components/landing-page/header';
import Hero from '@/components/landing-page/hero';
import Separator from '@/components/separator';

export default function Home() {
  return (
    <>
      <Header className="mt-8 mb-4" />
      <Separator />
      <Hero />
      <AppDemo />
      <Feature />
      <div className="flex justify-center mt-20 ">
        <h1 className="text-4xl font-bold text-center mb-4">
          Ready to take control of your finances?
        </h1>
      </div>
      <div className="flex justify-center mt-5 mb-20 ">
        <GetStartedButton />
      </div>
      <div className="flex justify-center mx-auto mb-10">
        <Footer />
      </div>
    </>
  );
}
