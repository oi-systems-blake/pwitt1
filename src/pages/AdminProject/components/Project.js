import React from 'react'

const Project = ({project}) => {
  return (
    <div className="project-row">
    <div className="project-row-project-name">{project.fields.Project}</div>
    <div className="project-row-right">
    <div className="project-row-status">{project.fields.Status}</div>
    <div className="project-row-hours">{}</div>
  </div>
    </div>
    
  )
}

export default Project