import React, { useState } from 'react'

import './settingsModal.scss'

export default function SettingsModal({ setDisplaySettingsModal }) {
    // hardcoded array of navigation objects containing points for the nav bar
    const settingsNavPoints = [
        { 
            settingLink: 'Themes', 
            contentLink: 'INPUT LATER'
        }, 
        { 
            settingLink: 'Calendar',
            contentLink: 'INPUT LATER'
        }, 
        {
            settingLink: 'Coming Soon',
            contentLink: 'INPUT LATER'
        }
    ]

    // handles the navigation of the settings menu
    const [settingsNavValue, setSettingsNavValue] = useState(0);

    // updates the navigation value of the settings menu
    function increaseSettingsNavValue() { 
        setSettingsNavValue(prevValue => { 
            return (prevValue + 1) % 3
        })
    }

    // update the navigation value of the settings menu 
    function decreaseSettingsNavValue() { 
        setSettingsNavValue(prevValue => { 
            if (prevValue - 1 < 0) { 
                return 2
            }
            else { 
                return prevValue - 1
            }
        })
    }

    // updates the display state of the settings modal
    function updateDisplaySettingsModal() { 
        setDisplaySettingsModal(false)
    }

    return (
        <div className='settings-modal__container'>
            <div className='container__modal-topbar-container'>
                <i onClick={ decreaseSettingsNavValue } className="fas fa-caret-square-left modal-topbar-container__left-button"></i>
                <div className='modal-topbar-container__settings-title'>
                    <div className={'settings-title__name' + (settingsNavValue === 0 ? ' active_1' : '') + (settingsNavValue === 1 ? ' active_2' : '') + (settingsNavValue === 2 ? ' active_3' : '')}>
                        <span className='name__themes' id='name__title'>Themes</span>
                        <span className='name__calendar' id='name__title'>Calendar</span>
                        <span className='name__COMINGSOON' id='name__title'>Notes</span>
                    </div>
                </div>
                <i onClick={ increaseSettingsNavValue } className="fas fa-caret-square-right modal-topbar-container__right-button" id='right-button__svg-right'></i>
            </div>
            <div className='container__modal-middle-container'>
                <div className={'modal-middle-container__content-region' + (settingsNavValue === 0 ? ' active_1' : '') + (settingsNavValue === 1 ? ' active_2' : '') + (settingsNavValue === 2 ? ' active_3' : '')}>
                    <div className='content-region__themes'>
                        <div className='themes__colours-main-container' id='themes__main-theme-container'>
                            <i className="fas fa-palette" id='main-theme-container__svg'></i>
                            <div className='colours-main__name' id='main-theme-container__name'>Main Colours</div>
                        </div>
                        <div className='themes__dark-mode-container' id='themes__main-theme-container'>
                            <i className="fas fa-adjust" id='main-theme-container__svg'></i>
                            <div className='dark-mode__name' id='main-theme-container__name'>Appearance: (TEMP) Dark</div>
                        </div>
                    </div>
                    <div className='content-region__calendar'>
                        <div className='calendar__calendar-theme' id='calendar__calendar-settings-container'>
                            <i className="fas fa-palette" id='calendar-settings-container__svg'></i>
                            <div className='calendar-theme__name'>Calendar Colours</div>
                        </div>
                        <div className='calendar__calendar-background' id='calendar__calendar-settings-container'>
                            <i className="fas fa-image" id='calendar-settings-container__svg'></i>
                            <div className='calendar-background__name'>Background</div>
                            <input type='file' className='calendar-background__upload-file-prompt'></input>
                        </div>
                        <div className='calendar__calendar-opacity' id='calendar__calendar-settings-container'>
                            <i className="fas fa-eye" id='calendar-settings-container__svg'></i>
                            <div className='calendar-opacity__name'>Opacity</div>
                        </div>
                    </div>
                    <div className='content-region__notes'>
                        <div className='notes__notes-theme' id='notes__notes-settings-container'>
                            <i class="fas fa-palette" id='notes__notes-settings-container__svg'></i>
                            <div className='notes-theme__name'>Notes Colours</div>
                        </div>
                        <div className='notes__notes-background' id='notes__notes-settings-container'>
                            <i class="fas fa-image" id='notes__notes-settings-container__svg'></i>
                            <div className='notes-background__name'>Notes Background</div>
                        </div>
                        <div className='notes__notes-font' id='notes__notes-settings-container'>
                            <i class="fas fa-font" id='notes__notes-settings-container__svg'></i>
                            <div className='notes-font__name'>Font Type</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container__settings-region'>
                <button onClick={ updateDisplaySettingsModal } className='settings-region__cancel-region' id='settings-region__buttons'>
                    <i className="fas fa-times-circle"></i>
                    <span className='cancel-region__name' id='buttons__margin'>Cancel</span>
                </button>
                <button className='settings-region__apply-region' id='settings-region__buttons'>
                    <i className="fas fa-check-circle"></i>
                    <span className='apply-region__name' id='buttons__margin'>Apply</span>
                </button>
            </div>
        </div>
    )
}
