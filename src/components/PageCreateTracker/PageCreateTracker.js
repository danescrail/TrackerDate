import React from 'react';
import { useState } from 'react';

function PageCreateTracker({
  nameTracker, typeDate, dateTracker, frequency, countDays,
  changeNameTracker, changeDateTracker,
  changeTypeDateTracker, changeFrequency,
  changeCountDays, changeCheckBoxWeek,
  createTracker}) {
  return <>
    <div className='container__form_create'>
      <div className='form_create-tracker'>
        <h2>Создайте свой трекер</h2>
        <p>Введите имя трекера</p>
        <input
          className='tracker__input-name'
          value={nameTracker}
          onChange={changeNameTracker}
        />
        <p>Введите продолжительность трекера</p>
        <input className='tracker__input-date'
          value={dateTracker}
          onChange={changeDateTracker}
          type="number"
        />
        <p>Выберите длительность трекера</p>
        <select className='tracker__select-type_date' value={typeDate} onChange={changeTypeDateTracker}>
          <option>В днях</option>
          <option>В месяцах</option>
          <option>Без ограничений (бесконечно)</option>
        </select>
        <p>Выберите периодичность трекера</p>
        <select className='tracker__select-frequency' value={frequency} onChange={changeFrequency}>
          <option>Каждый день</option>
          <option>Ввести через сколько дней</option>
          <option>Выбрать дни недели</option>
        </select>
        {frequency === 'Выбрать дни недели'
          ? <div className='week'>
            <span><input type="checkbox" name='week' value='Monday' key={'Monday'} onChange={changeCheckBoxWeek} /> понедельник </span>
            <span><input type="checkbox" name='week' value='Tuesday' key={'Tuesday'} onChange={changeCheckBoxWeek} /> вторник</span>
            <span><input type="checkbox" name='week' value='Wednesday' key={'Wednesday'} onChange={changeCheckBoxWeek} /> среда</span>
            <span><input type="checkbox" name='week' value='Thursday' key={'Thursday'} onChange={changeCheckBoxWeek} /> четверг</span>
            <span><input type="checkbox" name='week' value='Friday' key={'Friday'} onChange={changeCheckBoxWeek} /> пятница</span>
            <span><input type="checkbox" name='week' value='Saturday' key={'Saturday'} onChange={changeCheckBoxWeek} /> суббота</span>
            <span><input type="checkbox" name='week' value='Sunday' key={'Sunday'} onChange={changeCheckBoxWeek} /> воскресенье</span>
          </div>
          : ''
        }
        {frequency === 'Ввести через сколько дней'
          ? <div className='count-days'>
            <input type="number"
              value={countDays}
              onChange={changeCountDays}
            />
          </div>
          : ''
        }
      </div>
    </div>
    <div className='block__btn-create'>
      {dateTracker.length !== 0 && nameTracker.length !== 0
        ? <button onClick={() => createTracker()} className="btn-create">Создать трекер</button>
        : <h3>Заполните поля имени
          <br />
          и продолжительности
          <br />
          для создания</h3>
      }
    </div>
  </>
}

export default PageCreateTracker;