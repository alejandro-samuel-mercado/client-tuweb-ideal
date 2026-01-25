import { Suspense } from "react";
import ContratarClient from "./ContratarClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContratarClient />
    </Suspense>
  );
}
