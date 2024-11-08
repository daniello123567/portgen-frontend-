export const NameCanBeAlias = async (processedName:string)=>{
  const aliasToBeUsed = `https://${processedName}.vercel.app`
  const response = await fetch(aliasToBeUsed,{method:'GET',mode:'no-cors'});
  if(response.status==200){
   return `https://${processedName}-${Date.now().toString().slice(0,6)}.vercel.app`
  }else if(response.status===404||response.status!==200){
    return aliasToBeUsed;
  }
};
