import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";
import CommentForm from "../components/Blog/CommentForm";
import CommentCard from "../components/Blog/CommentCard";
import { Button } from "flowbite-react";
import UpdateModal from "../components/Blog/UpdateModal";
import DeleteModal from "../components/Blog/DeleteModal";
import Loading from "../components/Loading";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { axiosWithToken } = useAxios();
  const { currentUser } = useSelector(state => state.auth);

  const getDetailData = async () => {
    try {
      const { data } = await axiosWithToken.get(`api/blogs/${id}/`);
      setDetail(data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getDetailData();
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  const handleClick = async () => {
    try {
      await axiosWithToken.post(`api/likes/${id}/`);
      getDetailData();
    } catch (error) {}
  };

  return (
    <>
      {!loading ? (
        <article className="max-w-2xl mt-2 px-6 py-24 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">
          <div className="w-full bg-white grid place-items-center">
            <img src={detail.image} alt={detail.title} className="rounded-xl" />
          </div>
          <div className="w-full mx-auto space-y-4 text-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {detail.title.toUpperCase()}
            </h1>
            <p className="text-sm dark:text-gray-400">
              by
              <span className="p-1">
                {detail.author[0].toUpperCase() + detail.author.slice(1)}
              </span>
              on
              <time className="p-1">
                {new Date(detail.publish_date).toLocaleString()}
              </time>
            </p>
          </div>
          <div className="dark:text-gray-100 text-justify indent-5">
            <p>{detail.content}</p>
          </div>
          <div className="pt-12 border-t dark:border-gray-700">
            <div className="flex justify-center pt-4 space-x-4 align-center">
              <div className="flex">
                <svg
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>

                <span className="text-gray-500 text-lg pl-1">
                  {detail.post_views}
                </span>
              </div>
              <div
                className="flex cursor-pointer"
                onClick={() => handleClick()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    detail.likes_n?.filter(
                      like => like.user_id === currentUser?.id
                    ).length > 0
                      ? "h-8 w-8 text-pink-500"
                      : "h-8 w-8 text-gray-500"
                  }
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="pl-1 text-lg text-gray-500">
                  {detail.likes}
                </span>
              </div>
              <div
                className="flex cursor-pointer"
                onClick={() => setShowComment(!showComment)}>
                <svg
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span className="text-lg pl-1 text-gray-500">
                  {detail.comment_count}
                </span>
              </div>
            </div>
          </div>
          {currentUser?.username === detail?.author && (
            <div className="flex justify-center pt-4 space-x-4 align-center">
              <Button
                onClick={handleOpen}
                outline={true}
                gradientDuoTone="purpleToPink">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </Button>
              <Button
                onClick={handleOpenDelete}
                outline={true}
                gradientDuoTone="pinkToOrange">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </Button>
              <UpdateModal
                open={open}
                handleClose={handleClose}
                info={detail}
              />
              <DeleteModal
                open={openDelete}
                handleCloseDelete={handleCloseDelete}
                id={detail.id}
              />
            </div>
          )}
          {showComment && (
            <div>
              <CommentForm id={id} getDetailData={getDetailData} />
              {detail.comments?.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
              ))}
            </div>
          )}
        </article>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Detail;
