import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import axios, {AxiosError} from "axios";
import Airtable from "airtable";

const app = express();
const port = 3297;

const airtableKey = process.env.AIRTABLE_KEY;
const airtableId = process.env.AIRTABLE_DB_ID;
const tableName = process.env.TABLE_NAME;

app.use(cors());
app.use(express.json());

app.post("/submit-vote", (req,res)=>{
    const {slackId, voterId, rankedCandidates} = req.body;
    if(!slackId ||!voterId ||!rankedCandidates){
        return res.status(400).json({error: "Missing fields"});
    }

    console.log(req.body);
    res.json({message: "Vote submitted successfully"});
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
