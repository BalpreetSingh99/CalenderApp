import './App.css';
import Calendar from 'react-calendar';
import {useState,useEffect} from 'react'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { Domain } from '@material-ui/icons';

function App() {
  let f=0
  const [value, setValue] = useState(new Date());
  const [data,setData]=useState([]);
  const [click,setClick]=useState(false);
  const [newActivity,setNewActivity]=useState("");
  const [colorr,setColor]=useState(false)
  useEffect(()=>{
    axios.post(`http://localhost:5000/`,{date:value})
      .then(res => {
        console.log(res.data);
        setData(res.data.data);
    })
  },[]);
  function newDate(v,event){
    setValue(v);
    axios.post(`http://localhost:5000/`,{date:v})
      .then(res => {
        console.log(res.data);
        setData(res.data.data);
    })
  }
  function toggleActivityInput(){
    setClick(!click);
  }
  function addActivity(){
    axios.post(`http://localhost:5000/add`,{date:value,data:newActivity})
      .then(res => {
        console.log(res.data);
        setData(res.data.data);
        setNewActivity("")

    })
  }
  function onChangeNewActivity(event){
    setNewActivity(event.target.value)
  }
  function deleteActivity(text){
    axios.post(`http://localhost:5000/delete`,{date:value,data:text})
      .then(res => {
        console.log(res.data);
        setData(res.data.data);
        setNewActivity("")

    })
  }
  function bagcolor(){
    // f=!f
    // document.querySelector('.main').classList.toggle("b");
    // document.querySelector('.e').classList.toggle("d");
    // document.querySelector('.ww').classList.toggle("xx");
    // document.querySelector('.yy').classList.toggle("zz");
    // if(f)
    //   document.querySelector('.darkmode').innerHTML="off"
    // else
    //   document.querySelector('.darkmode').innerHTML="on"

    setColor(!colorr)
  }
  return (
    <div className="main" style={{height:"100vh"}} style={colorr?{backgroundColor:"black"}:{backgroundColor:"white"}}>
    <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
      <Calendar
        onClickDay={newDate}
        value={value}
      />
      <br></br>
      <div className="darkmode-box">
      <p style={colorr?{color:"white"}:{color:"black"}}>Dark Mode</p>
    <button onClick={bagcolor} className="darkmode">{colorr?"off":"on"}</button>
    </div>
    <AddCircleIcon onClick={toggleActivityInput} style={colorr?{color:"white"}:{color:"black"}}/>
    <div style={click?{display:"block"}:{display:"none"}}>
    <input type="text" placeholder="enter you activity" value={newActivity} onChange={onChangeNewActivity} ></input>
    <button onClick={addActivity} >Add</button>
    </div>
    {data.map((item, index) => <div key={index}><p style={colorr?{color:"white"}:{color:"black"}} className="row" >{item}<DeleteIcon onClick={()=>{deleteActivity(item)}} /></p></div>)}
    </div>
    
    </div>
  );
}

export default App;

