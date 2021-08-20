import React, { useState, useRef } from 'react'

import './thisWeek.scss'

import calendarAPI from '../../calendarAPI'

export default function ThisWeek() {
    const weekDays = calendarAPI.getWeekdays()

    const thisWeekHTML = calendarAPI.getThisWeek()

    const [currentNavPointer, setCurrentNavPointer] = useState(thisWeekInitialNav)

    function thisWeekNavLeft() { 
        setCurrentNavPointer(prevState => { 
            if (prevState - 1 < 0) { 
                return 6
            }
            else { 
                return prevState - 1
            }
        })
    }

    function thisWeekNavRight() { 
        setCurrentNavPointer(prevState => { 
            return (prevState + 1) % 7
        })
    }
    
    function thisWeekInitialNav() { 
        const todayString = calendarAPI.getToday()
        const today = todayString.split(', ')[0]

        return weekDays.indexOf(today)
    }

    return (
        <div className='main-view__thisweek-view'>
            <div className='thisweek-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
            <div className='thisweek-view__thisweek-slider-container'>
                <div className='thisweek-slider-container__left-nav-container' id='thisweek-nav-container'>
                    <div onClick={ thisWeekNavLeft } className='left-nav-container__left-svg-container' id='thisweek-nav-container__thisweek-svg-container'>
                        <i className="fas fa-angle-double-left left-svg-container__left-svg-first" id='thisweek-svg-container__nav-svg'></i>
                    </div>
                </div>
                <div className='thisweek-slider-container__thisweek-slider-container'>
                    <div className='thisweek-slider-container__thisweek-slider-root' style={{ transform: `translateX(${ currentNavPointer * -500 }px)` }}>
                        { thisWeekHTML }
                    </div>
                </div>
                <div className='thisweek-slider-container__right-nav-container' id='thisweek-nav-container'>
                    <div onClick={ thisWeekNavRight } className='right-nav-container__right-svg-container' id='thisweek-nav-container__thisweek-svg-container'>
                        <i className="fas fa-angle-double-right right-svg-container__right-svg-first" id='thisweek-svg-container__nav-svg'></i>
                    </div>
                </div>
            </div>
            <div className='thisweek-view__divider-container'>
                <div className='divider-container__divider'></div>
            </div>
        </div>
    )
}
