import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchItems } from "./api/items";

export default function App() {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,
      initialPageParam: 0, //initialPageParam determine la page initial du fetch chaue fois que ce composant est monté
      getNextPageParam: (lastPage) => lastPage.nextPage, //getNextPageParam determine la page suivante à fetch
    });
  const { ref, inView } = useInView(); //useInView est un hook qui permet de detecter si un element est visible
  //dans la fenetre du navigateur et nous permeettra de detecter la pagination

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className="flex flex-col gap-2">
      {data.pages.map((page) => (
        <div key={page.currentPage}>
          {page.data.map((item) => (
            <p key={item.id} className="bg-[#a520c6] p-4 text-3xl">
              {item.name}
            </p>
          ))}
        </div>
      ))}
      <div ref={ref} className="bg-[#a520c6] p-4 text-3xl">
        {inView && isFetchingNextPage
          ? "Loading more..."
          : "Scroll to load more"}
      </div>
    </main>
  );
}
