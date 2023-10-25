const fs = require('fs');
const path = require('path');

const pitchsFilePath = path.join(__dirname, '../data/pitchsData.json');

function getPitchs() {
    const pitchs = JSON.parse(fs.readFileSync(pitchsFilePath, 'utf-8'));
    return pitchs;
}

const controller = {
    
    // SHOW ALL PITCHS 
    index (req, res) {
        return res.render('pitchs/pitchs', { pitchs : getPitchs() });
    },
    
    // FORM TO CREATE PITCH 
    create (req, res) {
        return res.render('pitchs/newPitchs');
    },

    // METHOD TO NEW PITCH 
    newPitch (req, res) {
        const pitchs = getPitchs();
        const pitchsToCreate = {
            id : pitchs[pitchs.length - 1].id + 1,
            // image: SUBIR UNA IMAGEN POR DEFAULT 
            ... req.body
        };

        pitchs.push(pitchsToCreate);
        fs.writeFileSync(pitchsFilePath, JSON.stringify(pitchs, null, 2));
        res.redirect('/');
    },
    
    // DETAIL FROM ONE PITCH 
    // detail (req, res) {
    //     const pitchs = getPitchs();
    //     const pitch = pitchs.find(element => element.id == req.params.id);
    //     if (!pitch){
    //         return res.render('error', {    // CREAR VISTA EJS DE ERROR //
    //             message : 'La cancha no existe', 
    //             error : {
    //                 status : 404
    //             },
    //             path: req.url
    //         });
    //     }
        
    //     res.render('pitchs/detail', { pitch });
    // },
    detail (req, res){
        res.render('pitchs/detail')
    },

    // FORM TO EDIT 
    edit (req, res) {
        const pitchs = getPitchs();
        const pitch = pitchs.find(element => element.id == req.params.id);
        return res.render('pitchs/editPitchs', { pitchToEdit : pitch }); //Preguntar a los profes
    },

    // METHOD TO UPDATE 
    update (req, res) {
        const pitchs = getPitchs();
        const pitchIndex = pitchs.findIndex(element => element.id == req.params.id);
        pitchs[pitchIndex] = {
            ...pitchs[pitchIndex],   // CONSULTAR //
            ...req.body
        };
        fs.writeFileSync(pitchsFilePath, JSON.stringify(pitchs, null, 2));
        res.redirect('/')
    },

    destroy (req, res) {
        const pitchs = getPitchs();
        const pitchIndex = pitchs.findIndex(element => element.id == req.params.id);
        pitchs.splice(pitchIndex, 1);
        fs.writeFileSync(pitchsFilePath, JSON.stringify(pitchs, null, 2));
        res.redirect('/');
    }

}

module.exports = controller;