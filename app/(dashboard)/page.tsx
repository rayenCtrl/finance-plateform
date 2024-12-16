"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function Home() {
  const accountsQuery = useGetAccounts();

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {accountsQuery.data?.map((account) => (
        <div key={account.id}>
          {account.name}
          </div>
      ))}
    </div>
  );
}