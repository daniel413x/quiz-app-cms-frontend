import queryClient from "@/lib/api/queryClient";
import { ReactNode } from "react";
import { QueryClientProvider as QueryClientProviderWrapper } from "react-query";

interface QueryClientProviderProps {
  children: ReactNode;
}

function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <QueryClientProviderWrapper
      client={queryClient}
    >
      {children}
    </QueryClientProviderWrapper>
  );
}

export default QueryClientProvider;
