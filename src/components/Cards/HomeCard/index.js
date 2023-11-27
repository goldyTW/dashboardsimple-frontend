import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import { Icon } from "@iconify/react";
import "./style.scss"

export default function HomeCard({
  id,
  content = "this is a card",
  bgColor = "#000",
  link = "/",
  icon = "",
  iconWidth = "",
  iconColor = "",
}) {
  return (
    
      <Card className="homeCard hover-border-11 text-center m-3 col-lg-3 col-12" style={{ backgroundColor: `${bgColor}` }}>
        <Link to={link}>
        <div className='d-flex flex-row text-center'>
          <Icon icon={icon} className="icon-dashboard text-center" width={iconWidth} color={iconColor} />
          <p className='text-center'>{content}</p>
        </div>
        </Link>
      </Card>
  )
}
