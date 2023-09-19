import React from 'react'
import './index.css'

/* eslint-disable no-undef */
export default function Header(props) {
    const { current, onChange } = props;
    const handleClick = (i) => {
        if(onChange) {
            onChange(i);
        }
    }

    const data = window.data;
    return (
        <header className="app-header">
            <ul>
                {
                    
                    data.navs.map((item, i) => (
                        <li key={item} className={i == current ? 'active' : ''} onClick={() => handleClick(i)}>
                            <a href={`#${i}`}>{item}</a>
                        </li>
                    ))
                }
            </ul>
            <img src={data.logo} />
        </header>
    )
}