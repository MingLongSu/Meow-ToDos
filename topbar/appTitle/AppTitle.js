import React, { useState } from 'react'

import './appTitle.scss'

export default function AppTitle() {
    // state of the app title
    const [appTitleAnimated, setAppTitleAnimated] = useState(false)

    // updating the state of title line
    function updateAppTitleAnimated() { 
        setAppTitleAnimated(prevState => !prevState)
    }

    return (
        <div className='app-title__title'>
            <span onMouseLeave={ updateAppTitleAnimated } onMouseOver={ updateAppTitleAnimated } className='title__name'>Meow To Dos</span>
            <div className={'title__line' + (appTitleAnimated ? ' active' : '')}></div>
        </div>
    )
}
