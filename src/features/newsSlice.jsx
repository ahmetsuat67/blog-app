import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  news: [],
  loading: false,
  error: false,
};

export const getNews = createAsyncThunk(
  "getNewsFunc", //? action type name

  async () => {
    const url = "https://newsdata.io/api/1/news?apikey=pub_692629df384570d6f3d093bfe90ec0f68149&language=tr,en";

    const { data } = await axios(url);
    console.log(data);
    return data.results;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
  },
  //? createAyncThunk metedo bir middleware olarak API gibi dis kaynakli isteklerin redux ortaminda olsuturulmasini saglar. Ancak API^deki durumlara gore state'lerin guncellenmesini saglamaz. Bunun icin slice icersiindeki extraReducer kismi kullanilir.

  //? API isteklerinde 3 farkli alt durum meydana gelir. Bunlar baslama (pending), basarili bitme (fullfilled) ve basariz bitme (rejected) dir.

  extraReducers: builder => {
    builder
      .addCase(getNews.pending, state => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});


export default newsSlice.reducer;
