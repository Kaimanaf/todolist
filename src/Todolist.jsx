import{ useState, useRef} from "react";
import Todo from "./Todo";
import Moment from 'moment';
import Service from './Service'
import { useEffect } from "react";



function  Todolist() {
  let inputTodoRef = useRef("");
  let inputDateRef = useRef("");
  let [todoList, setTodolist] = useState([]);
  let [todoIndex, setTodoIndex] = useState(null);


  async function loadListData () {
    const response = await Service.list();
    const data = response.data.data;
    setTodolist(() => data)
  };

  useEffect(() => {
    loadListData ();
  }, [])

  async function handleAddbutton(e) {
    e.preventDefault();
//edi
    if (todoIndex != null) {
              await Service.update(
                {
          name : inputTodoRef.current.value,
          date : inputDateRef.current.value,
         },
        todoIndex
      );

    setTodoIndex(() => null);
        }
    
        else {
      await Service.create({
        name : inputTodoRef.current.value,
         date : inputDateRef.current.value,
         isDone :false,
      });        
    }
    loadListData();
  }
  async function handleRadioOnChecked(e, index) {
    Service.toggleDone(index);
    loadListData();
  }
  async function handleClearAll(e){
    e.preventDefault();
    if (! confirm("are you sure ?")) return;
    await Service.deleteAll();
    loadListData
  }
  
  async function handleDeleteList(e,index){
    e.preventDefault();
    if (! confirm("are you sure ?")) return;
    await Service.delete(index);
    loadListData();
  }
  function handleEdit(e,index){
    e.preventDefault();
    const selectedTodo = todoList.find((_todo) => _todo.id==index);
    const formatedDate = Moment(selectedTodo.date).format("Y-MM-DD");
    inputTodoRef.current.value = selectedTodo.name;
    inputDateRef.current.value =formatedDate;
    setTodoIndex(() => index); 
  }

  function handleCancel(e) {
    setTodoIndex(() => null);
    inputTodoRef.current.value = null;
    inputDateRef.current.value = null;

  }
  

  return (
    <div className="w-1/2 m-auto space-y-5">
      <h1>Training Todo list  </h1>
      <div className="space-x-2 flex flex-rows justify-between">
      <input
ref={inputTodoRef}
      type="text"
      className="border-2 border-gray-300 p-1 text-xs w-full"
      placeholder="masukan TODO"
      />
      <input
 ref={inputDateRef} 
      type="date"
      className="border-2 border-gray-300 p-1 text-xs w-full"
      placeholder="masukan tanggal"
      />
      <button 
      onClick={handleAddbutton } 
      className ={
       (todoIndex== null ?  "bg-green-300" : "bg-blue-300") +
       " w-[100px] text-white rounded-sm"
      }
      >
      {todoIndex == null ? "add" : "Edit"}
     </button>
     <button
     onClick = {handleCancel }
     className = "bg-red-300 w-[100px] text-white rounded-sm"
     >
      Cancel
      </button>
      </div>
      
     <div className="space-y-1">
      { todoList.map((todo, key) => (
        <Todo index ={todo.id}
        Date={todo.date} name={todo.name} 
        onDelete={handleDeleteList}
         onEdit={handleEdit}
          onChange={handleRadioOnChecked} 
          isDone={todo.isDone} 
           key={key} />
      )) }
          </div>
    <div className="flex flex-row justify-between">
          <p> you have
            {todoList.reduce((total, todo) => {
              if (todo.isDone) return total;
              return (total += 1);
            }, 0)}
             pending task </p>
    <button onClick={handleClearAll}
    className="bg-red-500 text-white p-2 rounded-md ">
      Clear ALL
    </button>
    </div>
    </div>
   ); 
    } 
  
  

export default Todolist;
