import React, { useState } from 'react'
import calendarAPI from '../../calendarAPI'

import './today.scss'

export default function Today({ setOpenUpdateEventModal }) {
    const today = calendarAPI.getToday()
    const todayDate = today.split(', ')[1]

    const [openSideTab, setOpenSideTab] = useState(false)
    
    function updateOpenSideTab() { 
        setOpenSideTab(prevState => !prevState)
    }

    function onEventAdd() { 
        setOpenUpdateEventModal(true)
    }

    return (
        <div className='main-view__today-view'>
            <div className='today-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
            <div className={'today-view__today-card-container' + (openSideTab ? ' active' : '')}>
                <div className={'today-card-container__schedule-card-display' + (openSideTab ? ' active' : '')}>
                    <div className='schedule-card-display__schedule-view-container'>
                        
                    </div>
                    <div onClick={ updateOpenSideTab } className='schedule-card-display__side-tab'>
                        <i class={"fas fa-chevron-right side-tab__svg" + (openSideTab ? ' active' : '')}></i>
                    </div>
                </div>
                <div data-full-date={ new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: "numeric" }) } className='today-card-container__main-card-display'>
                    <div className='main-card-display__main-card-header'>
                        <div className='main-card-header__main-card-date-container'>
                            <div className='main-card-date-container__weekday'>
                                {new Date().toLocaleDateString('en-CA', { weekday: 'long' })}
                            </div>
                            <div className='main-card-date-container__date'>
                                {new Date().toLocaleDateString('en-CA', { month: 'long', day: 'numeric', 'year': 'numeric' })}
                            </div>
                            <div className='main-card-date-container__add-event-button'>
                                <i onClick={ onEventAdd } data-full-date={ todayDate } class="fas fa-plus-circle add-event-button__svg"></i>
                            </div>
                        </div>
                    </div>
                    <div className='main-card-display__main-card-content'>

                    </div>
                    <div className='main-card-date-container__pseudo-element'></div>
                </div>
            </div>
            <div className='today-view__divider-container'>
                <div className='divider-container__divider'></div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            </div>
        </div>
    )
}
