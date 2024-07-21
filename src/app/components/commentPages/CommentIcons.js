import "./CommentIcons.css";

const CommentIcons=({currentPage,filterList})=>{


    return( <div className="commentIcon">
        <p className="noMargin" onClick={() => filterList(currentPage)}>{currentPage}</p>
    </div>);
} 


export default CommentIcons;
