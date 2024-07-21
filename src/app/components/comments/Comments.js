import "./Comments.css";
import { useState,useEffect } from "react";
import CommentModal from "../coment-Modal/CommentModal";
import { fetchPanouriCommentsPerPanouId,fetchPanouriData } from "../asyncOperations/fetchData";
import Cookies from 'js-cookie';


const Comments=({username,comments,id,panouId})=>{

    const [editComment,setEditComments]=useState("");
      

    useEffect(()=>{
        edit();
    },[]);

    const edit=()=>{

        setEditComments(comments)
    }


        return (
            <div className="commentarii">
                <p className="commentUserName">{username||""}</p>
                <p className="comment">{editComment}</p>
                {
                    username===Cookies.get("user") ?

                    <CommentModal id={id} panouId={panouId} showComment={editComment}
                    saveText={setEditComments}/>:null
                }
            </div>
        )
};


export default Comments;