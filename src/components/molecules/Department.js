import React from "react";

const Department = (props) => {
  let className = "";

  if (props.department.deptImg === undefined) {
    className = "-no-image";
  }

  return (
    <div className={`${className} `}>
      <div className="o-rhythm__container">
        <div className="o-hero__top">
          <div className={`o-rhythm__row ${props.modifier}`}>
            {props.department.deptImg && (
              <div className="o-hero__side-two p-about__illustration">
                <img
                  alt={props.department.name + " illustration"}
                  aria-hidden="true"
                  src={props.department.deptImg.childImageSharp.fluid.src}
                />
              </div>
            )}
            <div className={`o-hero__side-one ${props.modifier}`}>
              <div className="o-hero__titles">
                <h2>{props.department.name}</h2>
                <p className="dept-description">
                  {props.department.description}
                </p>
                <ul className="no-dot">
                  {props.department.rolesList &&
                    props.department.rolesList.map((role, index) => {
                      return <li key={index}>{role}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
