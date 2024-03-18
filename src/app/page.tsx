import { unstable_noStore as noStore } from "next/cache";

export default async function HomePage() {
  noStore();
  return <main>Test</main>;
}
