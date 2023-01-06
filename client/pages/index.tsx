import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pets Grooming Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen h-auto w-full bg-white">
          <div className="sticky top-0 pt-6 px-20">
            <div className="w-full bg-gray-200 h-16 rounded-lg flex justify-center items-center">
              <div className="flex justify-center space-x-10 text-gray-600 font-semibold underline-offset-2">
                <Link href={"/"} className="hover:underline">
                  Home
                </Link>
                <Link href={"/"} className="hover:underline">
                  Information
                </Link>
                <Link href={"/auth/register"} className="hover:underline">
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div className="h-[80vh] flex flex-col justify-center items-center space-y-10">
            <h1 className="text-gray-900 text-7xl font-bold">
              Pets Grooming Service!
            </h1>
            <Link href={"/auth/register"}>
              <button className="bg-gray-500 text-white font-semibold text-xl px-7 py-4 rounded-md hover:bg-gray-600 hover:scale-110 transition-all ease-linear">
                Register
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
