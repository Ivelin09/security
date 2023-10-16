import './App.css';
import { useEffect, useState } from 'react';

const dateConverter = (miliseconds) => {
  return {
    weeks: Math.round(miliseconds / 100000) / 60 / 24 / 7,
    days: Math.round((miliseconds / 100000) / 60 / 24 % 7),
    hours: Math.round((miliseconds / 100000) / 60 % 24),
    minutes: Math.round((miliseconds / 100000) % 60),
  }
}

function App() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://naivelinmugurbihatelefona.com/api", {
        method: 'GET'
      }).then((res) => res.json());

      setImages(response.message);
    }

    fetchData();
  }, []);

  const changeCurrent = (currIdx, value) => {
    currIdx += value;
    if (currIdx >= images.length || currIdx < 0)
      currIdx -= value;

    setCurrent(() => currIdx);
    return;
  }

  const displayCreatedAgo = () => {
    return Object.entries(dateConverter(images[current].createdAgo)).map(([period, time]) => {
      console.log(period, time)
      return Math.floor(time) == 0 ? "" : (time.toString() + " " + period.toString() + " ")
    });
  }


  return (
    <div>
      <div className='back' />
      <dialog id="my_modal_1" className="modal" open>
        <div className="modal-box">
          <h1 className="font-bold text-lg" >Most recent photo</h1>
          <div className="slide">
            <button onClick={() => changeCurrent(current, -1)}>{"<"}</button>
            {images.length != 0 && <img src={`https://naivelinmugurbihatelefona.com/api/${images[current].imageUrl}`} />}
            <button onClick={() => changeCurrent(current, +1)}>{">"}</button>
          </div>
          <h1>Taken {images.length != 0 && displayCreatedAgo()} ago</h1>
          <div className="modal-action">
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default App;
