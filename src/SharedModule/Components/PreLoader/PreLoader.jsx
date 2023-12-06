import React from "react";
import { Circles } from 'react-loader-spinner'
export default function PreLoader() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Circles
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
