let badges = 0;

// Navigation
function showPage(pageId) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "block";
}

// Robotics Assistant
function fillQuestion(text){
    document.getElementById("question").value=text;
}

async function askRobot(){

    let question=document.getElementById("question").value;

    if(question=="") return;

    let chat=document.getElementById("chatBox");

    chat.innerHTML+=`
    <div class="userBubble">
    👤 ${question}
    </div>
    `;

    document.getElementById("typing").style.display="block";

    try{

        const apiKey="YOUR_API_KEY";

        const response=await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+apiKey,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[{

                    parts:[{

                        text:"You are a robotics teacher. Answer simply: "+question

                    }]

                }]

            })

        });

        const data=await response.json();

        document.getElementById("typing").style.display="none";

        let answer="No response.";

        if(data.candidates){
            answer=data.candidates[0].content.parts[0].text;
        }

        chat.innerHTML+=`
        <div class="aiBubble">
        🤖 ${answer}
        </div>
        `;

        document.getElementById("question").value="";

        chat.scrollTop=chat.scrollHeight;

    }

    catch(error){

        document.getElementById("typing").style.display="none";

        chat.innerHTML+=`
        <div class="aiBubble">
        ❌ Error connecting to AI.
        </div>
        `;

    }

}

// Quiz
function correctAnswer() {

    badges++;

    document.getElementById("quizResult").innerHTML =
    "✅ Correct!";

    document.getElementById("badgeCount").innerHTML =
    "Badges: " + badges;
}

function wrongAnswer() {

    document.getElementById("quizResult").innerHTML =
    "❌ Wrong!";
}

// Projects
function openProject(projectName) {

    alert("Opening project: " + projectName);
}

// About
function aboutRashid() {

    alert("Rashid PG - Robotics Enthusiast");
}

// Start app on Home page
window.onload = function() {

    showPage("home");
};
function searchLibrary(){

let input=document.getElementById("searchBox").value.toUpperCase();

let cards=document.getElementsByClassName("lessonCard");

for(let i=0;i<cards.length;i++){

let title=cards[i].getElementsByTagName("h2")[0];

if(title.innerHTML.toUpperCase().indexOf(input)>-1){

cards[i].style.display="block";

}

else{

cards[i].style.display="none";

}

}

}        