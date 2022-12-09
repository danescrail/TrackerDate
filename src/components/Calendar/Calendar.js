import React from 'react';
import { useState } from 'react';
import getMonth from './getMonth';
import getDaysInMonth from './getDaysInMonth';

function getFirstWeekDay() {
  let now = new Date();
  let date = new Date(now.getFullYear(), now.getMonth(), 1);

  return date.getDay();
}

function getLastWeekDay() {
  let now = new Date();
  let date = new Date(now.getFullYear(), now.getMonth(), getDaysInMonth(now.getMonth()));

  return date.getDay();
}

function range(count) {
  let arr = [];

  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }

  return arr;
}

function Calendar({ durationTracker, typeTracker, typeFrequency }) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let arr = range(getDaysInMonth(month));
  let firstWeekDay = getFirstWeekDay();
  let lastWeekDay = getLastWeekDay();

  function normalize(arr, left, right) {
    for (let i = 1; i < left; i++) {
      arr.unshift('');
    }
    for (let i = 1; i <= right; i++) {
      arr.push('');
    }

    return arr;
  }

  function chunk(arr, n) {
    const array2 = [];
    let section;

    for (const [index, element] of arr.entries()) {
      if (index % n === 0) array2.push(section = []);
      section.push(element);
    }

    return array2;
  }

  let result = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
  const items = result.map(elem => {
    for (let i = 0; i < elem.length; i++) {
      return <tr className='items-table'>

        {elem[0] !== day
          ? <td className='table-item__inactive'>{elem[0]}</td>
          : <td className='table-item__active'>{elem[0]}</td>
        }
        {elem[1] !== day
          ? <td className='table-item__inactive'>{elem[1]}</td>
          : <td className='table-item__active'>{elem[1]}</td>
        }
        {elem[2] !== day
          ? <td className='table-item__inactive'>{elem[2]}</td>
          : <td className='table-item__active'>{elem[2]}</td>
        }
        {elem[3] !== day
          ? <td className='table-item__inactive'>{elem[3]}</td>
          : <td className='table-item__active'>{elem[3]}</td>
        }
        {elem[4] !== day
          ? <td className='table-item__inactive'>{elem[4]}</td>
          : <td className='table-item__active'>{elem[4]}</td>
        }
        {elem[5] !== day
          ? <td className='table-item__inactive'>{elem[5]}</td>
          : <td className='table-item__active'>{elem[5]}</td>
        }
        {elem[6] !== day
          ? <td className='table-item__inactive'>{elem[6]}</td>
          : <td className='table-item__active'>{elem[6]}</td>
        }
      </tr>
    }
  }
  )

  return <div className='table-tracker__block'>
    <span>{getMonth(month)} </span>
    <span>{year} </span>
    <span>день {day}</span>
    <table className='table-tracker'>
      <thead>
        <tr>
          <td>Пн</td>
          <td>Вт</td>
          <td>Ср</td>
          <td>Чт</td>
          <td>Пт</td>
          <td>Сб</td>
          <td>Вс</td>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  </div>;
}

export default Calendar;