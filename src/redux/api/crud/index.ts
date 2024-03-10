/* eslint-disable @typescript-eslint/no-explicit-any */
import { api as index } from '..';
import { CRUD } from './types';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<CRUD.GetCrudResponse, CRUD.GetCrudRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['crud']
		}),

		createTodo: builder.mutation<
			CRUD.CreateCrudResponse,
			CRUD.CreateCrudRequest
		>({
			query: (newData) => ({
				url: '',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['crud']
		}),
		deleteProduct: builder.mutation({
			query: (_id) => ({
				url: `${_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['crud']
		}),
		editTodo: builder.mutation({
			query: ( id, newData ) => ({
				url: `${id}`,
				method: 'PATCH',
				body: newData
			}),
			invalidatesTags: ['crud']
		})
	})
});
export const {
	useGetTodosQuery,
	useCreateTodoMutation,
	useDeleteProductMutation,
	useEditTodoMutation
	// useEditTodoMutation,
} = api;

// !!!!

