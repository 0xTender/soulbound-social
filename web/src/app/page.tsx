import NewPost from "./NewPost";
import Posts from "./Posts";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col gap-4">
      <NewPost />
      <Posts />
    </main>
  );
}
