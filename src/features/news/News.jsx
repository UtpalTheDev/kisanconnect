import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {NewsOnLoad} from "./newsSlice"
export default function News(){
    let {newsData,newsStatus}=useSelector(state=>state.news);
    let dispatch=useDispatch()

    useEffect(()=>{
        if(newsStatus="idle"){
            console.log("chala")
        dispatch(NewsOnLoad("not able to get news"))
        }

    },[])
    console.log("news",newsData)
    return(
        <div className="px-3 pb-12 hidden md:block ">
            {
                newsData.length>0 && 
                newsData.map(newsobj=>{
                    return(
                        <a href={newsobj.url}className="py-2 text-sm block">
                            <img src={newsobj.image_url} className="w-full rounded-md"/>
                            <div className="font-semibold">{newsobj.title}</div>
                            <div className="text-xs pt-2">{newsobj.description}</div>
                        </a>    
                    )
                })
            }
        </div>
    )
}
