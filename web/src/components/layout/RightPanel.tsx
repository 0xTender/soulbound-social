import { CardDescription, CardTitle } from "../ui/card";

export default function RightPanel() {
  return (
    <div className="grid gap-4">
      <CardTitle>Messages</CardTitle>
      <CardDescription>
        You don&apos;t have any messages yet. Start a conversation with someone!
      </CardDescription>
    </div>
  );
}
