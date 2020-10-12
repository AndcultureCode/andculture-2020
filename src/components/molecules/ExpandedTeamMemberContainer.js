import React, { useState, useEffect } from "react";
import ExpandedTeamMember from "./ExpandedTeamMember";
import { gsap } from "gsap";
import NextArrow from "components/molecules/NextArrow";
import PrevArrow from "components/molecules/PrevArrow";


const ExpandedTeamMemberContainer = (props) => {

    const employees = props.employees;
    const [selectedEmployee, setSelectedEmployee] = useState(props.selectedEmployee);
    const [arrowDisplay, setArrowDisplay] = useState({display: "none"});
    const [animationType, setAnimationType] = useState("initial");

    useEffect(() => {
        if (selectedEmployee != null && props.selectedEmployee != null) {
            setAnimationType("expanded-arrow"); //not sure I need this setAnimatinoType AND the other one below
        }
        setSelectedEmployee(props.selectedEmployee)
        if (props.selectedEmployee != null) {
            setArrowDisplay({display: "block"});
            return;
        }
        setArrowDisplay({display: "none"});
        setAnimationType("initial");
    }, [props.selectedEmployee]);

    const onClick = (direction) => {
        setAnimationType("expanded-arrow");
        const increment = direction == "previous" ? -1 : 1;
        let newIndex = selectedEmployee.index + increment;
        if (newIndex >= employees.length) {
            newIndex = 0;
        } else if (newIndex <= 0) {
            newIndex = employees.length - 1;
        }
        let newEmployee = employees[newIndex].node.frontmatter;
        newEmployee.index = newIndex;

        const imageDiv = document.querySelector(
            ".expanded-team-member-image-div"
        );
        const textDiv = document.querySelector(
            ".expanded-team-member-text"
        );

        if (direction === "previous") {
            gsap.to(textDiv, {
                duration: 2,
                x: -1500,
            });
            gsap.to(imageDiv, {
                duration: 2,
                x: -1500,
            });

            setSelectedEmployee(newEmployee);

            gsap.to(".expanded-team-member-text", {
                duration: 2,
                x: 0,
            });
            gsap.to(".expanded-team-member-image-div", {
                duration: 2,
                x: 0,
            });
        } else if (direction === "next") {
            gsap.to(textDiv, {
                duration: 2,
                x: 1500,
            });
            gsap.to(imageDiv, {
                duration: 2,
                x: 1500,
            });

            setSelectedEmployee(newEmployee);

            gsap.to(".expanded-team-member-text", {
                duration: 2,
                x: 0,
            });
            gsap.to(".expanded-team-member-image-div", {
                duration: 2,
                x: 0,
            });
        }


    };

    return (
        <>
            <PrevArrow
                onClick={() => onClick("previous")}
                className="expanded-arrow expanded-arrow-prev"
                style={arrowDisplay}
            />
            <ExpandedTeamMember
                animationType={animationType}
                employee={selectedEmployee}
                handleHideExpanded={props.handleHideExpanded}
                isExpanded={props.isExpanded}
                onFadedOut={props.onFadedOut}
            />
            <NextArrow
                onClick={() => onClick("next")}
                className="expanded-arrow expanded-arrow-next"
                style={arrowDisplay}
            />
        </>
    );
};

export default ExpandedTeamMemberContainer;
