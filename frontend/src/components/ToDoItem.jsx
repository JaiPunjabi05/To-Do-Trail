// React component which is displayed in form of list, having the list item and delete button 

import React, {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function ToDoItem(props) {

    const [clicked, setClicked] = useState(false);

    function handleClick(){
        setClicked(!clicked);
    }

  return (
    <div>
      <li>
          {/* list item */}
          <span style={{textDecoration : clicked ? "line-through" : "none"}} onClick={handleClick} className="inputSpace">{props.text}</span>

          {/* delete button */}
          <button 
            onClick={() => {
                props.onChecked(props.id);
            }}
          >
            <DeleteIcon />
          </button>
      </li>
    </div>
  );
}

export default ToDoItem;
