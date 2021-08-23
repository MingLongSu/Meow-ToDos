import React from 'react'
import { useHistory } from 'react-router-dom'

import calendarAPI from '../../calendarAPI'

import './thisMonth.scss'

export default function ThisMonth() { // DATASET IDS COULD BE ISOSTRINGS OF THE DATES or keep as the same as current
    const viewHistory = useHistory()

    const weekdays = calendarAPI.getWeekdays()
    const weekdaysHTML = calendarAPI.getWeekdaysHTML(weekdays)

    const thisMonth = calendarAPI.getThisMonthString()

    const thisMonthCalendarDaysHTML = getThisMonth()

    function getThisMonth() { 
        const thisMonthCalendarDaysHTML = []

        const thisMonthIndex = calendarAPI.getThisMonthIndex()
        const thisYearIndex = calendarAPI.getThisYearIndex() 

        // getting first and last days of the months
        const monthFirstDayString = calendarAPI.getThisDateString(thisYearIndex, thisMonthIndex, 1)
        const monthLastDayString = calendarAPI.getThisDateString(thisYearIndex, thisMonthIndex + 1 % 12, 0)

        const monthFirstDay = calendarAPI.getThisDate(monthFirstDayString)
        const monthLastDay = calendarAPI.getThisDate(monthLastDayString)

        // find the index of the month's first day and the index of the month's last day
        const firstDayIndex = calendarAPI.getWeekdayIndex(monthFirstDay.weekday)
        const lastDayIndex = calendarAPI.getWeekdayIndex(monthLastDay.weekday) // days following will be empty
        
        addFirstEmptyDays(thisMonthCalendarDaysHTML, firstDayIndex, monthFirstDayString)
        addCalendarDays(thisMonthCalendarDaysHTML, monthFirstDay, monthLastDay)
        addLastEmptyDays(thisMonthCalendarDaysHTML, 6 - lastDayIndex, monthLastDayString)

        return thisMonthCalendarDaysHTML
    }

    function addFirstEmptyDays(thisMonthCalendarDaysHTML, firstDayIndex, monthFirstDayString) { 
        const prevEmptyDay = calendarAPI.getThisDate(monthFirstDayString)

        const currentEmptyDayString = calendarAPI.getThisDateString(prevEmptyDay.year, prevEmptyDay.month, prevEmptyDay.date - 1)

        if (firstDayIndex > 0) { 
            thisMonthCalendarDaysHTML.push(emptyDayToHTML(currentEmptyDayString))
            
            return addFirstEmptyDays(thisMonthCalendarDaysHTML, firstDayIndex - 1, currentEmptyDayString)
        }
        else {

            thisMonthCalendarDaysHTML.reverse() 
        }
    }

    function addCalendarDays(thisMonthCalendarDaysHTML, monthFirstDay, monthLastDay) { 
        if (monthFirstDay.date < monthLastDay.date + 1) { // while day is less than the last day, add until it becomes equal
            const currentDayString = calendarAPI.getThisDateString(monthFirstDay.year, monthFirstDay.month, monthFirstDay.date)

            thisMonthCalendarDaysHTML.push(calendarDayToHTML(currentDayString))

            monthFirstDay.date += 1

            return addCalendarDays(thisMonthCalendarDaysHTML, monthFirstDay, monthLastDay)
        }
        
    }

    function addLastEmptyDays(thisMonthCalendarDaysHTML, endingIterations, monthLastDayString) { 
        if (thisMonthCalendarDaysHTML.length < 42) { 
            const monthLastDay = calendarAPI.getThisDate(monthLastDayString)
            const currentEmptyDayString = calendarAPI.getThisDateString(monthLastDay.year, monthLastDay.month, (monthLastDay.date + 1).toString())

            thisMonthCalendarDaysHTML.push(emptyDayToHTML(currentEmptyDayString))

            return addLastEmptyDays(thisMonthCalendarDaysHTML, endingIterations - 1, currentEmptyDayString)
        }
    }

    function calendarDayToHTML(currentCalendarDayString) { 
        const currentCalendarDay = calendarAPI.getThisDate(currentCalendarDayString)

        function openDate(e) { 
            const target = e.target

            const targetFullDate = findFullDate(target)

            viewHistory.push(`/calendar/day/${ targetFullDate }`)

            function findFullDate(target) { 
                if (target.className !== 'thismonth-day-base') { 
                    return findFullDate(target.parentElement)
                }
                else { 
                    return target.dataset.fullDate
                }
            }

        }

        return ( 
            <div onClick={ openDate } data-full-date={ currentCalendarDayString.split(', ')[1] } key={ currentCalendarDayString.split(', ')[1] } className='thismonth-day-base'>
                <div className='thismonth-day-base__day-contents-container'>
                    <div className='day-contents-container__day-header-container'>
                        <span className='day-header-container__date'> { currentCalendarDay.date } </span>
                    </div>
                    <div className='day-contents-container__day-events-container-root'>
                        {
                            // INSERT FIND EVENTS ALGORITHM LATER
                        }
                    </div>
                </div>
            </div>
        )
    }

    function emptyDayToHTML(currentEmptyDayString) { 
        const currentEmptyDay = calendarAPI.getThisDate(currentEmptyDayString)

        return ( 
            <div key={ currentEmptyDayString.split(', ')[1] } className='thismonth-day-base empty-day'>
                <div className='thismonth-day-base__day-contents-container'>
                    <div className='day-contents-container__day-header-container'>
                        <span className='day-header-container__date'> { currentEmptyDay.date } </span>
                    </div>
                    <div className='day-contents-container__day-events-container-root'>
                        {
                            // INSERT FIND EVENTS ALGORITHM LATER
                        }
                    </div>
                </div>
            </div>
        )
    }

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
                            { thisMonthCalendarDaysHTML }
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
