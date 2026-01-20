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
console.log("hello");
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

          // GETTING THE BALANCE PART DONE
            let balnce =document.getElementById("balnce");
            let b =Number(balnce.innerText);
            //GETTING THE BET AMOUNT
            let amt=document.getElementById("amt");
            let cbet="";
            //RESET FUNCTION 
            function reset(){
              balnce.innerText=1000;
              b =1000;
              document.getElementById("HISTORY").innerHTML="";
              spinhis=[];
              document.getElementById("amt").value='';
              document.getElementById("beton").value='';
              document.getElementById("lol").innerText="000";
            }
            //NUMBER BET
            function nm(){
              cbet=Number(document.getElementById("beton").value);
              no();
            }
            
            //INITIALIZE THE BET OPTION(RED OR BLACK CURRENTLY)
            function setbet(be){
                 cbet=be;
                 no();
            }
            //CHECKING IF THE USER WON
            function check(cl){
               let xbet= Number(document.getElementById("amt").value);
               if(cl.includes(cbet)){
                 if(cbet==cl[0]){
                  b+=xbet*35;
                 }
                 else{
                b+=xbet;}
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
            //CHECKS IF USER PLACED A BET OR NO IF NOT BUTTON WONT WORK
            function no(){
              let nobet=cbet;
              let noamt=document.getElementById("amt").value;
              let flg = document.getElementById("spbtn");
              if(Number(noamt)>b){
                alert("You cant place a higher bet than your balance");
                return;
              }
              if(nobet!==""&&(noamt>0)){
                flg.disabled = false;
              }
              else
              {
                flg.disabled = true;
              }
            }
            //SPIN FUNCTION
            function spin() {
                             
                let c = Math.floor(Math.random()*37);;
                let red=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
                let col = "";
                let ore="";
                let hil="";
                if(c==0){col="GREEN";}
                else if(red.includes(c)){col="RED";}
                else{col="BLACK";}
                //UPDATING THE NUMBER WON
                let s= document.getElementById("lol");
                s.innerText="NUMBER= "+c+"|COLOUR= "+col;
                if(c%2==0){
                  ore="even";
                }
                else{
                  ore="odd";
                }
                if(c>0&&c<=19){
                  hil="OO";
                }
                else if(c>19&&c<=36){
                  hil="ntt";
                }
                let res=[c,col,ore,hil];
                s.style.color=col.toLowerCase();; 
                check(res);
                cbet='';
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
                document.getElementById("beton").value='';
             }