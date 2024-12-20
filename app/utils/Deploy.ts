import { NameCanBeAlias } from "./Checkalias";
import ReturnNextjsFiles from "./file";

const DeployToVercel = async (UsersImage:string,
  NamesOfUser:string,
  RoleOfUser:string,
  Heromsg:string,
  Herosummary:string,
  Email:string,
  Skills:string[]|string,
  projects:Array<project>|string)=>{


  const files = ReturnNextjsFiles(UsersImage,NamesOfUser,RoleOfUser,Heromsg,Herosummary,Email,Skills,projects);
  const processedName = String(NamesOfUser).split(' ').join('-');
  const aliase = await NameCanBeAlias(processedName);

  const Deploy = async ()=>{
    try {
  const response = await fetch("https://api.vercel.com/v13/deployments",{
  method:"POST",
  headers:{
    "Authorization":`Bearer cDdJr8A0iejkRn9UECLTvwJS`,
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    alias:[`${aliase}`],
    public:true,
    name:`${processedName.toLowerCase()}`,
    files:files,
    projectSettings:{
      framework:"nextjs"
    }
  })
 })
 const data = await response.json();

 return data.project.id
} catch (error) {
console.error(error)
}
}
const projectid = await Deploy();


const CheckRedyState = async()=>{
  const response = await fetch(`https://api.vercel.com/v13/projects/${projectid}`,{
   method:'GET',
   headers:{
     "Authorization":'Bearer cDdJr8A0iejkRn9UECLTvwJS',
     "Content-Type":'application/json'
   }
  });
  const project = await response.json();
  return project.targets.production.readyState.toString()
}
const ResolveWhenReadyState = async ()=>{
  return new Promise(async (resolve,reject)=>{
    const checkingForBuild = setInterval(async ()=>{
      if(await CheckRedyState()==='READY'){
         clearInterval(checkingForBuild);
         resolve(aliase);
         return aliase;
      }else if(await CheckRedyState()==="ERROR"){
        alert('error ocuured in vercels api retry again by reloading browser');
        reject('error sorry bro,just try again')
      }else{
        console.log(await CheckRedyState(),"VERCEL DEPLOY API");
      }
    },2000);


  })
}

const url = await ResolveWhenReadyState()
return url
}
export default DeployToVercel;
