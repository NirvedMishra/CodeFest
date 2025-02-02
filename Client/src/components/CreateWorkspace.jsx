import React,{useState} from 'react'

import { useForm } from 'react-hook-form'

import { useAuth } from '../router/AuthProvider'
import { useNavigate } from 'react-router-dom'

const CreateWorkspace = () => {
  

  
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors,isSubmitting },
  } = useForm()
  const auth = useAuth();
  const [count, setCount] = useState(0);
  const onSubmit = async (data) => {
    const contributors = [];
    for (let i = 1; i <= count; i++) {
      if (data[`contributor${i}`]) {
        contributors.push(data[`contributor${i}`]);
        delete data[`contributor${i}`];
      }
    }
    const formData = {
      ...data,
      contributors,
    };
    console.log(formData);
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/createWorkspace`, {
            method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Something went wrong');
            } else {
              throw new Error('Unexpected response format');
            }
          }
    
        const res = await response.json();
        const workspaceId = res.data.workspaceId; 
        navigate(`/workspace/${workspaceId}`);
    } catch (error) {
        console.error(error);
        
    }
    

}

  
  
  

  return (
    <>
    <div className='flex items-center flex-row h-screen'>
      <div className="border mx-auto flex flex-row">
        
        <div className="h-full bg-white p-16 flex flex-col justify-center items-center gap-4">
            <h1 className='text-2xl'>CodeEditor</h1>
            <h1 className='text-l text-black'>CreateWorkspace</h1>
         <form onSubmit={handleSubmit(onSubmit)} className='flex
           flex-col gap-6'>
            <div><p className='text-sm text-left text-slate-700'>Name</p>
              <input type="text" {...register("name",{required:{value: true, message:"This is required",}})} className='border w-96 px-4 py-2 rounded outline-none' autoComplete='off'/> 
              </div>
              <div>
              <p className='text-sm text-left text-slate-700'>Type</p>
              <select {...register("type")} className='border w-96 px-4 py-2 rounded outline-none'>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
              <div>
                <div className='flex flex-row justify-between my-4'>
                <div onClick={()=>{setCount(count+1);}} className='rounded-xl p-4 cursor-pointer hover:bg-blue-50'>+ Add Contributors</div>
                <div onClick={()=>{setCount(count-1);  unregister(`contributor${count}`);}} disabled={!count} className='rounded-xl p-4 text-3xl cursor-pointer hover:bg-blue-50'>-</div>
                </div>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i}>
                         <p className='text-sm text-left text-slate-700'>{`Contributor ${i+1}`}</p>
                        <input type="email" {...register(`contributor${i+1}`)} className='border w-96 px-4 py-2 mb-2 rounded outline-none' autoComplete='off'/>
                    </div>
                ))}
              </div>
              </div>
              <input disabled={isSubmitting} value={isSubmitting?"Creating...": "Create Workspace"} type="submit" className='border rounded w-1/2 mx-auto py-2 cursor-pointer hover:bg-blue-600 hover:text-white' />
           </form>
  
           
           
        </div>
      </div>
    
    </div>
    </>
  )
}

export default CreateWorkspace