const upload = async (req, res) => {
    res.send({ message: 'File uploaded successfully!', file: req.file });
}

module.exports = upload
