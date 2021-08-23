import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import calendarAPI from '../../calendarAPI'

import './thisYear.scss'

export default function ThisYear() { 
    const viewHistory = useHistory()

    const yearMonths = calendarAPI.getYearMonths()
    const thisMonth = calendarAPI.getThisMonthString()

    const [currentNavPointerNav, setCurrentnavPointerNav] = useState(yearMonths.indexOf(thisMonth))

    const thisYearHTML = getThisYear()

    function thisYearNavLeft() { 
        setCurrentnavPointerNav(prevNavPointer => { 
            if (prevNavPointer - 1 < 0) { 
                return 11
            }
            else { 
                return prevNavPointer - 1
            }
        })
    }

    function thisYearNavRight() { 
        setCurrentnavPointerNav(prevNavPointer => { 
            return ((prevNavPointer + 1) % 12)
        })
    }

    function getThisYear() { 
        const thisMonthIndex = 0;
        
        const thisYearCalendarHTML = []

        getCurrentMonth(thisYearCalendarHTML, thisMonthIndex)
        
        return thisYearCalendarHTML
    }

    function getCurrentMonth(thisYearCalendarHTML, thisMonthIndex) { 
        if (thisMonthIndex < 12) { 
            const currentMonthCalendarDaysHTML = []

            const thisYear = calendarAPI.getThisYearIndex() 

            const monthFirstDayString = calendarAPI.getThisDateString(thisYear, thisMonthIndex, 1)
            const monthLastDayString = calendarAPI.getThisDateString(thisYear, thisMonthIndex + 1 % 12, 0)

            const monthFirstDay = calendarAPI.getThisDate(monthFirstDayString)
            const monthLastDay = calendarAPI.getThisDate(monthLastDayString)

            // find the index of the month's first day and the index of the month's last day
            const firstDayIndex = calendarAPI.getWeekdayIndex(monthFirstDay.weekday)
            const lastDayIndex = calendarAPI.getWeekdayIndex(monthLastDay.weekday) // days following will be empty
            
            addFirstEmptyDays(currentMonthCalendarDaysHTML, firstDayIndex, monthFirstDayString)
            addCalendarDays(currentMonthCalendarDaysHTML, monthFirstDay, monthLastDay)
            addLastEmptyDays(currentMonthCalendarDaysHTML, 6 - lastDayIndex, monthLastDayString)

            
            function monthToHTML(currentMonthCalendarDaysHTML, thisMonthIndex) { 
                const thisMonth = calendarAPI.getMonthString(thisMonthIndex)
                const weekdaysHTML = calendarAPI.getWeekdaysHTML(calendarAPI.getWeekdays())

                return (
                    <div key={ thisMonthIndex } className='thismonth-view__thismonth-calendar-container no-box-shadow'>
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
                                    { currentMonthCalendarDaysHTML }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            thisYearCalendarHTML.push(monthToHTML(currentMonthCalendarDaysHTML, thisMonthIndex))

            return getCurrentMonth(thisYearCalendarHTML, thisMonthIndex + 1) 
        }
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

    return (
        <div className='main-view__thisyear-view'>
            <div className='thisyear-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
            <div className='thisyear-view__thisyear-calendar-container'>
                <div className='thisyear-calendar-container__left-nav-container' id='thisyear-nav-container'>
                    <div onClick={ thisYearNavLeft } className='left-nav-container__left-svg-container' id='thisyear-nav-container__thisyear-svg-container'>
                        <i className="fas fa-angle-double-left left-svg-container__left-svg-first" id='thisyear-svg-container__nav-svg'></i>
                    </div>
                </div>
                <div className='thisyear-view__thisyear-slider-container'>
                    <div className='thisyear-slider-container__thisyear-slider-root' style={{ transform: `translateX(${ currentNavPointerNav * -984 }px)` }}>
                        {
                            thisYearHTML
                        }
                    </div>
                </div>
                <div className='thisyear-calendar-container__right-nav-container' id='thisyear-nav-container'>
                    <div onClick={ thisYearNavRight } className='right-nav-container__right-svg-container' id='thisyear-nav-container__thisyear-svg-container'>
                        <i className="fas fa-angle-double-right right-svg-container__right-svg-first" id='thisyear-svg-container__nav-svg'></i>
                    </div>
                </div>
            </div>
            <div className='thisyear-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
        </div>
    )
}
