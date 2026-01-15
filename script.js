let spinhis = [];
            let balnce =document.getElementById("balnce");
            let b =Number(balnce.innerText);
            let amt=document.getElementById("amt");
            let cbet="";
            function reset(){
              balnce.innerText=1000;
              document.getElementById("HISTORY").innerHTML="";
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