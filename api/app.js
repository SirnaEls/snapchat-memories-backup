const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()
const port = 3000

app.use(fileUpload({
    createParentPath: true
}))

app.get('/nassir', (req, res) => {
    res.send('Hello World!')
})


app.post('/upload-snapchat-file', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            })
        } else {
            console.log("NOTRE LOG: ", req.files)
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})