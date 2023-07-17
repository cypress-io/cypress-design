import React from 'react'

export const ProjectDropdown = () => {
  return (
    <div className="NavButtonContent w-96 h-12 px-2 rounded justify-start items-center gap-3 inline-flex">
      <div className="LogoContainer w-8 h-8 p-0.5 rounded-2xl border border-white justify-between items-start gap-1 flex">
        <div className="Logo w-7 h-7 justify-center items-center flex" />
      </div>
      <div className="OrgUser grow shrink basis-0 flex-col justify-center items-start gap-1.5 inline-flex">
        <div className="Organization self-stretch h-2.5 text-slate-500 text-sm font-normal leading-tight">
          Gatsby
        </div>
        <div className="ProjectName self-stretch h-4 text-white text-base font-semibold leading-normal">
          Design System
        </div>
      </div>
      <div className="IconGeneralGrid2x2 w-4 h-4 p-0.5 justify-center items-center flex" />
    </div>
  )
}
