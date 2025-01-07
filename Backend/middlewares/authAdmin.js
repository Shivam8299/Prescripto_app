import jwt from 'jsonwebtoken'

// admin authentication

const adminAuth = async (req, res, next) => {
    try {
        const { adminToken } = req.body

        console.log(adminToken);

        if (!adminToken) {
            res.json({
                message: 'not authorized',
                success: false
            })

            const decode_token = jwt.verify(adminToken, process.env.JWT_SECRET)

            if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                res.json({
                    message: 'not authorized',
                    success: false
                })
            }

            next()
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: error.message,
            success: false
        })
    }
}

export default adminAuth