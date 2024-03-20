import { unstable_noStore as noStore } from "next/cache";
import { CreateDialogueDialog, DialogueList } from "~/components/dialogue";

export default async function HomePage() {
  noStore();

  return (
    <main className="flex h-full items-center justify-center bg-secondary">
      <div className="flex w-full max-w-3xl flex-col items-center gap-3">
        <div>
          <CreateDialogueDialog />
        </div>
        <DialogueList className="flex flex-row flex-wrap justify-center gap-3 rounded-md border bg-background p-3" />
      </div>
    </main>
  );
}
