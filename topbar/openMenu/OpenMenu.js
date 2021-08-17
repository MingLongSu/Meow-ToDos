import React, { useState, useRef } from 'react'

import './openMenu.scss'

export default function OpenMenu({ openMenu, setOpenMenu }) {
    // controls the on hover reaction for open menu prompt
    const [hoverMenuButton, setHoverMenuButton] = useState(false);

    // updates the state of the menu prompt upon reacting to hover
    function updateHoverMenuButton() { 
        setHoverMenuButton(prevState => !prevState)
    }

    // updates the state of the open menu prompt
    function updateOpenMenu() { 
        setOpenMenu(prevState => !prevState)
    } 

    return (
        <div  onClick={ updateOpenMenu } className={'open-menu__container' + (hoverMenuButton ? ' hoverActive' : '') + (openMenu ? ' clickActive' : '')}>
            <div className='container__prompt'>
                <i onMouseLeave={ updateHoverMenuButton } onMouseOver={ updateHoverMenuButton } className="fas fa-bars" id='prompt__svg-lines'></i>
            </div>
        </div>
    )
}
