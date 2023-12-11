

export const notFoundErrorHandler = (req, res, next)=> {
    res.send({msg:`Invalid Path: ${req.originalUrl}.Please check our documentation for more information at: <a href="https://social-media-bhh7.onrender.com/api/docs">Documenttation</a>`})

    /* res.status(404).json({msg:`Invalid Path: ${req.originalUrl}.Please check our documentation for more information at: /api/docs`}); */
}


