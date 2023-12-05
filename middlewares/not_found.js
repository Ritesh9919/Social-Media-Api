

export const notFoundErrorHandler = (req, res, next)=> {
    res.status(404).json({msg:`Invalid Path: ${req.originalUrl}.Please check our documentation for more information at: localhost:8000/api/docs`});
}


