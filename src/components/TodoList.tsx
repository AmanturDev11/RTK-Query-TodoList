import { useState, useEffect } from 'react';
import {
	useGetTodosQuery,
	useCreateTodoMutation,
	useDeleteProductMutation
	// useEditTodoMutation,
} from '../redux/api/crud';

const TodoList = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editedFirstName, setEditedFirstName] = useState('');
	const [editedLastName, setEditedLastName] = useState('');

	const { data, isLoading } = useGetTodosQuery();
	const [createTodo] = useCreateTodoMutation();
	const [deleteProduct] = useDeleteProductMutation();
	// const [editButton] = useEditTodoMutation();

	useEffect(() => {
		if (editingTodoId !== null) {
			const todoToEdit = data.find((item) => item._id === editingTodoId);
			if (todoToEdit) {
				setEditedFirstName(todoToEdit.firstName);
				setEditedLastName(todoToEdit.lastName);
			}
		}
	}, [editingTodoId, data]);

	const addTodo = async () => {
		const createData = {
			firstName,
			lastName
		};
		await createTodo(createData);
	};

	const handleDeleteProduct = async (_id) => {
		await deleteProduct(_id).unwrap();
	};

	const handleEditButtonClick = (todoId) => {
		setEditingTodoId(todoId);
	};

	// const handleSaveButtonClick = async () => {
	// 	const updatedData = {
	// 		_id: editingTodoId,
	// 		firstName: editedFirstName,
	// 		lastName: editedLastName
	// 	};
	// 	await createTodo(updatedData);
	// 	setEditingTodoId(null);
	// 	setEditedFirstName('');
	// 	setEditedLastName('');
	// };
	// !!!!
	// const putTodos = async (_id: number) => {
	// 	const newData = {
	// 		firstName: editedFirstName,
	// 		lastName: editedLastName,
	// 	}
	// 	editButton({_id, newData})
	// }
	// !!!!!!!

	// const putTodos = async (_id: number) => {
	// 	const newData = {
	// 		firstName: editedFirstName,
	// 		lastName: editedLastName
	// 	};
	// 	handleEditButtonClick({ _id, newData });
	// };

	const putTodos = async (_id: number) => {
		if (editingTodoId === _id) {
			const newData = {
				firstName: editedFirstName,
				lastName: editedLastName
			};
			// Assuming you have an edit function
			await editButton({ _id, newData });
		}
		setEditingTodoId(null); // Reset editing state regardless of action
	};

	const handleSaveButtonClick = async (todoId) => {
		if (editingTodoId === todoId) {
			await putTodos(todoId);
		} else {
			// Handle addTodo logic here if needed
		}
	};

	// !!!!
	const handleCancelButtonClick = () => {
		if (editingTodoId !== null) {
			const todoToCancelEdit = data.find((item) => item._id === editingTodoId);
			if (todoToCancelEdit) {
				setEditedFirstName(todoToCancelEdit.firstName);
				setEditedLastName(todoToCancelEdit.lastName);
			}
		}
		setEditingTodoId(null);
	};

	return (
		<div>
			<input
				type="text"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<button onClick={addTodo}>Add</button>
			{isLoading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<>
					{data?.map((item) => (
						<div key={item._id}>
							{editingTodoId === item._id ? (
								<>
									<input
										type="text"
										value={editedFirstName}
										onChange={(e) => setEditedFirstName(e.target.value)}
									/>
									<input
										type="text"
										value={editedLastName}
										onChange={(e) => setEditedLastName(e.target.value)}
									/>
									{/* <button onClick={() => putTodos(item._id!)}>Save</button> */}
									<button onClick={() => handleSaveButtonClick(item._id)}>
										Save
									</button>

									<button onClick={handleCancelButtonClick}>Cancel</button>
								</>
							) : (
								<>
									<h1>{item.firstName}</h1>
									<button onClick={() => handleDeleteProduct(item._id)}>
										Delete
									</button>
									<button onClick={() => handleEditButtonClick(item._id)}>
										Edit
									</button>
								</>
							)}
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default TodoList;
