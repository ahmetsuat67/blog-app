import React, { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import Card from "../components/Blog/Card";
import Loading from "../components/Loading";


const MyBlogs = () => {
  const { getUserBlogs } = useBlogCalls();
  const { myBlogs, loading } = useSelector(state => state.blog);

  useEffect(() => {
    getUserBlogs();
  }, []);

 
  if (loading) {
    return <Loading/>;
  }
  return (
      <div className="flex w-full dark:bg-slate-800 flex-wrap justify-center items-center p-5">
        {myBlogs?.length > 0 &&
          myBlogs?.map(item => <Card key={item.id} item={item} />)}
      </div>
    
  );
};

export default MyBlogs;
