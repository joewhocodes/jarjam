const Instrument = require('../models/Instruments');

module.exports = {
    getInstruments: async (req, res) => {
        try {
            const instruments = await Instrument.find();
            console.log('found items');
            res.json(instruments);
        } catch (err) {
            err => console.log(err);
        }
    },
    createInstrument: async (req, res) => {
        try {
            console.log(req)
            await Instrument.create({
                instrument: req.body.instrument,
                skillLevel: req.body.skillLevel,
            });
        } catch (err) {
            err => console.log(err);
        }
    },
    // app.put('/instruments/update/:id', (req, res) => {
    //     Instrument.findByIdAndUpdate(
    //         { _id: req.params.id },
    //         {
    //             title: req.body.title,
    //             description: req.body.description,
    //         }
    //     )
    //         .then((doc) => console.log(doc))
    //         .catch((err) => console.log(err));
    // }),
    deleteInstrument: async (req, res) => {
        console.log(req);
        try {
            await Instrument.findByIdAndDelete({ _id: req.params.id })((doc) =>
                console.log(doc)
            );
        } catch (err) {
            err => console.log(err);
        }
    },
};
