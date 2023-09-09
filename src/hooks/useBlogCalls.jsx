// import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/blogSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth);
  const { axiosWithToken, axiosWithoutToken } = useAxios();

  //!------------- GET CALLS ----------------
  const getBlogData = async url => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithoutToken.get(`api/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getBlogs = () => getBlogData("blogs");
  const getCategories = () => getBlogData("categories");
const getUserBlogs = async ()=> {
  dispatch(fetchStart());
  try {
    const { data } = await axiosWithToken.get(`api/blogs?author=${currentUser.id}`);
    dispatch(getSuccess({ data, url:"myBlogs" }));
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }
}
  //!------------- DELETE CALLS ----------------

  const deleteBlogs = async (id, url = "blogs") => {
    try {
      await axiosWithToken.delete(`api/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getBlogData(url);
      navigate("/");
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };
  //!------------- POST CALLS ----------------
  const postBlogData = async (info, url, callback) => {
    try {
      await axiosWithToken.post(`api/${url}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      if (info.post) {
        callback();
      } else {
        getBlogData("blogs");
      }
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };

  const postBlog = info => postBlogData(info, "blogs");

  const postComments = (info, getDetailData) =>
    postBlogData(info, `comments/${info.post}/`, getDetailData);

  //!------------- PUT CALLS ----------------
  const putBlog = async (info, handleClose, url = "blogs") => {
    try {
      await axiosWithToken.put(`api/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly updated`);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  //!------------- Post Comments ----------------

  useEffect(() => {
    if (currentUser) {
      getCategories();
    }
  }, [currentUser]);

  return {
    getBlogData,
    getCategories,
    getUserBlogs,
    getBlogs,
    postBlog,
    putBlog,
    postComments,
    deleteBlogs,
  };
};

export default useBlogCalls;
