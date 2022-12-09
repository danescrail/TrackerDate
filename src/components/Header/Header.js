import React from 'react';
import { useState } from 'react';

function Header({ setPage, page }) {

  return <header>
    <ul className='header-items'>
      {page === 0
        ? <li onClick={() => setPage(0)} className="header-items-item-active">О проекте</li>
        : <li onClick={() => setPage(0)} className="header-items-item">О проекте</li>
      }
      {page === 1
        ? <li onClick={() => setPage(1)} className="header-items-item-active">Список трекеров</li>
        : <li onClick={() => setPage(1)} className="header-items-item">Список трекеров</li>
      }
      {page === 2
        ? <li onClick={() => setPage(2)} className="header-items-item-active">Создать трекер</li>
        : <li onClick={() => setPage(2)} className="header-items-item">Создать трекер</li>
      }

    </ul>
  </header>
}

export default Header; 