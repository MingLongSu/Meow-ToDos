import React, { useState } from 'react'

import './companyDisplay.scss'

export default function CompanyDisplay() {
    // controls the state of the dislay for the company
    const [companyDisplay, setCompanyDisplay] = useState(false);

    // updates the state of the company display
    function updateCompanyDisplay() { 
        setCompanyDisplay(prevState => !prevState);
    }

    return (
        <div onClick={ updateCompanyDisplay } className={'company-display__prompt' + (companyDisplay ? ' active' : '')}>
            <div className={'prompt__logo' + (companyDisplay ? ' active' : '')}></div>
            <div className='prompt__name'>
                Meow Apps 
            </div>
        </div>
    )
}
