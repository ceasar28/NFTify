import { useState } from 'react'
import {BiCaretDown, BiBold, BiItalic, BiUnderline, BiFontColor} from 'react-icons/bi'
import {GrFormAdd} from 'react-icons/gr'
import {RiSubtractFill, RiDeleteBin6Line} from 'react-icons/ri'
import {CiRedo} from 'react-icons/ci'
import { Gallery } from '../data'
 



const Design = () => {
 

  const [text, setText] = useState("");
  const [fonts, setFonts] = useState ('Poppins');
  const [boldFont, setBoldFont] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [size, setSize] = useState (14)
 

  const increase = () => {
    setSize(size + 1);
  }

  const decrease = () => {
    setSize(size - 1);
  }

  const [sliderNumber, setSliderNumber] = useState(0);
  const [show, setShow] = useState(false);

  const handleShow = (index) => {
    setSliderNumber(index)
    setShow(true)
  }
  
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImage = (event) => {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
     const res = fetch(
      '	https://api.cloudinary.com/v1_1/dihifeicm/image/upload',
      {
        method: 'POST',
        body: formData
      }
    )
    const file = res.json()

    setImage(file.secure_url)
  }


  const handleChange = (event) => {
    setFonts(event.target.value);
  };  

  const deleteTask = (id) => {
    setFonts(fonts.filter((task) => task.id !== id));
  };

  return (
    <div className='flex '>
     <div className='w-[30%] min-h-screen bg-slate-100 px-24 py-4'>
       <div className='mt-[8rem]'>
       <div>
        <h1 className='font-bold text-lg'>Template</h1>
        <p className='text-sm'>All result</p>
        <div  className='grid grid-cols-2 gap-4 mt-4'>
          
            {Gallery.map((item, index)=> {
                return (
                  <div key={index} onClick={() => handleShow(index)}  >
                       <img src={item.imgSrc} alt='' />
                  </div>
                )
              })
            }
            <div onSubmit={handleSubmit} className='w-[10rem] text-center mt-2'>
              <p className='text-[blue] text-lg w-[20rem] text-left py-1'>upload your design</p>
            <input type="file" onChange={handleImage} />
           </div>
        </div>
        
    </div>
       </div>
     </div>
     <div className='w-[70%] py-4 px-20'>
       <div className='mt-[4rem]'>
       <div className='py-8'>
       <div className='pb-10'>
          <div className='flex gap-1 justify-end '>
            <input type='text' placeholder='' value={text} onChange={event => {setText(event.target.value);}} className='border-2 border-gray-500 rounded-sm focus:placeholder-none pl-2  '/>
            <button className='text-xs rounded-md bg-blue-700 px-4 text-white'><a href='/Credentials'>Save</a></button>
          </div> 
         <div> 
          <div className='flex gap-4 items-center justify-end mt-4 py-4'>
            <div onClick={() => setFonts(fonts)} className='border-2 border-gray-700 flex items-center gap-8 w-fit py-1 px-2 bg-transparent'>
              <select  value={fonts} onChange={handleChange} className='focus:outline-none bg-none'>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
               </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"/>
            </svg>
            </div>
            </div>
            <div className='flex items-center gap-4 border-2 w-fit border-gray-600 '>
              <button onClick={increase} className='border-r-2  border-gray-700 p-2 h-fit'>
               <GrFormAdd/>
              </button>
               {size}
              <button onClick={decrease} className='border-l-2 border-gray-700 p-2'>
               <RiSubtractFill/>
              </button>
            </div>
            <div className='flex gap-2'>
              <CiRedo size={20}/>
              <CiRedo size={20}/>
              <buttom onClick={() => deleteTask()}><RiDeleteBin6Line size={20}/></buttom>
            </div>
          </div>
          <div className='flex gap-4 justify-end mt-6 mr-[16rem]'>
            <button onClick={() => setBoldFont(!boldFont)}><BiBold size={20}/></button>
            <button onClick={() => setItalic(!italic)}><BiItalic size={20}/></button>
            <button onClick={() => setUnderline(!underline)}><BiUnderline size={20}/></button>
            <button className='flex '>
             <BiFontColor size={20}/>
             <BiCaretDown/>
            </button>
          </div>
       </div>
      </div> 
      {!show ? (<div className='ml-[7rem]'>
        <img src={imageUrl} alt='' className='w-[30rem]'/>
        </div> ):  
        (<div className='ml-[7rem]'>
              <img src={Gallery[sliderNumber].imgSrc} alt='' className='w-[30rem]'/>
            </div>
            )}       
    </div>
       </div>
     </div>
    </div>
  )
}

export default Design
