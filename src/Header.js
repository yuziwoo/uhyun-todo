/* eslint-disable */
import { useEffect } from 'react';
import './Header.css';

function Header() {
  useEffect(() => {
    let timer = document.getElementsByClassName("timer")[0];
    let now = new Date();
    let halfhour = now.getHours() % 12;
    let m = now.getMinutes();
    let hour = (halfhour) >= 10 ? halfhour : halfhour == 0 ? "12" :  `0${halfhour}`;
    let min = m < 10 ? `0${m}` : m;
    timer.textContent = `${hour}:${min}`;

    if (window.tictoc == undefined) {
      window.tictoc = setInterval(() => {
        let now = new Date();
        let halfhour = now.getHours() % 12;
        let m = now.getMinutes();
        let hour = (halfhour) >= 10 ? halfhour : halfhour == 0 ? 12 :  `0${halfhour}`;
        let min = m < 10 ? `0${m}` : m;
        timer.textContent = `${hour}:${min}`;
      }, 1000);
    }
  }, [])

  return (
    <header>
      {/* <img src={`${process.env.PUBLIC_URL}title.jpg`}></img> */}
      <img src='./../title.jpg'></img>
      <div className="timer">00:00</div>
      <p className="logo logo1">TODO</p>
      <p className="logo logo2">BY UHYUN</p>
    </header>
  );
}

export default Header;