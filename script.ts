console.log("dsafk");
declare var Sortable:any;

document.addEventListener('DOMContentLoaded', async (event) => {
    const submit:HTMLButtonElement = document.getElementById("submit") as HTMLButtonElement;
    const list = document.getElementById('candidateList') as HTMLUListElement;
    const response = await fetch("data.json");
    const data = await response.json();

    for(const key in data.candidates){
        const candidate = data.candidates[key];
        const li = document.createElement("li");
        li.innerHTML = `<div class="candidateContainer">
<div class="dragIndicator">⠿</div>
<div class="candidateDetailsContainer"><div class="candidateName">${candidate.fullName}</div><div class="candidateAbbreviation">${candidate.abbreviation}</div></div>
</div>`;
        // candidate.fullName;
        li.dataset.id = key;

        list.appendChild(li);
    }

    new Sortable(list, {
        animation: 150
    });

    const electionCycle:Date = new Date(data.electionCycle);

    let bodyHeader: HTMLElement = document.getElementById("body-header") as HTMLElement;
    bodyHeader.innerText = `${electionCycle.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    })} National General Elections`;

    submit.addEventListener("click", async () => {
        console.log("dsfakjfs");
        const slackId = (document.getElementById("slackId") as HTMLInputElement).value;
        const voterId = (document.getElementById("voterId") as HTMLInputElement).value;

        if(!slackId || !voterId){
            alert("Slack ID or Voter ID missing. Please fill these fields in, as they are required.");
            return;
        }

        const rankedCandidates = Array.from(list.children).map(li => {
            return (li as HTMLElement).dataset.id;
        });

        console.log(rankedCandidates);
        await fetch("/submit-vote", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                slackId,voterId, rankedCandidates
            })

        })
    })
})