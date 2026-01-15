// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPu5WYUdhiJuRM-jsNtxfkh67EF9R8sMo",
  authDomain: "roulette-game-1c215.firebaseapp.com",
  projectId: "roulette-game-1c215",
  storageBucket: "roulette-game-1c215.firebasestorage.app",
  messagingSenderId: "130061333957",
  appId: "1:130061333957:web:c8c5ac35d6d231204547ac"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function googlelogin(){
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch((error)=>{console.error(error);});
}
function signup(){
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();
  auth.createUserWithEmailAndPassword(email, password).then((result)=>{document.getElementById("authMsg").innerText="Account created sucessfully"}).catch((error)=>{document.getElementById("authMsg").innerText=error.message});
}
function login(){
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();
  auth.signInWithEmailAndPassword(email, password).then((result)=>{document.getElementById("authMsg").innerText="LOGGED IN SUCCESFULLY"}).catch((error)=>{document.getElementById("authMsg").innerText=error.message});
}
function logout(){
  auth.signOut().then(()=>{console.log("User logged out");}).catch((error)=>{console.error("LOGOUT ERROR:"+error);});
}
auth.onAuthStateChanged((user)=>{
  const authSection = document.getElementById("authsection");
  const gamesection = document.getElementById("gamesection");
  if(user){
    authSection.style.display="none";
    gamesection.style.display="block";
  }
  else{
    authSection.style.display="block";
    gamesection.style.display="none"
  }
});


let spinhis = [];
            let balnce =document.getElementById("balnce");
            let b =Number(balnce.innerText);
            let amt=document.getElementById("amt");
            let cbet="";
            function reset(){
              balnce.innerText=1000;
              b =1000;
              document.getElementById("HISTORY").innerHTML="";
              spinhis=[];
            }
            function setbet(be){
                 cbet=be;
                 no();
            }
            function check(cl){
               let co=cl;
               let xbet= Number(document.getElementById("amt").value);
               if(cbet==co){
                b+=xbet;
               }
               else if(cbet==""){
                b=b;
               }
               else{
                b-=xbet;
               }
               balnce.innerText=b;
               if(b<=0){
                  document.getElementById("spbtn").disabled=true;
                  alert("GAME OVER");
                }
            }
            function no(){
              let nobet=cbet;
              let noamt=document.getElementById("amt").value;
              let flg = document.getElementById("spbtn");
              if(Number(noamt)>b){
                alert("You cant place a higher bet than your balance");
                return;
              }
              if((nobet=="RED"||nobet=="BLACK")&&(noamt>0)){
                flg.disabled = false;
              }
              else
              {
                flg.disabled = true;
              }
            }
            function spin() {
                             
                let c = Math.floor(Math.random()*37);
                let red=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
                let col = ""
                if(c==0){col="GREEN";}
                else if(red.includes(c)){col="RED";}
                else{col="BLACK";}
                let s= document.getElementById("lol");
                s.innerText="NUMBER= "+c+"|COLOUR= "+col;
                s.style.color=col.toLowerCase();; 
                check(col);
                cbet="";
                spinhis.unshift(c+"("+col+")");
                if (spinhis.length > 5){
                  spinhis.pop();
                }
                let hl=document.getElementById("HISTORY");
                hl.innerHTML="";
                for (let item of spinhis){
                  let li = document.createElement("li");
                  li.innerText = item;
                  hl.appendChild(li);
                }
                document.getElementById("spbtn").disabled = true;
             }
             