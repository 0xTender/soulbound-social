import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { HeartFilledIcon, Share1Icon } from "@radix-ui/react-icons";
import { type PropsWithChildren } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_POST = gql`
  query Posts($id: u64) {
    posts(u64: $id) {
      text
    }
  }
`;

export default function Post({
  name,
  time,
  logo,
  logoAlt,
  content,
  likes,
}: PropsWithChildren<{
  name: string;
  time: string;
  logo: string;
  logoAlt: string;
  content: string;
  likes?: number;
}>) {
  const { data: posts } = useQuery(GET_POST, {
    variables: {
      id: 1,
    },
  });

  console.log(posts);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={logo} alt={logoAlt} />
          <AvatarFallback className="ring ring-inset ring-slate-300">
            {logoAlt}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 pb-2">
          <CardTitle>@{name}</CardTitle>
          <CardDescription>{time}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex gap-4 items-center">
        <span className="flex items-center gap-1 text-rose-500 hover:text-rose-700 cursor-pointer">
          <HeartFilledIcon className="h-5 w-5" />
          {likes || 0}
        </span>
        <span className="flex items-center gap-1 text-slate-500 hover:text-slate-700 cursor-pointer">
          <Share1Icon className="h-5 w-5" />
          Share
        </span>
      </CardFooter>
    </Card>
  );
}
