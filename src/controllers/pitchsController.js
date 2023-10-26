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
            img: req.file.img || 'cancha-prueba.webp', 
            ...req.body
        };
        
        console.log(pitchsToCreate)
        pitchs.push(pitchsToCreate);
        fs.writeFileSync(pitchsFilePath, JSON.stringify(pitchs, null, 2));
        res.redirect('/pitchs');
    },
    
    // DETAIL FROM ONE PITCH 
    detail (req, res) {
        const pitchs = getPitchs();
        const pitch = pitchs.find(element => element.id == req.params.id);
            if (!pitch){
                return res.render('error', {    // CREAR VISTA EJS DE ERROR //
                    message : 'La cancha no existe', 
                        error : {
                            status : 404
                },
                path: req.url
            });
        }
        
        res.render('pitchs/detail', { pitch });
    },

    // FORM TO EDIT 
    edit (req, res) {
        const pitchs = getPitchs();
        const pitch = pitchs.find(element => element.id == req.params.id);
        return res.render('pitchs/editPitchs', { pitchToEdit : pitch }); 
    },

    // METHOD TO UPDATE 
    update (req, res) {
        const pitchs = getPitchs();
        const pitchIndex = pitchs.findIndex(element => element.id == req.params.id);
        pitchs[pitchIndex] = {
            ...pitchs[pitchIndex],   
            ...req.body
        };
        fs.writeFileSync(pitchsFilePath, JSON.stringify(pitchs, null, 2));
        res.redirect('/pitchs')
    },

    destroy (req, res) {
        const pitchs = getPitchs();
        const pitchIndex = pitchs.findIndex(element => element.id == req.params.id);
        pitchs.splice(pitchIndex, 1);
        fs.writeFileSync(pitchsFilePath, JSON.stringify(pitchs, null, 2));
        res.redirect('/pitchs');
    }

}

module.exports = controller;