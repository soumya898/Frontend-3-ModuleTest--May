const getCurrentImageOfTheDay=async()=>{
    const currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate)
    let data= await fetch(`https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${currentDate}`);
    let parsedData=await data.json();
    console.log(parsedData)
    heading.innerText="NASA Picture of the Day" 
    image.src=parsedData.hdurl;
    desc.innerText=parsedData.explanation;
    title.innerText=parsedData.title;


}

const getImageOfTheDay=async(date)=>{
    let data= await fetch(`https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${date}`);
    let parsedData=await data.json();
    heading.innerText=`Picture on ${date}`  
    image.src=parsedData.hdurl;
    desc.innerText=parsedData.explanation;
    title.innerText=parsedData.title;

}

const saveSearch=async(date)=>{
    if(sessionStorage.getItem("dateList"))
    {
        let localList=JSON.parse(sessionStorage.getItem("dateList"))
        localList.push(date)
        sessionStorage.setItem("dateList",JSON.stringify(localList))
    }
    else{
        let list=[];
        list.push(date);
        console.log(list)
        sessionStorage.setItem("dateList",JSON.stringify(list));
    }
    console.log(JSON.parse(sessionStorage.getItem("dateList")))
    
}

const addSearchToHistory=()=>{
    let localList=JSON.parse(sessionStorage.getItem("dateList"))    
        const li = document.createElement("li");
        li.classList.add("LiItem");
        li.innerHTML=`${localList[localList.length-1]}`
        li.addEventListener("click", () => {
            let date= li.innerText
            getImageOfTheDay(date)

          })
        document.getElementById("searchList").appendChild(li)

}

submit.addEventListener("click",async(e)=>{
    e.preventDefault();
    getImageOfTheDay(date.value)
    saveSearch(date.value)
    addSearchToHistory(date.value)

})

const render=async()=>{
    getCurrentImageOfTheDay();

}
render();