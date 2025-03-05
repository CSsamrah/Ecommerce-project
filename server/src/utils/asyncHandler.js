export const asyncHandler=(requestHandler)=>async(req,res,next)=>{
    try{
        await requestHandler(req,res,next)

    }
    catch(error){
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }

}



/*s asyncHandler? asyncHandler is a higher-order function. It takes a function requestHandler 
(an asynchronous route handler or middleware) as its argument and returns a new function 
that wraps the requestHandler with a try-catch block. This ensures that any errors thrown
 during the execution of requestHandler are caught and handled properly.

How Does It Work?

Parameters:

requestHandler: An asynchronous function that handles the HTTP request (e.g., route handler or middleware).
Returned Function:

The returned function is an async function that takes the standard Express req, res, and next parameters.
Inside the returned function:

The requestHandler is executed inside a try block.
If the requestHandler throws an error, the catch block captures it and sends a JSON response with an appropriate error message and status code.
Error Handling Logic

If an error is caught:
error.code: The HTTP status code from the error (if provided); otherwise, it defaults to 500 (internal server error).
error.message: The error message from the error object. */