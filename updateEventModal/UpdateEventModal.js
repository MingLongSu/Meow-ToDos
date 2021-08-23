import React from 'react'

import './updateEventModal.scss'

export default function UpdateEventModal() {
    return (
        <div className='update-event-modal__event-contents-container'>
            <div className='event-contents-container__events-title-container'>
                <input type='text' placeholder='Untitled event' className='events-title-container__event-title'></input>
            </div>
            <div className='event-contents-container__set-duration-container'>
                <div className='set-duration-container__event-start-container'>

                </div>
                <div className='set-duration-container__event-end-container'>
                    
                </div>
            </div>
            <div className='event-contents-container__description-container'>
                <textarea placeholder='Undescribed event' className='description-container__event-description-box'></textarea>
            </div>
        </div>
    )
}
