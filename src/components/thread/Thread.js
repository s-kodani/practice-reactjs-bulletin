import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Thread() {
  const params = useParams();
  const threadId = params.threadId;

  return (
    <span>{threadId}</span>
  )
}
