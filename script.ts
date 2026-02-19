console.log("dsafk");
declare var Sortable:any;

document.addEventListener('DOMContentLoaded', async (event) => {
    const list = document.getElementById('candidateList') as HTMLUListElement;
    const response = await fetch("data.json");
    const data = await response.json();

    for(const key in data.candidates){
        const candidate = data.candidates[key];
        const li = document.createElement("li");
        li.innerHTML = `<div class="candidateContainer">
${candidate.fullName}
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
})