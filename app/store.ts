import {create, StateCreator} from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
type Info = {
  OverallInfo:{Name:string,Email:string,
    DevelopmentTrack:string,ProfessionalTagline:string,
    ImageUrl:string,
    ProfessionalIntro:string,Skills:Array<string>,Projects:project[]}
,
setInfo:(name:string,value:string|Record<string,string>|project[]|string[])=>void,
setSkills:(skill:string)=>void,
setProject:(project:project)=>void,
}
type configman = (
  config: StateCreator<Info>,
  options:PersistOptions<Info>
)=> StateCreator<Info>
export const infomation = create<Info>((persist as configman)((set)=>({
  OverallInfo:{Name:'',
               ImageUrl:'',
               Email:'',
              DevelopmentTrack:'',
              ProfessionalTagline:'',
              ProfessionalIntro:'',
              Skills:[],
              Projects:[]
            },
  setInfo:(name:string,value:string|Record<string,string>|project[]|string[])=>set((state)=>({OverallInfo:{...state.OverallInfo,[name]:value}})),
  setSkills:(skill:string)=>set((state)=>({OverallInfo:{...state.OverallInfo,Skills:[...state.OverallInfo.Skills,skill]}})),
  setProject:(project:project)=>set((state)=>({OverallInfo:{...state.OverallInfo,Projects:[...state.OverallInfo.Projects,project]}}))
}),{name:"Store"}))


type error = {
  error:boolean;
  isThereError:(error:boolean)=>void;
}
type activeBro = {
  activeIndex:number,
  setActiveIndex:(active:number) =>void;
}
export const active = create<activeBro>((set)=>({
  activeIndex:0,
  setActiveIndex:(active:number)=>set(()=>({activeIndex:active}))
}))
export const isThereErrorSomewhere = create<error>((set)=>({
  error:false,
  isThereError:(error:boolean)=>set(()=>({error:error}))
}))
