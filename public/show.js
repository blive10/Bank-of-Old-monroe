const view = document.getElementById('view')
const key = document.getElementById('key');
const message = document.getElementById('message');


view.addEventListener ('click', ()=>{
    if (key.value ==='500500100'){
        window.location.href = 'coded.html';
        
        
    }
     if(key.value ===""){
        message.style.display = 'block'
        message.textContent = 'Please Input your key';
        setTimeout(() =>{
        message.style.display ='none';
    },2000)
    }
    

    else{
        message.style.display = 'block'
        message.textContent = 'Invalid key';
        setTimeout(() =>{
        message.style.display ='none';
    },2000)
    }
});
message.style.display ='none';

window.addEventListener('pageshow', ()=>{
    key.value ='';
})
