import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import localStorageAPI from '../../localStorageAPI'

import './sidebar.scss'

export default function Sidebar({ setDisplaySettingsModal }) {
    // controls the view to be displayed
    const viewHistory = useHistory()

    // handles the opening and closing of particular views
    const [homeView, setHomeView] = useState(viewHistory.location.pathname === '/')
    const [todayView, setTodayView] = useState(viewHistory.location.pathname === '/today')
    const [thisWeekView, setThisWeekView] = useState(viewHistory.location.pathname === '/this-week')
    const [thisMonthView, setThisMonthView] = useState(viewHistory.location.pathname === '/this-month')
    const [thisYearView, setThisYearView] = useState(viewHistory.location.pathname === '/this-year')
    const [notesView, setNotesView] = useState(viewHistory.location.pathname === '/notes')

    // updates the view to be home
    function updateHomeView() { 
        setHomeView(true)
        setTodayView(false)
        setThisWeekView(false)
        setThisMonthView(false)
        setThisYearView(false)
        setNotesView(false)
        viewHistory.push('/')
    } 

    // updates the view to be today
    function updateTodayView() {
        setHomeView(false)
        setTodayView(true)
        setThisWeekView(false)
        setThisMonthView(false)
        setThisYearView(false)
        setNotesView(false)
        viewHistory.push('/today')
    }

    // updates the view to be this week
    function updateThisWeekView() {
        setHomeView(false)
        setTodayView(false)
        setThisWeekView(true)
        setThisMonthView(false)
        setThisYearView(false)
        setNotesView(false)
        viewHistory.push('/this-week')
    }

    // updates the view to be this month
    function updateThisMonthView() {
        setHomeView(false)
        setTodayView(false)
        setThisWeekView(false)
        setThisMonthView(true)
        setThisYearView(false)
        setNotesView(false)
        viewHistory.push('/this-month')
    }

    // updates the view to be this year
    function updateThisYearView() {
        setHomeView(false)
        setTodayView(false)
        setThisWeekView(false)
        setThisMonthView(false)
        setThisYearView(true)
        setNotesView(false)
        viewHistory.push('/this-year')
    }

    function updateNotesView() { 
        setHomeView(false)
        setTodayView(false)
        setThisWeekView(false)
        setThisMonthView(false)
        setThisYearView(false)
        setNotesView(true)
        viewHistory.push('/notes')
    }

    // update the settings modal display
    function updateDisplaySettingsModal() { 
        setDisplaySettingsModal(true)
    }

    const allFolders = localStorageAPI.getAllFolders()

    const allFoldersHTML = getAllFoldersHTML(allFolders)

    function getAllFoldersHTML() { 
        const allFoldersHTML = []

        const allFolders = localStorageAPI.getAllFolders()

        for (let i = 0; i < allFolders.length; i++) { 
            allFoldersHTML.push(foldersToHTML(allFolders[i]))
        }

        return allFoldersHTML
    }

    function foldersToHTML(folder) { 
        const titleLength = 13;

        return (
            <div key={ folder.id } data-folder-id={ folder.id } className='sidebar-folder-base'> 
                <div className='sidebar-folder-base__sidebar-folder-title-container'>
                    <i className="fas fa-folder sidebar-folder-title-container__sidebar-folder-svg"></i>
                    <div className='sidebar-folder-title-container__sidebar-folder-name'>
                        { folder.title.length > titleLength ? folder.title.substring(0, titleLength) + '...' : folder.title }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='sidebar__nav-list'>
            <div className='nav-list__defaults'>
                <ul className='defaults__list' id='defaults__list-container'>
                    <li onClick={ updateHomeView } className={ 'list__home' + (homeView ? ' active' : '')} id='list-container__list-item-container'>
                        <div className='home__content' id='list-item-container__list-item'>
                            <i className="fas fa-home" id='list-item__svg-exception'></i>
                            <span className='home__name' id='list-item__name'>Home</span>
                        </div>
                    </li>
                    <li onClick={ updateTodayView } className={'list__today' + (todayView ? ' active' : '')} id='list-container__list-item-container'>
                        <div className='today__content' id='list-item-container__list-item'>
                            <i className="fas fa-calendar-day" id='list-item__svg'></i>
                            <span className='today__name' id='list-item__name'>Today</span>
                        </div>
                    </li>
                    <li onClick={ updateThisWeekView } className={'list__this-week' + (thisWeekView ? ' active' : '')} id='list-container__list-item-container'>
                        <div className='this-week__content' id='list-item-container__list-item'>
                            <i className="fas fa-calendar-week" id='list-item__svg'></i>
                            <span className='this-week__name' id='list-item__name'>This Week</span>
                        </div>
                    </li>
                    <li onClick={ updateThisMonthView } className={'list__this-month' + (thisMonthView ? ' active' : '')} id='list-container__list-item-container'>
                        <div className='this-month__content' id='list-item-container__list-item'>
                            <i className="fas fa-calendar-alt" id='list-item__svg'></i>
                            <span className='this-month_name' id='list-item__name'>This Month</span>
                        </div>
                    </li>
                    <li onClick={ updateThisYearView } className={'list__this-year' + (thisYearView ? ' active' : '')} id='list-container__list-item-container'>
                        <div className='this-year__content' id='list-item-container__list-item'>
                            <i className="fas fa-calendar" id='list-item__svg'></i>
                            <span className='this-year__name' id='list-item__name'>This Year</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='nav-list__divider-container' id='nav-list__divider-container'>
                <div className='divider-container__divider' id='divider-container__divider'></div>    
            </div> 
            <div className='nav-list__addables'>
                <ul className='addables__list' id='addables__list-container'>
                    <li onClick={ updateNotesView } className={'list__add-note-prompt' + (notesView ? ' active' : '')} id='list-container__list-item-container' data-selector-name='sidebar__add-event'>
                        <div className='add-note-prompt__content' id='list-item-container__list-item'>
                        <i className="fas fa-sticky-note" id='list-item__svg'></i>  
                            <span className='add-note-prompt__name' id='list-item__name'>Notes</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='nav-list__divider-container' id='nav-list__divider-container'>
                <div className='divider-container__divider' id='divider-container__divider'></div>    
            </div> 
            <div className='nav-list__folders-container'>
                <div className='folders-container__folder-root'>
                    { allFoldersHTML }
                </div>
            </div>
            <div className='nav-list__divider-container' id='nav-list__divider-container'>
                <div className='divider-container__divider' id='divider-container__divider'></div>    
            </div> 
            <div className='nav-list__settings'>
                <li onClick={ updateDisplaySettingsModal } className='settings__settings-container' id='list-container__list-item-container'>
                    <div className='settings-container__content' id='list-item-container__list-item'>
                        <i className="fas fa-cogs" id='list-item__svg'></i>
                        <span className='settings-container__name' id='list-item__name'>Settings</span>
                    </div>
                </li>
            </div>
        </div>
    )
}
