import React, {useState} from 'react';


const forgotPassword = () => {


    return (
        <div className="forgot_password_page">
            <div className="email_subpage">
                <p>Forgot Password</p>
                <p>Please enter the account for which you want to reset the password.</p>
                <input type="email" placeholder='Enter your email account'/>
                <button type="submit">Confirm</button>
            </div>
            <div className="OTP_subpage">
                <p>Verify your identity</p>
                <p>Please enter OTP via email to continue</p>
                <div className="OTP_input_cells">
                    <input type="number" className='cell' maxLength={1} />
                    <input type="number" className='cell' maxLength={1} />
                    <input type="number" className='cell' maxLength={1} />
                    <input type="number" className='cell' maxLength={1} />
                </div>
                <button type='Submit'>Confirm</button>
            </div>
        </div>
    );
};

export default forgotPassword;