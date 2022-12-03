import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Main from './Main';
import Add from './Add';
import Context from './Context';
import Edit from './Edit';
import Error from './Error';


function App() {

  const [el, setEl]=useState({});
  function onEdit(obj){
    setEl(obj);
  }
  
  
  async function onDelete(id){
    fetch(`https://apitester.pythonanywhere.com/api/books/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type' : 'application/json',
        'Authorization' : `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res=>console.log(res))
    .then(json=> window.location.href="/main")
    .catch(err=>console.log(err))
  }

  const obj={
    onDelete,
    onEdit,
  }

  return (
    <Context.Provider value={obj}>
        <div className="wrapper">

        <Router>

          <Routes>
            <Route exact path={process.env.PUBLIC_URL + '/'} element={<Login />} />
            <Route path={process.env.PUBLIC_URL + '/registration'} element={<Registration />} />
            <Route path={process.env.PUBLIC_URL + '/main'} element={<Main />} />
            <Route path={process.env.PUBLIC_URL + '/add'} element={<Add />}/>
            <Route path={process.env.PUBLIC_URL + '/edit'} element={<Edit value={el}/>} />
            <Route path="*" element={<Error />} />
          </Routes>

        </Router>

        </div>
    </Context.Provider>
  );
}

export default App;
