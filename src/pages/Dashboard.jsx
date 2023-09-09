import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import NewsCard from "../components/NewsCard";
import Loading from "../components/Loading";
import Card from "../components/Blog/Card";

const Dashboard = () => {
  const { getBlogs } = useBlogCalls();
  const { blogs, loading } = useSelector(state => state.blog);
  const [data, setData] = useState(blogs?.slice(0, 2));

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    setData(blogs?.slice(0, 3));
  }, [blogs]);
  const handleClick = () => {
    data?.length < 4 ? setData(blogs) : setData(blogs?.slice(0, 3));
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="dark:bg-slate-800 w-full flex p-5 justify-center gap-5">
      <div className="flex flex-col w-8/12 max-[600px]:w-full 2xl:w-6/12">
        {blogs?.length > 0 &&
          data?.map(item => <Card key={item.id} item={item} />)}
        {blogs?.length > 3 && (
          <div className="flex w-11/12">
            <Button
              onClick={handleClick}
              className="mx-auto m-3 mb-12 sm:mb-auto"
              gradientDuoTone="cyanToBlue">
              {data?.length === 3 ? "Read More" : "Close More"}
            </Button>
          </div>
        )}
      </div>
      <div className="w-3/12 2xl:w-5/12 max-[600px]:hidden">
        <NewsCard />
      </div>
    </div>
  );
};

export default Dashboard;
