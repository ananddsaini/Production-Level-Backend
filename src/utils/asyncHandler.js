// Async await method  # requestHandler is a function and asyncHandler is a higher order function
/*
const asyncHandler = (requestHandler) => {
    async (req, res, next, err) => {
        try {
            await requestHandler(res, req, next, err)

        }
        catch (error) {
            res.status(err.code || 500).json({
                success: false,
                message: err.message
            })

        }
    }
}
*/
 
// Promise method
const asyncHandler=(requestHandler)=>{
(req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).
    catch((err)=>next(err))
}
      
}

export {asyncHandler}
