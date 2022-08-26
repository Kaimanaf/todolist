import TrashIcon from "./assets/trash.png";
import EditIcon from "./assets/edit.png";
import Moment from "moment";

function Todo({index,name,date,isDone, onChange, onDelete, onEdit}) {
    const formateDate = Moment(date).format("d-MM-Y");
    return (
     <>
    <div className="bg-gray-200 flex flex-row p-2 space-x-2 justify-between">
    <input type="checkbox"     
    className ="accent-green-488"
    checked= {isDone}
    onChange={(e) => onChange(e, index)}
    />
    <p className={isDone ? "line-through": "" } > {name}  </p>
    <em> {formateDate}</em>
    <div className="space-x-2">
    <button onClick={(e) => onEdit (e, index)} >  
    <img src={EditIcon} className="w-5"/>
      </button>
     < button onClick={(e) => onDelete(e,  index)} >
         <img src={TrashIcon} className="w-5 "/>
       </button>
     </div>
    </div>        
   </> 
 );
}
export default Todo;