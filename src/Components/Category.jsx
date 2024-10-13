import React from "react";

const Category = ({ name, selectId, id }) => {
  const isSelected = selectId == id;
  //console.log(isSelected, id, selectId);
  return (
    <div
      className={`border-2 mt-4 mx-2 text-xs md:text-lg md:text-md border-secondary p-1 md:p-3 rounded-lg min-w-[80px] md:min-w-[120px] text-center text-secondary shadow-md shadow-secondary
                    hover:bg-secondary hover:text-slate-50 hover:shadow-slate-50 ${
                      isSelected
                        ? "bg-secondary text-slate-50 shadow-slate-50"
                        : ""
                    }
  `}
    >
      {name}
    </div>
  );
};

export default Category;
