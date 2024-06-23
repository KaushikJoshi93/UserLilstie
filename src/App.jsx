import { useEffect, useRef, useState } from "react";
import Divider from "./components/Divider"
import UserCard from "./components/UserCard"
import Loader from "./components/Loader";
import ErrorImage from './assets/error.png'

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget =  useRef(null);
  let itfunc = ()=>{};
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(import.meta.env.VITE_API_URL);
      let res = await data.json();
      res = res.reverse();
      itfunc = makeIt(res,10);
      let it = itfunc();
      setUsers(it.data); 
    } catch (err) {
      
    }finally{
      setIsLoading(false);
    }
  }

  // for infinite scrolling
  const makeIt =  (arr , offset)=>{
    let i = 0;
    return ()=>{
      if(i < arr.length){
        let nextArr = [];
        let initElem = i;
        for(; i <= (initElem+offset) ; i++){
          arr[i] && nextArr.push(arr[i])
        }
        return {
          data: nextArr,
          done: false
        }
      }
      return {
        data: null,
        done: true
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  // for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          let it = itfunc();
          if(it && !it.done){
            setUsers((prev)=>[...prev ,...it.data])
          }
        }
      },
      { threshold: 1 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8">
      {/* Heading */}
      <div>
        <p className=" w-fit p-2 pl-8 pr-8 text-center font-bold text-2xl">Users</p>
      </div>
      <Divider />
      {/* users container */}
      <div className={`flex flex-col w-full  p-4 ${isLoading ? 'justify-center items-center':''}`}>
        {
          isLoading ? <Loader /> :
            (!isLoading && !users.length)?
            <div  className="w-full flex flex-col justify-center items-center h-full gap-4">
              <img src={ErrorImage} alt="error" className="w-60 md:w-80 h-60 md:h-80"/>
              <p className="font-bold text-lg md:text-2xl">No Data to show</p>
            </div>:
            users.map((item, index) => (
              <div key={index}>
                <UserCard  image={item.avatar} name={item.profile.firstName + item.profile.lastName} jobTitle={item.jobTitle} bio={item.Bio} />
                <Divider />
              </div>
            ))
          
        }
      </div>
      {/* observer container */}
      <div ref={observerTarget}></div>
    </div>
  )
}

export default App
