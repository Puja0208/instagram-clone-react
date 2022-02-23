import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddComment from "./add-comment";
export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  return (
    <div className="p-4 pt-1 pb-4">
      {
          comments.length>=3 &&(
              <p>View all {comments}</p>
          )
      }
    </div>
  );
}
