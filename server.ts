import express from "express";
import cors from "cors";

const app = express();
const port = 3297;

app.use(cors());
app.use(express.json());

interface Vote{
    slackId: string;
    voterId: string;
    rankedCandidates: string[];
}

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
