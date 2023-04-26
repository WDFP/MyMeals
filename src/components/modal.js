import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Modal({recipe, setExtraRecipeData}) {

  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseClick = () => {
    setModalOpen(false);
  };

  useEffect(() =>  {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27 && modalOpen) {
        handleCloseClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <div>
      <Image
        id="myImg"
        className='w-full'
        src={recipe.thumbnail_url}
        alt={recipe.name}
        width={500}
        height={500}
        onClick={handleImageClick}
      />

      <div className="modal" style={{ display: modalOpen ? "block" : "none" }}>
        <span className="close" onClick={handleCloseClick}>
          X
        </span>
        <Image alt="recipe" className="modal-content" id="img01" src={recipe.thumbnail_url} width={500} height={500} />
        <div id="caption">
          {recipe.name}
          <br />
          <Link
            href={{
              pathname: `/recipes/${recipe.slug}`,
              query: {
                title: recipe.name,
                image: recipe.thumbnail_url,
                slug: recipe.slug,
              },
            }}
          >
            <button
              className='text-white bg-green-400 p-4 rounded-md w-full uppercase hover:bg-sky-700'
              onClick={() => {
                setExtraRecipeData({
                  summary: recipe.description,
                  rating: recipe.score,
                  time: recipe.total_time,
                });
              }}
            >
           View Recipe
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
