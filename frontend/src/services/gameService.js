import { baseApi } from "../store/baseApi";

export const gameService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation({
      query: ({ name, creationDate, categoryType, imageBase64 }) => ({
        url: "games/create",
        method: "POST",
        body: { name, creationDate, categoryType, imageBase64 },
      }),
      transformResponse: (response) => response?.data?.result,
      transformErrorResponse: (response) => response?.data,
    }),

    getAllGames: builder.query({
      query: () => ({
        url: "/games",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.result,
      transformErrorResponse: (response) => response?.data,
    }),
  }),
});

export const { useCreateGameMutation, useGetAllGamesQuery } = gameService;
