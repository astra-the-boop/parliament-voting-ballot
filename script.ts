console.log("dsafk");

document.addEventListener('DOMContentLoaded', async (event) => {
    const list = document.getElementById('candidateList') as HTMLUListElement;
    const response = await fetch("data.json");
    const data = await response.json();

    Object.values(data.candidates).forEach((candidate: any, i: number)=> {
        const li = document.createElement("li");
        li.textContent = candidate.fullName;

    })


    const electionCycle:Date = new Date(data.electionCycle);

    let bodyHeader: HTMLElement = document.getElementById("body-header") as HTMLElement;
    bodyHeader.innerText = `${electionCycle.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    })} National General Elections`;
})