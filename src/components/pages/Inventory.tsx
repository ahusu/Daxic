import React, {useState, useEffect} from "react";
import Chart from "../Chart";
import MenuTable from "../Table";

export default function Inventory() {



  return (<>
    <div className="flex">
      <div className="w-2/3 h-full m-4 p-4 object-contain">
        <h2 className="text-lg m-2 p-1">Inventory</h2>
        <MenuTable />
      </div>
      <div className="w-1/3 h-full m-4 p-4">
        <Chart />
      </div>
    </div>
    </>)
}

