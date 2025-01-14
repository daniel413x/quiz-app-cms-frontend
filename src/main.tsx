import ReactDOM from "react-dom/client";
import "./global.css";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import { Toaster } from "sonner";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider>
    <App />
    <Toaster
      visibleToasts={1}
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        className: "shadow-none border-4 border-input rounded-none",
      }}
    />
  </QueryClientProvider>,
);
