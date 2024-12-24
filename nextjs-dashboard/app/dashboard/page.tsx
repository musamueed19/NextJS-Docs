/*
Page is an async component. This allows you to use await to fetch data.
There are also 3 components which receive data: <Card>, <RevenueChart>, and <LatestInvoices>. They are currently commented out to prevent the application from erroring.

-----
1) To fetch data for the <RevenueChart/> component, import the fetchRevenue function from data.ts and call it inside your component:

2) Now it's your turn to fetch data for the <Card> components. The cards will display the following data:

Total amount of invoices collected.
Total amount of invoices pending.
Total number of invoices.
Total number of customers.
Again, you might be tempted to fetch all the invoices and customers, and use JavaScript to manipulate the data. For example, you could use Array.length to get the total number of invoices and customers:


NOTE ----
However... there are two things you need to be aware of:

The data requests are unintentionally blocking each other, creating a request waterfall.
By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.


What are request waterfalls?
A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

---------------

NOTE:
This pattern is not necessarily bad. There may be cases where you want waterfalls because you want a condition to be satisfied before you make the next request. For example, you might want to fetch a user's ID and profile information first. Once you have the ID, you might then proceed to fetch their list of friends. In this case, each request is contingent on the data returned from the previous request.

However, this behavior can also be unintentional and impact performance.

---------------

Parallel Data Fetching
A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time. For example, in data.ts, we're using Promise.all() in the fetchCardData() function:

By using this pattern, you can:

Start executing all data fetches at the same time, which can lead to performance gains.
Use a native JavaScript pattern that can be applied to any library or framework.
However, there is one disadvantage of relying only on this JavaScript pattern: what happens if one data request is slower than all the others?
*/

import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../lib/data";

export default async function DashboardPage() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers} = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
