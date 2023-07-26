import React, {useState, useEffect} from "react";
import DiscChart from "../DiscChart";
import DiscTable from "../DiscTable";

export default function Inventory() {



  return (<>
    <div className="w-10/12 h-8/12 b-2 b-black flex">
      <div className="w-2/3 h-full">
        <DiscTable />
      </div>
      <div className="w-1/3 h-full">
        <DiscChart />
      </div>
    </div>
    </>)
}

