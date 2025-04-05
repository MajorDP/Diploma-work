import Link from "next/link";

const Page = async ({ searchParams }) => {
  const { amount } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-2xl pt-5">${amount} Successfully paid</h1>
      <Link href="/" className="underline pt-2 hover:scale-105 duration-200">
        Return to dashboard
      </Link>
    </div>
  );
};

export default Page;
