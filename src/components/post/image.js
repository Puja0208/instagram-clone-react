import React from "react";

export default function Image({ src, caption }) {
  return (
    // bem syntax (block, element, modifier)
    // div (post__img)
    // src/alt

    <div className="post__img">
      <img
        src={`${process.env.PUBLIC_URL}/assets${src}`}
        // src={require("../../../public/images/users/raphael/1.jpg")}
        alt={caption}
      />
    </div>
  );
}
