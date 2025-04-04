import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tabs } from './Data/Tab';

function App() {
  let [todolist, setTodolist] = useState([]);
  let [activeTabs ,setactiveTabs] =useState(0);
  let [activeContent,setactiveContent]=useState(tabs[0]);

  let changeData=(i)=>{
    setactiveTabs(i);
    setactiveContent(tabs[i]);
  }
  // Save ToDo
  const saveToDoList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value.trim();

    if (toname === '') {
      toast.warn('Please enter a ToDo name!', {
        position: 'top-right',
        autoClose: 1000,
      });
      return;
    }

    if (!todolist.includes(toname)) {
      let finalDolist = [...todolist, toname];
      setTodolist(finalDolist);

      // Success toast
      toast.success('ToDo added successfully!', {
        position: 'top-right',
        autoClose: 1000,
      });

      event.target.reset();  // Clear input field
    } else {
      // Error toast for duplicate entry
      toast.error('ToDo name already exists!', {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

  // Map ToDo list
  let list = todolist.map((value, i) => (
    <ToDoListItems 
      key={i} 
      indexNumber={i} 
      value={value} 
      settodolist={setTodolist} 
      todolist={todolist} 
    />
  ));

  return (
    <div className="App">
      <div className='tabsouter'>
      <h1 style={{textAlign:'left'}}>Heading</h1>
      <ul>
        {tabs.map((tabsitems ,i)=>{
          return(
            <li>
            <button onClick={()=>changeData(i)} className={activeTabs==i ? 'activeBtn':''}>{tabsitems.title}</button>
          </li>
          )
        })}
      </ul>
        {activeContent != undefined ?
              <p>
              {activeContent.description}
              </p>
              : ''
        }

      </div>



      <h1>TO DO LIST</h1>

      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" placeholder="Enter ToDo" />
        <button type="submit">Save</button>
      </form>

      <div className="outerDiv">
        <ul>{list}</ul>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;

function ToDoListItems({ value, indexNumber, todolist, settodolist }) {
  let [status, setStatus] = useState(false);

  // Delete ToDo
  const deleteRow = () => {
    let finalDolist = todolist.filter((_, i) => i !== indexNumber);
    settodolist(finalDolist);

    // Toast notification for delete
    toast.info(`"${value}" deleted successfully!`, {
      position: 'top-right',
      autoClose: 1000,
    });
  };

  // Toggle completion status
  const toggleStatus = () => {
    setStatus(!status);
  };

  return (
    <li className={status ? 'completed' : ''} onClick={toggleStatus}>
      {indexNumber + 1}. {value}
      <span className="delete-btn" onClick={(e) => {
        e.stopPropagation(); // Prevent status toggle when clicking delete
        deleteRow();
      }}>&times;</span>
    </li>
  );
}
