import './styles.css'
import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [newItem, setItem] = useState('')
    const [newToDo, setToDo] = useState<{id: string, nameToDo: string, finished: boolean}[]>([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        setToDo(savedTodos);
        console.log('loaded')
    }, []);

    useEffect(() => {

        localStorage.setItem('todos', JSON.stringify(newToDo));
        console.log('added')
    }, [newToDo]);

    function addToDo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (newItem.length !== 0 && newItem.trim() !== '') {
            setToDo((currentToDo) => {
                return [
                    ...currentToDo,
                    { id: uuidv4(), nameToDo: newItem, finished: false }
                ];
            });
            setItem('');
        }
    }


    function deleteToDo(id: string) {
       setToDo((currentToDo) =>{
           return currentToDo.filter(newToDo => newToDo.id !== id)
       })
    }

    return(
        <>
            <form onSubmit={addToDo} className='new-item-form'>
                <div className='form-row'>
                    <label htmlFor='item' className='item'>New Item</label>
                    <input value={newItem} onChange={(e) => setItem(e.target.value)} type='text' id='item'/>
                </div>
                <button className='btn'>Add</button>
            </form>
            <h2 className='header'>ToDo List</h2>
            <ul className='list'>
                {newToDo.length === 0 && 'No Todos'}
                {newToDo.map(
                    newToDo =>{
                        return <li key={newToDo.id}>
                            <label>
                                <input type='checkbox' id='smth'/>
                                {newToDo.nameToDo}
                            </label>
                            <button onClick={()=> deleteToDo(newToDo.id)} className='btn btn-danger'>Delete</button>
                        </li>
                    }
                )}

            </ul>

        </>
    )
}

export default App;


















// import './styles.css'
// import React, {useState} from "react";
//
// function App() {
//     const [newItem, setNewItem]  = useState("")
//     const [todos, setTodos] = useState<{ id: string; title: string; completed: boolean }[]>([]);
//     function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault()
//         setTodos((currentTodos) => {
//             return [
//                 ...currentTodos,
//                 { id: crypto.randomUUID(), title: newItem, completed: false }
//             ];
//         });
//         setNewItem('')
//     }
//     function toggleTodo(id: string,completed:boolean) {
//         setTodos(currentTodos =>{
//             return currentTodos.map(todo =>{
//                 if (todo.id === id){
//                     return {...todo, completed}
//                 }
//
//                 return todo
//             })
//         })
//     }
//
//     function deleteTodo(id:string) {
//        setTodos(currentTodos =>{
//            return currentTodos.filter(todo => todo.id !== id)
//        })
//     }
//     return (
//         <>
//             <form onSubmit={handleSubmit} className='new-item-form'>
//                 <div className='form-row'>
//                     <label htmlFor='item'>New Item</label>
//                     <input
//                         value={newItem}
//                         onChange={e => setNewItem(e.target.value)}
//                         type='text'
//                         id='item'
//                     />
//                 </div>
//                 <button className='btn'>Add</button>
//             </form>
//             <h1 className='header'> Todo List</h1>
//             <ul className='list'>
//                 {todos.length === 0 && 'No Todos'}
//                 {todos.map(todo =>{
//                     return <li key={todo.id}>
//                         <label>
//                             <input type='checkbox' checked={todo.completed}
//                             onChange={e=> toggleTodo(todo.id,e.target.checked)}/>
//                             {todo.title}
//                         </label>
//                         <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
//                     </li>
//                 })}
//
//             </ul>
//         </>
//     )
// }
//
// export default App