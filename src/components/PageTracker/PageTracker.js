import React from 'react';
import { useState } from 'react';
import Calendar from '../Calendar/Calendar';

function PageTracker({ data, editName, editValue, setEditValue, saveName, deleteTracker, setPage, setCalendar, calendar, saveCheckPoint }) {
  const item = data.map(elem => {
    if (elem.isSelect) {
      let str = '';
      if (elem.isWeek) {
        for (let key in elem.week) {
          if (elem.week[key]) {
            if (key === 'Monday') {
              str += 'понедельник ';
            } else if (key === 'Tuesday') {
              str += 'вторник ';
            } else if (key === 'Wednesday') {
              str += 'среда ';
            } else if (key === 'Thursday') {
              str += 'четверг ';
            } else if (key === 'Friday') {
              str += 'пятница '
            } else if (key === 'Saturday') {
              str += 'суббота '
            } else if (key === 'Sunday') {
              str += 'воскресенье '
            }
          }
        }
      } else if (elem.count_days.length !== 0) {
        str = 'раз в ' + elem.count_days + ' дней/дня';
      } else if (elem.frequency === 'Каждый день') {
        str = elem.frequency.toLowerCase();
      }

      return (

        <div className='items-trackers__container'>
          <p onClick={() => setPage(1)} className="editName">Назад</p>
          <ul key={elem.id} className='items-trackers'>
            {elem.isEditName
              ? <li>
                <input
                  value={editValue}
                  onChange={event => setEditValue(event.target.value)}
                /> <span className='editName' onClick={() => saveName(elem.id)}>сохранить</span></li>
              : <li>Имя: {elem.name_tracker} <span className='editName' onClick={() => editName(elem.id)}>редактировать</span></li>
            }
            <li>Продолжительность: {elem.duration_tracker}</li>
            <li>Длительность: {elem.type_tracker.toLowerCase()}</li>
            <li>Периодичность: {str}</li>
            <li><span className='delete' onClick={() => deleteTracker(elem.id)}>Удалить</span></li>
          </ul>

          <Calendar
            durationTracker={elem.duration_tracker}
            typeTracker={elem.type_tracker}
            typeFrequency={str}
            calendar={calendar}
            setCalendar={setCalendar}
          />

          {!elem.isActive
            ? <>
              <h3>Нажми на кнопку
                <br />
                чтобы отметиться</h3>
              <button className='checkPoint' onClick={() => saveCheckPoint(elem.id)} disabled={elem.isActive}>Отметиться</button>
            </>
            : <>
            <h3>Успешно отмечено!
                <br />
                приходи в следующий раз </h3> 
            <button className='checkPoint-disabled' onClick={() => saveCheckPoint(elem.id)} disabled={elem.isActive}>Отметиться</button>
            </>
          }

        </div>
      )
    }
  });

  return <div>
    {item}
  </div>;
}

export default PageTracker;