"use client"
import { infomation } from '@/app/store';
import supabase from '@/app/utils/supabase';
import React, { useState } from 'react'
import Loader from './Loader';
declare global {
  type project = {
    id: string,
    Name: string,
    ShortDesc: string,
    LiveLink: string | undefined,
    GithubLink: string | undefined,
    image: string
  }
}
function ProjectUpdate() {

  const [turnRed, setturnRed] = useState<boolean>(false)
  const [isLoading, setIsloading] = useState<boolean>(false)
  const { OverallInfo, setProject, setInfo
  } = infomation()

  const [Project, setproject] = useState<project>({ id: '', Name: '', ShortDesc: '', LiveLink: '', GithubLink: '', image: '' });
  const handleProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setproject({ ...Project, [e.target.name]: e.target.value })

  }
  const addHttps = (text: string) => {
    if (!text.startsWith('https://')) {
      return `https://${text}`
    } else return text
  }
  const handleLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setproject({ ...Project, [e.target.name]: addHttps(e.target.value) });

  }
  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordCount = e.target.value.trim().split(/\s+/);
    if (wordCount.length >= 10) {
      setturnRed(true)
    } else {
      setproject({ ...Project, ShortDesc: e.target.value })
    }
  }
  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from('coverimages').getPublicUrl(filePath);
    return data;
  }
  const UploadFile = async (file: File) => {
    const filename = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('coverimages').upload(filename, file)
    if (data) {
      return data.path
    } else if (error) {
      alert(error)
    }
  }
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target?.files?.[0];
    if (file) {
      setIsloading(true)
      const path = await UploadFile(file)
      if (path) {
        const { publicUrl } = getPublicUrl(path);
        console.log(publicUrl);

        setproject({ ...Project, image: publicUrl });
        setIsloading(false)
      }
    }
  }
  const handleNewProject = () => {
    const fileChooser: HTMLInputElement | null = document.querySelector('#coverImg');
    if (fileChooser) {
      fileChooser.value = ""
    };


    if (Project.Name && Project.ShortDesc && Project.image) {
      setProject({ ...Project, id: String(crypto.randomUUID()) })
      setproject({ id: '', Name: '', ShortDesc: '', LiveLink: '', GithubLink: '', image: '' })
    } else {
      alert('complete all fields!')
    }
  }
  const removeProject = (id: string) => {
    const newProjects = OverallInfo.Projects.filter((project) => {
      if (project.id !== id) {
        return project;
      };

    })
    setInfo("Projects", [...newProjects])

  }
  console.log(Project, "project");

  const SingleProject = ({ name, id }: { name: string, id: string }) => {
    return <div className='bg-white relative rounded px-[.5em] w-max h-max tracking-tight'>{name}
      <div onClick={() => removeProject(id)} className='absolute cursor-pointer  px-[.4em] flex justify-center items-center rounded-full right-[-.5em] top-[-1em]  text-white text-[1.1em] bg-[#000000]'>&times;</div></div>
  }
  return (<>
    <div className='w-full p-[.5em]  h-max min-h-[7em] bg-slate-300'>
      <p className=''>Your Projects:</p>
      {OverallInfo.Projects.length === 0 && <div className='w-full h-full flex flex-col justify-center items-center'>
        <p className='text-center text-white'>None</p>
        <p className='text-center text-[.7em]'>Enter Your Project along with other informations and click &apos;Add Project&apos;</p>
      </div>}
      <div className='w-full py-[1em] flex-wrap h-max overflow-y-auto flex gap-[1em]'>
        {OverallInfo.Projects.map((project) => {
          return <SingleProject key={project.id} id={project.id} name={project.Name} />
        })}
      </div>
    </div>
    <label className='text-[.9em] font-[900]' htmlFor="Email">Project:</label>
    <div className="w-full p-[.5em] h-max  border border-black">

      <input value={Project.Name} onChange={handleProject} name='Name' placeholder='project name' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' type="email" />
      <p className={`text-[.7em] ${turnRed && 'text-red-600'} `}>*maximum of 10 words*</p>
      <input id='forDesc' value={Project.ShortDesc} onChange={handleDesc} name='ShortDesc' placeholder='project short description' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="email" />
      <input value={Project.LiveLink} onChange={handleLinks} name='LiveLink' placeholder='project&apos;s Live Link (Optional) ' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="email" />
      <input value={Project.GithubLink} onChange={handleLinks} name='GithubLink' placeholder='project&apos;s Github Link (Optional)' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' title='name' type="email" />
      <label htmlFor="coverImg">Cover Image (preferrably a laptop view):</label>
      <div className='relative'>
        <input id='coverImg' onChange={handleImage} name='CoverImage' placeholder='choose a Cover Image' className='border mt-[.4em] placeholder:text-[#444746] mb-[.5em] px-[0.9375em] outline-none placeholder:font-[400] w-full py-[0.8125em] text-[1rem] border-[#1F1F1F] rounded-[0.25em]' accept='image/*' type="file" >
        </input>
        {isLoading && <div className='absolute top-[1.2em] right-[45%]  w-[2em] h-[2em]'>
          <Loader />
        </div>}
      </div>

      <button onClick={handleNewProject} className={`${isLoading && 'opacity-[0.5] pointer-events-none'} w-max p-[.5em] mx-auto cursor-pointer bg-[#0b57d0] text-white flex  justify-center pointer-events-auto items-center  h-[2.5em] rounded-full `}>&#43; Add Project</button>
    </div>
  </>
  )
}

export default ProjectUpdate
