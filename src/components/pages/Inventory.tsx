import React, {useState, useEffect} from "react";
import DiscChart from "../DiscChart";
import DiscTable from "../DiscTable";

export default function Inventory() {



  return (<>
    <div className="flex">
      <div className="w-2/3 h-full m-4 p-4">
        <h2 className="text-lg m-2 p-1">Disc Inventory</h2>
        <DiscTable />
      </div>
      <div className="w-1/3 h-full m-4 p-4">
        <DiscChart />
      </div>
    </div>
    </>)
}

