import bcrypt from 'bcryptjs';
import pool from '../../dbConnect.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from "jsonwebtoken";
import transporter from '../utils/nodemailSetUp.js';


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword, role, phoneNo, address } = req.body;

    if (!name || !email || !password || !role || !phoneNo || !address) {
        throw new ApiError(400, 'Please fill all required fields');
    }
    if (password.trim().length < 6) {
        throw new ApiError(400, 'Password must be at least 6 characters long');
    }
    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match');
    }

    const roles = ["buyer", "seller", "admin"];
    if (!roles.includes(role)) {
        throw new ApiError(400, 'Invalid role selection');
    }

    const ifUserExists = await pool.query('SELECT * FROM "Users" WHERE email=$1', [email]);
    if (ifUserExists.rows.length) {
        throw new ApiError(400, 'User already exists with this email');
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO "Users" (name, email, password, "phoneNo", role, address) VALUES($1, $2, $3, $4, $5, $6) RETURNING name, email, "phoneNo", role, address';

    const values = [name, email, hashedPwd, phoneNo, role, address];
    const createNewUser = await pool.query(query, values);

    if (!createNewUser.rows.length) {
        throw new ApiError(500, 'User registration failed');
    }
    const emailOptions = {
        from: "arsalanali873@gmail.com",
        to: email,
        subject: "Welcome to ProTech Hardware!",
        text: `Welcome to Hardware Hub. Your account has been created with Email ID: ${email}`, 
        html: `
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); margin: auto;">
                    <h2 style="color: #2c3e50; text-align: center;">Welcome to <span style="color: #e74c3c;">Hardware Hub</span>!</h2>
                    <p>Hi there,</p>
                    <p>Your account has been successfully created.</p>
                    <p><strong>Email ID:</strong> ${email}</p>
                    <p>At <strong>ProTech Hardware</strong>, we bring you the best deals on <strong>Graphics Cards, Processors, RAM, SSDs, Gaming Peripherals</strong>, and more! Start upgrading your setup today</p>
                
                    <p>Need help selecting the best PC parts? Our expert support team is here for you.</p>
                 
                    <p>Happy Shopping!<br><strong>The ProTechHardware Team</strong></p>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">                  
                    <footer style="text-align: center; font-size: 0.9em; color: #555;">
                        <p>For any queries, contact us at <a href="mailto:arsalanali873@gmail.com">support@ProTechHardware.com</a></p>
                       
                    </footer>
                </div>
            </body>
            </html>
        `
    };
    
    try{
        await transporter.sendMail(emailOptions);
        console.log("Email sent successfully to: ",email);

    }catch(err){
        console.log("Error sending email: ",err);   
    }

    return res.status(201).json(new ApiResponse(201, 'User registered successfully', createNewUser.rows[0]));
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Please provide both email and password fields');
    }

    const checkIfUserIsRegistered = await pool.query('SELECT * FROM "Users" WHERE email=$1', [email]);
    if (checkIfUserIsRegistered.rows.length == 0) {
        throw new ApiError(400, 'User not registered');
    }

    const checkPwd = await bcrypt.compare(password, checkIfUserIsRegistered.rows[0].password);
    if (!checkPwd) {
        throw new ApiError(400, 'Incorrect password');
    }

    const accessToken = jwt.sign(
        { id: checkIfUserIsRegistered.rows[0].user_id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { id: checkIfUserIsRegistered.rows[0].user_id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    }

    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    //storing refreshToken in DB
    await pool.query(
        'UPDATE "Users" SET refresh_token=$1 WHERE email=$2',
        [refreshToken, email]
    );

    const loggedInUser = await pool.query('SELECT name,email,"phoneNo",role,address FROM "Users" WHERE email=$1', [email]);

    return res.status(200).json(new ApiResponse(200, {
        user: loggedInUser.rows[0],
        accessToken,
        refreshToken
    }));


});

const logOut = asyncHandler(async (req, res) => {
    const findUser = await pool.query('SELECT * FROM "Users" WHERE user_id=$1', [req.user?.user_id]);
    if (!findUser.rows.length) {
        throw new ApiError(401, 'No user found');
    }
    await pool.query('UPDATE "Users" SET refresh_token=$1 WHERE user_id=$2', [null, req.user?.user_id]);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    }
    res.clearCookie('accessToken', options);
    res.clearCookie('refreshToken', options);

    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));

});

const forgotPassowrd=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    if(!email){
        throw new ApiError(400,'Please provide email');
    }
    const checkIfUserExits=await pool.query('SELECT*FROM "Users" WHERE email=$1',[email]);
    if(checkIfUserExits.rows.length==0){
        throw new ApiError(400,'No user exists with this email');
    }
    const otp=Math.floor(100000 + Math.random() * 900000);
    console.log("OTP: ",otp);

    await pool.query(
        'UPDATE "Users" SET resetpwdotp=$1, resetotpexpireat=NOW() + INTERVAL \'10 minutes\' WHERE email=$2',
        [otp, email]
    );

    const emailOptions = {
        from: "arsalanali873@gmail.com",
        to: email,
        subject: "Your ProTech Hardware OTP Code",
        text: `Your OTP for ProTech Hardware is: ${otp}. This OTP is valid for only 10 minutes.`,
        html: `
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); margin: auto;">
                    <h2 style="color: #2c3e50; text-align: center;">Your <span style="color: #e74c3c;">ProTech Hardware</span> OTP</h2>
                    <p>Hi there,</p>
                    <p>We received a request to reset your password. Use the following OTP to proceed:</p>
                    <div style="text-align: center; font-size: 22px; font-weight: bold; color: #e74c3c; padding: 10px; border: 2px dashed #e74c3c; display: inline-block;">
                        ${otp}
                    </div>
                    <p>This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
                    <p>If you did not request this, please ignore this email or contact our support team.</p>
                    <p>Best regards,<br><strong>The ProTech Hardware Team</strong></p>
    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">                  
                    <footer style="text-align: center; font-size: 0.9em; color: #555;">
                        <p>Need help? Contact us at <a href="mailto:arsalanali873@gmail.com">support@ProTechHardware.com</a></p>
                    </footer>
                </div>
            </body>
            </html>
        `
    };
    try{
        await transporter.sendMail(emailOptions);
        console.log("Email sent successfully to: ",email);
        return res.status(200).json({ success: true, message: `OTP sent to your email` })

    }catch(err){
        console.log("Error sending email");
        return res.status(400).json({ success: false, message: "Error sending OTP via email.Plz try again later" })
    }
    
})

const resetPwd=asyncHandler(async(req,res)=>{  
    const{email,otp,newPassword,confirmPassword}=req.body;

    if(!email || !otp || !newPassword || !confirmPassword){
        throw new ApiError(400,'Please fill all required fields');
    }
    const checkIfUserExits=await pool.query('SELECT*FROM "Users" WHERE email=$1',[email]);
    if(checkIfUserExits.rows.length==0){
        throw new ApiError(400,'No user exists with this email');
    }
    if(newPassword.trim().length<6){
        throw new ApiError(400,'Password must be at least 6 characters long');
    }
    if(newPassword!==confirmPassword){
        throw new ApiError(400,'Passwords do not match');
    }
    if(checkIfUserExits.rows[0].resetpwdotp!==otp){
        throw new ApiError(400,'Invalid OTP');
    }
    // Converting resetotpexpireat to a JavaScript Date object before comparison
    if (new Date(checkIfUserExits.rows[0].resetotpexpireat) < new Date()) {
        throw new ApiError(400, 'OTP expired');
    }
    
    const hashedPwd=await bcrypt.hash(newPassword,10);
    try{

    await pool.query('UPDATE "Users" SET password=$1,resetpwdotp=$2,resetotpexpireat=$3 WHERE email=$4',
    [hashedPwd,null,null,email]);

    }catch(err){
        throw new ApiError(500,'Error updating password');
    }

    return res.status(200).json({success:true,message:"Password reset successfully"});
 })

export { registerUser, loginUser, logOut,forgotPassowrd ,resetPwd};
