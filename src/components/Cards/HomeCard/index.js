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
    <Link to={link}>
      <Card className="homeCard hover-border-11" style={{ backgroundColor: `${bgColor}` }}>
        <>
          <Icon icon={icon} className="icon-dashboard" width={iconWidth} color={iconColor} />
          <p>{content}</p>
        </>
      </Card>
    </Link>
  )
}
