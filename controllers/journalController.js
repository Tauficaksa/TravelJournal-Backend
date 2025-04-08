const TravelJournal = require("../models/TravelJournal");
const path = require("path");
const fs = require("fs");
const {Op, Sequelize}=require("sequelize");

// Create a Travel Journal
exports.createJournal = async (req, res) => {
    try {
        const { user_id, name, description, location } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!user_id || !name || !description) {
            return res.status(400).json({ error: "user_id, name, description are required" });
        }

        const journal = await TravelJournal.create({ user_id, name, description, location, image });
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Journals
exports.getJournals = async (req, res) => {
    try {
        const {id}=req.params
        const journals = await TravelJournal.findAll({
            where:{
                user_id:{[Op.ne]:id}
            },
            order: [
                [Sequelize.literal('RAND()')]
            ]
            
        });
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJournalsOfUser=async(req,res)=>{
    try{
        const {id}=req.params
        const journals=await TravelJournal.findAll({
            where:{
                user_id:id
            }
        })
        res.status(200).json(journals)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

// Update Journal
exports.updateJournal = async (req, res) => {
    try {
        const { id } = req.params;
        let {name, description, location} = req.body;
        const journal = await TravelJournal.findByPk(id);
        if (!journal) return res.status(404).json({ error: "Journal not found" });
        if(name=="") name=null
        if(description=="") description=null
        if(location=="") location=null
        await journal.update({
            name:name||journal.name,
            description:description||journal.description,
            location:location||journal.location
        });

        res.status(200).json({ message: "Journal updated successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Journal
exports.deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await TravelJournal.findByPk(id);

        if (!journal) return res.status(404).json({ error: "Journal not found" });

        // Delete associated image
        if (journal.image) {
            const imagePath = path.join(__dirname, "..", journal.image.substring(1));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await journal.destroy();
        res.status(200).json({ message: "Journal deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
