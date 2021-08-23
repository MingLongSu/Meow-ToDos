import React from "react"

class calendarAPI { 
    static getYearMonths() { 
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }

    static getWeekdays() { 
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }

    static getToday() { 
        return new Date().toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric'})
    }
    
    static getThisMonthIndex() { 
        return new Date().toLocaleDateString('en-CA', { month: 'numeric' }) - 1 < 0 ? 11 : new Date().toLocaleDateString('en-CA', { month: 'numeric' }) - 1
    }

    static getThisMonthString() { 
        return new Date().toLocaleDateString('en-CA', { month: 'long' })
    }

    static getMonthString(monthIndex) { 
        return new Date(this.getThisYearIndex(), monthIndex, 1).toLocaleDateString('en-CA', { month: 'long' })
    }

    static getThisYearIndex() { 
        return new Date().toLocaleDateString('en-CA', { year: 'numeric' })
    }

    static getThisDate(thisDateString) { 
        return ({  
            weekday: thisDateString.split(', ')[0],
            year: parseInt(thisDateString.split(', ')[1].split('-')[0]), 
            month: parseInt(thisDateString.split(', ')[1].split('-')[1] - 1 < 0 ? 11 : thisDateString.split(', ')[1].split('-')[1] - 1),
            date: parseInt(thisDateString.split(', ')[1].split('-')[2]) 
        })
    }

    static getWeekdayIndex(weekday) { 
        const weekdays = this.getWeekdays()

        return weekdays.indexOf(weekday)
    }

    static getThisDateString(thisYear, thisMonth, thisDay) { 
        return new Date(thisYear, thisMonth, thisDay).toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })
    }

    /*
    static addFirstEmptyDays(thisMonthCalendarDaysHTML, firstDayIndex, monthFirstDayString) { 
        const prevEmptyDay = this.getThisDate(monthFirstDayString)

        const currentEmptyDayString = this.getThisDateString(prevEmptyDay.year, prevEmptyDay.month, prevEmptyDay.date - 1)

        if (firstDayIndex > 0) { 
            thisMonthCalendarDaysHTML.push(this.emptyDayToHTML(currentEmptyDayString))
            
            return this.addFirstEmptyDays(thisMonthCalendarDaysHTML, firstDayIndex - 1, currentEmptyDayString)
        }
        else {

            thisMonthCalendarDaysHTML.reverse() 
        }
    }

    static addCalendarDays(thisMonthCalendarDaysHTML, monthFirstDay, monthLastDay) { 
        if (monthFirstDay.date < monthLastDay.date + 1) { // while day is less than the last day, add until it becomes equal
            const currentDayString = this.getThisDateString(monthFirstDay.year, monthFirstDay.month, monthFirstDay.date)

            thisMonthCalendarDaysHTML.push(this.calendarDayToHTML(currentDayString))

            monthFirstDay.date += 1

            return this.addCalendarDays(thisMonthCalendarDaysHTML, monthFirstDay, monthLastDay)
        }
        
    }

    static addLastEmptyDays(thisMonthCalendarDaysHTML, endingIterations, monthLastDayString) { 
        if (thisMonthCalendarDaysHTML.length < 42) { 
            const monthLastDay = this.getThisDate(monthLastDayString)
            const currentEmptyDayString = this.getThisDateString(monthLastDay.year, monthLastDay.month, (monthLastDay.date + 1).toString())

            thisMonthCalendarDaysHTML.push(this.emptyDayToHTML(currentEmptyDayString))

            return this.addLastEmptyDays(thisMonthCalendarDaysHTML, endingIterations - 1, currentEmptyDayString)
        }
    }

    static emptyDayToHTML(currentEmptyDayString) { 
        const currentEmptyDay = this.getThisDate(currentEmptyDayString)

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

    static calendarDayToHTML(currentCalendarDayString) { 
        const currentCalendarDay = this.getThisDate(currentCalendarDayString)

        function openDate(e) { 
            const target = e.target

            const targetFullDate = findFullDate(target)

            console.log(targetFullDate)

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
    */

    static getWeekdaysHTML(weekdays) { 
        const weekdaysHTML = []

        weekdays.forEach(weekday => { 
            weekdaysHTML.push(this.weekdayToHTML(weekday))
        })

        return weekdaysHTML
    }

    static weekdayToHTML(weekday) { 
        const weekdays = this.getWeekdays()

        const weekdayIndex = weekdays.indexOf(weekday)

        return (
            <div key={ weekdayIndex } className='weekday-base'>
                <div className='weekday-base__content-container'>
                    <span className='weekday-base__weekday-name'> { weekday } </span>
                </div>
            </div>
        )
    }

    // returns an array for the days of the current week
    static getThisWeek() { 
        const todayString = this.getToday()

        // converting today to an object with date data
        const today = { 
            weekday: todayString.split(', ')[0],
            year: parseInt(todayString.split(', ')[1].split('-')[0]), 
            month: parseInt((todayString.split(', ')[1].split('-')[1] - 1) < 0 ? 11 : todayString.split(', ')[1].split('-')[1] - 1),  
            date: parseInt(todayString.split(', ')[1].split('-')[2]) 
        }

        const week = []

        const weekPartOne = toSunday(today, []).reverse()
        const weekPartTwo = toSaturday(today, [])

        // adding first part of the week to the week array
        weekPartOne.forEach(day => { 
            week.push(day)
        })

        // adding second part of the week to the week array 
        weekPartTwo.forEach(day => { 
            if (day !== week[week.length - 1]) { 
                week.push(day)
            }
        })

        const weekHTML = getWeekHTML(week)

        return weekHTML

        function getWeekHTML(week) { 
            const weekHTML = [] 

            week.forEach(day => { 
                weekHTML.push(weekToHTML(day))
            })

            return weekHTML

            function weekToHTML(day) { 
                const dateString = new Date(day.year.toString(), day.month.toString(), day.date.toString()).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
                const dateKey = new Date(day.year.toString(), day.month.toString(), day.date.toString()).toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })

                return (
                    <div key={ dateKey } className='thisweek-day-base'>
                        <div className='thisweek-day-base__thisweek-day-header-container'>
                            <div className='thisweek-day-header-container__weekday-container'> 
                                <div className='weekday-container__weekday'>
                                    { day.weekday }
                                </div>
                            </div>
                            <div className='thisweek-day-header-container__date-container'>  
                                <div className='date-container__date'>
                                    { dateString }
                                </div>
                            </div>
                            <div className='thisweek-day-header-container__add-event-button'>
                                <i data-full-date={ dateKey } class="fas fa-plus-circle add-event-button__svg"></i>
                            </div>
                        </div>
                        <div className='thisweek-day-base__thisweek-day-events-container'>
                            <div className='thisweek-day-events-container__events-root'>
                                {
                                    // EVENTS HERE USING ANOTHER FUNCTION TO RETRIEVE THEM FROM LOCAL STORAGE
                                }
                            </div>
                        </div>
                        <div className='thisweek-day-base__pseudo-element'></div>
                    </div>
                )
            }
        }

        function toSunday(today, weekPartOne) { 
            if (today.weekday !== 'Sunday') { 
                weekPartOne.push(today)

                /*
                // get first day of the month
                const firstDayString = new Date(today.year.toString(), today.month.toString(), (-1).toString()).toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })
                const firstDay = { 
                    weekday: firstDayString.split(', ')[0], 
                    year: parseInt(firstDayString.split(', ')[1].split('-')[0]),
                    month: parseInt((firstDayString.split(', ')[1].split('-')[1] - 1) < 0 ? 11 : firstDayString.split(', ')[1].split('-')[1] - 1),
                    day: parseInt(firstDayString.split(', ')[1].split('-')[2])
                }

                console.log(firstDayString)
                console.log(firstDay)
                */

                const nextDayString = new Date(today.year.toString(), today.month.toString(), (today.date - 1).toString()).toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric'})

                // if statements to control when the next days are on a different month

                const nextDay = { 
                    weekday: nextDayString.split(', ')[0], 
                    year: parseInt(nextDayString.split(', ')[1].split('-')[0]), 
                    month: parseInt((nextDayString.split(', ')[1].split('-')[1] - 1) < 0 ? 11 : nextDayString.split(', ')[1].split('-')[1] - 1), 
                    date: parseInt(nextDayString.split(', ')[1].split('-')[2]) 
                }
                
                return toSunday(nextDay, weekPartOne) 
            }
            else { 
                weekPartOne.push(today)
                
                return weekPartOne
            }
        }

        function toSaturday(today, weekPartTwo) { 
            if (today.weekday !== 'Saturday') { 
                weekPartTwo.push(today)

                const nextDayString = new Date(today.year.toString(), today.month.toString(), (today.date + 1).toString()).toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric'})
                
                const nextDay = { 
                    weekday: nextDayString.split(', ')[0], 
                    year: parseInt(nextDayString.split(', ')[1].split('-')[0]), 
                    month: parseInt((nextDayString.split(', ')[1].split('-')[1] - 1) < 0 ? 11 : nextDayString.split(', ')[1].split('-')[1] - 1), 
                    date: parseInt(nextDayString.split(', ')[1].split('-')[2])
                }

                return toSaturday(nextDay, weekPartTwo)
            }
            else { 
                weekPartTwo.push(today)

                return weekPartTwo
            }
        }
    }

    /*
    // gets the weeks of the current month
    static getThisMonth() { 
        const thisMonthCalendarDaysHTML = []

        const thisMonthIndex = this.getThisMonthIndex()
        const thisYearIndex = this.getThisYearIndex() 

        // getting first and last days of the months
        const monthFirstDayString = this.getThisDateString(thisYearIndex, thisMonthIndex, 1)
        const monthLastDayString = this.getThisDateString(thisYearIndex, thisMonthIndex + 1 % 12, 0)

        const monthFirstDay = this.getThisDate(monthFirstDayString)
        const monthLastDay = this.getThisDate(monthLastDayString)

        // find the index of the month's first day and the index of the month's last day
        const firstDayIndex = this.getWeekdayIndex(monthFirstDay.weekday)
        const lastDayIndex = this.getWeekdayIndex(monthLastDay.weekday) // days following will be empty
        
        this.addFirstEmptyDays(thisMonthCalendarDaysHTML, firstDayIndex, monthFirstDayString)
        this.addCalendarDays(thisMonthCalendarDaysHTML, monthFirstDay, monthLastDay)
        this.addLastEmptyDays(thisMonthCalendarDaysHTML, 6 - lastDayIndex, monthLastDayString)

        return thisMonthCalendarDaysHTML
    }
    */

    static getThisYear() { 
        const thisMonthIndex = 0;
        
        const thisYearCalendarHTML = []

        this.getCurrentMonth(thisYearCalendarHTML, thisMonthIndex)
        
        return thisYearCalendarHTML
    }

    static getCurrentMonth(thisYearCalendarHTML, thisMonthIndex) { 
        if (thisMonthIndex < 12) { 
            const currentMonthCalendarDaysHTML = []

            const thisYear = this.getThisYearIndex() 

            const monthFirstDayString = this.getThisDateString(thisYear, thisMonthIndex, 1)
            const monthLastDayString = this.getThisDateString(thisYear, thisMonthIndex + 1 % 12, 0)

            const monthFirstDay = this.getThisDate(monthFirstDayString)
            const monthLastDay = this.getThisDate(monthLastDayString)

            // find the index of the month's first day and the index of the month's last day
            const firstDayIndex = this.getWeekdayIndex(monthFirstDay.weekday)
            const lastDayIndex = this.getWeekdayIndex(monthLastDay.weekday) // days following will be empty
            
            this.addFirstEmptyDays(currentMonthCalendarDaysHTML, firstDayIndex, monthFirstDayString)
            this.addCalendarDays(currentMonthCalendarDaysHTML, monthFirstDay, monthLastDay)
            this.addLastEmptyDays(currentMonthCalendarDaysHTML, 6 - lastDayIndex, monthLastDayString)

            
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

            return this.getCurrentMonth(thisYearCalendarHTML, thisMonthIndex + 1) 
        }
    }
}


export default calendarAPI