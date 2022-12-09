import React from 'react';
import { useState } from 'react';

function PageCreateTracker({
  nameTracker, typeDate, dateTracker, frequency, countDays,
  changeNameTracker, changeDateTracker,
  changeTypeDateTracker, changeFrequency,
  changeCountDays, createTracker }) {
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
        </select>
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