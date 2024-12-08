import dynamic from "next/dynamic";


export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const slug = (await params).username;
  const PaymentWidget = dynamic(() => import("../components/payment"));


  return (
    <div>
      My Post: {slug}
     <PaymentWidget />
    </div>
  );
}
