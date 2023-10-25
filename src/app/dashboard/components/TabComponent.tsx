import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Feed from "./Feed";
import Following from "./Following";
import MyLibrary from "./MyLibrary";

// const fetchPost1 = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//   return res.json();
// };

// const fetchPost2 = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts/2");
//   return res.json();
// };

// const fetchPost3 = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts/3");
//   return res.json();
// };

export default async function TabComponent() {
  //   const [post1, post2, post3] = await Promise.all([
  //     fetchPost1(),
  //     fetchPost2(),
  //     fetchPost3(),
  //   ]);

  return (
    <Tabs defaultValue="feed" className="w-full">
      <div className="text-right">
        <TabsList className="w-fit">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="my-library">My library</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="feed">
        <Feed data={""} />
      </TabsContent>
      <TabsContent value="following">
        <Feed data={""} />
      </TabsContent>
      <TabsContent value="my-library">
        <Feed data={""} upload={true} />
      </TabsContent>
    </Tabs>
  );
}
