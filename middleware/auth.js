const checkuser = (req, res, next) => {
    if (!req.session.userid) {
        return res.send('Login first')
    }
    next()
}

module.exports = { checkuser }