module.exports = (req, res, next) => {
    console.log('test')
    console.log(req.body)
    // console.log(req)
    console.log(req.file)


next();
}