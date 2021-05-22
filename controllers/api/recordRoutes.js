
    router.post('/', (req, res) => {
        try {
            const newNote = await Note.create(req.body);
            res.status(200).json(newNote);
        } catch (err) {
            res.status(400).json(err);
        }
});

