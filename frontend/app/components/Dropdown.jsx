import React from 'react'
import { Select, Option } from "@material-tailwind/react";

export default function Dropdown() {
 
  return (
    <div className="w-72">
      <Select variant="outlined" label="Select Version">
        <Option>Alla inlägg</Option>
        <Option>Mina inlägg</Option>
        <Option>Favorite inlägg</Option>
      </Select>
    </div>
  )
}
