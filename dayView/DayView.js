import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import calendarAPI from '../../calendarAPI'

import './dayView.scss'

export default function DayView() {
    const viewHistory = useHistory()

    const currentDate = viewHistory.location.pathname.split('/')[3]
    const currentDateString = new Date(currentDate.split('-')[0], currentDate.split('-')[1] - 1, currentDate.split('-')[2]).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    const currentWeekdayString = new Date(currentDate.split('-')[0], currentDate.split('-')[1] - 1, currentDate.split('-')[2]).toLocaleDateString('en-CA', { weekday: 'long' })

    console.log(currentDateString)

    const [openSideTab, setOpenSideTab] = useState(false)

    function updateOpenSideTab() { 
        setOpenSideTab(prevState => !prevState)
    }

    return (
        <div className='main-view__today-view'>
            <div className='today-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
            <div className={'today-view__today-card-container' + (openSideTab ? ' active' : '')}>
                <div className={'today-card-container__schedule-card-display' + (openSideTab ? ' active' : '')}>
                    <div className='schedule-card-display__schedule-view-container'>
                        {
                            // FILL SCHEDULE LATER
                        }
                    </div>
                    <div onClick={ updateOpenSideTab } className='schedule-card-display__side-tab'>
                        <i class={"fas fa-chevron-right side-tab__svg" + (openSideTab ? ' active' : '')}></i>
                    </div>
                </div>
                <div data-full-date={ currentDate } className='today-card-container__main-card-display'>
                    <div className='main-card-display__main-card-header'>
                        <div className='main-card-header__main-card-date-container'>
                            <div className='main-card-date-container__weekday'>
                                {
                                    currentWeekdayString
                                }
                            </div>
                            <div className='main-card-date-container__date'>
                                {
                                    currentDateString
                                }
                            </div>
                            <div className='main-card-date-container__add-event-button'>
                                <i data-full-date={ currentDate } class="fas fa-plus-circle add-event-button__svg"></i>
                            </div>
                        </div>
                    </div>
                    <div className='main-card-display__main-card-content'>
                        {
                            // FILL MAIN CARD CONTENT LATER
                        }
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
