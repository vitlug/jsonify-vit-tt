!function(){let t;const e=document.getElementById("darkSwitch");e&&(t=null!==localStorage.getItem("darkSwitch")&&"dark"===localStorage.getItem("darkSwitch"),(e.checked=t)?document.body.setAttribute("data-theme","dark"):document.body.removeAttribute("data-theme"),e.addEventListener("change",(t=>{e.checked?(document.body.setAttribute("data-theme","dark"),localStorage.setItem("darkSwitch","dark")):(document.body.removeAttribute("data-theme"),localStorage.removeItem("darkSwitch"))})))}(),document.getElementById("fileinput").addEventListener("change",(function(t){const e=t.target.files[0];try{if(!e)throw new Error("Failed to load file");{const t=new FileReader;t.onload=function(t){const e=t.target.result;$("#ReadResult").append($(e));const d=$("#ReadResult").find("#getStudentDetails");if(0===d.length)throw $("#ReadResult").empty(),new Error("Given HTML File is Not Valid");$("#ReadResult").empty().append(d).show()},t.readAsText(e)}}catch(d){alert(d.message)}}),!1),document.getElementById("download").addEventListener("click",(function(){$("#ReadResult").empty()?alert("Please Give a HTML as Input"):new Promise(((t,e)=>{const d=[],n=t=>{const e=t.split("+"),d=e.pop();return e.push(d.split(" - ")[0]),e},o=t=>t.split(" "),a=[],l=$(".table > tbody:nth-child(1) > tr").length-2;$(".table > tbody:nth-child(1) > tr").each(((t,e)=>{if(t>2&&t<=l){const e=[];$(`.table > tbody:nth-child(1) > tr:nth-child(${t}) > td`).each(((t,d)=>{e.push($(d).text().trim().replace(/\t/g,"").replace(/\n/g," "))})),a.push(e)}}));for(let c=0;c<a.length;c++){const t={};let e=0;t.slot=n(a[c][7]);const l=a[c][2].split("-"),r=l[1].split("(");a[c][2].includes("Theory")?t.type="Embedded Theory":a[c][2].includes("Project")?t.type="Embedded Project":a[c][2].includes("Lab")?t.type="Embedded Lab":a[c][2].includes("Soft")&&(t.type="Soft Skills"),t.CCode=l[0],t.CName=r[0].trim(),t.LTPJC=o(a[c][3]),t.category=a[c][4];const i=a[c][7].split("-");t.classRoom=i[1].trim();const s=a[c][8].split("-");t.fName=s[0].trim(),e+=t.LTPJC,d.push(t)}t(d)})).then((t=>{!function(t,e){const d=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(t))}`,n=document.createElement("a");n.setAttribute("href",d),n.setAttribute("download",`${e}.json`),document.body.appendChild(n),n.click(),n.remove()}(t,(new Date).toUTCString())}))}),!1);
