import React from 'react';
import { useState } from 'react';

function ListTracker({ data, openTracker, setPage }) {

  const items = data.map(elem => {
    return (
      <li className='tracker__item' key={elem.id} onClick={() => openTracker(elem.id)}>{elem.name_tracker}</li>
    )
  });

  return <ul className='items-tracker'>
    <h2 className='items-tracker__header'>Список трекеров</h2>
    {data.length === 0
      ? <li className='tracker__item' onClick={() => setPage(2)}>Тут пустовато, может давай <br /> чего-нибудь добавим? </li>
      : <>
        {items}
      </>
    }
  </ul>;
}

export default ListTracker; 