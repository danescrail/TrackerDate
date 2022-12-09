import React, { useState } from 'react';
import PageCreateTracker from './components/PageCreateTracker/PageCreateTracker';
import './components/PageCreateTracker/PageCreateTracker.css';
import ListTracker from './components/ListTracker/ListTracker';
import './components/ListTracker/ListTracker.css';
import id from './components/CreateId/CreateId';
import PageTracker from './components/PageTracker/PageTracker';
import './components/PageTracker/PageTracker.css';
import Header from './components/Header/Header';
import './components/Header/Header.css';
import './components/Popup/Popup.css';
import Main from './components/Main/Main';
import './components/Main/Main.css';
import './components/Calendar/Calendar.css';
import './components/MediaQuery/MediaQuery.css';
import moment from 'moment';

function App() {
  const date = new Date();
  const [nameTracker, setNameTracker] = useState('');
  const [typeDate, setTypeDate] = useState('В днях');
  const [dateTracker, setDateTracker] = useState('');
  const [frequency, setFrequency] = useState('Каждый день');
  const [countDays, setCountDays] = useState('');
  const [week, setWeek] = useState({
    'Monday': false,
    'Tuesday': false,
    'Wednesday': false,
    'Thursday': false,
    'Friday': false,
    'Saturday': false,
    'Sunday': false
  });
  const [data, setData] = useState([]);
  const [editValue, setEditValue] = useState('');
  const [page, setPage] = useState(0);
  const [popup, setPopup] = useState('');
  const [calendar, setCalendar] = useState('');
  const [objIdTracker, setObjIdTracker] = useState({});

  function createObj() {
    return {
      'id': id(),
      'name_tracker': nameTracker,
      'duration_tracker': dateTracker,
      'type_tracker': typeDate,
      'count_days': countDays,
      'frequency': frequency,
      'week': week,
      'isWeek': isWeek(),
      'countDaysWeek': getDaysWeek(),
      'date_create': getDate(),
      'isEditName': false,
      'isSelect': false,
      'isActive': false
    }
  }

  function getDate() {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  }

  function getDaysWeek() {
    let sum = 0;
    for (let day in week) {
      if (week[day]) {
        sum++;
      }
    }

    return sum;
  }

  function isWeek() {
    for (let day in week) {
      if (week[day]) {
        return true;
      }
    }
    return false;
  }

  function isActiveOn(id) {
    setData(data.map(elem => {
      if (elem.id === id) {
        elem.isActive = true;
        return elem;
      } else {
        return elem;
      }
    }));
  }

  function isActiveOff(id) {
    setData(data.map(elem => {
      if (elem.id === id) {
        elem.isActive = false;
        return elem;
      } else {
        return elem;
      }
    }));
  }

  function diffDate(date1, date2) {
    return moment(date1, 'YYYY-MM-DD').diff(moment(date2, 'YYYY-MM-DD'), 'days');
  }

  function openTracker(id) {
    setData(data.map(elem => {
      if (elem.id === id) {
        elem.isSelect = true;
        return elem;
      } else {
        elem.isSelect = false;
        return elem;
      }
    }));
    setPage(3);

    let lastElemIdTracker = objIdTracker[id][objIdTracker[id].length - 1];
    let firstElemIdTracker = objIdTracker[id][0];
    let fullDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();;

    let diffDateDay = diffDate(fullDate, lastElemIdTracker);
    let durationTrackerDays = diffDate(fullDate, firstElemIdTracker);

    if (isNaN(durationTrackerDays)) {
      durationTrackerDays = 0;
    }

    if (getTime(id) === diffDate(lastElemIdTracker, firstElemIdTracker)) {
      alert('Пользователь молодец, соблюдал и отмечался вовремя во всем трекере! Трекер офицально завершен и будет удален =)');
      deleteTracker(id);
    }

    data.map(obj => {
      if (obj.id === id) {
        if (obj.frequency === 'Каждый день') {
          if (diffDateDay === 0) {
            isActiveOn(id);
          } else if (diffDateDay === 1) {
            isActiveOff(id);
          } else if (isNaN(diffDateDay)) {
          } else {
            alert('Вы не отметились вовремя, трекер был принудительно удален, прожито дней с отметками: ' + durationTrackerDays + ' / ' + getTime(id));
            deleteTracker (id);
          }
        } else if (obj.frequency === 'Выбрать дни недели') {
          for (let key in obj['week']) {
            if (obj['week'][key] === true && key === moment().format('dddd') && lastElemIdTracker !== fullDate) {
              isActiveOff(id);
              break;
            } else {
              isActiveOn(id);
            }
          }
        } else if (obj.frequency === 'Ввести через сколько дней') {
          if (diffDateDay === Number(obj.count_days)) {
            isActiveOff(id);
          } else if (isNaN(diffDateDay)) {
            isActiveOff(id);
          } else if (diffDateDay > Number(obj.count_days)) {
            alert('Вы не отметились вовремя, трекер был принудительно удален, прожито дней с отметками: ' + durationTrackerDays + ' / ' + getTime(id));
            deleteTracker(id);
          } else {
            isActiveOn(id);
          }
        }
      }
    });
  }

  function getTime(id) {
    let getDays;

    for (let obj of data){
      if (obj.id === id){
        if (obj.type_tracker === 'В днях') {
          getDays = obj.duration_tracker;
        } else if (obj.type_tracker === 'В месяцах') {
          getDays = obj.duration_tracker * 30;
        } else if (obj.type_tracker === 'Без ограничений (бесконечно)') {
          getDays = Infinity;
        }
      }
      break;
    }

    return Number(getDays);
  }

  function editName(id) {
    setData(data.map(elem => {
      if (elem.id === id) {
        setEditValue(elem.name_tracker);
        elem.isEditName = !elem.isEditName;
      }
      return elem;
    }));
  }

  function saveName(id) {
    setData(data.map(elem => {
      if (elem.id === id) {
        elem.name_tracker = editValue;
        elem.isEditName = !elem.isEditName;
        return elem;
      } else {
        return elem;
      }
    }));
  }

  function deleteTracker(id) {
    setData(data.filter(elem => {
      if (elem.id !== id) {
        return elem;
      }
    }));

    setPopup(
      <div className="fixed-overlay" onClick={() => popupHide()}>
        <div className="modal">
          <div className="modal_container">
            <h3>Трекер успешно удален!</h3>
            <button onClick={popupHideDelete()} className="btn-popup_hide">Вернуться в список</button>
          </div>
        </div>
      </div>
    )
  }

  function popupHide() {
    setPopup('');
  }

  function popupHideDelete() {
    setPopup('');
    setPage(1);
  }

  function changeNameTracker(event) {
    setNameTracker(event.target.value);
  }

  function changeDateTracker(event) {
    if (+event.target.value <= 0 || event.target.value === '-') {
      setDateTracker('');
    } else if (+event.target.value > 365) {
      setDateTracker(365);
    } else {
      setDateTracker(event.target.value);
    }
  }

  function changeTypeDateTracker(event) {
    setTypeDate(event.target.value);
  }

  function changeFrequency(event) {
    setFrequency(event.target.value);
    setWeek({
      'Monday': false,
      'Tuesday': false,
      'Wednesday': false,
      'Thursday': false,
      'Friday': false,
      'Saturday': false,
      'Sunday': false
    });
    setCountDays('');
  }

  function changeCheckBoxWeek(event) {
    let copy = Object.assign({}, week);
    copy[event.target.value] = !copy[event.target.value];
    setWeek(copy);
  }

  function changeCountDays(event) {
    if (+event.target.value <= 0 || event.target.value === '-') {
      setCountDays('');
    } else if (+event.target.value > 365) {
      setCountDays(365);
    } else {
      setCountDays(event.target.value);
    }
  }

  function createTracker() {
    let obj = createObj();

    setData([...data, obj]);

    if (frequency === '') {
      setFrequency('Каждый день');
    }
    if (typeDate === '') {
      setTypeDate('В днях');
    }

    setNameTracker('');
    setTypeDate('В днях');
    setDateTracker('');
    setFrequency('Каждый день');
    setCountDays('');
    setWeek({
      'Monday': false,
      'Tuesday': false,
      'Wednesday': false,
      'Thursday': false,
      'Friday': false,
      'Saturday': false,
      'Sunday': false
    });

    setPopup(
      <div className="fixed-overlay" onClick={() => popupHide()}>
        <div className="modal">
          <div className="modal_container">
            <h3>Трекер успешно создан!</h3>
            <button onClick={popupHide()} className="btn-popup_hide">Продолжить</button>
          </div>
        </div>
      </div>
    );

    let copy = Object.assign({}, objIdTracker);
    copy[obj.id] = [];
    setObjIdTracker(copy);
  }

  function saveCheckPoint(id) {
    setData(data.map(elem => {
      if (elem.id === id) {
        elem.isActive = true;
        return elem;
      } else {
        return elem;
      }
    }));

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let copy = Object.assign({}, objIdTracker);
    copy[id].push(year + '-' + month + '-' + day);
    setObjIdTracker(copy);
  }

  return <div>
    {popup}
    <Header
      setPage={setPage}
      page={page}
    />
    {page === 2
      ? <PageCreateTracker
        nameTracker={nameTracker}
        dateTracker={dateTracker}
        typeDate={typeDate}
        frequency={frequency}
        countDays={countDays}
        changeFrequency={changeFrequency}
        changeNameTracker={changeNameTracker}
        changeDateTracker={changeDateTracker}
        changeTypeDateTracker={changeTypeDateTracker}
        changeCountDays={changeCountDays}
        createTracker={createTracker}
        changeCheckBoxWeek={changeCheckBoxWeek}
      />
      : ''
    }
    {page === 1
      ? <ListTracker
        data={data}
        openTracker={openTracker}
        setPage={setPage}
        calendar={calendar}
        setCalendar={setCalendar}
      />
      : ''
    }
    {page === 3
      ? <PageTracker
        data={data}
        editName={editName}
        editValue={editValue}
        setEditValue={setEditValue}
        saveName={saveName}
        deleteTracker={deleteTracker}
        setPage={setPage}
        saveCheckPoint={saveCheckPoint}
      />
      : ''
    }
    {page === 0
      ? <Main
      />
      : ''
    }
  </div>;
}

export default App;