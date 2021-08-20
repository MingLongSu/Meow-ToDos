import React from 'react'
import calendarAPI from '../../calendarAPI'

import './thisMonth.scss'

export default function ThisMonth() { // DATASET IDS COULD BE ISOSTRINGS OF THE DATES or keep as the same as current
    const weekdays = calendarAPI.getWeekdays()
    const weekdaysHTML = calendarAPI.getWeekdaysHTML(weekdays)

    const thisMonth = calendarAPI.getThisMonthString()

    const thisMonthCalendarDays = calendarAPI.getThisMonth()

    return (
        <div className='main-view__thismonth-view'>
            <div className='thismonth-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
            <div className='thismonth-view__thismonth-calendar-container'>
                <div className='thismonth-calendar-container__thismonth-calendar-content-container'>
                    <div className='thismonth-calendar-container__thismonth-header-container'>
                        <div className='thismonth-header-container__thismonth-header-content-container'>
                            <div className='thismonth-header-container__header-name'>
                                { thisMonth }
                            </div>
                        </div>
                    </div>
                    <div className='thismonth-calendar-container__calendar-days-container'>
                        <div className='calendar-days-container__weekdays-container'>
                            { weekdaysHTML }
                        </div>
                        <div className='calendar-days-container__all-days-container'>
                            { 
                                thisMonthCalendarDays 
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='thismonth-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
        </div>
    )
}
