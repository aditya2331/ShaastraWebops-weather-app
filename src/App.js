import React from 'react';
import './App.css'
import Forecast from './components/forecast/forecast';
//The task that you will have to do is create a Weather App. Use a free weather API to display the weather for the current day and the next three days for any place the user inputs. Pay attention to UI as well as functionality.




function App() {

  var currentDate = new Date();
  var curday = currentDate.getDay();
  var datestring = currentDate.toString().split(" ");
  var date = datestring[0] + " " + datestring[2] + " " + datestring[1];


  return (
    <div className="App">
     <header className="App-header">
       <div className='date'>{date}</div>
       
     </header>
     <main>
       <Forecast curday={curday}/>
     </main>
     <footer>
       Page created by Aditya Mallick
     </footer>
   </div>
  );
}

export default App;
