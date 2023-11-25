// import { useCallback, useEffect, useState } from 'react'

// import './App.css'

// function App() {
//  const [Length, SetLength]= useState(8);
//  const [CharAllowed, SetCharAllowed]= useState(false);
//  const [NumAllowed, SetNumAllowed]= useState(false);
//  const [Password, SetPassword]=useState("")

// const passswordGen =useCallback(()=>{
//   let pass = ""
//   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//   if (NumAllowed) str += "0123456789"
//   if (CharAllowed) str += "!@#$%^&*-_+=[]{}~`"

//   for (let i = 1; i <= length; i++) {
//     let char = Math.floor(Math.random() * str.length + 1)
//     pass += str.charAt(char)
    
//   }

//   SetPassword(pass)


// },[Length,NumAllowed,CharAllowed,SetPassword]);


//   useEffect (()=>{
//     passswordGen()
//   },
//     [Length,NumAllowed,CharAllowed,passswordGen]
//   )


//   return (
//   <div className='w-full max-w-md shadow-md mx-auto rounded-lg px-4 my-8 text-orange-500'>
//     <div className='flex shodow-rounded-lg overflow-hidden mb-4 '>
//    <input 
//    type='type'
//    placeholder='Password'
//    readOnly
//    className='w-full outline-none py-1 px-3 rounded-md'
//    value={Password}
   
//    />
//    <button className='text-white bg-sky-300 rounded-lg py-1 px-3 ml-3'>Copy</button>
//     </div>

//     <div className='flex gap-x-2 text-sm'>
//       <div className='flex items-center gap-x-1'>
//          <input
//          type='range'
//          min={6}
//          max={100}
//          value={Length}
//          className='cursor-pointer'
//          onChange={(e)=>{SetLength(e.target.value)}}
//          />
//          <label>Length:{Length}</label>
//       </div>

//       <div className='flex items-center gap-x-1'>
//         <input 
//            type='checkbox'
//            defaultChecked={NumAllowed}  
//            id='numberInput'
//            onChange={()=>{
//             SetNumAllowed((prev)=>!prev);
//            }}     
//         />

//         <label htmlFor="numberInput">Numbers</label>

//       </div>
//       <div className='flex items-center gap-x-1'>
//         <input 
//            type='checkbox'
//            defaultChecked={CharAllowed}  
//            id='charInput'
//            onChange={()=>{
//             SetCharAllowed((prev)=>!prev);
//            }}     
//         />

//         <label htmlFor="numberInput">Characters</label>

//       </div>

//     </div>
//   </div>
//   )
// }

// export default App



import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  text-blue-900">
      <h1 className='text-black text-center my-3 text-2xl '>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App
