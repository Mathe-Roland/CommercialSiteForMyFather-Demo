"use client";

import React, { useState, useEffect } from "react";
import "./CommentPages.css";
import CommentIcons from "./CommentIcons";

const CommentPages = ({ CommentIconsList,filterList,inputNumberFilter}) => {
    const [displayedList, setDisplayedList] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [numberForDisplayedList, setNumberForDisplayedList] = useState(0);

    useEffect(() => {
        const updateDisplayedList = () => {
            if (CommentIconsList.length <= 5) {
                setDisplayedList([...CommentIconsList]);
            } else {
                setDisplayedList([
                    ...CommentIconsList.slice(0, 3),
                    '...',
                    ...CommentIconsList.slice(-2)
                ]);
            }
        };

        updateDisplayedList();
    }, [CommentIconsList]);

    const handleEllipsisClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setNumberForDisplayedList(e.target.value);
        inputNumberFilter(e.target.value);
        const inputNumber = Number(e.target.value);
        if (inputNumber <= 3 || inputNumber > CommentIconsList.length - 2) {
            setDisplayedList([
                ...CommentIconsList.slice(0, 3),
                '...',
                ...CommentIconsList.slice(-2)
            ]);
        } else if(Number(e.target.value)>=CommentIconsList.length-3){
            setDisplayedList([
                CommentIconsList[0],
                '...',
                ...CommentIconsList.slice(-4)
            ]);

        }else {
            const startIndex = inputNumber - 2;
            const endIndex = inputNumber + 1;
            setDisplayedList([
                CommentIconsList[0],
                '...',
                ...CommentIconsList.slice(startIndex, endIndex),
                '...',
                ...CommentIconsList.slice(-2)
            ]);
        }
    };

    return (
        <div className="commentPages-Conatiner">
            {displayedList.map((element, index) => (
                <div key={index}>
                    {element === '...' ? (
                        <span onClick={handleEllipsisClick}>...</span>
                    ) : (
                        <CommentIcons filterList={filterList} currentPage={element} />
                    )}
                </div>
            ))}
            {showInput && (
                <div className="inputBox">
                    <input
                        type="number"
                        min="1"
                        max={CommentIconsList.length}
                        value={numberForDisplayedList}
                        onChange={handleInputChange}
                        placeholder="Enter a number"
                    />
                </div>
            )}
        </div>
    );
};

export default CommentPages;
