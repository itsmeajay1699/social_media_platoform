import PostCard from "./PostCard";

export default function Feed({ data }: { data: any }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {Array.from({ length: 20 - 1 }).map((_, i) => (
          <PostCard key={Math.random()} />
        ))}
      </div>
    </section>
  );
}
